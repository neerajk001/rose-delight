import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Rose Delight Swimming Academy | Learn Swimming with Confidence",
  description:
    "Premium swimming academy in Mumbai. Professional coaching for kids, adults, and competitive swimmers. Certified coaches, modern facilities, safe environment. Join today.",
  keywords: [
    "swimming classes",
    "swimming academy",
    "learn swimming",
    "swimming coaching",
    "kids swimming",
    "adult swimming",
    "Mumbai swimming",
    "Rose Delight Swimming",
  ],
  openGraph: {
    title: "Rose Delight Swimming Academy",
    description:
      "Premium swimming academy offering professional training for all ages.",
    type: "website",
    locale: "en_IN",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
