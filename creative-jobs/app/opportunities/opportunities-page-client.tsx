"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Filter,
  Music,
  Palette,
  Camera,
  Mic,
  PenTool,
  Building2,
  Calendar,
  DollarSign,
  Bookmark,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function OpportunitiesPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedLocation, setSelectedLocation] = useState<string>("all")

  const categories = [
    { id: "visual", name: "Visual Arts", icon: Palette },
    { id: "music", name: "Music", icon: Music },
    { id: "photography", name: "Photography", icon: Camera },
    { id: "performing", name: "Performing Arts", icon: Mic },
    { id: "writing", name: "Writing", icon: PenTool },
  ]

  const jobTypes = [
    { id: "full-time", name: "Full Time" },
    { id: "part-time", name: "Part Time" },
    { id: "contract", name: "Contract" },
    { id: "freelance", name: "Freelance" },
    { id: "internship", name: "Internship" },
  ]

  const opportunities = [
    {
      id: 1,
      title: "Senior Visual Artist",
      company: "Creative Studios",
      companyLogo: "/placeholder.svg",
      location: "Mumbai, India",
      type: "full-time",
      category: "visual",
      salary: "₹8L - ₹12L per year",
      posted: "2 days ago",
      deadline: "March 30, 2024",
      description: "We're looking for a senior visual artist to join our creative team...",
      requirements: [
        "5+ years of experience in digital art",
        "Proficiency in Adobe Creative Suite",
        "Strong portfolio of commercial work",
      ],
      featured: true,
      applications: 45,
    },
    {
      id: 2,
      title: "Music Producer",
      company: "Harmony Records",
      companyLogo: "/placeholder.svg",
      location: "Delhi, India",
      type: "contract",
      category: "music",
      salary: "₹5000 - ₹8000 per day",
      posted: "1 week ago",
      deadline: "April 15, 2024",
      description: "Seeking an experienced music producer for upcoming album projects...",
      requirements: [
        "Experience with modern DAWs",
        "Understanding of various music genres",
        "Portfolio of produced tracks",
      ],
      featured: true,
      applications: 67,
    },
    {
      id: 3,
      title: "Theatre Workshop Facilitator",
      company: "National Theatre Academy",
      companyLogo: "/placeholder.svg",
      location: "Bangalore, India",
      type: "part-time",
      category: "performing",
      salary: "₹2500 per workshop",
      posted: "3 days ago",
      deadline: "Ongoing",
      description: "Looking for theatre artists to conduct regular workshops...",
      requirements: [
        "3+ years of theatre experience",
        "Experience in conducting workshops",
        "Good communication skills",
      ],
      featured: false,
      applications: 23,
    },
  ]

  const featuredCompanies = [
    {
      id: 1,
      name: "Creative Studios",
      logo: "/placeholder.svg",
      type: "Design Agency",
      openings: 5,
      location: "Mumbai",
    },
    {
      id: 2,
      name: "Harmony Records",
      logo: "/placeholder.svg",
      type: "Music Production",
      openings: 3,
      location: "Delhi",
    },
  ]

  const trendingSearches = [
    "UI/UX Designer",
    "Music Producer",
    "Photography Assistant",
    "Content Writer",
    "Art Director",
  ]

  const filteredOpportunities = opportunities.filter((job) => {
    if (selectedCategory !== "all" && job.category !== selectedCategory) return false
    if (selectedType !== "all" && job.type !== selectedType) return false
    if (selectedLocation !== "all" && !job.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false
    return true
  })

  return (
    <div className="container max-w-7xl py-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-white">Creative Opportunities</h1>
        <p className="text-muted-foreground">
          Discover jobs, gigs, auditions, and opportunities in the creative industry
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 bg-ink-light border-ink">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search opportunities..." className="pl-10 bg-ink-hover border-ink text-white" />
          </div>
          <Select onValueChange={setSelectedCategory} defaultValue="all">
            <SelectTrigger className="bg-ink-hover border-ink text-white">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-ink-light border-ink">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedType} defaultValue="all">
            <SelectTrigger className="bg-ink-hover border-ink text-white">
              <Briefcase className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent className="bg-ink-light border-ink">
              <SelectItem value="all">All Types</SelectItem>
              {jobTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedLocation} defaultValue="all">
            <SelectTrigger className="bg-ink-hover border-ink text-white">
              <MapPin className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent className="bg-ink-light border-ink">
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Opportunities List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {jobTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                className="border-ink text-white hover:bg-ink-hover whitespace-nowrap"
                onClick={() => setSelectedType(type.id)}
              >
                {type.name}
              </Button>
            ))}
          </div>

          {/* Opportunities */}
          <div className="space-y-4">
            {filteredOpportunities.map((job) => (
              <Card
                key={job.id}
                className={cn(
                  "p-6 bg-ink-light border-ink hover:border-primary/50 transition-colors",
                  job.featured && "border-l-4 border-l-primary",
                )}
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={job.companyLogo || "/placeholder.svg"}
                    alt={job.company}
                    width={56}
                    height={56}
                    className="rounded-lg"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link
                          href={`/opportunities/${job.id}`}
                          className="text-lg font-semibold text-white hover:text-primary"
                        >
                          {job.title}
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          {job.company}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="border-primary/20 text-primary">
                        {jobTypes.find((t) => t.id === job.type)?.name}
                      </Badge>
                      <Badge variant="outline" className="border-ink text-white">
                        <MapPin className="mr-1 h-3 w-3" />
                        {job.location}
                      </Badge>
                      <Badge variant="outline" className="border-ink text-white">
                        <DollarSign className="mr-1 h-3 w-3" />
                        {job.salary}
                      </Badge>
                    </div>
                    <p className="mt-3 text-muted-foreground">{job.description}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-ink">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        Posted {job.posted}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        Deadline: {job.deadline}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        {job.applications} applications
                      </div>
                      <div className="ml-auto">
                        <Button className="bg-primary hover:bg-primary/90">Apply Now</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Companies */}
          <Card className="p-4 bg-ink-light border-ink">
            <h2 className="text-lg font-semibold text-white mb-4">Featured Companies</h2>
            <div className="space-y-4">
              {featuredCompanies.map((company) => (
                <div key={company.id} className="flex items-center gap-3">
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{company.name}</h3>
                    <p className="text-sm text-muted-foreground">{company.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">{company.openings} jobs</div>
                    <div className="text-xs text-muted-foreground">{company.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Trending Searches */}
          <Card className="p-4 bg-ink-light border-ink">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Trending Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((search, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-primary/20 text-primary cursor-pointer hover:border-primary"
                >
                  {search}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Quick Tips */}
          <Card className="p-4 bg-ink-light border-ink">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Tips</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Keep your portfolio updated to increase visibility
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Follow companies to get notified of new opportunities
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Complete your profile to improve application success
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}

