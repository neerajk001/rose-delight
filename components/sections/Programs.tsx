"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Clock, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { programs } from "@/lib/data"

function ProgramCard({
  program,
  index,
}: {
  program: (typeof programs)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col rounded-2xl border border-blue-100 bg-white overflow-hidden hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-300"
    >
      <div
        className={`h-36 bg-gradient-to-br ${program.color} relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(1_0_0/0.2)_0%,_transparent_60%)]" />
        <program.icon className="size-10 text-white absolute bottom-4 right-4 opacity-80" />
      </div>

      <div className="flex flex-col flex-1 p-5 lg:p-6">
        <h3 className="text-lg font-bold text-foreground tracking-tight">
          {program.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">
          {program.description}
        </p>

        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-blue-50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            {program.duration}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="size-3.5" />
            {program.ageGroup}
          </div>
        </div>

        <div className="mt-4">
          <Button
            className="w-full bg-brand hover:bg-brand-dark text-white rounded-xl h-10 text-sm font-semibold cursor-pointer group/btn"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("open-admission", {
                  detail: { program: program.title },
                })
              )
            }}
          >
            Join Program
            <ArrowRight className="size-4 ml-1 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export function Programs() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="programs" className="py-20 lg:py-28 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 lg:mb-18"
        >
          <span className="text-sm font-semibold text-brand tracking-wider uppercase">
            Our Programs
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Training Programs for{" "}
            <span className="text-gradient">Every Level</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
            From first-time swimmers to competitive athletes, we offer structured
            programs tailored to every age and skill level.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, i) => (
            <ProgramCard key={program.title} program={program} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
