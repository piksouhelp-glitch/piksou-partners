"use client"

import Image from "next/image"
import FadeIn from "@/components/animations/fade-in"

interface PartnersPageLogosProps {
  locale?: "en" | "fr"
}

const content = {
  en: {
    label: "Our Partners",
    title: "Proud to work with",
    titleHighlight: "Mauritius'",
    titleEnd: "leading retailers",
    description:
      "We collaborate with trusted brands to help customers discover the best deals across the island.",
  },
  fr: {
    label: "Nos Partenaires",
    title: "Fier de travailler avec les commerces",
    titleHighlight: "les plus solides",
    titleEnd: "",
    description:
      "Nous collaborons avec des marques de confiance pour aider les clients à découvrir les meilleures offres sur l'île.",
  },
}

const partners = [
  { name: "Intermart", logo: "/images/partners/logos/partner-1.svg" },
  { name: "Pick N Pay", logo: "/images/partners/logos/partner-2.svg" },
  { name: "WayA", logo: "/images/partners/logos/partner-3.svg" },
  { name: "My Family", logo: "/images/partners/logos/partner-4.svg" },
  { name: "Jumbo", logo: "/images/partners/logos/partner-5.svg" },
  { name: "Carrefour", logo: "/images/partners/logos/partner-6.svg" },
  { name: "Super U", logo: "/images/partners/logos/partner-7.svg" },
  { name: "GSR", logo: "/images/partners/logos/partner-8.svg" },
  { name: "Shoprite", logo: "/images/partners/logos/partner-9.svg" },
]

export default function PartnersPageLogos({ locale = "en" }: PartnersPageLogosProps) {
  const t = content[locale]

  return (
    <section
      id="partners-logos"
      className="scroll-mt-24 py-16 md:py-12 -mt-24 md:-mt-32 relative z-20 transition-colors duration-300 overflow-hidden bg-gradient-to-b from-white/90 via-white to-white dark:from-gray-900/90 dark:via-gray-900 dark:to-gray-900"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="font-bold text-sugarcane-green dark:text-emerald-400 mb-4 text-2xl">
              {t.label}
            </p>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.title}{" "}
              <span className="handwritten text-sugarcane-green dark:text-emerald-400">{t.titleHighlight}</span>{" "}
              {t.titleEnd}
            </h2>
            <p className="font-sans text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              {t.description}
            </p>
          </div>
        </FadeIn>

        {/* Infinite Scrolling Partner Logos */}
        {/* <div className="w-full overflow-hidden">
          <div className="flex animate-scroll">
            {partners.map((partner, index) => (
              // <div
              //   key={`first-${index}`}
              //   className="flex-shrink-0 mx-8 md:mx-12 w-28 h-20 md:w-36 md:h-24 relative"
              // >
              //   <Image
              //     src={partner.logo}
              //     alt={partner.name}
              //     fill
              //     className="object-contain"
              //     sizes="(max-width: 768px) 112px, 144px"
              //   />
              // </div>
            ))} */}
            {/* Duplicate for seamless loop */}
            {/* {partners.map((partner, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12 w-28 h-20 md:w-36 md:h-24 relative"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 112px, 144px"
                />
              </div>
            ))} */}
          {/* </div> */}
        {/* </div> */}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </section>
  )
}
