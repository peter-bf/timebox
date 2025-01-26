import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NavBar() {
  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">Timebox</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="default">Create Timebox</Button>
            <Button variant="ghost" className="text-primary hover:text-primary-foreground hover:bg-primary">
              Sign In
            </Button>
            <Button variant="outline" className="text-primary hover:text-primary-foreground hover:bg-primary">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

