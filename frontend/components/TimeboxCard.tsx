"use client"

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from "next/image"
import { format } from "date-fns"
import { Lock, Copy, Check, AlertCircle } from "lucide-react"

interface Timebox {
  id: string
  Name: string
  Timestamp: string
  DateDue: string
  Description: string
  SecretKey: string
  Content: string
  IconUrl: string
  BlockchainHash: string
}

export default function TimeboxCard({ timebox }: { timebox: Timebox }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isHashDialogOpen, setIsHashDialogOpen] = useState(false)
  const [isContentDialogOpen, setIsContentDialogOpen] = useState(false)
  const [secretKeyInput, setSecretKeyInput] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [countdown, setCountdown] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const [decryptedContent, setDecryptedContent] = useState("")
  const [error, setError] = useState("")

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

  const handleUnlock = async () => {
    if (!secretKeyInput) {
      setError("Secret key is required")
      return
    }

    try {
      const response = await fetch("http://localhost:3000/decryptbox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: timebox.id,
          secretKey: secretKeyInput,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to decrypt timebox")
      }

      const data = await response.text()
      setDecryptedContent(data)
      setIsUnlocked(true)
      setIsDialogOpen(false)
      setIsContentDialogOpen(true)
      setSecretKeyInput("")
      setError("")
    } catch (err) {
      setError("Failed to decrypt timebox. Please check your secret key and try again.")
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
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
      <CardContent className="flex flex-col justify-between" style={{ minHeight: "180px" }}>
        <div>
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
        </div>
        <div className="mt-4">
          <Button
            variant={isLocked ? "outline" : "default"}
            className={`w-full h-10 ${!isLocked && "bg-green-500 hover:bg-green-600"}`}
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
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
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
            <Button onClick={() => copyToClipboard(timebox.BlockchainHash)}>
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isContentDialogOpen} onOpenChange={setIsContentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Timebox Content</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <p className="text-sm break-all">{decryptedContent}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => copyToClipboard(decryptedContent)} className="mr-2">
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </>
              )}
            </Button>
            <Button onClick={() => setIsContentDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

