import { TimeboxCard } from "./timebox-card"

const timeboxes = [
  { title: "Deep Work", description: "Focus on important tasks without distractions", duration: "2 hours" },
  { title: "Quick Review", description: "Briefly review your progress and plan next steps", duration: "15 minutes" },
  { title: "Learning Session", description: "Dedicate time to learn something new", duration: "1 hour" },
  { title: "Break Time", description: "Take a short break to recharge", duration: "10 minutes" },
  { title: "Team Meeting", description: "Collaborate with your team on project updates", duration: "30 minutes" },
  { title: "Exercise", description: "Stay healthy with a quick workout", duration: "45 minutes" },
]

export function TimeboxGrid() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Timebox</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {timeboxes.map((timebox, index) => (
            <TimeboxCard key={index} {...timebox} />
          ))}
        </div>
      </div>
    </section>
  )
}

