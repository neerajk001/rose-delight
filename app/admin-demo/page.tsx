"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Award,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Check,
  X,
  Eye,
  Trash2,
  Settings as SettingsIcon,
  LayoutDashboard,
  UsersRound,
  ChevronRight,
  ShieldAlert,
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  User,
  HeartPulse,
  HelpCircle,
  FolderHeart,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Enquiry {
  id: string
  name: string
  phone: string
  email: string
  age: string
  program: string
  batch: string
  experience: string
  medicalConditions: string
  emergencyContact: string
  coachNotes: string
  status: "New" | "Contacted" | "Joined" | "Rejected"
  submittedAt: string
}

// Generate dynamic dates relative to current time
const getPastDateString = (daysAgo: number, hoursAgo = 0) => {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  d.setHours(d.getHours() - hoursAgo)
  return d.toISOString()
}

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: "RD-2026-001",
    name: "Ramesh Patel",
    phone: "9876543201",
    email: "ramesh.patel@gmail.com",
    age: "12",
    program: "Kids Swimming",
    batch: "Morning",
    experience: "Beginner",
    medicalConditions: "None",
    emergencyContact: "Suresh Patel (Father) - 9876543299",
    coachNotes: "Very excited to learn. Needs friendly guidance.",
    status: "Joined",
    submittedAt: getPastDateString(0, 2), // 2 hours ago
  },
  {
    id: "RD-2026-002",
    name: "Priya Nair",
    phone: "9812345670",
    email: "priya.nair@yahoo.com",
    age: "28",
    program: "Adult Beginner",
    batch: "Evening",
    experience: "Never Swam",
    medicalConditions: "Slight skin allergy to chlorine",
    emergencyContact: "Rajesh Nair (Husband) - 9812345699",
    coachNotes: "Has mild water anxiety. Start slowly.",
    status: "Contacted",
    submittedAt: getPastDateString(0, 5), // 5 hours ago
  },
  {
    id: "RD-2026-003",
    name: "Amit Sharma",
    phone: "9988776655",
    email: "amit.sharma@outlook.com",
    age: "34",
    program: "Private Coaching",
    batch: "Weekend",
    experience: "Intermediate",
    medicalConditions: "Asthma (carries inhaler)",
    emergencyContact: "Kiran Sharma (Wife) - 9988776611",
    coachNotes: "Wants stroke correction for freestyle & butterfly.",
    status: "New",
    submittedAt: getPastDateString(0, 7), // 7 hours ago
  },
  {
    id: "RD-2026-004",
    name: "Rohan Malhotra",
    phone: "9822334455",
    email: "",
    age: "8",
    program: "Kids Swimming",
    batch: "Evening",
    experience: "Beginner",
    medicalConditions: "None",
    emergencyContact: "Sunita Malhotra (Mother) - 9822334411",
    coachNotes: "Has done basic floating lessons earlier.",
    status: "New",
    submittedAt: getPastDateString(1, 1), // 1 day, 1 hour ago
  },
  {
    id: "RD-2026-005",
    name: "Sonal Verma",
    phone: "9911223344",
    email: "sonal.v@gmail.com",
    age: "22",
    program: "Intermediate",
    batch: "Morning",
    experience: "Beginner",
    medicalConditions: "None",
    emergencyContact: "Ravi Verma (Father) - 9911223388",
    coachNotes: "Wants to build stamina and learn backstroke.",
    status: "Joined",
    submittedAt: getPastDateString(1, 4),
  },
  {
    id: "RD-2026-006",
    name: "Vikram Singh",
    phone: "9833445566",
    email: "vikram.singh@gmail.com",
    age: "16",
    program: "Advanced",
    batch: "Evening",
    experience: "Advanced",
    medicalConditions: "None",
    emergencyContact: "Tej Singh (Father) - 9833445511",
    coachNotes: "Competitive swimmer. Preparing for state trials.",
    status: "Joined",
    submittedAt: getPastDateString(2, 2),
  },
  {
    id: "RD-2026-007",
    name: "Neha Gupta",
    phone: "9844556677",
    email: "neha.gupta@yahoo.com",
    age: "25",
    program: "Adult Beginner",
    batch: "Morning",
    experience: "Never Swam",
    medicalConditions: "None",
    emergencyContact: "Aman Gupta (Brother) - 9844556611",
    coachNotes: "Wants to learn floating and basic freestyle.",
    status: "Rejected",
    submittedAt: getPastDateString(3, 5),
  },
  {
    id: "RD-2026-008",
    name: "Kabir Shah",
    phone: "9855667788",
    email: "",
    age: "7",
    program: "Kids Swimming",
    batch: "Weekend",
    experience: "Never Swam",
    emergencyContact: "Neha Shah (Mother) - 9855667711",
    medicalConditions: "None",
    coachNotes: "Needs support. Scared of deep end.",
    status: "Contacted",
    submittedAt: getPastDateString(4, 1),
  },
  {
    id: "RD-2026-009",
    name: "Deepika Rao",
    phone: "9866778899",
    email: "deepika.rao@outlook.com",
    age: "31",
    program: "Intermediate",
    batch: "Evening",
    experience: "Beginner",
    medicalConditions: "None",
    emergencyContact: "Mohan Rao (Husband) - 9866778811",
    coachNotes: "Swims slowly. Wants stroke refinement.",
    status: "Joined",
    submittedAt: getPastDateString(5, 3),
  },
  {
    id: "RD-2026-010",
    name: "Aditya Joshi",
    phone: "9877889900",
    email: "aditya.j@gmail.com",
    age: "14",
    program: "Advanced",
    batch: "Morning",
    experience: "Intermediate",
    medicalConditions: "None",
    emergencyContact: "Sanjay Joshi (Father) - 9877889911",
    coachNotes: "Wants to master breaststroke and flip turns.",
    status: "Contacted",
    submittedAt: getPastDateString(5, 8),
  },
  {
    id: "RD-2026-011",
    name: "Sneha Kulkarni",
    phone: "9888990011",
    email: "sneha.k@gmail.com",
    age: "29",
    program: "Private Coaching",
    batch: "Morning",
    experience: "Beginner",
    medicalConditions: "None",
    emergencyContact: "Anil Kulkarni (Father) - 9888990055",
    coachNotes: "Requires ladies batches or private coaching.",
    status: "New",
    submittedAt: getPastDateString(6, 2),
  },
  {
    id: "RD-2026-012",
    name: "Yash Deshmukh",
    phone: "9899001122",
    email: "",
    age: "10",
    program: "Kids Swimming",
    batch: "Evening",
    experience: "Intermediate",
    medicalConditions: "None",
    emergencyContact: "Meera Deshmukh (Mother) - 9899001155",
    coachNotes: "Fast learner. Enjoys diving.",
    status: "Joined",
    submittedAt: getPastDateString(7, 4),
  },
  {
    id: "RD-2026-013",
    name: "Divya Sen",
    phone: "9900112233",
    email: "divya.sen@gmail.com",
    age: "27",
    program: "Adult Beginner",
    batch: "Weekend",
    experience: "Never Swam",
    medicalConditions: "None",
    emergencyContact: "Arun Sen (Father) - 9900112255",
    coachNotes: "Wants to learn swimming for physical fitness.",
    status: "New",
    submittedAt: getPastDateString(7, 9),
  },
  {
    id: "RD-2026-014",
    name: "Karan Johar",
    phone: "9911223355",
    email: "karan.johar@gmail.com",
    age: "38",
    program: "Private Coaching",
    batch: "Evening",
    experience: "Beginner",
    medicalConditions: "Lower back pain",
    emergencyContact: "Hiroo Johar (Mother) - 9911223377",
    coachNotes: "Referred by doctor for aqua fitness therapy.",
    status: "Rejected",
    submittedAt: getPastDateString(8, 3),
  },
  {
    id: "RD-2026-015",
    name: "Mansi Joshi",
    phone: "9922334466",
    email: "mansi.j@gmail.com",
    age: "19",
    program: "Intermediate",
    batch: "Weekend",
    experience: "Intermediate",
    medicalConditions: "None",
    emergencyContact: "Prakash Joshi (Father) - 9922334411",
    coachNotes: "Swims freestyle comfortably. Wants to learn backstroke.",
    status: "Joined",
    submittedAt: getPastDateString(9, 6),
  },
]

