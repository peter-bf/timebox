import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Manage Your Time with <span className="text-primary">Timebox</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
          Boost your productivity and achieve your goals with our innovative timeboxing solution.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}

