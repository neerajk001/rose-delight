"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Clock, Sun, Moon, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { schedule } from "@/lib/data"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "morning" as const, label: "Morning", icon: Sun },
  { id: "evening" as const, label: "Evening", icon: Moon },
  { id: "weekend" as const, label: "Weekend", icon: CalendarDays },
]

export function Schedule() {
  const [active, setActive] = useState<"morning" | "evening" | "weekend">(
    "morning"
  )
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="schedule" className="py-20 lg:py-28 bg-slate-50/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
        >
          <span className="text-sm font-semibold text-brand tracking-wider uppercase">
            Schedule
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Weekly{" "}
            <span className="text-gradient">Timetable</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
            Flexible batches designed to fit your routine. Choose from morning,
            evening, or weekend sessions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-blue-100 bg-white shadow-sm overflow-hidden"
        >
          <div className="flex border-b border-blue-50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all cursor-pointer",
                  active === tab.id
                    ? "text-brand border-b-2 border-brand bg-brand/[0.03]"
                    : "text-muted-foreground hover:text-foreground hover:bg-slate-50"
                )}
              >
                <tab.icon className="size-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-50">
                    <th className="text-left pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Day
                    </th>
                    <th className="text-left pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Timing
                    </th>
                    <th className="text-right pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Level
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schedule[active].map((row, i) => (
                    <motion.tr
                      key={row.day + row.time}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                      className="border-b border-blue-50/50 last:border-0"
                    >
                      <td className="py-3.5 pr-4 font-medium text-foreground whitespace-nowrap">
                        {row.day}
                      </td>
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="size-3.5 text-brand" />
                          {row.time}
                        </div>
                      </td>
                      <td className="py-3.5 text-right">
                        <span className="inline-block rounded-full bg-brand/10 px-3 py-0.5 text-xs font-medium text-brand">
                          {row.level}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Button
            variant="outline"
            className="rounded-full border-brand/30 hover:bg-brand/5 text-brand h-11 px-8 text-sm font-semibold cursor-pointer"
          >
            View Full Schedule
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
