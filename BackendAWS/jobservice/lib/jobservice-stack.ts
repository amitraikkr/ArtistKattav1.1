import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as iam from "aws-cdk-lib/aws-iam";

export class JobserviceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create DynamoDB Table
    const jobsTable = new dynamodb.Table(this, "JobsTable", {
      partitionKey: { name: "jobId", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "postedDate", type: dynamodb.AttributeType.STRING }, // YYYY-MM-DD format
      tableName: "JobsTable",
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    // Lambda Role (Permissions for DynamoDB)
    const lambdaRole = new iam.Role(this, "LambdaDynamoDBRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });

    jobsTable.grantReadWriteData(lambdaRole); // Allow Lambda to access the table

    lambdaRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole")
    );

    // Lambda Function Definition
    const createLambdaFunction = (name: string, folder: string) => {
      return new lambda.Function(this, name, {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: `index.handler`,
        code: lambda.Code.fromAsset(`lambda/${folder}`), // Assumes lambda code in `lambda/` folder
        role: lambdaRole,
        environment: {
          JOBS_TABLE: jobsTable.tableName
        },
      });
    };

    // Create Lambda Functions
    const addJobLambda = createLambdaFunction("AddJobLambda", "addJob");
    const editJobLambda = createLambdaFunction("EditJobLambda", "editJob");
    const listJobsByDateRangeLambda = createLambdaFunction("ListJobsByDateLambda", "listJobByDate");
    const getJobByIdLambda = createLambdaFunction("GetJobByIdLambda", "getJobById");

    // Create API Gateway
    const api = new apigateway.RestApi(this, "JobApiGateway", {
      restApiName: "JobAPI",
      description: "API Gateway for Job Listings",
    });

    // Define API Resources & Methods
    const jobsResource = api.root.addResource("jobs");
    jobsResource.addMethod("POST", new apigateway.LambdaIntegration(addJobLambda)); // Add Job

    const jobResource = jobsResource.addResource("{jobId}");
    jobResource.addMethod("GET", new apigateway.LambdaIntegration(getJobByIdLambda)); // Get Job by ID
    jobResource.addMethod("PUT", new apigateway.LambdaIntegration(editJobLambda)); // Edit Job

    const listJobsResource = jobsResource.addResource("date-range");
    listJobsResource.addMethod("GET", new apigateway.LambdaIntegration(listJobsByDateRangeLambda)); // List Jobs by Date Range

    new cdk.CfnOutput(this, "ApiUrl", { value: api.url });
  }
}
