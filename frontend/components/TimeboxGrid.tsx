"use client"
import { useState, useEffect } from "react"
import TimeboxCard from "@/components/TimeboxCard"
import timeboxData from "@/data/timeboxes.json"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, SortDesc, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function TimeboxGrid() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newTimebox, setNewTimebox] = useState({
    Name: "",
    Description: "",
    DateDue: "",
    Content: "",
    IconUrl: "",
  })
  const [sortedTimeboxes, setSortedTimeboxes] = useState(timeboxData)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortType, setSortType] = useState("unlock")
  const [error, setError] = useState("")
  const [secretKey, setSecretKey] = useState("")

  useEffect(() => {
    const filtered = timeboxData.filter((timebox) => timebox.Name.toLowerCase().includes(searchTerm.toLowerCase()))
    const sorted = [...filtered].sort((a, b) => {
      const now = new Date()
      const aDue = new Date(a.DateDue)
      const bDue = new Date(b.DateDue)
      const aUnlocked = aDue <= now
      const bUnlocked = bDue <= now

      if (sortType === "created") {
        return new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime()
      } else if (sortType === "unlock") {
        if (aUnlocked && !bUnlocked) return -1
        if (!aUnlocked && bUnlocked) return 1
        if (aUnlocked && bUnlocked) return bDue.getTime() - aDue.getTime()
        return aDue.getTime() - bDue.getTime()
      }
      return 0
    })
    setSortedTimeboxes(sorted)
  }, [searchTerm, sortType])

  const handleCreateTimebox = async () => {
    if (!newTimebox.Name || !newTimebox.Description || !newTimebox.DateDue || !newTimebox.Content) {
      setError("Please fill in all required fields")
      return
    }

    try {
      const response = await fetch("http://localhost:8000/createbox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTimebox),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      console.log("New Timebox created:", data)
      setSecretKey(data.secret_key) // Store the secret key
      setIsCreateDialogOpen(false)
      setNewTimebox({ Name: "", Description: "", DateDue: "", Content: "", IconUrl: "" })
      setError("")
      // You might want to refresh the timeboxes list here
    } catch (error) {
      console.error("Error creating timebox:", error)
      setError("Failed to create timebox. Please try again.")
    }
  }

  return (
    <div className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h2 className="text-3xl font-extrabold text-primary mr-4">Timeboxes</h2>
            <div className="relative max-w-md">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search timeboxes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Timebox
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <SortDesc className="mr-2 h-4 w-4 transform rotate-180" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup value={sortType} onValueChange={setSortType}>
                  <DropdownMenuRadioItem value="unlock">Sort by Unlock Date</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="created">Sort by Creation Date</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTimeboxes.map((timebox) => (
            <TimeboxCard key={timebox.id} timebox={timebox} />
          ))}
        </div>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Timebox</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new timebox. All fields except Icon Image URL are required.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name *
              </Label>
              <Input
                id="name"
                value={newTimebox.Name}
                onChange={(e) => setNewTimebox({ ...newTimebox, Name: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description *
              </Label>
              <Textarea
                id="description"
                value={newTimebox.Description}
                onChange={(e) => setNewTimebox({ ...newTimebox, Description: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date-due" className="text-right">
                Date Due *
              </Label>
              <Input
                id="date-due"
                type="datetime-local"
                value={newTimebox.DateDue}
                onChange={(e) => setNewTimebox({ ...newTimebox, DateDue: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content *
              </Label>
              <Textarea
                id="content"
                value={newTimebox.Content}
                onChange={(e) => setNewTimebox({ ...newTimebox, Content: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon-url" className="text-right">
                Icon Image URL
              </Label>
              <Input
                id="icon-url"
                value={newTimebox.IconUrl}
                onChange={(e) => setNewTimebox({ ...newTimebox, IconUrl: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <DialogFooter>
            <Button onClick={handleCreateTimebox}>Create Timebox</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={!!secretKey} onOpenChange={() => setSecretKey("")}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Timebox Created Successfully</DialogTitle>
            <DialogDescription>
              Here's your secret key. Please copy and store it safely. You won't be able to see it again.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Input value={secretKey} readOnly />
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(secretKey)
                setSecretKey("")
              }}
            >
              Copy and Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

