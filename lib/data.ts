import {
  Baby,
  Users,
  TrendingUp,
  Award,
  UserCheck,
  Shield,
  Droplets,
  Clock,
  Heart,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react"

export const siteConfig = {
  name: "Rose Delight Swimming Academy",
  tagline: "Learn Swimming in Just 15 Sessions",
  description:
    "Premium swimming academy offering professional training for kids (6+ years) and adults. Master swimming in just 15 sessions with our expert coaches and 5:1 trainer ratio.",
  phone: "+91 98765 43210",
  email: "info@rosedelightswim.com",
  address: "123, Rose Garden Road, Swimming Complex, Mumbai - 400001",
  whatsapp: "https://wa.me/919876543210",
  workingHours: {
    weekdays: "6:00 AM - 9:00 PM",
    weekends: "7:00 AM - 8:00 PM",
  },
}

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Programs", href: "#programs" },
  { label: "Coaches", href: "#coaches" },
  { label: "Gallery", href: "#gallery" },
  { label: "Schedule", href: "#schedule" },
  { label: "Contact", href: "#contact" },
]

export const heroStats = [
  { value: "15", label: "Sessions Course" },
  { value: "5:1", label: "Trainer Ratio" },
  { value: "15", label: "Max per Batch" },
  { value: "6+", label: "Years & Adults" },
]

export const programs = [
  {
    title: "Kids Swimming",
    description:
      "Fun and safe swimming lessons designed for children aged 6 and above. Build water confidence and learn essential swimming strokes through engaging activities.",
    duration: "45 mins / session",
    ageGroup: "6+ years",
    icon: Baby,
    image: "/images/programs/kids.jpg",
    color: "from-sky-400 to-sky-600",
  },
  {
    title: "Adult Beginner",
    description:
      "Never too late to start. Patient instructors guide you through basics of floating, breathing techniques, and fundamental strokes in a supportive environment.",
    duration: "60 mins / session",
    ageGroup: "18+ years",
    icon: Users,
    image: "/images/programs/adult-beginner.jpg",
    color: "from-blue-500 to-blue-700",
  },
  {
    title: "Intermediate",
    description:
      "Refine your technique across all four competitive strokes. Focus on endurance building, proper form, and advanced breathing patterns.",
    duration: "60 mins / session",
    ageGroup: "12+ years",
    icon: TrendingUp,
    image: "/images/programs/intermediate.jpg",
    color: "from-cyan-500 to-cyan-700",
  },
  {
    title: "Advanced",
    description:
      "Competition-focused training for experienced swimmers. Intensive drills, race strategies, flip turns, and high-performance conditioning.",
    duration: "90 mins / session",
    ageGroup: "14+ years",
    icon: Award,
    image: "/images/programs/advanced.jpg",
    color: "from-sky-600 to-sky-800",
  },
  {
    title: "Private Coaching",
    description:
      "One-on-one personalized training tailored to your goals. Flexible scheduling, rapid progress, and dedicated attention from our expert coaches.",
    duration: "Flexible",
    ageGroup: "All ages",
    icon: UserCheck,
    image: "/images/programs/private.jpg",
    color: "from-blue-400 to-blue-600",
  },
]

export const features = [
  {
    title: "Certified Coaches",
    description:
      "Internationally certified trainers maintaining a strict 5:1 student-to-coach ratio for focused, personalized guidance.",
    icon: Award,
  },
  {
    title: "Modern Pool",
    description:
      "Olympic-standard temperature-controlled pool with advanced filtration and regular quality monitoring.",
    icon: Droplets,
  },
  {
    title: "Safe Environment",
    description:
      "24/7 lifeguard supervision, first-aid trained staff, and batches capped at exactly 15 students for maximum safety.",
    icon: Shield,
  },
  {
    title: "Flexible Timings",
    description:
      "Morning, evening, and weekend batches designed to accommodate school, college, and work schedules.",
    icon: Clock,
  },
  {
    title: "Beginner Friendly",
    description:
      "Learn swimming in just 15 sessions. Our structured progressive curriculum is custom tailored for kids (6+ years) and adults.",
    icon: Heart,
  },
  {
    title: "Professional Training",
    description:
      "Structured training programs following international standards with regular progress assessments and feedback.",
    icon: GraduationCap,
  },
]

