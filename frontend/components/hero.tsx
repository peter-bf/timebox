'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import useMouseMove from "@/hooks/use-mouse-move";

const Background = ({ children }: { children: React.ReactNode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useMouseMove();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 -z-50">
        <div className="sticky left-0 top-0 h-screen w-screen overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="dotted-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="black" />
              </pattern>
              <radialGradient id="cursor-gradient" cx="0.5" cy="0.5" r="0.3" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="black" stopOpacity="0" />
              </radialGradient>
              <mask id="dots-mask">
                <rect width="100%" height="100%" fill="white" />
                <rect width="100%" height="100%" fill="url(#dotted-pattern)" />
                <circle cx={mousePosition.x} cy={mousePosition.y} r="80" fill="url(#cursor-gradient)" />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="hsl(var(--background))" mask="url(#dots-mask)" />
          </svg>
        </div>
      </div>
      {children}
    </>
  );
};

const Hero = () => {
  const [time, setTime] = useState(new Date())
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourRotation = (hours * 30) + (minutes / 2);
  const minuteRotation = minutes * 6;
  const secondRotation = seconds * 6;

  return (
    <Background>
      <div className="relative overflow-hidden w-full bg-gray-900">
        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 z-10">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
            <p className="text-xl mb-6">Discover amazing projects and connect with developers from around the world.</p>
            <Button
              asChild
              variant="outline"
              className="bg-transparent border border-white hover:bg-white/10 hover:text-white transition-all duration-300 relative z-0 text-lg px-6 py-3"
            >
              <Link href="/search">
                Get Started
              </Link>
            </Button>
          </div>
          <div className="md:w-1/2 relative h-64 flex justify-center items-center">
            <svg className="w-64 h-64 z-10" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="2" fill="none" />
              <line x1="50" y1="50" x2="50" y2="30" stroke="white" strokeWidth="3" strokeLinecap="round" transform={`rotate(${hourRotation}, 50, 50)`} />
              <line x1="50" y1="50" x2="50" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" transform={`rotate(${minuteRotation}, 50, 50)`} />
              <line x1="50" y1="50" x2="50" y2="15" stroke="red" strokeWidth="1" strokeLinecap="round" transform={`rotate(${secondRotation}, 50, 50)`} />
              <circle cx="50" cy="50" r="2" fill="white" />
            </svg>
          </div>
        </div>
        <div className="w-full h-px bg-white/10"></div>
      </div>
    </Background>
  )
}

export { Hero }

