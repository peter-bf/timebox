import NavBar from "@/components/NavBar"
import HeroSection from "@/components/HeroSection"
import TimeboxGrid from "@/components/TimeboxGrid"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="px-2 sm:px-4">
        <NavBar />
        <HeroSection />
        <TimeboxGrid />
      </div>
    </main>
  )
}

