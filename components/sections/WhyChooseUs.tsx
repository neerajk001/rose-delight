"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { features } from "@/lib/data"

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 lg:mb-18"
        >
          <span className="text-sm font-semibold text-brand tracking-wider uppercase">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            What Makes Us{" "}
            <span className="text-gradient">Different</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
            Every aspect of our academy is designed to provide the best learning
            experience in a safe and professional environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="group glass rounded-2xl p-6 lg:p-7 hover:bg-white/90 hover:shadow-lg hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="size-12 rounded-xl bg-gradient-to-br from-brand-light/20 to-brand/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="size-6 text-brand" />
              </div>
              <h3 className="text-base font-bold text-foreground tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
