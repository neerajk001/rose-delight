"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { contactInfo, siteConfig } from "@/lib/data"

export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 lg:mb-18"
        >
          <span className="text-sm font-semibold text-brand tracking-wider uppercase">
            Contact
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Get in{" "}
            <span className="text-gradient">Touch</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
            Have questions or want to visit? Reach out and we&apos;ll get back to
            you right away.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-blue-100 bg-white overflow-hidden h-64 lg:h-full min-h-[280px] flex items-center justify-center"
          >
            <div className="text-center p-6">
              <div className="size-16 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="size-8 text-brand"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Google Maps
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {siteConfig.address}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-blue-100 bg-white p-5 flex items-center gap-4 hover:shadow-md hover:shadow-blue-100/50 transition-all duration-200"
              >
                <div className="size-11 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                  <item.icon className="size-5 text-brand" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.label === "WhatsApp" ? "_blank" : undefined
                      }
                      rel={
                        item.label === "WhatsApp"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-sm font-medium text-foreground hover:text-brand transition-colors truncate block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-foreground truncate block">
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-blue-100 bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                  Working Hours
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Weekdays</span>
                <span className="font-medium text-foreground">
                  {siteConfig.workingHours.weekdays}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-muted-foreground">Weekends</span>
                <span className="font-medium text-foreground">
                  {siteConfig.workingHours.weekends}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
