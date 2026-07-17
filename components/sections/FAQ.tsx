"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { faqs } from "@/lib/data"
import { cn } from "@/lib/utils"

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 lg:mb-18"
        >
          <span className="text-sm font-semibold text-brand tracking-wider uppercase">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Frequently{" "}
            <span className="text-gradient">Asked Questions</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
            Everything you need to know before diving in.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                className={cn(
                  "rounded-2xl border transition-colors duration-200",
                  isOpen
                    ? "border-brand/30 bg-brand/[0.02]"
                    : "border-blue-50 bg-white hover:border-blue-100"
                )}
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : i)
                  }
                  className="w-full flex items-center justify-between px-5 py-4 lg:px-6 lg:py-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm lg:text-base font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      className={cn(
                        "size-4 transition-colors",
                        isOpen ? "text-brand" : "text-muted-foreground"
                      )}
                    />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 lg:px-6 lg:pb-6 text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
