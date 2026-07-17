"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Briefcase, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { coaches } from "@/lib/data"

export function Coaches() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="coaches" className="py-20 lg:py-28 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 lg:mb-18"
        >
          <span className="text-sm font-semibold text-brand tracking-wider uppercase">
            Our Coaches
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Learn from the{" "}
            <span className="text-gradient">Best</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
            Our team of internationally certified coaches bring decades of
            combined experience to help you achieve your swimming goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {coaches.map((coach, i) => (
            <motion.div
              key={coach.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className="group relative flex flex-col rounded-2xl border border-blue-100 bg-white overflow-hidden hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-brand via-brand-dark to-blue-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(1_0_0/0.15)_0%,_transparent_60%)]" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white">
                    <div className="text-xs font-medium text-white/70 uppercase tracking-wider">
                      {coach.role}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-5 lg:p-6">
                <h3 className="text-lg font-bold text-foreground tracking-tight">
                  {coach.name}
                </h3>

                <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                  <Briefcase className="size-3.5" />
                  <span>{coach.experience} experience</span>
                </div>

                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">
                  <Award className="size-3" />
                  {coach.specialization}
                </div>

                <ul className="mt-4 space-y-2 flex-1">
                  {coach.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <Star className="size-3 mt-0.5 shrink-0 text-amber-400" />
                      {achievement}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="outline"
                  className="mt-5 w-full rounded-xl border-brand/20 hover:bg-brand/5 hover:border-brand/40 text-brand text-sm font-semibold cursor-pointer transition-all"
                  onClick={() => {
                    let targetProg = "Adult Beginner"
                    if (coach.specialization.toLowerCase().includes("competitive")) targetProg = "Advanced"
                    if (coach.specialization.toLowerCase().includes("kids")) targetProg = "Kids Swimming"
                    if (coach.specialization.toLowerCase().includes("stroke")) targetProg = "Intermediate"
                    window.dispatchEvent(
                      new CustomEvent("open-admission", {
                        detail: { program: targetProg },
                      })
                    )
                  }}
                >
                  Know More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
