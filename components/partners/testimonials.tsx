"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import FadeIn from "@/components/animations/fade-in"
import Image from "next/image"

interface WhyProps {
  locale?: "en" | "fr"
}

interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  logo: string
}

const content = {
  en: {
    title: "Why",
    titleHighlight: "Partner?",
    description: "is a platform connecting retailers to",
    descriptionBold: "thousands",
    descriptionMid: "of high-intent shoppers directly in",
    descriptionHighlight: "Mauritius",
    descriptionEnd: "redefining how retailers approach their users.",
    testimonials: [
      {
        quote: "New customers walk in already knowing exactly what they want. It has increased our day competitive in the market.",
        author: "John",
        role: "Manager",
        company: "My Family Grocery",
        logo: "/images/partners/testimonials/testimonial-2.png",
      },
      {
        quote: "Partnering with PikSou helped us reach more customers and boost in-store sales. Shoppers now discover our deals easily, and we've seen a clear increase in foot traffic since joining the platform.",
        author: "Peterson Jennings",
        role: "Marketing Director",
        company: "Super U",
        logo: "/images/partners/testimonials/testimonial-1.png",
      },
      {
        quote: "PikSou made it easier to track offers and compare them with competitors. More customers are now visiting us.",
        author: "Sarah",
        role: "Owner",
        company: "Local Store",
        logo: "/images/partners/testimonials/testimonial-3.png",
      },
    ] as Testimonial[],
  },
  fr: {
    title: "Pourquoi",
    titleHighlight: "Partenaire?",
    description: "est une plateforme qui met en relation les commerces avec",
    descriptionBold: "des milliers",
    descriptionMid: "de consommateurs. Piksou a transformé le marché en",
    descriptionHighlight: "redéfinissant",
    descriptionEnd: "la façon dont les enseignes communiquent avec leurs consommateurs.",
    testimonials: [
      {
        quote: "De nouveaux clients arrivent en sachant déjà exactement ce qu'ils veulent. Cela a augmenté notre compétitivité sur le marché.",
        author: "John",
        role: "Gérant",
        company: "My Family Grocery",
        logo: "/images/partners/testimonials/testimonial-2.png",
      },
      {
        quote: "Le partenariat avec PikSou nous a aidés à atteindre plus de clients et à augmenter les ventes en magasin. Les acheteurs découvrent maintenant nos offres facilement.",
        author: "Peterson Jennings",
        role: "Directeur Marketing",
        company: "Super U",
        logo: "/images/partners/testimonials/testimonial-1.png",
      },
      {
        quote: "PikSou a facilité le suivi des offres et leur comparaison avec les concurrents. Plus de clients nous visitent maintenant.",
        author: "Sarah",
        role: "Propriétaire",
        company: "Local Store",
        logo: "/images/partners/testimonials/testimonial-3.png",
      },
    ] as Testimonial[],
  },
}

export default function Testimonials({ locale = "en" }: WhyProps) {
  const t = content[locale]
  const [currentIndex, setCurrentIndex] = useState(1)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? t.testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === t.testimonials.length - 1 ? 0 : prev + 1))
  }

  // Auto-advance carousel every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === t.testimonials.length - 1 ? 0 : prev + 1))
    }, 8000)

    return () => clearInterval(interval)
  }, [t.testimonials.length])

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="handwritten text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white">
              {t.title}{" "}
              <span className="text-sugarcane-green dark:text-emerald-400">{t.titleHighlight}</span>
            </h2>
          </div>

          {/* Description */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="font-sans text-lg md:text-2xl text-black dark:text-gray-300 leading-relaxed">
              <Image
                src="/images/partners/testimonials/piksou.png"
                alt="PikSou"
                width={120}
                height={50}
                className="inline-block align-middle h-10 md:h-14 w-auto"
              />{" "}
              {t.description}{" "}
              <span className="font-bold">{t.descriptionBold}</span>{" "}
              {t.descriptionMid}{" "}
              <span className="relative inline-block">
                <span className="handwritten text-sugarcane-green dark:text-emerald-400">{t.descriptionHighlight}</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 2, 50 5 T 100 4" stroke="currentColor" strokeWidth="2" fill="none" className="text-emerald-400" />
                </svg>
              </span>{" "}
              {t.descriptionEnd}
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative">
            <div className="flex items-center justify-center gap-4 md:gap-6">
              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-20"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-gray-400" />
              </button>

              {/* Testimonial Cards */}
              <div className="flex items-center justify-center gap-4 md:gap-6 overflow-hidden">
                {t.testimonials.map((testimonial, index) => {
                  const isActive = index === currentIndex
                  const isPrev = index === (currentIndex === 0 ? t.testimonials.length - 1 : currentIndex - 1)
                  const isNext = index === (currentIndex === t.testimonials.length - 1 ? 0 : currentIndex + 1)

                  if (!isActive && !isPrev && !isNext) return null

                  return (
                    <div
                      key={index}
                      className={`
                        transition-all duration-500 ease-in-out relative
                        ${isActive
                          ? "z-10"
                          : "hidden md:block"
                        }
                        ${isPrev ? "order-first" : ""}
                        ${isNext ? "order-last" : ""}
                      `}
                    >
                      <div className={`
                        bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden flex flex-col
                        ${isActive ? "w-[320px] md:w-[480px] h-[280px] md:h-[320px]" : "w-64 md:w-80 h-[280px] md:h-[320px]"}
                      `}>
                        {/* Gradient blur overlay for inactive cards */}
                        {!isActive && (
                          <div
                            className={`absolute inset-0 z-10 pointer-events-none
                              ${isPrev
                                ? "bg-gradient-to-r from-white/90 via-white/50 to-transparent dark:from-gray-900/90 dark:via-gray-900/50"
                                : "bg-gradient-to-l from-white/90 via-white/50 to-transparent dark:from-gray-900/90 dark:via-gray-900/50"
                              }
                            `}
                          />
                        )}

                        {/* Logo */}
                        <div className="flex justify-center mb-4">
                          <div className="w-12 h-12 relative">
                            <Image
                              src={testimonial.logo}
                              alt={testimonial.company}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>

                        {/* Quote */}
                        <blockquote className={`
                          handwritten text-center text-black font-bold dark:text-gray-300 flex-grow flex items-center justify-center
                          ${isActive ? "text-base md:text-lg" : "text-sm"}
                        `}>
                          <span>"{testimonial.quote}"</span>
                        </blockquote>

                        {/* Author */}
                        <div className={`text-center mt-4 ${!isActive ? "opacity-70" : ""}`}>
                          <p className="font-sans text-sm font-medium text-sugarcane-green dark:text-white">
                            - {testimonial.author}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-20"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {t.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-emerald-600 dark:bg-emerald-400"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
