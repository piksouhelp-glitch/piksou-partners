"use client"

import Link from "next/link"
import Image from "next/image"

interface HeroProps {
  locale?: "en" | "fr"
}

const content = {
  en: {
    taglineStart: "Tired of printing brochures and catalogues with your promotions",
    taglineHighlight: "without",
    taglineEnd: "knowing your Return on Investment (ROI)?",
    title: "Partner with",
    titleHighlight: "PikSou",
    subtitleBold1: "Increase visibility, get detailed insights & analytics",
    subtitleNormal1: "and even",
    subtitleBold2: "get orders directly",
    subtitleNormal2: "to significantly increase footfall and revenue.",
    cta: "Contact Us",
    stats: [
      { value: "15", suffix: "+", label: "Stores Listed", icon: "/images/partners/hero/stores-logo.svg" },
      { value: "5000", suffix: "+", label: "Active Users", icon: "/images/partners/hero/customer-logo.svg" },
      { value: "1000", suffix: "+", label: "Deals Compared Daily", icon: "/images/partners/hero/partner-logo.svg" },
    ],
  },
  fr: {
    taglineStart: "Vous imprimez encore des brochures et des catalogues",
    taglineHighlight: "sans",
    taglineEnd: "vraiment savoir si ça donne un vrai retour sur investissement?",
    title: "Devenez partenaire de",
    titleHighlight: "PikSou",
    subtitleBold1: "Augmentez votre visibilité et le passage en magasin.",
    subtitleNormal1: "Obtenez des données claires sur ce qui attire vraiment vos clients.",
    subtitleBold2: "Bientôt, vous pourrez aussi proposer des commandes directes via la plateforme.",
    subtitleNormal2: "",
    cta: "Contactez-nous",
    stats: [
      { value: "15", suffix: "+", label: "Magasins Listés", icon: "/images/partners/hero/stores-logo.svg" },
      { value: "5000", suffix: "+", label: "Utilisateurs Actifs", icon: "/images/partners/hero/customer-logo.svg" },
      { value: "1000", suffix: "+", label: "Offres Comparées par Jour", icon: "/images/partners/hero/partner-logo.svg" },
    ],
  },
}

export default function Hero({ locale = "en" }: HeroProps) {
  const t = content[locale]

  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="scroll-mt-24 relative bg-white dark:bg-gray-900 pt-32 pb-16 md:pt-40 md:pb-24 transition-colors duration-300 overflow-hidden"
      >
        {/* Decorative dollar sign images */}
        {/* Top left - attached to edge */}
        <div className="absolute top-16 left-0 w-44 h-24 md:w-50 md:h-40 pointer-events-none opacity-80">
          <Image
            src="/images/partners/hero/hero-decoration-2.svg"
            alt=""
            fill
            className="object-contain blur-[2px]"
            aria-hidden="true"
          />
        </div>

        {/* Top right - attached to edge */}
        <div className="absolute top-20 right-0 w-28 h-28 md:w-44 md:h-44 pointer-events-none opacity-70">
          <Image
            src="/images/partners/hero/hero-decoration-3.svg"
            alt=""
            fill
            className="object-contain blur-[2px]"
            aria-hidden="true"
          />
        </div>

        {/* Middle right - attached to edge */}
        <div className="absolute top-1/3 right-0 w-20 h-20 md:w-32 md:h-32 pointer-events-none opacity-90
        ">
          <Image
            src="/images/partners/hero/hero-decoration-4.svg"
            alt=""
            fill
            className="object-contain blur-[2px]"
            aria-hidden="true"
          />
        </div>

        {/* Bottom left - attached to edge */}
        <div className="absolute bottom-24 left-0 w-24 h-24 md:w-40 md:h-40 pointer-events-none opacity-75">
          <Image
            src="/images/partners/hero/hero-decoration-6.svg"
            alt=""
            fill
            className="object-contain blur-[2px]"
            aria-hidden="true"
          />
        </div>

        {/* Bottom right - attached to edge */}
        <div className="absolute bottom-16 right-0 w-24 h-24 md:w-36 md:h-36 pointer-events-none opacity-90">
          <Image
            src="/images/partners/hero/hero-decoration-4.svg"
            alt=""
            fill
            className="object-contain blur-[2px]"
            aria-hidden="true"
          />
        </div>

        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Tagline */}
          <p className="font-sans text-base md:text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {t.taglineStart}{" "}
            <span className="text-sugarcane-green dark:text-emerald-400">{t.taglineHighlight}</span>{" "}
            {t.taglineEnd}
          </p>

          {/* Main Title */}
          <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            {t.title}{" "}
            <span className="relative inline-block">
              <span className="handwritten text-sugarcane-green dark:text-emerald-400">{t.titleHighlight}</span>
              {/* Icon on top right of PikSou */}
              <Image
                src="/images/partners/hero/piksou-decoration.png"
                alt=""
                width={32}
                height={32}
                className="absolute -top-2 -right-3 md:-top-3 md:-right-4 w-6 h-6 md:w-8 md:h-8"
                aria-hidden="true"
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-xl md:text-2xl text-black dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            <span className="font-bold text-black dark:text-white">{t.subtitleBold1}</span>{" "}
            {t.subtitleNormal1}{" "}
            <span className="font-bold text-black dark:text-white">{t.subtitleBold2}</span>{" "}
            {t.subtitleNormal2}
          </p>

          {/* CTA Button */}
          <Link
            href="#contact-form"
            className="min-w-sm inline-block font-handwritten text-xl bg-sugarcane-green hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            {t.cta}
          </Link>

          {/* Stats */}
          <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start justify-items-center">
            {t.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Image
                    className="w-12 h-12 md:w-16 md:h-16"
                    src={stat.icon}
                    alt={stat.suffix}
                    width={100}
                    height={100}
                  />
                </div>
                <span className="text-4xl md:text-5xl font-bold text-balck dark:text-emerald-400">
                  {stat.value}
                  <span className="text-sugarcane-green dark:text-emerald-300">{stat.suffix}</span>
                </span>
                <p className="font-handwritten font-bold text-xl md:text-text-xl text-sugarcane-green dark:text-emerald-600 mt-1 italic">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
