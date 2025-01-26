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

export default function TimeboxGrid() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newTimebox, setNewTimebox] = useState({
    Name: "",
    Description: "",
    DateDue: "",
    CONTENT: "",
    SecretKey: "",
  })
  const [sortedTimeboxes, setSortedTimeboxes] = useState(timeboxData)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortType, setSortType] = useState("created")

  useEffect(() => {
    const filtered = timeboxData.filter((timebox) => timebox.Name.toLowerCase().includes(searchTerm.toLowerCase()))
    const sorted = [...filtered].sort((a, b) => {
      if (sortType === "created") {
        return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime()
      } else {
        return new Date(b.DateDue).getTime() - new Date(a.DateDue).getTime()
      }
    })
    setSortedTimeboxes(sorted)
  }, [searchTerm, sortType])

  const handleCreateTimebox = () => {
    // Here you would typically send this data to your backend
    console.log("New Timebox:", newTimebox)
    setIsCreateDialogOpen(false)
    setNewTimebox({ Name: "", Description: "", DateDue: "", CONTENT: "", SecretKey: "" })
  }

  return (
    <div className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-primary">Timeboxes</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search timeboxes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
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
                  <DropdownMenuRadioItem value="created">Sort by Date Created</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="due">Sort by Date Due</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTimeboxes.map((timebox) => (
            <TimeboxCard key={timebox.SecretKey} timebox={timebox} />
          ))}
        </div>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Timebox</DialogTitle>
            <DialogDescription>Fill in the details to create a new timebox.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newTimebox.Name}
                onChange={(e) => setNewTimebox({ ...newTimebox, Name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newTimebox.Description}
                onChange={(e) => setNewTimebox({ ...newTimebox, Description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date-due" className="text-right">
                Date Due
              </Label>
              <Input
                id="date-due"
                type="datetime-local"
                value={newTimebox.DateDue}
                onChange={(e) => setNewTimebox({ ...newTimebox, DateDue: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                CONTENT
              </Label>
              <Input
                id="content"
                value={newTimebox.CONTENT}
                onChange={(e) => setNewTimebox({ ...newTimebox, CONTENT: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="secret-key" className="text-right">
                Secret Key
              </Label>
              <Input
                id="secret-key"
                value={newTimebox.SecretKey}
                onChange={(e) => setNewTimebox({ ...newTimebox, SecretKey: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateTimebox}>Create Timebox</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