export default function AdminDemo() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "admissions" | "settings">("dashboard")
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("")
  const [filterProgram, setFilterProgram] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterBatch, setFilterBatch] = useState("All")

  // Load and initialize data
  useEffect(() => {
    const loadData = () => {
      const stored = localStorage.getItem("rd_enquiries")
      if (stored) {
        setEnquiries(JSON.parse(stored))
      } else {
        localStorage.setItem("rd_enquiries", JSON.stringify(INITIAL_ENQUIRIES))
        setEnquiries(INITIAL_ENQUIRIES)
      }
    }

    loadData()

    // Listen to local enquiry submissions
    window.addEventListener("enquiry-submitted", loadData)
    return () => {
      window.removeEventListener("enquiry-submitted", loadData)
    }
  }, [])

  // Helper formatting for submission dates
  const formatSubmittedDate = (isoString: string) => {
    const date = new Date(isoString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const timeString = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    if (date.toDateString() === now.toDateString()) {
      return `Today, ${timeString}`
    } else if (diffDays <= 1) {
      return `Yesterday, ${timeString}`
    } else {
      return `${date.toLocaleDateString([], { month: "short", day: "numeric" })}, ${timeString}`
    }
  }

  // Handle Quick Actions
  const updateStatus = (id: string, newStatus: Enquiry["status"]) => {
    const updated = enquiries.map((enq) => {
      if (enq.id === id) {
        const item = { ...enq, status: newStatus }
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry(item)
        }
        return item
      }
      return enq
    })
    setEnquiries(updated)
    localStorage.setItem("rd_enquiries", JSON.stringify(updated))
  }

  const deleteEnquiry = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this enquiry?")
    if (!confirmed) return

    const updated = enquiries.filter((enq) => enq.id !== id)
    setEnquiries(updated)
    localStorage.setItem("rd_enquiries", JSON.stringify(updated))
    if (selectedEnquiry?.id === id) {
      setIsDrawerOpen(false)
      setSelectedEnquiry(null)
    }
  }

  // Dashboard Stats Calculations
  const totalEnquiries = enquiries.length
  const todayCount = enquiries.filter((e) => {
    const d = new Date(e.submittedAt)
    const todayDate = new Date()
    return d.toDateString() === todayDate.toDateString()
  }).length
  const pendingCount = enquiries.filter((e) => e.status === "New" || e.status === "Contacted").length
  const approvedCount = enquiries.filter((e) => e.status === "Joined").length
  const rejectedCount = enquiries.filter((e) => e.status === "Rejected").length

  // Filter & Search Logic
  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesSearch =
      enq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.phone.includes(searchQuery) ||
      enq.program.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesProgram = filterProgram === "All" || enq.program === filterProgram
    const matchesStatus = filterStatus === "All" || enq.status === filterStatus
    const matchesBatch = filterBatch === "All" || enq.batch === filterBatch

    return matchesSearch && matchesProgram && matchesStatus && matchesBatch
  })

  // Program Distribution percentages for dashboard charts
  const getProgramPercent = (progName: string) => {
    if (totalEnquiries === 0) return 0
    const count = enquiries.filter((e) => e.program === progName).length
    return Math.round((count / totalEnquiries) * 100)
  }

  // Batch Distribution
  const getBatchCount = (batchName: string) => {
    return enquiries.filter((e) => e.batch === batchName).length
  }

  const openDetailsDrawer = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry)
    setIsDrawerOpen(true)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row font-sans">
      {/* Sidebar Panel */}
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/60 backdrop-blur-xl flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative size-8 overflow-hidden rounded-full border border-cyan-500/20 bg-white">
              <Image
                src="/images/logo.png"
                alt="Rose Delight Logo"
                fill
                sizes="32px"
                className="object-cover scale-[1.05]"
              />
            </div>
            <span className="text-base font-bold tracking-tight text-white">Rose Delight</span>
          </Link>
          <Link
            href="/"
            className="lg:hidden text-xs text-cyan-400 font-semibold flex items-center gap-1 hover:text-cyan-300"
          >
            <ArrowLeft className="size-3" /> Site
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer",
              activeTab === "dashboard"
                ? "bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.05)] border-l-2 border-cyan-400"
                : "text-slate-400 hover:text-white hover:bg-slate-800/40"
            )}
          >
            <LayoutDashboard className="size-4" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("admissions")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer",
              activeTab === "admissions"
                ? "bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.05)] border-l-2 border-cyan-400"
                : "text-slate-400 hover:text-white hover:bg-slate-800/40"
            )}
          >
            <UsersRound className="size-4" />
            Admissions
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer",
              activeTab === "settings"
                ? "bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.05)] border-l-2 border-cyan-400"
                : "text-slate-400 hover:text-white hover:bg-slate-800/40"
            )}
          >
            <SettingsIcon className="size-4" />
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800 hidden lg:block">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-xs font-semibold text-slate-300 py-2.5 transition-all text-center"
          >
            <ArrowLeft className="size-3.5" /> Back to Live Site
          </Link>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/40 backdrop-blur-xl px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-tight text-white capitalize">
              {activeTab} Overview
            </h1>
            <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] uppercase font-bold py-0.5 px-2">
              Demo Portal
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-white">Administrator</div>
              <div className="text-[10px] text-slate-400">Rose Delight Club</div>
            </div>
            <div className="size-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 text-sm font-bold shadow-sm">
              AD
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="flex-1 p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats KPI grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 shadow-sm hover:border-slate-800 transition-all flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Today&apos;s Enquiries</span>
                  <span className="text-3xl font-extrabold text-white mt-2">{todayCount}</span>
                  <span className="text-[10px] text-cyan-400 font-semibold mt-1">Submitted in past 24h</span>
                </div>
                <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 shadow-sm hover:border-slate-800 transition-all flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Pending Follow-up</span>
                  <span className="text-3xl font-extrabold text-amber-400 mt-2">{pendingCount}</span>
                  <span className="text-[10px] text-slate-400 font-semibold mt-1">New & Contacted states</span>
                </div>
                <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 shadow-sm hover:border-slate-800 transition-all flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Approved / Joined</span>
                  <span className="text-3xl font-extrabold text-emerald-400 mt-2">{approvedCount}</span>
                  <span className="text-[10px] text-emerald-400/80 font-semibold mt-1">Officially enrolled students</span>
                </div>
                <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 shadow-sm hover:border-slate-800 transition-all flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Enquiries Rejected</span>
                  <span className="text-3xl font-extrabold text-rose-500 mt-2">{rejectedCount}</span>
                  <span className="text-[10px] text-slate-400 font-semibold mt-1">Not eligible or cancelled</span>
                </div>
              </div>

              {/* Data Distributions grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Program Popularity Chart */}
                <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
                  <div>
                    <h3 className="text-sm font-bold tracking-tight text-white">Program Distribution</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Popularity based on total registered enquiries.</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: "Kids Swimming", color: "bg-sky-400" },
                      { name: "Adult Beginner", color: "bg-blue-500" },
                      { name: "Intermediate", color: "bg-cyan-500" },
                      { name: "Advanced", color: "bg-sky-600" },
                      { name: "Private Coaching", color: "bg-blue-400" },
                    ].map((prog) => {
                      const pct = getProgramPercent(prog.name)
                      return (
                        <div key={prog.name} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-200">{prog.name}</span>
                            <span className="text-slate-400">{pct}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full", prog.color)} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Batch Distribution & Quick details */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-sm font-bold tracking-tight text-white">Preferred Batches</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Distribution breakdown by time slot preference.</p>
                  </div>

                  <div className="space-y-4 flex-1 flex flex-col justify-center">
                    {[
                      { name: "Morning", label: "Morning Laps (6-10 AM)", count: getBatchCount("Morning"), pct: totalEnquiries ? Math.round((getBatchCount("Morning") / totalEnquiries) * 100) : 0 },
                      { name: "Evening", label: "Evening Squads (4-8 PM)", count: getBatchCount("Evening"), pct: totalEnquiries ? Math.round((getBatchCount("Evening") / totalEnquiries) * 100) : 0 },
                      { name: "Weekend", label: "Weekend Batches (Sat/Sun)", count: getBatchCount("Weekend"), pct: totalEnquiries ? Math.round((getBatchCount("Weekend") / totalEnquiries) * 100) : 0 },
                    ].map((batch) => (
                      <div key={batch.name} className="flex items-center gap-4 justify-between border-b border-slate-800/50 pb-3 last:border-b-0 last:pb-0">
                        <div className="space-y-0.5 text-left">
                          <span className="text-xs font-bold text-slate-200">{batch.name}</span>
                          <p className="text-[10px] text-slate-400">{batch.label}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-white">{batch.count} leads</div>
                          <div className="text-[10px] text-cyan-400 font-semibold">{batch.pct}% load</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Demo banner */}
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-5 flex flex-col sm:flex-row items-center gap-4 justify-between">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5 border border-cyan-400/10">
                    <HelpCircle className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">How the demo works</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1 max-w-xl">
                      This dashboard shows student admission requests. Go back to the main landing page, click any <b>&quot;Join Batch&quot;</b> button, and fill out the multi-step enquiry form. When you submit, the request will immediately appear here in this dashboard, and you can approve, reject, or delete it!
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setActiveTab("admissions")}
                  className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 rounded-xl px-5 py-2 h-10 font-bold text-xs cursor-pointer shadow-md shadow-cyan-500/10 flex-shrink-0"
                >
                  Manage Admissions <ChevronRight className="size-3.5 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* TAB 2: ADMISSIONS TABLE */}
          {activeTab === "admissions" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Filters & Search Control Bar */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Search box */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by student name, phone, or program..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 pl-10 pr-4 py-2.5 rounded-xl text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-white"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Program filter */}
                    <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
                      <Filter className="size-3 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-400">Prog:</span>
                      <select
                        value={filterProgram}
                        onChange={(e) => setFilterProgram(e.target.value)}
                        className="bg-transparent border-0 text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
                      >
                        <option value="All">All Programs</option>
                        <option value="Kids Swimming">Kids Swimming</option>
                        <option value="Adult Beginner">Adult Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Private Coaching">Private Coaching</option>
                      </select>
                    </div>

                    {/* Batch filter */}
                    <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
                      <Clock className="size-3 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-400">Batch:</span>
                      <select
                        value={filterBatch}
                        onChange={(e) => setFilterBatch(e.target.value)}
                        className="bg-transparent border-0 text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
                      >
                        <option value="All">All Batches</option>
                        <option value="Morning">Morning</option>
                        <option value="Evening">Evening</option>
                        <option value="Weekend">Weekend</option>
                      </select>
                    </div>

                    {/* Status filter */}
                    <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
                      <Award className="size-3 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-400">Status:</span>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-transparent border-0 text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
                      >
                        <option value="All">All Status</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Joined">Joined</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 text-xs font-bold uppercase tracking-wider">
                        <th className="py-4 px-5">Student Name</th>
                        <th className="py-4 px-5">Phone</th>
                        <th className="py-4 px-5">Program</th>
                        <th className="py-4 px-5">Batch</th>
                        <th className="py-4 px-5">Experience</th>
                        <th className="py-4 px-5">Status</th>
                        <th className="py-4 px-5">Submitted Time</th>
                        <th className="py-4 px-5 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-sm">
                      {filteredEnquiries.length > 0 ? (
                        filteredEnquiries.map((enq) => (
                          <tr key={enq.id} className="hover:bg-slate-800/10 transition-colors">
                            <td className="py-4 px-5 font-semibold text-white">
                              <div>{enq.name}</div>
                              <span className="text-[10px] text-slate-400 mt-0.5 block">{enq.age} yrs</span>
                            </td>
                            <td className="py-4 px-5 text-slate-300 font-mono text-xs">{enq.phone}</td>
                            <td className="py-4 px-5 text-slate-300">{enq.program}</td>
                            <td className="py-4 px-5 text-slate-300">{enq.batch}</td>
                            <td className="py-4 px-5">
                              <span className="text-xs text-slate-400 px-2 py-0.5 bg-slate-850 rounded-md">
                                {enq.experience}
                              </span>
                            </td>
                            <td className="py-4 px-5">
                              <span
                                className={cn(
                                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                                  enq.status === "New" && "bg-blue-500/10 border-blue-500/30 text-blue-400",
                                  enq.status === "Contacted" && "bg-amber-500/10 border-amber-500/30 text-amber-400",
                                  enq.status === "Joined" && "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
                                  enq.status === "Rejected" && "bg-rose-500/10 border-rose-500/30 text-rose-400"
                                )}
                              >
                                {enq.status}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-xs text-slate-400">
                              {formatSubmittedDate(enq.submittedAt)}
                            </td>
                            <td className="py-4 px-5">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => openDetailsDrawer(enq)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                  title="View full application"
                                >
                                  <Eye className="size-3.5" />
                                </button>
                                <button
                                  onClick={() => updateStatus(enq.id, "Joined")}
                                  className={cn(
                                    "p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer",
                                    enq.status === "Joined" ? "bg-emerald-500/20 text-emerald-400 pointer-events-none" : ""
                                  )}
                                  title="Approve / Enroll student"
                                >
                                  <Check className="size-3.5" />
                                </button>
                                <button
                                  onClick={() => updateStatus(enq.id, "Rejected")}
                                  className={cn(
                                    "p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer",
                                    enq.status === "Rejected" ? "bg-rose-500/20 text-rose-400 pointer-events-none" : ""
                                  )}
                                  title="Reject enquiry"
                                >
                                  <X className="size-3.5" />
                                </button>
                                <button
                                  onClick={() => deleteEnquiry(enq.id)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                                  title="Delete record"
                                >
                                  <Trash2 className="size-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-slate-500 font-medium">
                            No matching enquiries found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer counts */}
                <div className="p-4 border-t border-slate-800 bg-slate-900/20 flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>Showing {filteredEnquiries.length} of {totalEnquiries} enquiries</span>
                  <span className="text-cyan-400 font-bold">5:1 Trainer Ratio Enforced</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SETTINGS PLACEHOLDER */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-sm space-y-6 max-w-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-400/10">
                  <SettingsIcon className="size-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">System Configuration</h3>
                  <p className="text-xs text-slate-400">Manage Rose Delight Swimming Academy parameters.</p>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 tracking-wider uppercase block">Academy Details</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                      <span className="text-[10px] text-slate-500 block">NAME</span>
                      <span className="text-xs font-semibold text-white mt-1 block">Rose Delight Swimming Club</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                      <span className="text-[10px] text-slate-500 block">ESTABLISHED YEAR</span>
                      <span className="text-xs font-semibold text-white mt-1 block">2021</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 tracking-wider uppercase block">Capacity & Ratios</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                      <span className="text-[10px] text-slate-500 block">STUDENTS PER BATCH LIMIT</span>
                      <span className="text-xs font-semibold text-cyan-400 mt-1 block">15 Students (Max)</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850">
                      <span className="text-[10px] text-slate-500 block">TRAINER RATIO TARGET</span>
                      <span className="text-xs font-semibold text-cyan-400 mt-1 block">5:1 Students-to-Coach</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-xs text-slate-400 leading-relaxed">
                  🔧 Settings tab is a demonstration placeholder. Production release integrates this with Twilio SMS notification templates, batch calendar sync (Google Calendar api), and instructor scheduling databases.
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Side Details Drawer overlay (Framer Motion) */}
      <AnimatePresence>
        {isDrawerOpen && selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
              className="relative z-10 w-full sm:max-w-md h-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between flex-shrink-0">
                <div>
                  <h3 className="font-bold text-white text-base">Enquiry Application</h3>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold mt-1 block">
                    {selectedEnquiry.id}
                  </span>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Status indicator bar */}
                <div className="flex items-center justify-between border border-slate-800/80 p-3 rounded-2xl bg-slate-950/30">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Current Status</span>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => updateStatus(selectedEnquiry.id, e.target.value as Enquiry["status"])}
                    className={cn(
                      "text-xs font-bold rounded-lg border px-3 py-1.5 focus:outline-none cursor-pointer bg-slate-950",
                      selectedEnquiry.status === "New" && "border-blue-500/30 text-blue-400",
                      selectedEnquiry.status === "Contacted" && "border-amber-500/30 text-amber-400",
                      selectedEnquiry.status === "Joined" && "border-emerald-500/30 text-emerald-400",
                      selectedEnquiry.status === "Rejected" && "border-rose-500/30 text-rose-400"
                    )}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Joined">Joined</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* Personal Information Card */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Student Profile</h4>
                  <div className="bg-slate-950/50 rounded-2xl border border-slate-850 p-4 space-y-3.5 divide-y divide-slate-800/50">
                    <div className="flex items-start gap-3">
                      <User className="size-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">FULL NAME</div>
                        <div className="text-sm font-semibold text-white mt-0.5">{selectedEnquiry.name}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-3.5">
                      <Calendar className="size-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">AGE</div>
                        <div className="text-sm font-semibold text-white mt-0.5">{selectedEnquiry.age} Years</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-3.5">
                      <Phone className="size-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">PHONE</div>
                        <div className="text-sm font-semibold text-white mt-0.5 font-mono">{selectedEnquiry.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-3.5">
                      <Mail className="size-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">EMAIL</div>
                        <div className="text-sm font-semibold text-white mt-0.5">
                          {selectedEnquiry.email || <span className="text-slate-600 font-normal">Not Provided</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enrollment Preferences */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Enrollment preferences</h4>
                  <div className="bg-slate-950/50 rounded-2xl border border-slate-850 p-4 space-y-3.5 divide-y divide-slate-800/50">
                    <div className="flex items-start gap-3">
                      <Award className="size-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">PROGRAM CHOSEN</div>
                        <div className="text-sm font-semibold text-white mt-0.5">{selectedEnquiry.program}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-3.5">
                      <Clock className="size-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">PREFERRED BATCH</div>
                        <div className="text-sm font-semibold text-white mt-0.5">{selectedEnquiry.batch}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-3.5">
                      <TrendingUp className="size-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">SWIMMING EXPERIENCE</div>
                        <div className="text-sm font-semibold text-white mt-0.5">{selectedEnquiry.experience}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Safety & Medical */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Safety & Medical logs</h4>
                  <div className="bg-slate-950/50 rounded-2xl border border-slate-850 p-4 space-y-3.5 divide-y divide-slate-800/50">
                    <div className="flex items-start gap-3">
                      <ShieldAlert className="size-4 text-amber-500 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">EMERGENCY CONTACT</div>
                        <div className="text-xs font-semibold text-white mt-1 leading-relaxed">
                          {selectedEnquiry.emergencyContact}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-3.5">
                      <HeartPulse className="size-4 text-rose-500 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">MEDICAL CONDITIONS</div>
                        <div className="text-xs text-white/70 mt-1 leading-relaxed">
                          {selectedEnquiry.medicalConditions || <span className="text-slate-650 font-normal">No medical issues declared</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-3.5">
                      <FolderHeart className="size-4 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">NOTES FOR COACH</div>
                        <div className="text-xs text-white/70 mt-1 leading-relaxed">
                          {selectedEnquiry.coachNotes || <span className="text-slate-650 font-normal">None</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer controls inside drawer */}
              <div className="p-6 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between gap-3 flex-shrink-0">
                <Button
                  onClick={() => deleteEnquiry(selectedEnquiry.id)}
                  className="bg-transparent hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 border border-slate-800 hover:border-rose-500/20 rounded-xl px-4 py-2 h-11 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="size-3.5" /> Delete
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => updateStatus(selectedEnquiry.id, "Joined")}
                    disabled={selectedEnquiry.status === "Joined"}
                    className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl px-4 py-2 h-11 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="size-3.5" /> Approve
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
