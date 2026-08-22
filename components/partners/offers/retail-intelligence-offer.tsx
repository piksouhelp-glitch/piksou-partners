import Image from "next/image"

interface RetailIntelligenceOfferProps {
  locale?: "en" | "fr"
}

const content = {
  en: {
    title: "Suite of business intelligence features to make smarter decisions and improve outcomes",
    features: [
      "Promotional dataset dashboards",
      "Customer intent dashboards",
      "Verified purchases dashboards",
    ],
  },
  fr: {
    title:
      "Une suite d'intelligence commerciale pour prendre de meilleures decisions et ameliorer les resultats",
    features: [
      "Dashboards datasets promotionnels",
      "Dashboards d'intention client",
      "Dashboards achats verifies",
    ],
  },
}

export default function RetailIntelligenceOffer({ locale = "en" }: RetailIntelligenceOfferProps) {
  const t = content[locale]

  return (
    <div className="mx-auto max-w-6xl">
      <h3 className="font-norwester mx-auto max-w-4xl text-center text-3xl font-black uppercase leading-tight tracking-wide text-[#48c774] md:text-4xl">
        {t.title}
      </h3>

      <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-8 text-left">
          {t.features.map((feature, index) => (
            <div
              key={feature}
              className={`text-2xl font-black font-norwester uppercase leading-tight md:text-3xl ${
                index === 0
                  ? "text-[#087157] underline decoration-[#087157] dark:text-[var(--text-main)] dark:decoration-[var(--text-main)]"
                  : "text-neutral-500 dark:text-[var(--text-muted)]"
              }`}
            >
              {index === 0 && <span className="mr-3 text-[#087157] dark:text-[var(--text-main)]">&gt;</span>}
              {feature}
            </div>
          ))}
        </div>

        <div className="relative h-[360px] w-full md:h-[500px]">
          <Image
            src="/images/partners/what-we-offer/analytics-dashboard.svg"
            alt={t.features[0]}
            fill
            className="object-contain object-center drop-shadow-xl"
            sizes="(max-width: 1024px) 90vw, 720px"
          />
        </div>
      </div>
    </div>
  )
}
