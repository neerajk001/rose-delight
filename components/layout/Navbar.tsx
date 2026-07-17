"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useScroll } from "@/hooks/useScroll"
import { siteConfig, navLinks } from "@/lib/data"
import { cn } from "@/lib/utils"

export function Navbar() {
  const isScrolled = useScroll(20)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-blue-100"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 lg:h-20">
        <Link
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick("#home")
          }}
          className="flex items-center gap-2.5 shrink-0"
        >
          <div className="relative size-9 lg:size-11 overflow-hidden rounded-full border border-blue-200/50 shadow-sm bg-white">
            <Image
              src="/images/logo.png"
              alt="Rose Delight Logo"
              fill
              sizes="44px"
              className="object-cover scale-[1.05]"
            />
          </div>
          <span
            className={cn(
              "text-lg lg:text-xl font-bold tracking-tight transition-colors duration-300",
              isScrolled || mobileOpen ? "text-foreground" : "text-white"
            )}
          >
            Rose Delight
          </span>
        </Link>
 
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                isScrolled
                  ? "text-muted-foreground hover:text-brand"
                  : "text-white/80 hover:text-white"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>
 
        <div className="hidden lg:flex items-center gap-3">
          <Button
            className={cn(
              "rounded-full px-5 h-9 text-sm font-semibold cursor-pointer transition-all duration-300",
              isScrolled
                ? "bg-brand hover:bg-brand-dark text-white"
                : "bg-white text-brand-dark hover:bg-white/90 shadow-sm"
            )}
            onClick={() => window.dispatchEvent(new CustomEvent("open-admission"))}
          >
            Join Now
          </Button>
        </div>
 
        <button
          className={cn(
            "lg:hidden p-2 rounded-lg transition-colors cursor-pointer",
            isScrolled || mobileOpen ? "hover:bg-muted" : "hover:bg-white/10"
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className={cn("size-5 transition-colors duration-300", isScrolled || mobileOpen ? "text-foreground" : "text-white")} />
          ) : (
            <Menu className={cn("size-5 transition-colors duration-300", isScrolled || mobileOpen ? "text-foreground" : "text-white")} />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-blue-100"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-brand hover:bg-blue-50 rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Button
                className="bg-brand hover:bg-brand-dark text-white rounded-full px-5 h-10 mt-2 text-sm font-semibold w-full cursor-pointer"
                onClick={() => {
                  setMobileOpen(false)
                  window.dispatchEvent(new CustomEvent("open-admission"))
                }}
              >
                Join Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
