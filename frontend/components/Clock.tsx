"use client"

import { useState, useEffect } from "react"

export default function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const seconds = time.getSeconds()
  const minutes = time.getMinutes()
  const hours = time.getHours() % 12

  return (
    <div className="relative w-64 h-64 mx-auto">
      <div className="absolute inset-0 rounded-full border-4 border-primary"></div>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-4 bg-primary"
          style={{
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-28px)`,
          }}
        ></div>
      ))}
      <div
        className="absolute top-1/2 left-1/2 w-1 h-16 bg-primary origin-bottom"
        style={{ transform: `translate(-50%, -100%) rotate(${hours * 30 + minutes / 2}deg)` }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-1 h-24 bg-primary origin-bottom"
        style={{ transform: `translate(-50%, -100%) rotate(${minutes * 6}deg)` }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-0.5 h-28 bg-secondary origin-bottom"
        style={{ transform: `translate(-50%, -100%) rotate(${seconds * 6}deg)` }}
      ></div>
    </div>
  )
}

