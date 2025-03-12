"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from 'aws-amplify/auth'
import { ImageCarousel } from "@/components/image-carousel"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Pencil, Share2, ThumbsUp, MessageCircle, ImageIcon, CalendarDays, Briefcase } from "lucide-react"
import Image from "next/image"
import Link from "next/link" // Add Link import
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userInfo, setUserInfo] = useState<any>(null)

  const carouselImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/music.jpg-BgJDyXFgvaQre3Zea0RThxK3vWllwQ.jpeg",
      alt: "Musical instruments and artistic setup",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/acting.jpg-JrSlfv9YhD6NkPCqdVnpuShAlKcNp0.jpeg",
      alt: "Collection of movie posters",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/painting.jpg-3lfFkIHuCjeCMYmIjxaECF8C76m1px.jpeg",
      alt: "Art and paintings collection",
    },
  ]

  const filteredPosts = [
    {
      id: "art-gallery-1", // Added IDs for each post
      user: "Art Gallery Express",
      role: "Art Gallery",
      talent: "Visual Arts",
      time: "2h",
      content:
        "🎨 Calling all painters and visual artists! We're hosting a contemporary art exhibition next month. Theme: 'Urban Perspectives'. Submit your portfolio by clicking the link below. #ArtGallery #VisualArts",
      image: "/placeholder.svg",
      likes: 89,
      comments: 34,
    },
    {
      id: "symphony-1",
      user: "Symphony Orchestra",
      role: "Music Organization",
      talent: "Music",
      time: "3h",
      content:
        "🎵 Looking for experienced violinists and cellists for our upcoming concert series. Classical training required. Auditions next week. DM for details. #ClassicalMusic #Musicians",
      image: "/placeholder.svg",
      likes: 156,
      comments: 23,
    },
    {
      id: "theatre-1",
      user: "National Theatre Company",
      role: "Theatre Group",
      talent: "Performing Arts",
      time: "4h",
      content:
        "🎭 Casting call for our new production! Seeking theatre artists with experience in contemporary drama. Both lead and supporting roles available. #Theatre #Acting",
      image: "/placeholder.svg",
      likes: 124,
      comments: 45,
    },
    {
      id: "literary-1",
      user: "Literary Magazine",
      role: "Publishing House",
      talent: "Writing",
      time: "5h",
      content:
        "✍️ Open submissions for our quarterly issue! Looking for original poetry, short stories, and creative non-fiction. Theme: 'Urban Life'. #Writers #LiteraryArts",
      image: "/placeholder.svg",
      likes: 78,
      comments: 28,
    },
  ]

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const user = await getCurrentUser()
      console.log('User is authenticated:', user)
      setIsAuthenticated(true)
      setUserInfo(user)
      setIsLoading(false)
    } catch (error) {
      console.log('User is not authenticated:', error)
      setIsAuthenticated(false)
      setUserInfo(null)
      setIsLoading(false)
      router.push('/login')
    }
  }

  if (isLoading) {
    return <div>Loading...</div> // Or your loading component
  }

  if (!isAuthenticated) {
    return null // Let the router handle the redirect
  }

  return (
    <div className="space-y-6">
      {/* <section className="space-y-4">
        <h1 className="text-2xl font-bold text-white">Welcome to Artist Katta</h1>
        <p className="text-muted-foreground">
          Connect with fellow artists, discover opportunities, and showcase your work
        </p>
      </section> */}

<Card className="p-4 bg-[#1A1A1A] border-[#2f2f2f]">
        <div className="flex space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#1f1f1f] flex items-center justify-center">
            <Pencil className="h-5 w-5 text-white" />
          </div>
          <Input
            placeholder="Share your work, opportunities, or connect with fellow artists..."
            className="bg-[#1f1f1f] border-[#2f2f2f] text-white placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2 mt-3 ml-[52px]">
          <Button variant="ghost" size="sm" className="text-white hover:bg-[#1f1f1f]">
            <ImageIcon className="mr-2 h-4 w-4" />
            Photo/Video
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-[#1f1f1f]">
            <CalendarDays className="mr-2 h-4 w-4" />
            Event
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-[#1f1f1f]">
            <Briefcase className="mr-2 h-4 w-4" />
            Opportunity
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 bg-ink-light border-ink">
          <h2 className="text-lg font-semibold text-white mb-2">Latest Opportunities</h2>
          <p className="text-muted-foreground mb-4">Find your next creative project or collaboration</p>
          <Button className="w-full">Browse Jobs</Button>
        </Card>

        <Card className="p-6 bg-ink-light border-ink">
          <h2 className="text-lg font-semibold text-white mb-2">Featured Artists</h2>
          <p className="text-muted-foreground mb-4">Discover talented artists in your field</p>
          <Button className="w-full">Explore Agencies</Button>
        </Card>

        <Card className="p-6 bg-ink-light border-ink">
          <h2 className="text-lg font-semibold text-white mb-2">Community Events</h2>
          <p className="text-muted-foreground mb-4">Join workshops, meetups, and exhibitions</p>
          <Button className="w-full">View Events</Button>
        </Card>
      </div>



      <div className="relative h-48 rounded-xl overflow-hidden">
        <ImageCarousel images={carouselImages} />
      </div>

      <Card className="p-4 mb-4 bg-[#1A1A1A] border-[#2f2f2f]">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {["All", "Visual Arts", "Music", "Performing Arts", "Writing"].map((filter) => (
            <Button
              key={filter}
              variant={filter === "All" ? "default" : "outline"}
              size="sm"
              className={cn(
                "whitespace-nowrap",
                filter === "All"
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "border-[#2f2f2f] text-white hover:bg-[#1f1f1f]",
              )}
            >
              {filter}
            </Button>
          ))}
        </div>
      </Card>

      {filteredPosts.map((post) => (
        <Card key={post.id} className="p-4 space-y-4 bg-[#1A1A1A] border-[#2f2f2f]">
          <div className="flex items-center space-x-3">
            <Link href={`/profile/${post.id}`}>
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.user}
                width={40}
                height={40}
                className="rounded-full hover:opacity-80 transition-opacity"
              />
            </Link>
            <div>
              <Link
                href={`/profile/${post.id}`}
                className="font-semibold text-white hover:text-primary transition-colors"
              >
                {post.user}
              </Link>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{post.role}</span>
                <span className="mx-1">•</span>
                <span className="text-primary">{post.talent}</span>
                <span className="mx-1">•</span>
                <span>{post.time}</span>
              </div>
            </div>
          </div>
          <p className="text-white">{post.content}</p>
          <div className="flex items-center justify-between pt-2 border-t border-[#2f2f2f]">
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#1f1f1f]">
              <ThumbsUp className="mr-2 h-4 w-4" />
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#1f1f1f]">
              <MessageCircle className="mr-2 h-4 w-4" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#1f1f1f]">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

