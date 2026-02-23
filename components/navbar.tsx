"use client"

import { useEffect, useState } from "react"
import { Menu, X, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import DarkModeToggle from "@/components/dark-mode-toggle"

interface NavbarProps {
  locale?: "en" | "fr"
}

const content = {
  en: {
    logoHref: "/",
    localeLabel: "EN",
    menuItems: [
      { href: "#hero", label: "Home" },
      { href: "#what-we-offer", label: "What We Offer" },
      { href: "#partners-logos", label: "Partners" },
      { href: "#testimonials", label: "Testimonials" },
      { href: "#contact-form", label: "Contact" },
    ],
    languageLinks: [
      { href: "/?lang=en", label: "English" },
      { href: "/?lang=fr", label: "Français" },
    ],
  },
  fr: {
    logoHref: "/?lang=fr",
    localeLabel: "FR",
    menuItems: [
      { href: "#hero", label: "Accueil" },
      { href: "#what-we-offer", label: "Nos Offres" },
      { href: "#partners-logos", label: "Partenaires" },
      { href: "#testimonials", label: "Témoignages" },
      { href: "#contact-form", label: "Contact" },
    ],
    languageLinks: [
      { href: "/?lang=en", label: "English" },
      { href: "/?lang=fr", label: "Français" },
    ],
  },
}

export default function Navbar({ locale = "en" }: NavbarProps) {
  const t = content[locale]
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-16 bg-white/90 dark:bg-gray-900/90" />
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href={t.logoHref} className="flex items-center">
              <Image
                src="/images/pikSou_logo2.png"
                alt="PiKSou Logo"
                width={110}
                height={110}
                className="mr-2"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {t.menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-[#48C774] dark:hover:text-[#48C774] font-medium transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <div className="relative">
              <motion.button
                onClick={() => setIsLangMenuOpen((prev) => !prev)}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-[#48C774] dark:hover:text-[#48C774] font-medium transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={18} />
                <span>{t.localeLabel}</span>
              </motion.button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
                  >
                    {t.languageLinks.map((lang) => (
                      <Link
                        key={lang.href}
                        href={lang.href}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#48C774] dark:hover:text-[#48C774] transition-colors duration-200"
                        onClick={() => setIsLangMenuOpen(false)}
                      >
                        {lang.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <DarkModeToggle />
            </motion.div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsLangMenuOpen((prev) => !prev)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-[#48C774] dark:hover:text-[#48C774] focus:outline-none transition-colors duration-300"
            >
              <Globe size={20} />
            </button>
            <DarkModeToggle />
            <motion.button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-[#48C774] dark:hover:text-[#48C774] focus:outline-none transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm transition-colors duration-300"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {t.menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#48C774] dark:hover:text-[#48C774] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLangMenuOpen && (
          <motion.div
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm transition-colors duration-300 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-2 py-2 space-y-1">
              {t.languageLinks.map((lang) => (
                <Link
                  key={lang.href}
                  href={lang.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#48C774] dark:hover:text-[#48C774] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                  onClick={() => setIsLangMenuOpen(false)}
                >
                  {lang.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
