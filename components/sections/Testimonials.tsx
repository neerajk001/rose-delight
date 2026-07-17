"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { testimonials } from "@/lib/data"

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 lg:mb-18"
        >
          <span className="text-sm font-semibold text-brand tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Loved by{" "}
            <span className="text-gradient">Students & Parents</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
            Hear from our community about their transformative journey with Rose
            Delight Swimming Academy.
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="break-inside-avoid rounded-2xl border border-blue-100 bg-white p-6 hover:shadow-lg hover:shadow-blue-100/50 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Quote className="size-6 text-brand/20 mb-3" />

              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="size-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="mt-5 pt-5 border-t border-blue-50 flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
