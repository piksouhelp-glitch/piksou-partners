import Image from "next/image"
import DecorativeImage from "@/components/partners/decorative-image"

interface RetailFutureProps {
  locale?: "en" | "fr"
}

const content = {
  en: {
    title: "Let's Build the Future of",
    titleHighlight: "Retail Intelligence Together.",
    subtitle:
      "Partner with PikSou to reach high-intent shoppers, reward them and turn insights into measurable growth.",
    steps: [
      { icon: "/Icons/build-together/icon-1.svg", label: "Launch a Pilot Programme" },
      { icon: "/Icons/build-together/icon-2.jpg", label: "Select Campaign Objectives" },
      { icon: "/Icons/build-together/icon-3.svg", label: "Measure Real Business Impact" },
    ],
  },
  fr: {
    title: "Construisons l'avenir de",
    titleHighlight: "l'intelligence retail ensemble.",
    subtitle:
      "Associez-vous a PikSou pour toucher des acheteurs a forte intention, les recompenser et transformer les insights en croissance mesurable.",
    steps: [
      { icon: "/Icons/build-together/icon-1.svg", label: "Lancer un programme pilote" },
      { icon: "/Icons/build-together/icon-2.jpg", label: "Choisir les objectifs campagne" },
      { icon: "/Icons/build-together/icon-3.svg", label: "Mesurer l'impact business reel" },
    ],
  },
}

export default function RetailFuture({ locale = "en" }: RetailFutureProps) {
  const t = content[locale]

  return (
    <section className="relative overflow-hidden bg-[var(--page-bg)] px-4 py-24 text-center transition-colors duration-300 sm:px-6 lg:px-8">
      <DecorativeImage
        src="/images/partners/hero/hero-decoration-2.svg"
        className="-left-16 top-20 h-44 w-44 md:h-72 md:w-72"
        opacity="opacity-50"
      />
      <DecorativeImage
        src="/images/partners/what-we-offer/arrow-decoration-3.svg"
        className="-right-10 bottom-32 h-32 w-32 md:h-52 md:w-52"
        opacity="opacity-80"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="handwritten mx-auto max-w-3xl text-4xl font-bold leading-tight text-[#087157] dark:text-[var(--text-main)] md:text-5xl">
          {t.title} <span className="text-[#48c774]">{t.titleHighlight}</span>
        </h2>
        <p className="font-poppins mx-auto mt-6 max-w-4xl text-sm font-bold leading-relaxed text-black dark:text-[var(--text-body)] md:text-base">
          {t.subtitle}
        </p>

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {t.steps.map((step, index) => (
            <div
              key={step.label}
              className={`relative flex flex-col items-center ${
                index === 1 ? "md:-translate-y-8" : "md:translate-y-8"
              }`}
            >
              {index < t.steps.length - 1 && (
                <div
                  className={`absolute left-[63%] hidden h-16 w-48 md:block ${
                    index === 0 ? "top-12" : "top-20"
                  }`}
                >
                  <Image
                    src={`/Icons/build-together/arrow-icon-${index + 1}.svg`}
                    alt=""
                    fill
                    className="object-contain"
                    aria-hidden="true"
                  />
                </div>
              )}
              <div className={`relative mb-8 ${index === 2 ? "h-20 w-20" : "h-24 w-24"}`}>
                <Image
                  src={step.icon}
                  alt=""
                  fill
                  className="object-contain"
                  aria-hidden="true"
                />
              </div>
              <p
                className={`font-norwester max-w-[220px] text-2xl uppercase leading-tight ${
                  index === 1 ? "text-[#48c774]" : "text-[#087157] dark:text-[var(--text-main)]"
                }`}
              >
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
