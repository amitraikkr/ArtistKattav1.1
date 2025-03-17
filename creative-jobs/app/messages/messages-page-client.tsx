"use client"

import { useState } from "react"
import { Search, Send, Smile, Paperclip } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Calendar, Users } from "lucide-react"

// Mock data for events
const events = [
  {
    id: 1,
    title: "Art Exhibition",
    organizer: "City Art Gallery",
    location: "New York, USA",
    date: "March 15, 2024",
    description: "Join us for an exhibition showcasing contemporary art from local artists.",
    featured: true,
    attendees: 150,
  },
  {
    id: 2,
    title: "Music Festival",
    organizer: "Harmony Events",
    location: "Los Angeles, USA",
    date: "April 20, 2024",
    description: "Experience live performances from top artists across various genres.",
    featured: false,
    attendees: 500,
  },
  {
    id: 3,
    title: "Photography Workshop",
    organizer: "PhotoPro",
    location: "Chicago, USA",
    date: "May 5, 2024",
    description: "Learn photography techniques from industry professionals.",
    featured: true,
    attendees: 75,
  },
]

export default function EventsPageClient() {
  return (
    <div className="container max-w-7xl py-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-white">Upcoming Events</h1>
        <p className="text-muted-foreground">
          Discover events, workshops, and festivals in the creative industry
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6">
        {/* Events List */}
        <div className="space-y-6">
          {/* Events */}
          <div className="space-y-4">
            {events.map((event) => (
              <Card
                key={event.id}
                className={cn(
                  "p-6 bg-ink-light border-ink hover:border-primary/50 transition-colors",
                  event.featured && "border-l-4 border-l-primary",
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-white hover:text-primary">
                          {event.title}
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          {event.organizer}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="border-ink text-white">
                        <MapPin className="mr-1 h-3 w-3" />
                        {event.location}
                      </Badge>
                      <Badge variant="outline" className="border-ink text-white">
                        <Calendar className="mr-1 h-3 w-3" />
                        {event.date}
                      </Badge>
                    </div>
                    <p className="mt-3 text-muted-foreground">{event.description}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-ink">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        {event.attendees} attendees
                      </div>
                      <div className="ml-auto">
                        <Button className="bg-primary hover:bg-primary/90">Join Event</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

