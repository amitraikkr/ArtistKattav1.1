"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Edit,
  MapPin,
  Mail,
  Phone,
  Building2,
  Globe,
  Plus,
  Instagram,
  Linkedin,
  Trophy,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

// API Gateway endpoint URL for updating company details (editUser Lambda)
const EDIT_USER_ENDPOINT =
  "https://to58hqa8w7.execute-api.ap-south-1.amazonaws.com/prod/users";

interface CompanyData {
  id: string;             // from stored user.userId
  name: string;           // company name (from fullName)
  type: string;           // company type (from userCategoryType)
  location: string;
  about: string;
  website: string;
  email: string;
  phone: string;
  establishedYear: string;
  coverImage?: string;    // banner image URI
  profileImage?: string;  // logo image URI
}

export default function CompanyProfilePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [originalData, setOriginalData] = useState<CompanyData | null>(null);

  // Local file states for images
  const [localCoverFile, setLocalCoverFile] = useState<File | null>(null);
  const [localProfileFile, setLocalProfileFile] = useState<File | null>(null);

  // Refs for hidden file inputs
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const profileFileInputRef = useRef<HTMLInputElement>(null);

  // -----------------------------------
  // Fetch and map company data from sessionStorage
  // -----------------------------------
  useEffect(() => {
    // Since companies and artists share the same user table, we use the key "user"
    const storedData = sessionStorage.getItem("user");
    if (!storedData) {
      router.push("/login");
      return;
    }
    try {
      const data = JSON.parse(storedData);
      // Map the stored user data into our CompanyData structure.
      // For companies, we use:
      // - id from userId
      // - name from fullName
      // - type from userCategoryType (e.g., "theatre")
      // Other fields default to empty strings if not provided.
      const mappedCompany: CompanyData = {
        id: data.userId,
        name: data.fullName,
        type: data.userCategoryType || "",
        location: data.location || "",
        about: data.about || "",
        website: data.website || "",
        email: data.emailId,
        phone: data.phone || "",
        establishedYear: data.establishedYear || "",
        coverImage: data.coverImage || "",
        profileImage: data.profileImage || "",
      };
      setCompanyData(mappedCompany);
      setOriginalData(mappedCompany);
    } catch (error) {
      console.error("Error parsing company data:", error);
      router.push("/login");
    }
    setIsLoading(false);
  }, [router]);

  // -----------------------------------
  // Upload helper: convert file to base64 and call the upload API
  // -----------------------------------
  const uploadFile = async (file: File, folder: string) => {
    try {
      const fileBuffer = await file.arrayBuffer();
      const base64File = Buffer.from(fileBuffer).toString("base64");

      // For companies, we only use images.
      const payload = {
        file: base64File,
        folder: "images", // always images for companies (both cover and logo)
        filename: file.name,
        contentType: file.type,
      };

      console.log("Uploading file with payload:", { ...payload, file: "[BASE64_STRING]" });

      const response = await fetch(
        "https://to58hqa8w7.execute-api.ap-south-1.amazonaws.com/prod/uploads",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upload error:", errorData);
        throw new Error(errorData.error || "Failed to upload file");
      }
      const data = await response.json();
      return data.publicUrl;
    } catch (error) {
      console.error("Error in uploadFile:", error);
      throw error;
    }
  };

  // -----------------------------------
  // File change handlers (update local file state and preview URL)
  // -----------------------------------
  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLocalCoverFile(file);
      setCompanyData((prev) =>
        prev ? { ...prev, coverImage: URL.createObjectURL(file) } : null
      );
    }
  };

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLocalProfileFile(file);
      setCompanyData((prev) =>
        prev ? { ...prev, profileImage: URL.createObjectURL(file) } : null
      );
    }
  };

  // -----------------------------------
  // Input handling for text fields
  // -----------------------------------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanyData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // -----------------------------------
  // Save/Cancel: On Save Changes, upload files (if any) then call the API to update the company record.
  // Then update sessionStorage with the new company details.
  // -----------------------------------
  const handleSaveChanges = async () => {
    if (!companyData) return;
    const updatedData = { ...companyData };

    try {
      // Upload new cover image if selected
      if (localCoverFile) {
        const coverUrl = await uploadFile(localCoverFile, "images");
        updatedData.coverImage = coverUrl;
      }
      // Upload new logo (profile image) if selected
      if (localProfileFile) {
        const profileUrl = await uploadFile(localProfileFile, "images");
        updatedData.profileImage = profileUrl;
      }

      // Prepare payload matching your editUser Lambda's expected fields.
      // For companies, we send:
      const payload = {
        userId: updatedData.id,              // same as stored userId
        fullName: updatedData.name,            // company name
        address: "",                         // not provided in session; leave blank or add if available
        phoneNumber: updatedData.phone,        // company phone
        userCategory: updatedData.type,        // company type from userCategoryType
        userCategoryType: "",                // not used for company updates here
        profileImage: updatedData.profileImage || "",
        coverImage: updatedData.coverImage || "",
        resumeUrl: "",                       // companies might not have a resume
        city: updatedData.location,          // using location as city (or update if separate)
        country: "",                         // update if available
        website: updatedData.website || "",
        youtube: "",                         // add social fields if available
        linkedin: "",                        // add if available
        agencyName: "",                      // not applicable for companies
        aboutAgency: updatedData.about || "",
        agencyAddress: "",                   // not applicable
        agencyPhone: "",                     // not applicable
        agencyWebsite: "",                   // not applicable
        // Optionally include additional fields such as establishedYear, location, etc.
        establishedYear: updatedData.establishedYear,
        location: updatedData.location
      };

      console.log("Sending payload to API:", JSON.stringify(payload, null, 2));

      const response = await fetch(EDIT_USER_ENDPOINT, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(`Failed to update company: ${errorText}`);
      }

      const result = await response.json();
      console.log("Update result:", result);

      // Update sessionStorage with new company details
      if (result.user) {
        sessionStorage.setItem("user", JSON.stringify(result.user));
      }

      toast({ title: "Success", description: "Company profile updated." });
      setCompanyData(updatedData);
      setOriginalData(updatedData);

      // Clear local file states after successful update
      setLocalCoverFile(null);
      setLocalProfileFile(null);
    } catch (error) {
      console.error("Save changes error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update company profile.",
      });
    }
  };

  const handleCancel = () => {
    if (originalData) {
      setCompanyData(originalData);
      toast({ title: "Cancelled", description: "Changes reverted." });
    }
  };

  // -----------------------------------
  // Loading / Fallback UI
  // -----------------------------------
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!companyData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Company Profile Not Found</h2>
          <p className="mb-4">We couldn't find your company profile. Please log in again.</p>
          <Button onClick={() => router.push("/login")}>Go to Login</Button>
        </Card>
      </div>
    );
  }

  // -----------------------------------
  // Render the Dynamic Company Profile Page
  // -----------------------------------
  return (
    <div className="min-h-screen bg-ink pb-12">
      {/* Cover Image Section */}
      <div className="relative h-[400px] w-full">
        {companyData.coverImage ? (
          <Image
            src={companyData.coverImage}
            alt={`${companyData.name} cover`}
            fill
            className="object-cover object-center"
            priority
          />
        ) : (
          <Image
            src="/placeholder.svg"
            alt="Default cover"
            fill
            className="object-cover object-center"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-4 right-4 bg-ink-light/80 hover:bg-ink-hover"
          onClick={() => coverFileInputRef.current?.click()}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Cover
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={coverFileInputRef}
          onChange={handleCoverFileChange}
          className="hidden"
        />
      </div>

      {/* Profile Header */}
      <div className="container max-w-5xl">
        <div className="relative -mt-[100px] mb-4 flex items-end space-x-4">
          {/* Profile Image (Company Logo) */}
          <div className="relative h-[200px] w-[200px] rounded-xl border-8 border-ink overflow-hidden shadow-2xl">
            {companyData.profileImage ? (
              <Image
                src={companyData.profileImage}
                alt={companyData.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <Image
                src="/placeholder.svg"
                alt="Default logo"
                fill
                className="object-cover"
                priority
              />
            )}
            <Button
              size="sm"
              variant="secondary"
              className="absolute bottom-2 right-2 bg-ink-light/80 hover:bg-ink-hover"
              onClick={() => profileFileInputRef.current?.click()}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Logo
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={profileFileInputRef}
              onChange={handleProfileFileChange}
              className="hidden"
            />
          </div>

          {/* Company Name, Type, and Location */}
          <div className="mb-8 flex-1">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-white">{companyData.name}</h1>
            </div>
            <h2 className="mt-1 text-xl text-muted-foreground">{companyData.type}</h2>
            <div className="mt-2 flex items-center space-x-4 text-muted-foreground">
              <span className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {companyData.location}
              </span>
              <span className="flex items-center">
                <Building2 className="mr-1 h-4 w-4" />
                Est. {companyData.establishedYear}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column: Editable Details */}
          <div className="col-span-2 space-y-6">
            {/* About / Bio Card */}
            <Card className="p-6 bg-ink-light border-ink">
              <h3 className="text-lg font-semibold text-white mb-4">About</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="name"
                  value={companyData.name}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  className="bg-gray-800 text-white placeholder-gray-400"
                />
                <Input
                  name="type"
                  value={companyData.type}
                  onChange={handleInputChange}
                  placeholder="Type (e.g., Art Gallery, Theatre)"
                  className="bg-gray-800 text-white placeholder-gray-400"
                />
                <Input
                  name="location"
                  value={companyData.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="bg-gray-800 text-white placeholder-gray-400"
                />
                <Input
                  name="establishedYear"
                  value={companyData.establishedYear}
                  onChange={handleInputChange}
                  placeholder="Established Year"
                  className="bg-gray-800 text-white placeholder-gray-400"
                />
                <Textarea
                  name="about"
                  value={companyData.about}
                  onChange={handleInputChange}
                  placeholder="About the Company"
                  className="bg-gray-800 text-white placeholder-gray-400"
                />
              </div>
            </Card>

            {/* Action Buttons Card */}
            <Card className="p-6 bg-ink-light border-ink">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleSaveChanges} className="w-full bg-primary hover:bg-primary/90 py-3 text-lg">
                  Save Changes
                </Button>
                <Button onClick={handleCancel} className="w-full bg-gray-500 hover:bg-gray-600 py-3 text-lg">
                  Cancel
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column: Read-only Info & Social Links */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <Card className="p-6 bg-ink-light border-ink">
              <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  {companyData.email}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  {companyData.phone}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Globe className="h-4 w-4 mr-2" />
                  {companyData.website}
                </div>
              </div>
            </Card>

            {/* Achievements Card */}
            <Card className="p-6 bg-ink-light border-ink">
              <h3 className="text-lg font-semibold text-white mb-4">Achievements</h3>
              <div className="space-y-4">
                {/* Example static achievement; replace with dynamic data if available */}
                <div className="flex gap-3">
                  <div className="mt-1 h-10 w-10 flex-shrink-0 rounded-full bg-ink-hover flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Best Art Gallery Award</h4>
                    <p className="text-sm text-muted-foreground">
                      Art Council of India • 2023
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Media Card */}
            <Card className="p-6 bg-ink-light border-ink">
              <h3 className="text-lg font-semibold text-white mb-4">Social Media</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full border-ink text-white hover:bg-ink-hover">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" className="w-full border-ink text-white hover:bg-ink-hover">
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </Button>
                <Button variant="outline" className="w-full border-ink text-white hover:bg-ink-hover">
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}