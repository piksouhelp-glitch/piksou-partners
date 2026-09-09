"use client"

import { useState } from "react"
import Image from "next/image"

interface RetailIntelligenceOfferProps {
  locale?: "en" | "fr"
}

const content = {
  en: {
    title: "Suite of business intelligence features to make smarter decisions and improve outcomes",
    comingSoon: "Coming Soon",
    features: [
      {
        title: "Promotion Dataset Dashboard",
        image: "/images/partners/what-we-offer/analytics-dashboard.svg",
      },
      {
        title: "Verified Purchase Dashboard",
        image: "/images/partners/what-we-offer/data-map.svg",
      },
      {
        title: "Customer Intent Dashboard",
        image: "/images/partners/what-we-offer/analytics-site.svg",
      },
    ],
  },
  fr: {
    title:
      "Une suite d'outils d'intelligence commerciale pour prendre de meilleures décisions et améliorer les résultats",
    comingSoon: "Bientot",
    features: [
      {
        title: "Tableau de bord des donnees promotionnelles",
        image: "/images/partners/what-we-offer/analytics-dashboard.svg",
      },
      {
        title: "Tableau de bord des achats verifies",
        image: "/images/partners/what-we-offer/data-map.svg",
      },
      {
        title: "Tableau de bord de l'intention client",
        image: "/images/partners/what-we-offer/analytics-site.svg",
      },
    ],
  },
}

export default function RetailIntelligenceOffer({ locale = "en" }: RetailIntelligenceOfferProps) {
  const t = content[locale]
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0)
  const activeFeature = t.features[activeFeatureIndex] ?? t.features[0]

  return (
    <div className="mx-auto max-w-6xl">
      <h3 className="font-norwester mx-auto max-w-4xl text-center text-3xl font-black uppercase leading-tight tracking-wide text-[#48c774] md:text-4xl">
        {t.title}
      </h3>

      <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-8 text-left">
          {t.features.map((feature, index) => (
            <button
              key={feature.title}
              type="button"
              onClick={() => setActiveFeatureIndex(index)}
              className={`block w-full text-left font-norwester text-2xl font-black uppercase leading-tight transition-colors duration-200 md:text-3xl ${
                index === activeFeatureIndex
                  ? "text-[#087157] underline decoration-[#087157] dark:text-[var(--text-main)] dark:decoration-[var(--text-main)]"
                  : "text-neutral-500 hover:text-[#087157] dark:text-[var(--text-muted)] dark:hover:text-[var(--text-main)]"
              }`}
              aria-pressed={index === activeFeatureIndex}
            >
              <span>
                {index === activeFeatureIndex && <span className="mr-3 text-[#087157] dark:text-[var(--text-main)]">&gt;</span>}
                {feature.title}
              </span>
            </button>
          ))}
        </div>

        <div className="relative h-[360px] w-full md:h-[500px]">
          <div className="handwritten absolute left-1/2 top-0 z-10 -translate-x-1/2 text-center text-3xl font-bold leading-none text-[#087157] drop-shadow-sm dark:text-[var(--text-main)] md:text-5xl">
            {t.comingSoon}
          </div>
          <Image
            key={activeFeature.image}
            src={activeFeature.image}
            alt={activeFeature.title}
            fill
            className="object-contain object-center drop-shadow-xl"
            sizes="(max-width: 1024px) 90vw, 720px"
          />
        </div>
      </div>
    </div>
  )
}
