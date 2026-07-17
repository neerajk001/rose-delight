"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  MessageCircle,
  User,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  Clock,
  Waves,
  ShieldAlert,
  Heart,
} from "lucide-react"
import { Button } from "./button"
import { siteConfig } from "@/lib/data"
import { cn } from "@/lib/utils"

interface FormData {
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
}

const INITIAL_FORM_DATA: FormData = {
  name: "",
  phone: "",
  email: "",
  age: "",
  program: "",
  batch: "",
  experience: "",
  medicalConditions: "",
  emergencyContact: "",
  coachNotes: "",
}

const PROGRAMS_LIST = [
  { id: "Kids Swimming", label: "Kids Swimming (Ages 6-12)", desc: "Build water confidence & core stroke styles." },
  { id: "Adult Beginner", label: "Adult Beginner", desc: "Patient coaching for floating & basic strokes." },
  { id: "Intermediate", label: "Intermediate Coaching", desc: "Refine strokes, patterns & build endurance." },
  { id: "Advanced", label: "Advanced Squad", desc: "Race techniques, pacing & conditioning." },
  { id: "Private Coaching", label: "Private 1-on-1", desc: "Customized drills & flexible schedules." },
]

const BATCHES_LIST = [
  { id: "Morning", label: "Morning Batch", desc: "6:00 AM - 10:00 AM (Mon - Fri)" },
  { id: "Evening", label: "Evening Batch", desc: "4:00 PM - 8:00 PM (Mon - Fri)" },
  { id: "Weekend", label: "Weekend Batch", desc: "7:00 AM - 10:00 AM / 4:00 PM - 7:00 PM (Sat - Sun)" },
]

const EXPERIENCE_LEVELS = [
  { id: "Never Swam", label: "Never Swam", desc: "Scared of water or cannot float." },
  { id: "Beginner", label: "Beginner", desc: "Can float and move slightly but cannot swim clean laps." },
  { id: "Intermediate", label: "Intermediate", desc: "Comfortable in deep water, know basic stroke styles." },
  { id: "Advanced", label: "Advanced / Racer", desc: "Excellent technique, competitive background." },
]

