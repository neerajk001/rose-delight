"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/data"

export function JoinCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="join" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-brand-dark to-blue-900 p-8 sm:p-12 lg:p-16"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(1_0_0/0.15)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.746_0.151_231.2/0.2)_0%,_transparent_50%)]" />

          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                fill="white"
                d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.5,81.4,29,72.6,41.3C63.7,53.6,51.6,63.7,38.2,70.8C24.7,77.9,9.9,82,-4.4,79.2C-18.7,76.5,-33.1,66.9,-45.6,56.1C-58.1,45.3,-68.7,33.3,-75.3,19.1C-81.9,4.9,-84.5,-11.4,-79.2,-25.8C-73.9,-40.2,-60.7,-52.6,-46.4,-60C-32.1,-67.4,-16.1,-69.8,-0.5,-69C15.2,-68.2,30.5,-64.2,44.7,-76.4Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              Ready to Start Your<br />
              Swimming Journey?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 text-white/70 text-base lg:text-lg max-w-lg mx-auto"
            >
              Join 5,000+ students who have transformed their swimming at Rose
              Delight. First trial session is on us.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                className="bg-white hover:bg-white/90 text-brand-dark rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-black/10 cursor-pointer group/btn"
                onClick={() => window.dispatchEvent(new CustomEvent("open-admission"))}
              >
                Join Batch
                <ArrowRight className="size-4 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white h-12 px-8 text-base font-semibold transition-all cursor-pointer backdrop-blur"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