export const coaches = [
  {
    name: "Rajesh Kumar",
    role: "Head Coach",
    experience: "15+ years",
    specialization: "Competitive Swimming",
    achievements: [
      "National Level Swimmer",
      "ASCA Level 3 Certified",
      "Trained 50+ State Champions",
    ],
    image: "/images/coaches/coach-1.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Senior Instructor",
    experience: "10+ years",
    specialization: "Kids & Beginner Training",
    achievements: [
      "International Lifeguard Certified",
      "Early Childhood Aquatics Specialist",
      "500+ Kids Trained",
    ],
    image: "/images/coaches/coach-2.jpg",
  },
  {
    name: "Ankit Patel",
    role: "Fitness & Stroke Coach",
    experience: "8+ years",
    specialization: "Stroke Correction",
    achievements: [
      "Former State Champion",
      "Sports Science Diploma",
      "Specialized in Freestyle & Butterfly",
    ],
    image: "/images/coaches/coach-3.jpg",
  },
  {
    name: "Meera Desai",
    role: "Women's Coach",
    experience: "12+ years",
    specialization: "Women & Senior Citizens",
    achievements: [
      "Aquatic Therapy Certified",
      "Women's Safety Program Lead",
      "300+ Adult Beginners Trained",
    ],
    image: "/images/coaches/coach-4.jpg",
  },
]

export const galleryImages = [
  {
    src: "/images/gallery/gallery-1.png",
    alt: "Professional swimming training in progress",
    category: "Training",
  },
  {
    src: "/images/gallery/gallery-2.png",
    alt: "Kids enjoying swimming lessons",
    category: "Kids",
  },
  {
    src: "/images/gallery/gallery-3.png",
    alt: "Olympic-standard swimming pool facility",
    category: "Facilities",
  },
  {
    src: "/images/gallery/gallery-4.png",
    alt: "Students practicing freestyle stroke",
    category: "Students",
  },
  {
    src: "/images/gallery/gallery-5.png",
    alt: "Coach guiding a beginner swimmer",
    category: "Training",
  },
  {
    src: "/images/gallery/gallery-6.png",
    alt: "Group swimming session in progress",
    category: "Students",
  },
  {
    src: "/images/gallery/gallery-7.png",
    alt: "Indoor pool training facility",
    category: "Facilities",
  },
  {
    src: "/images/gallery/gallery-8.png",
    alt: "Young swimmers practicing at the academy",
    category: "Kids",
  },
]

export const schedule = {
  morning: [
    { day: "Monday - Friday", time: "6:00 AM - 8:00 AM", level: "All Levels" },
    { day: "Monday - Friday", time: "8:00 AM - 10:00 AM", level: "Advanced" },
    { day: "Saturday", time: "7:00 AM - 9:00 AM", level: "All Levels" },
    { day: "Sunday", time: "7:00 AM - 10:00 AM", level: "Open Session" },
  ],
  evening: [
    { day: "Monday - Friday", time: "4:00 PM - 6:00 PM", level: "Kids Batch" },
    {
      day: "Monday - Friday",
      time: "6:00 PM - 8:00 PM",
      level: "Adults & Intermediate",
    },
    { day: "Saturday", time: "4:00 PM - 7:00 PM", level: "All Levels" },
    { day: "Sunday", time: "4:00 PM - 7:00 PM", level: "Weekend Special" },
  ],
  weekend: [
    { day: "Saturday", time: "7:00 AM - 9:00 AM", level: "All Levels" },
    {
      day: "Saturday",
      time: "4:00 PM - 7:00 PM",
      level: "Weekend Intensive",
    },
    { day: "Sunday", time: "7:00 AM - 10:00 AM", level: "Open Session" },
    { day: "Sunday", time: "4:00 PM - 7:00 PM", level: "Family Swim" },
  ],
}

