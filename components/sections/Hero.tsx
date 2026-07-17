"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Phone, ChevronDown, Users, Award, Clock, Heart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { siteConfig, heroStats } from "@/lib/data"

function getStatIcon(label: string) {
  switch (label) {
    case "Students Trained":
      return <Users className="size-4 text-cyan-400" />
    case "Professional Coaches":
      return <Award className="size-4 text-cyan-400" />
    case "Years Experience":
      return <Clock className="size-4 text-cyan-400" />
    case "Happy Students":
      return <Heart className="size-4 text-rose-400" />
    default:
      return null
  }
}

function AnimatedStat({
  value,
  label,
  delay,
}: {
  value: string
  label: string
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const numericPart = parseInt(value.replace(/\D/g, ""))
  const suffix = value.replace(/[0-9]/g, "")
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const steps = 40
    const increment = numericPart / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numericPart) {
        setCount(numericPart)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, numericPart])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 text-center hover:border-white/20 hover:bg-slate-950/60 hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="flex items-center justify-center gap-2">
        {getStatIcon(label)}
        <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">
          {count}
          {suffix}
        </div>
      </div>
      <div className="text-xs lg:text-sm text-white/60 mt-1 font-medium tracking-wide uppercase">
        {label}
      </div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Background Image with optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Rose Delight Swimming Academy Pool"
          fill
          priority
          className="object-cover object-center pointer-events-none opacity-80"
        />
        {/* Dark Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/35 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(2,6,23,0.5)_85%)]" />
      </div>

      {/* Decorative Light Rays or Refractions */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl mx-auto pt-24 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md px-4 py-1.5 text-xs lg:text-sm text-cyan-200 mb-8 shadow-[0_0_15px_rgba(6,182,212,0.15)] overflow-hidden group"
        >
          <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-medium">Now enrolling for Summer 2026</span>
          {/* Subtle shine sweep */}
          <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
        >
          Learn Swimming
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-white bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(34,211,238,0.2)]">
            in Just 15 Sessions
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed font-normal"
        >
          Mumbai&apos;s premier swimming academy. Expert certified trainers maintaining a
          strict 5:1 ratio and max 15 students per batch for safety and excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 z-20"
        >
          <Button
            className="bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 rounded-full px-8 h-12 text-base font-bold shadow-lg shadow-cyan-500/20 cursor-pointer hover:scale-[1.03] transition-all duration-300 active:scale-[0.98]"
            onClick={() => window.dispatchEvent(new CustomEvent("open-admission"))}
          >
            Join Batch
          </Button>
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white h-12 px-8 text-base font-semibold transition-all duration-300 hover:border-white/40 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            <Phone className="size-4" />
            Call Academy
          </a>
        </motion.div>
      </div>

      <div className="relative z-10 mt-16 lg:mt-24 mb-14 grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-6 max-w-4xl w-full">
        {heroStats.map((stat, i) => (
          <AnimatedStat
            key={stat.label}
            value={stat.value}
            label={stat.label}
            delay={0.6 + i * 0.1}
          />
        ))}
      </div>

      {/* Smooth Transition Wave matching the programs background */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-10 pointer-events-none">
        <svg
          className="w-full h-[60px] sm:h-[80px] lg:h-[120px]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#f8fafc"
            fillOpacity="1"
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          />
        </svg>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors cursor-pointer z-20"
        onClick={() => {
          document
            .querySelector("#programs")
            ?.scrollIntoView({ behavior: "smooth" })
        }}
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="size-6" />
        </motion.div>
      </motion.button>
    </section>
  )
}
