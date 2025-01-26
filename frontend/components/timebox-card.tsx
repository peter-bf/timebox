import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TimeboxCardProps {
  title: string
  description: string
  duration: string
}

export function TimeboxCard({ title, description, duration }: TimeboxCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{duration}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Start Timebox</Button>
      </CardFooter>
    </Card>
  )
}

