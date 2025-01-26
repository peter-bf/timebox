import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import { format } from "date-fns"
import { Lock, Copy } from "lucide-react"

interface Timebox {
  Name: string
  Timestamp: string
  DateDue: string
  Description: string
  SecretKey: string
  CONTENT: string
  IconUrl: string
  BlockchainHash: string
}

export default function TimeboxCard({ timebox }: { timebox: Timebox }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isHashDialogOpen, setIsHashDialogOpen] = useState(false)
  const [secretKeyInput, setSecretKeyInput] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [countdown, setCountdown] = useState("")

  const isLocked = new Date(timebox.DateDue) > new Date()

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const due = new Date(timebox.DateDue)
      const diff = due.getTime() - now.getTime()

      if (diff <= 0) {
        clearInterval(timer)
        setCountdown("Unlocked")
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        setCountdown(`${days}d ${hours}h ${minutes}m`)
      }
    }, 60000)

    return () => clearInterval(timer)
  }, [timebox.DateDue])

  const handleOpen = () => {
    setIsDialogOpen(true)
  }

  const handleUnlock = () => {
    if (secretKeyInput === timebox.SecretKey) {
      setIsUnlocked(true)
    }
    setIsDialogOpen(false)
    setSecretKeyInput("")
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(timebox.BlockchainHash)
      alert("Hash copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-2 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full border border-gray-300 flex items-center justify-center">
          <Image
            src={timebox.IconUrl || "https://github.com/github.png"}
            alt={timebox.Name}
            width={72}
            height={72}
            className="rounded-full"
          />
        </div>
        <CardTitle className="mt-2">{timebox.Name}</CardTitle>
        <CardDescription>{format(new Date(timebox.Timestamp), "MMMM do yyyy")}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{timebox.Description}</p>
        <p className="text-sm font-semibold">Unlocks on: {format(new Date(timebox.DateDue), "MMMM do yyyy")}</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p
                className="text-xs text-muted-foreground mt-2 truncate cursor-pointer"
                onClick={() => setIsHashDialogOpen(true)}
              >
                Hash: {timebox.BlockchainHash}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to view full hash</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="mt-4">
          <Button
            variant="outline"
            className={`w-full h-10 ${isLocked ? "bg-gray-200 text-gray-600" : ""}`}
            onClick={handleOpen}
            disabled={isLocked}
          >
            <Lock className="w-4 h-4 mr-2" />
            {isLocked ? `Locked (${countdown})` : "Open"}
          </Button>
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Secret Key</DialogTitle>
            <DialogDescription>Please enter the secret key to unlock this timebox.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="secret-key" className="text-right">
                Secret Key
              </Label>
              <Input
                id="secret-key"
                value={secretKeyInput}
                onChange={(e) => setSecretKeyInput(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUnlock}>Unlock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isHashDialogOpen} onOpenChange={setIsHashDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Blockchain Hash</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <p className="text-sm break-all">{timebox.BlockchainHash}</p>
          </div>
          <DialogFooter>
            <Button onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-2" />
              Copy to Clipboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

