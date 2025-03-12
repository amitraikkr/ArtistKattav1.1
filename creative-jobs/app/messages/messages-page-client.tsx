"use client"

import { useState } from "react"
import { Search, Send, Smile, Paperclip } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: "Sarah Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Would love to collaborate on the new project!",
    timestamp: "2m ago",
    unread: true,
    online: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The exhibition details look great",
    timestamp: "1h ago",
    unread: false,
    online: true,
  },
  {
    id: 3,
    name: "Emma Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the feedback on my portfolio",
    timestamp: "3h ago",
    unread: false,
    online: false,
  },
  // Add more conversations as needed
]

// Mock data for messages
const messages = [
  {
    id: 1,
    senderId: 1,
    content: "Hi! I saw your recent work and it's amazing!",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    senderId: "me",
    content: "Thank you! I really appreciate that.",
    timestamp: "10:32 AM",
  },
  {
    id: 3,
    senderId: 1,
    content: "Would you be interested in collaborating on an upcoming project?",
    timestamp: "10:33 AM",
  },
  {
    id: 4,
    senderId: "me",
    content: "I'd love to hear more about it! What kind of project do you have in mind?",
    timestamp: "10:35 AM",
  },
]

export default function MessagesPageClient() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messageInput, setMessageInput] = useState("")

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Conversations Sidebar */}
      <div className="w-full max-w-xs border-r">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages" className="pl-8" />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={cn(
                "w-full p-4 flex items-start space-x-4 hover:bg-accent transition-colors",
                selectedConversation?.id === conversation.id && "bg-accent",
              )}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={conversation.avatar} alt={conversation.name} />
                  <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                </Avatar>
                {conversation.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-2 border-background rounded-full bg-green-500" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{conversation.name}</h3>
                  <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
              </div>
              {conversation.unread && <div className="w-2 h-2 bg-primary rounded-full" />}
            </button>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center space-x-4">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                  <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                </Avatar>
                {selectedConversation.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-2 border-background rounded-full bg-green-500" />
                )}
              </div>
              <div>
                <h2 className="font-semibold">{selectedConversation.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedConversation.online ? "Online" : "Offline"}</p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex", message.senderId === "me" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] rounded-lg p-4",
                        message.senderId === "me" ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      <p>{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  )
}

