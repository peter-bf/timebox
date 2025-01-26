import { Button } from "@/components/ui/button"
import Clock from "@/components/Clock"

export default function HeroSection() {
  return (
    <div className="bg-background py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8">
          <h1 className="text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl">
            Manage Your Time with Timebox
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
            Store your valuable information securely on the Moonlight blockchain. Create time-locked "timeboxes" that
            can only be opened at a specific future date, ensuring your data remains confidential until the moment you
            choose.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row">
            <Button size="lg" className="mb-4 sm:mb-0 sm:mr-4">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <Clock />
        </div>
      </div>
    </div>
  )
}

