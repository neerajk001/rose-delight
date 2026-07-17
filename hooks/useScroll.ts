"use client"

import { useState, useEffect, useCallback } from "react"

export function useScroll(threshold = 20) {
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > threshold)
  }, [threshold])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return isScrolled
}