export function AdmissionModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submittedId, setSubmittedId] = useState<string | null>(null)

  // Listen to global open event
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent
      
      // Check if draft exists
      const draft = localStorage.getItem("rd_admission_draft")
      let initialData = INITIAL_FORM_DATA
      if (draft) {
        try {
          initialData = JSON.parse(draft)
        } catch (e) {
          console.error("Failed to parse draft", e)
        }
      }

      setFormData({
        ...initialData,
        program: customEvent.detail?.program || initialData.program || "Adult Beginner",
      })
      setStep(1)
      setErrors({})
      setSubmittedId(null)
      setIsOpen(true)
      document.body.style.overflow = "hidden"
    }

    window.addEventListener("open-admission", handleOpen)
    return () => {
      window.removeEventListener("open-admission", handleOpen)
    }
  }, [])

  // Save draft state on change
  useEffect(() => {
    if (isOpen && step <= 6) {
      localStorage.setItem("rd_admission_draft", JSON.stringify(formData))
    }
  }, [formData, isOpen, step])

  // Autofocus the first available input field on step transition
  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(() => {
      const activeInput = document.querySelector(
        "form input:not([disabled]), form textarea:not([disabled])"
      ) as HTMLElement
      if (activeInput) {
        activeInput.focus()
      }
    }, 120)
    return () => clearTimeout(timer)
  }, [step, isOpen])

  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = "unset"
  }

  // Real-time Validation Helper
  const validateField = (field: keyof FormData, value: string) => {
    const newErrors = { ...errors }

    if (field === "name") {
      if (!value.trim()) {
        newErrors.name = "Full Name is required"
      } else {
        delete newErrors.name
      }
    }

    if (field === "phone") {
      if (!value.trim()) {
        newErrors.phone = "Phone number is required"
      } else if (!/^\+?[0-9\s-]{10,14}$/.test(value.replace(/\s+/g, ""))) {
        newErrors.phone = "Please enter a valid phone number (min 10 digits)"
      } else {
        delete newErrors.phone
      }
    }

    if (field === "age") {
      if (!value.trim()) {
        newErrors.age = "Age is required"
      } else {
        const parsedAge = parseInt(value, 10)
        if (isNaN(parsedAge) || parsedAge < 6) {
          newErrors.age = "Age must be 6 years or above"
        } else {
          delete newErrors.age
        }
      }
    }

    if (field === "emergencyContact") {
      if (!value.trim()) {
        newErrors.emergencyContact = "Emergency contact details are required"
      } else {
        delete newErrors.emergencyContact
      }
    }

    setErrors(newErrors)
  }

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Full Name is required"
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required"
      } else if (!/^\+?[0-9\s-]{10,14}$/.test(formData.phone.replace(/\s+/g, ""))) {
        newErrors.phone = "Please enter a valid phone number (min 10 digits)"
      }
      if (!formData.age.trim()) {
        newErrors.age = "Age is required"
      } else {
        const parsedAge = parseInt(formData.age, 10)
        if (isNaN(parsedAge) || parsedAge < 6) {
          newErrors.age = "Age must be 6 years or above"
        }
      }
    }

    if (currentStep === 2) {
      if (!formData.program) newErrors.program = "Please select a training program"
    }

    if (currentStep === 3) {
      if (!formData.batch) newErrors.batch = "Please select a preferred batch"
    }

    if (currentStep === 4) {
      if (!formData.experience) newErrors.experience = "Please select your experience level"
    }

    if (currentStep === 5) {
      if (!formData.emergencyContact.trim()) {
        newErrors.emergencyContact = "Emergency contact details are required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Intercept Enter key to prevent default form submits and trigger next step instead
    if (e.key === "Enter") {
      const target = e.target as HTMLElement
      if (target.tagName.toLowerCase() === "textarea") {
        return // Let enter add newline inside textareas
      }
      e.preventDefault()
      if (step < 6) {
        handleNext()
      } else if (step === 6) {
        handleSubmit(e)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(5)) {
      setStep(5)
      return
    }

    // Generate Admission ID
    const existingStr = localStorage.getItem("rd_enquiries")
    const existing = existingStr ? JSON.parse(existingStr) : []
    const nextNum = String(existing.length + 1).padStart(3, "0")
    const id = `RD-2026-${nextNum}`

    const newEnquiry = {
      id,
      ...formData,
      status: "New",
      submittedAt: new Date().toISOString(),
    }

    // Save to LocalStorage
    localStorage.setItem("rd_enquiries", JSON.stringify([...existing, newEnquiry]))

    // Dispatch Event to update Admin panel if open
    window.dispatchEvent(new CustomEvent("enquiry-submitted"))

    // Clear draft state
    localStorage.removeItem("rd_admission_draft")

    setSubmittedId(id)
    setStep(7) // Success step
  }

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA)
    setStep(1)
    setErrors({})
    setSubmittedId(null)
    localStorage.removeItem("rd_admission_draft")
    closeModal()
  }

  const progressPercent = Math.min(100, ((step - 1) / 5) * 100)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative z-10 w-full h-full sm:h-auto sm:max-w-2xl sm:rounded-3xl bg-slate-900 border border-white/10 text-white overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-full overflow-hidden border border-cyan-500/20 relative bg-white flex-shrink-0">
                  <Waves className="size-4 text-cyan-400 absolute inset-0 m-auto" />
                </div>
                <div>
                  <h3 className="font-bold text-base lg:text-lg tracking-tight">
                    Online Admission Form
                  </h3>
                  <p className="text-xs text-cyan-400 font-medium">
                    Rose Delight Swimming Club
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close form"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Progress Bar (Only visible steps 1 to 6) */}
            {step <= 6 && (
              <div className="h-1 w-full bg-slate-800 relative">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 max-h-[calc(100vh-140px)] sm:max-h-[600px]">
              {step <= 6 && (
                <div className="mb-6 flex justify-between text-xs text-white/40 font-semibold tracking-wider uppercase">
                  <span>Step {step} of 6</span>
                  <span>{Math.round(progressPercent)}% Completed</span>
                </div>
              )}

              <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div>
                        <h4 className="text-lg font-bold">Personal Details</h4>
                        <p className="text-sm text-white/50">
                          Please enter your basic information to get started.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-white/70 tracking-wide block">
                            FULL NAME
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                            <input
                              type="text"
                              required
                              autoComplete="name"
                              placeholder="e.g. Ramesh Patel"
                              value={formData.name}
                              onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value })
                                if (errors.name) validateField("name", e.target.value)
                              }}
                              onBlur={(e) => validateField("name", e.target.value)}
                              className={cn(
                                "w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-sm placeholder-white/20 focus:outline-none focus:ring-1 transition-all",
                                errors.name
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-white/10 focus:border-cyan-400 focus:ring-cyan-400"
                              )}
                            />
                          </div>
                          {errors.name && (
                            <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                              <AlertCircle className="size-3 flex-shrink-0" /> {errors.name}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70 tracking-wide block">
                              PHONE NUMBER
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                              <input
                                type="tel"
                                required
                                inputMode="tel"
                                autoComplete="tel"
                                placeholder="e.g. 9876543210"
                                value={formData.phone}
                                onChange={(e) => {
                                  setFormData({ ...formData, phone: e.target.value })
                                  if (errors.phone) validateField("phone", e.target.value)
                                }}
                                onBlur={(e) => validateField("phone", e.target.value)}
                                className={cn(
                                  "w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-sm placeholder-white/20 focus:outline-none focus:ring-1 transition-all",
                                  errors.phone
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-white/10 focus:border-cyan-400 focus:ring-cyan-400"
                                )}
                              />
                            </div>
                            {errors.phone && (
                              <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                                <AlertCircle className="size-3 flex-shrink-0" /> {errors.phone}
                              </p>
                            )}
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70 tracking-wide block">
                              AGE
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                              <input
                                type="number"
                                required
                                inputMode="numeric"
                                min="6"
                                placeholder="e.g. 12"
                                value={formData.age}
                                onChange={(e) => {
                                  setFormData({ ...formData, age: e.target.value })
                                  if (errors.age) validateField("age", e.target.value)
                                }}
                                onBlur={(e) => validateField("age", e.target.value)}
                                className={cn(
                                  "w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-sm placeholder-white/20 focus:outline-none focus:ring-1 transition-all",
                                  errors.age
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-white/10 focus:border-cyan-400 focus:ring-cyan-400"
                                )}
                              />
                            </div>
                            {errors.age && (
                              <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                                <AlertCircle className="size-3 flex-shrink-0" /> {errors.age}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-white/70 tracking-wide block">
                            EMAIL ADDRESS (OPTIONAL)
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                            <input
                              type="email"
                              autoComplete="email"
                              placeholder="e.g. ramesh@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl text-sm placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div>
                        <h4 className="text-lg font-bold">Choose Program</h4>
                        <p className="text-sm text-white/50">
                          Select the swimming training program that fits your goals.
                        </p>
                      </div>

                      <div className="space-y-3">
                        {PROGRAMS_LIST.map((prog) => (
                          <div
                            key={prog.id}
                            onClick={() => {
                              setFormData({ ...formData, program: prog.id })
                              delete errors.program
                            }}
                            className={cn(
                              "p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all duration-200",
                              formData.program === prog.id
                                ? "bg-cyan-500/10 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                                : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                            )}
                          >
                            <div className="space-y-0.5 text-left">
                              <div className="text-sm font-semibold tracking-wide">
                                {prog.label}
                              </div>
                              <div className="text-xs text-white/40">{prog.desc}</div>
                            </div>
                            <div
                              className={cn(
                                "size-5 rounded-full border-2 flex items-center justify-center transition-all",
                                formData.program === prog.id
                                  ? "border-cyan-400 bg-cyan-400"
                                  : "border-white/30"
                              )}
                            >
                              {formData.program === prog.id && (
                                <div className="size-2 rounded-full bg-slate-900" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.program && (
                        <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="size-3 flex-shrink-0" /> {errors.program}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div>
                        <h4 className="text-lg font-bold">Preferred Batch</h4>
                        <p className="text-sm text-white/50">
                          Select the scheduling batch that matches your availability.
                        </p>
                      </div>

                      <div className="space-y-3">
                        {BATCHES_LIST.map((batch) => (
                          <div
                            key={batch.id}
                            onClick={() => {
                              setFormData({ ...formData, batch: batch.id })
                              delete errors.batch
                            }}
                            className={cn(
                              "p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all duration-200",
                              formData.batch === batch.id
                                ? "bg-cyan-500/10 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                                : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                            )}
                          >
                            <div className="space-y-0.5 text-left flex items-start gap-3">
                              <div className="size-9 rounded-xl bg-slate-800/80 flex items-center justify-center text-cyan-400 mt-0.5">
                                <Clock className="size-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold tracking-wide">
                                  {batch.label}
                                </div>
                                <div className="text-xs text-white/40">{batch.desc}</div>
                              </div>
                            </div>
                            <div
                              className={cn(
                                "size-5 rounded-full border-2 flex items-center justify-center transition-all",
                                formData.batch === batch.id
                                  ? "border-cyan-400 bg-cyan-400"
                                  : "border-white/30"
                              )}
                            >
                              {formData.batch === batch.id && (
                                <div className="size-2 rounded-full bg-slate-900" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.batch && (
                        <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="size-3 flex-shrink-0" /> {errors.batch}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div>
                        <h4 className="text-lg font-bold">Swimming Experience</h4>
                        <p className="text-sm text-white/50">
                          Select the option that best describes your current ability.
                        </p>
                      </div>

                      <div className="space-y-3">
                        {EXPERIENCE_LEVELS.map((exp) => (
                          <div
                            key={exp.id}
                            onClick={() => {
                              setFormData({ ...formData, experience: exp.id })
                              delete errors.experience
                            }}
                            className={cn(
                              "p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all duration-200",
                              formData.experience === exp.id
                                ? "bg-cyan-500/10 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                                : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                            )}
                          >
                            <div className="space-y-0.5 text-left">
                              <div className="text-sm font-semibold tracking-wide">
                                {exp.label}
                              </div>
                              <div className="text-xs text-white/40">{exp.desc}</div>
                            </div>
                            <div
                              className={cn(
                                "size-5 rounded-full border-2 flex items-center justify-center transition-all",
                                formData.experience === exp.id
                                  ? "border-cyan-400 bg-cyan-400"
                                  : "border-white/30"
                              )}
                            >
                              {formData.experience === exp.id && (
                                <div className="size-2 rounded-full bg-slate-900" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.experience && (
                        <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="size-3 flex-shrink-0" /> {errors.experience}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div>
                        <h4 className="text-lg font-bold">Medical Information</h4>
                        <p className="text-sm text-white/50">
                          Please fill out safety and health details before continuing.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-white/70 tracking-wide block flex items-center gap-1.5 flex-wrap">
                            <ShieldAlert className="size-3.5 text-amber-500" />
                            EMERGENCY CONTACT DETAILS (REQUIRED)
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Satish Patel (Father) - 9876543211"
                            value={formData.emergencyContact}
                            onChange={(e) => {
                              setFormData({ ...formData, emergencyContact: e.target.value })
                              if (errors.emergencyContact) validateField("emergencyContact", e.target.value)
                            }}
                            onBlur={(e) => validateField("emergencyContact", e.target.value)}
                            className={cn(
                              "w-full px-4 py-3 bg-white/5 border rounded-xl text-sm placeholder-white/20 focus:outline-none focus:ring-1 transition-all",
                              errors.emergencyContact
                                ? "border-red-500 focus:ring-red-500"
                                : "border-white/10 focus:border-cyan-400 focus:ring-cyan-400"
                            )}
                          />
                          {errors.emergencyContact && (
                            <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                              <AlertCircle className="size-3 flex-shrink-0" /> {errors.emergencyContact}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-white/70 tracking-wide block flex items-center gap-1.5 flex-wrap">
                            <Heart className="size-3.5 text-rose-500" />
                            MEDICAL CONDITIONS / ALLERGIES (OPTIONAL)
                          </label>
                          <textarea
                            placeholder="e.g. Asthma, skin allergies, or none"
                            value={formData.medicalConditions}
                            onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                            className="w-full h-20 px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl text-sm placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-white/70 tracking-wide block">
                            ANYTHING THE COACH SHOULD KNOW (OPTIONAL)
                          </label>
                          <textarea
                            placeholder="e.g. Student has water anxiety or has learned basic floating earlier"
                            value={formData.coachNotes}
                            onChange={(e) => setFormData({ ...formData, coachNotes: e.target.value })}
                            className="w-full h-20 px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-xl text-sm placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 6 && (
                    <motion.div
                      key="step6"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div>
                        <h4 className="text-lg font-bold">Review & Confirm</h4>
                        <p className="text-sm text-white/50">
                          Verify your enquiry details before submitting.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden divide-y divide-white/5">
                        {/* Personal info */}
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-bold text-white/40 tracking-wider uppercase">Personal Details</div>
                            <div className="text-sm font-semibold mt-0.5">{formData.name} ({formData.age} yrs)</div>
                            <div className="text-xs text-white/50">{formData.phone} {formData.email ? `| ${formData.email}` : ""}</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-lg hover:bg-cyan-500/10 cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>

                        {/* Program */}
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-bold text-white/40 tracking-wider uppercase">Selected Program</div>
                            <div className="text-sm font-semibold mt-0.5">
                              {PROGRAMS_LIST.find((p) => p.id === formData.program)?.label || formData.program}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-lg hover:bg-cyan-500/10 cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>

                        {/* Batch */}
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-bold text-white/40 tracking-wider uppercase">Preferred Batch</div>
                            <div className="text-sm font-semibold mt-0.5">
                              {BATCHES_LIST.find((b) => b.id === formData.batch)?.label || formData.batch}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-lg hover:bg-cyan-500/10 cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>

                        {/* Experience */}
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-bold text-white/40 tracking-wider uppercase">Swimming Experience</div>
                            <div className="text-sm font-semibold mt-0.5">
                              {EXPERIENCE_LEVELS.find((e) => e.id === formData.experience)?.label || formData.experience}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setStep(4)}
                            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-lg hover:bg-cyan-500/10 cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>

                        {/* Medical & Safety */}
                        <div className="p-4 flex items-center justify-between">
                          <div className="max-w-[85%]">
                            <div className="text-[10px] font-bold text-white/40 tracking-wider uppercase">Emergency & Safety</div>
                            <div className="text-xs text-white/70 mt-1 font-semibold leading-relaxed">
                              Emergency: {formData.emergencyContact}
                            </div>
                            {formData.medicalConditions && (
                              <div className="text-xs text-white/50 leading-relaxed mt-0.5">
                                Medical: {formData.medicalConditions}
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => setStep(5)}
                            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-lg hover:bg-cyan-500/10 cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 7 && (
                    <motion.div
                      key="step7"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-6 md:py-8 space-y-6"
                    >
                      <div className="flex justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.2, 1] }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="size-16 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-400/30 text-cyan-400"
                        >
                          <CheckCircle2 className="size-10" />
                        </motion.div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-2xl font-extrabold text-white">
                          🎉 Enquiry Received!
                        </h4>
                        <p className="text-sm text-white/60 max-w-sm mx-auto leading-relaxed">
                          Your admission request has been logged successfully in our system.
                        </p>
                      </div>

                      <div className="inline-block px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur">
                        <div className="text-[10px] font-extrabold text-white/40 tracking-widest uppercase">YOUR ADMISSION ID</div>
                        <div className="text-xl font-mono font-bold text-cyan-400 mt-1">
                          {submittedId}
                        </div>
                      </div>

                      <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">
                        Our team will contact you shortly.
                      </p>

                      <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-4 w-full">
                        <Button
                          type="button"
                          onClick={handleReset}
                          className="bg-white hover:bg-white/95 text-slate-900 rounded-full px-6 h-11 text-sm font-bold w-full sm:w-auto cursor-pointer"
                        >
                          Back Home
                        </Button>
                        <a
                          href={siteConfig.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white h-11 px-6 text-sm font-bold w-full sm:w-auto transition-colors cursor-pointer text-center"
                        >
                          <MessageCircle className="size-4" />
                          WhatsApp Academy
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Controls (Only visible steps 1 to 6) */}
                {step <= 6 && (
                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <Button
                      type="button"
                      disabled={step === 1}
                      onClick={handleBack}
                      className={cn(
                        "rounded-xl h-11 px-5 text-sm font-semibold border bg-transparent text-white/80 hover:bg-white/5 hover:text-white transition-all cursor-pointer",
                        step === 1 ? "opacity-30 pointer-events-none" : ""
                      )}
                    >
                      <ChevronLeft className="size-4 mr-1.5" /> Back
                    </Button>

                    {step < 6 ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 rounded-xl h-11 px-5 text-sm font-bold cursor-pointer"
                      >
                        Continue <ChevronRight className="size-4 ml-1.5" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 rounded-xl h-11 px-6 text-sm font-bold cursor-pointer hover:shadow-lg hover:shadow-cyan-500/20"
                      >
                        Submit Enquiry <CheckCircle2 className="size-4 ml-1.5" />
                      </Button>
                    )}
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
