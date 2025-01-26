import NavBar from "@/components/NavBar"
import HeroSection from "@/components/HeroSection"
import TimeboxGrid from "@/components/TimeboxGrid"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <NavBar />
      <HeroSection />
      <TimeboxGrid />
    </main>
  )
}

