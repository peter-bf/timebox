import { Layout } from "@/components/layout"
import { Hero } from "@/components/hero"
import { TimeboxGrid } from "@/components/timebox-grid"

export default function Home() {
  return (
    <Layout>
      <Hero />
      <TimeboxGrid />
    </Layout>
  )
}

