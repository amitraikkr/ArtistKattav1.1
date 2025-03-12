"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Briefcase, Users2 } from "lucide-react"

// Temporary mock data
const mockUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    username: "@sarahchen",
    avatar: "/placeholder.svg?height=40&width=40",
    profession: "Visual Artist",
    location: "San Francisco, CA",
    connections: 245,
    tags: ["Digital Art", "Illustration", "Character Design"],
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    username: "@marcusrod",
    avatar: "/placeholder.svg?height=40&width=40",
    profession: "Music Producer",
    location: "Los Angeles, CA",
    connections: 189,
    tags: ["Electronic", "Hip Hop", "Sound Design"],
  },
  {
    id: 3,
    name: "Emma Thompson",
    username: "@emmathompson",
    avatar: "/placeholder.svg?height=40&width=40",
    profession: "Theater Director",
    location: "New York, NY",
    connections: 312,
    tags: ["Stage Direction", "Dramaturgy", "Production"],
  },
  // Add more mock users as needed
]

const categories = ["All Categories", "Visual Arts", "Music", "Theater & Film", "Dance", "Literature", "Photography"]

export default function NetworkPageClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Creative Network</h1>
        <p className="text-muted-foreground">Connect with talented artists and creative professionals</p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, profession, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Network Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockUsers.map((user) => (
          <Card key={user.id} className="overflow-hidden">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.username}</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm">
                  Connect
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                {user.profession}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {user.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users2 className="h-4 w-4" />
                {user.connections} connections
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap gap-2">
                {user.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

