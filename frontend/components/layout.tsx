import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-primary">
              Timebox
            </Link>
            <div className="space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/about">About</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/contact">Contact</Link>
              </Button>
              <Button variant="default">Sign Up</Button>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 Timebox. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

