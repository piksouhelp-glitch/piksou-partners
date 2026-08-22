"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Globe, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import DarkModeToggle from "@/components/dark-mode-toggle"

interface NavbarProps {
  locale?: "en" | "fr"
}

type OfferId = "ads" | "intel" | "rewards" | "business"

const content = {
  en: {
    logoHref: "/",
    localeLabel: "EN",
    menuItems: [
      { href: "#hero", label: "Home" },
      { href: "#why-piksou", label: "Why Partner" },
      { href: "#what-we-offer", label: "What We Offer" },
      { href: "#contact-form", label: "Contact" },
    ],
    languageLinks: [
      { href: "/?lang=en", label: "English" },
      { href: "/?lang=fr", label: "Français" },
    ],
    offerLinks: [
      { id: "ads", label: "Advertisements" },
      { id: "intel", label: "Retail Intelligence & Insights" },
      { id: "rewards", label: "Rewards Campaign" },
      { id: "business", label: "PikSou Business" },
    ] satisfies Array<{ id: OfferId; label: string }>,
  },
  fr: {
    logoHref: "/?lang=fr",
    localeLabel: "FR",
    menuItems: [
      { href: "#hero", label: "Accueil" },
      { href: "#why-piksou", label: "Pourquoi Partenaire" },
      { href: "#what-we-offer", label: "Nos Offres" },
      { href: "#contact-form", label: "Contact" },
    ],
    languageLinks: [
      { href: "/?lang=en", label: "English" },
      { href: "/?lang=fr", label: "Français" },
    ],
    offerLinks: [
      { id: "ads", label: "Publicites" },
      { id: "intel", label: "Retail Intelligence & Insights" },
      { id: "rewards", label: "Campagne Rewards" },
      { id: "business", label: "PikSou Business" },
    ] satisfies Array<{ id: OfferId; label: string }>,
  },
}

export default function Navbar({ locale = "en" }: NavbarProps) {
  const t = content[locale]
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [isOfferMenuOpen, setIsOfferMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleOfferClick = (offerId: OfferId) => {
    setIsOfferMenuOpen(false)
    setIsMenuOpen(false)

    window.dispatchEvent(new CustomEvent<OfferId>("piksou:offer-tab", { detail: offerId }))
    window.history.replaceState(null, "", `#what-we-offer-${offerId}`)
    document.getElementById("what-we-offer")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

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

  if (!isMounted) return <div className="h-16 bg-[var(--page-bg)]" />

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 font-poppins transition-all duration-300 ${
        isScrolled
          ? "border-b border-[var(--border-soft)] bg-[var(--surface-bg)]/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href={t.logoHref} className="flex items-center">
              <Image
                src="/piksou-logo.svg"
                alt="PiKSou Logo"
                width={110}
                height={110}
                className="mr-2"
              />
            </Link>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            {t.menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={item.href === "#what-we-offer" ? "relative" : undefined}
              >
                {item.href === "#what-we-offer" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsOfferMenuOpen((prev) => !prev)}
                      className="flex items-center gap-1 text-[13px] font-medium text-[var(--text-body)] transition-colors duration-300 hover:text-[#48C774]"
                      aria-expanded={isOfferMenuOpen}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isOfferMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOfferMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.98 }}
                          className="absolute left-1/2 top-full mt-4 w-72 -translate-x-1/2 rounded-[6px] border border-[var(--border-soft)] bg-[var(--surface-bg)] py-3 shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
                        >
                          {t.offerLinks.map((offer) => (
                            <button
                              key={offer.id}
                              type="button"
                              onClick={() => handleOfferClick(offer.id)}
                              className="block w-full px-6 py-2.5 text-center text-base font-normal text-[var(--text-muted)] transition-colors duration-200 hover:bg-emerald-50 hover:text-[#48C774] dark:hover:bg-emerald-500/10"
                            >
                              {offer.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-[13px] font-medium text-[var(--text-body)] transition-colors duration-300 hover:text-[#48C774]"
                  >
                    {item.label}
                  </Link>
                )}
              </motion.div>
            ))}

            <div className="relative">
              <motion.button
                onClick={() => setIsLangMenuOpen((prev) => !prev)}
                className="flex items-center gap-1 text-[13px] font-medium text-[var(--text-body)] transition-colors duration-300 hover:text-[#48C774]"
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
                    className="absolute right-0 mt-2 w-44 rounded-[8px] border border-[var(--border-soft)] bg-[var(--surface-bg)] py-2 shadow-lg"
                  >
                    {t.languageLinks.map((lang) => (
                      <Link
                        key={lang.href}
                        href={lang.href}
                        className="block px-4 py-2 text-sm font-medium text-[var(--text-body)] transition-colors duration-200 hover:bg-emerald-50 hover:text-[#48C774] dark:hover:bg-emerald-500/10"
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

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsLangMenuOpen((prev) => !prev)}
              className="rounded-md p-2 text-[var(--text-body)] transition-colors duration-300 hover:text-[#48C774] focus:outline-none"
            >
              <Globe size={20} />
            </button>
            <DarkModeToggle />
            <motion.button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-md p-2 text-[var(--text-body)] transition-colors duration-300 hover:text-[#48C774] focus:outline-none"
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
            className="border-t border-[var(--border-soft)] bg-[var(--surface-bg)]/95 backdrop-blur-sm transition-colors duration-300 md:hidden"
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
                  {item.href === "#what-we-offer" ? (
                    <div>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-[var(--text-body)] transition-all duration-300 hover:bg-emerald-50 hover:text-[#48C774] dark:hover:bg-emerald-500/10"
                        onClick={() => setIsOfferMenuOpen((prev) => !prev)}
                        aria-expanded={isOfferMenuOpen}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${isOfferMenuOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOfferMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden rounded-[6px] bg-[var(--surface-bg)]"
                          >
                            {t.offerLinks.map((offer) => (
                              <button
                                key={offer.id}
                                type="button"
                                onClick={() => handleOfferClick(offer.id)}
                                className="block w-full px-6 py-2 text-left text-sm font-normal text-[var(--text-muted)] transition-colors duration-200 hover:bg-emerald-50 hover:text-[#48C774] dark:hover:bg-emerald-500/10"
                              >
                                {offer.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-[var(--text-body)] transition-all duration-300 hover:bg-emerald-50 hover:text-[#48C774] dark:hover:bg-emerald-500/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLangMenuOpen && (
          <motion.div
            className="border-t border-[var(--border-soft)] bg-[var(--surface-bg)]/95 backdrop-blur-sm transition-colors duration-300 md:hidden"
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
                  className="block rounded-md px-3 py-2 text-base font-medium text-[var(--text-body)] transition-all duration-300 hover:bg-emerald-50 hover:text-[#48C774] dark:hover:bg-emerald-500/10"
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
