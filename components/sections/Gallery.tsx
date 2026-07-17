"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { galleryImages } from "@/lib/data"

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 lg:mb-18"
        >
          <span className="text-sm font-semibold text-brand tracking-wider uppercase">
            Gallery
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Moments at Our{" "}
            <span className="text-gradient">Academy</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
            Take a glimpse into our world-class facilities, training sessions,
            and the vibrant community that makes Rose Delight special.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {galleryImages.map((image, i) => (
            <motion.div
              key={image.alt}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl bg-slate-900 aspect-square ${
                i === 0 ? "md:col-span-2 md:row-span-2 md:aspect-square" : ""
              } ${i === 3 ? "md:col-span-2 md:aspect-[2/1]" : ""}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4 lg:p-5">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block rounded-full bg-white/20 backdrop-blur px-2.5 py-0.5 text-xs font-medium text-white mb-1.5">
                    {image.category}
                  </span>
                  <p className="text-sm font-semibold text-white tracking-wide leading-tight">
                    {image.alt}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 text-center"
        >
          <Button
            variant="outline"
            className="rounded-full border-brand/30 hover:bg-brand/5 text-brand h-11 px-8 text-sm font-semibold cursor-pointer"
          >
            View Full Gallery
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
