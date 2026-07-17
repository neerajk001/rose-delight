import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { Programs } from "@/components/sections/Programs"
import { WhyChooseUs } from "@/components/sections/WhyChooseUs"
import { Coaches } from "@/components/sections/Coaches"
import { Gallery } from "@/components/sections/Gallery"
import { Schedule } from "@/components/sections/Schedule"
import { Testimonials } from "@/components/sections/Testimonials"
import { JoinCTA } from "@/components/sections/JoinCTA"
import { FAQ } from "@/components/sections/FAQ"
import { Contact } from "@/components/sections/Contact"
import { AdmissionModal } from "@/components/ui/AdmissionModal"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Programs />
        <WhyChooseUs />
        <Coaches />
        <Gallery />
        <Schedule />
        <Testimonials />
        <JoinCTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <AdmissionModal />

      {/* Floating Client Preview Action Badge */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <Link
          href="/admin-demo"
          className="flex items-center gap-2 rounded-full bg-slate-900/90 hover:bg-slate-900 border border-white/10 hover:border-cyan-500/30 text-white hover:text-cyan-400 px-4 py-2.5 text-xs font-bold shadow-lg shadow-black/20 backdrop-blur transition-all duration-300"
        >
          <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
          Admin Dashboard Demo ↗
        </Link>
      </div>
    </>
  )
}