export const testimonials = [
  {
    name: "Anita Sharma",
    role: "Parent of 7-year-old Aryan",
    rating: 5,
    text: "My son was terrified of water, but within 3 months at Rose Delight, he's swimming confidently. Coach Priya is incredibly patient. Best decision we made!",
    image: "/images/testimonials/parent-1.jpg",
  },
  {
    name: "Rahul Mehta",
    role: "Adult Learner, 34",
    rating: 5,
    text: "I started as a complete beginner at 34. The adult program is wonderfully structured. Coach Rajesh broke down every technique so well. Now I swim 500m non-stop!",
    image: "/images/testimonials/adult-1.jpg",
  },
  {
    name: "Sneha Patel",
    role: "Parent of twins, Age 5",
    rating: 5,
    text: "Both my twins joined the Kids program together. The coaches manage them beautifully. They absolutely love coming to class. The facility is top-notch and very clean.",
    image: "/images/testimonials/parent-2.jpg",
  },
  {
    name: "Vikram Desai",
    role: "Advanced Swimmer, 19",
    rating: 5,
    text: "The advanced program transformed my competitive swimming. Coach Ankit's stroke correction was a game-changer. Went from district level to state level in one year.",
    image: "/images/testimonials/adult-2.jpg",
  },
  {
    name: "Lakshmi Iyer",
    role: "Parent of 10-year-old Diya",
    rating: 5,
    text: "The safety standards here are unmatched. As a parent, peace of mind is everything. The coaches are certified, the pool is always clean, and Diya's progress has been remarkable.",
    image: "/images/testimonials/parent-3.jpg",
  },
]

export const faqs = [
  {
    question: "What is the minimum age to join?",
    answer:
      "We accept children from 6 years onwards, as well as adults of all ages. Our programs are custom tailored for kids aged 6+ and adults starting from scratch. There is no upper age limit.",
  },
  {
    question: "Do I need to know swimming to join?",
    answer:
      "Not at all. Our beginner programs are designed for complete novices. Our coaches start with basic water adaptation exercises and progress at your pace. Over 60% of our students started with zero swimming experience.",
  },
  {
    question: "What equipment do I need?",
    answer:
      "Basic swimwear (swimsuit/trunks), swimming cap, and goggles are required. We provide kickboards, pull buoys, and other training equipment at the pool. You can purchase swimming caps and goggles at our facility if needed.",
  },
  {
    question: "How many students per batch?",
    answer:
      "We maintain a strict limit of exactly 15 students per batch. This allows us to offer an exceptional 5:1 student-to-trainer ratio for focused, personalized guidance.",
  },
  {
    question: "What is your fee structure?",
    answer:
      "Fees vary by program. Our Kids program starts at ₹2,500/month, Adult programs at ₹3,000/month, and Private coaching at ₹6,000/month. We offer quarterly and annual packages with significant discounts. Contact us for detailed pricing.",
  },
  {
    question: "Can I do a trial class?",
    answer:
      "Absolutely. We offer a complimentary trial session so you can experience the facility, meet the coaches, and understand our teaching methodology. Schedule your trial by calling us or sending a WhatsApp message.",
  },
  {
    question: "What safety measures do you have?",
    answer:
      "Certified lifeguards on duty at all times, first-aid trained staff, shallow training area for beginners, regular water quality testing, CCTV monitoring, and comprehensive emergency protocols. Student safety is our highest priority.",
  },
  {
    question: "How long does it take to learn swimming?",
    answer:
      "Our signature curriculum is designed to teach you how to swim confidently in just 15 sessions.",
  },
]

export const contactInfo = [
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MapPin, label: "Address", value: siteConfig.address },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: siteConfig.whatsapp },
]

export const footerLinks = {
  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "Programs", href: "#programs" },
    { label: "Coaches", href: "#coaches" },
    { label: "Gallery", href: "#gallery" },
    { label: "Schedule", href: "#schedule" },
    { label: "Contact", href: "#contact" },
    { label: "Admin Demo", href: "/admin-demo" },
  ],
  programs: [
    { label: "Kids Swimming", href: "#programs" },
    { label: "Adult Beginner", href: "#programs" },
    { label: "Intermediate", href: "#programs" },
    { label: "Advanced", href: "#programs" },
    { label: "Private Coaching", href: "#programs" },
  ],
  socials: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Twitter", href: "#" },
  ],
}
