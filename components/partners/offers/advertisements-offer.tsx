import Image from "next/image"
import AudienceInsights from "@/components/partners/audience-insights"

interface AdvertisementsOfferProps {
  locale?: "en" | "fr"
}

const content = {
  en: {
    title: "Engage Shoppers Throughout their Journey",
    subtitle: "REACH SHOPPERS WHEN THEY'RE READY TO BUY",
    banners: [
      {
        title: "Home Page Hero Banner",
        highlight: "Maximum Awareness",
        image: "/images/partners/what-we-offer/advertisment-1.svg",
      },
      {
        title: "Shopping List Banner",
        highlight: "Influence Before Checkout",
        image: "/images/partners/what-we-offer/advertisment-2.svg",
      },
      {
        title: "Search Result Banner",
        highlight: "Contextual Advertising",
        image: "/images/partners/what-we-offer/advertisment-3.svg",
      },
    ],
  },
  fr: {
    title: "Engagez les acheteurs tout au long de leur parcours",
    subtitle: "TOUCHEZ LES ACHETEURS LORSQU'ILS SONT PRÊTS À ACHETER",
    banners: [
      {
        title: "Banniere Hero Page d'Accueil",
        highlight: "Notoriété Maximale",
        image: "/images/partners/what-we-offer/advertisment-1.svg",
      },
      {
        title: "Banniere Liste de Courses",
        highlight: "Influence Avant le Paiement",
        image: "/images/partners/what-we-offer/advertisment-2.svg",
      },
      {
        title: "Banniere Resultats de Recherche",
        highlight: "Publicité Contextuelle",
        image: "/images/partners/what-we-offer/advertisment-1.svg",
      },
    ],
  },
}

export default function AdvertisementsOffer({ locale = "en" }: AdvertisementsOfferProps) {
  const t = content[locale]

  return (
    <div className="text-center">
      <h3 className="handwritten text-4xl font-bold leading-tight text-[#087157] dark:text-[var(--text-main)] md:text-5xl">
        {t.title}
      </h3>
      <p className="font-norwester mt-3 text-sm font-black uppercase tracking-[0.16em] text-[#48c774]">
        {t.subtitle}
      </p>

      <div className="mt-16 grid grid-cols-1 items-end gap-10 lg:grid-cols-3">
        {t.banners.map((banner, index) => (
          <div
            key={banner.title}
            className={`flex flex-col items-center ${index === 1 ? "lg:-translate-y-8" : "lg:translate-y-4"}`}
          >
            <h4 className="font-norwester text-2xl uppercase leading-tight text-[#087157] dark:text-[var(--text-main)] md:text-3xl">
              {banner.title}
            </h4>
            <p className="handwritten mt-1 text-xl text-[#48c774] md:text-2xl">
              {banner.highlight}
            </p>
            <div className="relative mt-8 h-[280px] w-full max-w-[420px]">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 90vw, 420px"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <AudienceInsights locale={locale} />
      </div>
    </div>
  )
}
