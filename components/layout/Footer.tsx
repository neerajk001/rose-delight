import Link from "next/link"
import Image from "next/image"
import { siteConfig, footerLinks, contactInfo } from "@/lib/data"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <Link
              href="#home"
              className="flex items-center gap-2.5 mb-4"
            >
              <div className="relative size-8 overflow-hidden rounded-full border border-slate-700 shadow-sm bg-white">
                <Image
                  src="/images/logo.png"
                  alt="Rose Delight Logo"
                  fill
                  sizes="32px"
                  className="object-cover scale-[1.05]"
                />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Rose Delight
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Premium swimming academy dedicated to building confidence in water
              through professional coaching and world-class facilities.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-brand transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Programs
            </h3>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-brand transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-brand transition-colors duration-200"
                      target={item.label === "WhatsApp" ? "_blank" : undefined}
                      rel={
                        item.label === "WhatsApp"
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm text-slate-400">
                      {item.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-sm text-slate-500 hover:text-brand transition-colors duration-200"
                aria-label={social.label}
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
