import Image from "next/image"

interface PiksouBusinessOfferProps {
  locale?: "en" | "fr"
}

const content = {
  en: {
    brand: "PikSou Direct",
    title: "Cut out the middleman and improve your margins.",
    cta: "View Store",
    subtitle: "List your products and sell directly to SMEs",
    categories: [
      { image: "/Icons/business/icon-1.svg", label: "Restaurants" },
      { image: "/Icons/business/icon-2.svg", label: "Event Organizers" },
      { image: "/Icons/business/icon-3.svg", label: "Cafes" },
      { image: "/Icons/business/icon-4.svg", label: "Pubs" },
      { image: "/Icons/business/icon-5.svg", label: "Hotels" },
    ],
    moreLead: "And",
    moreRest: "Many More...",
  },
  fr: {
    brand: "PikSou Direct",
    title: "Supprimez les intermediaires et ameliorez vos marges.",
    cta: "Voir Store",
    subtitle: "Listez vos produits et vendez directement aux SMEs",
    categories: [
      { image: "/Icons/business/icon-1.svg", label: "Restaurants" },
      { image: "/Icons/business/icon-2.svg", label: "Organisateurs" },
      { image: "/Icons/business/icon-3.svg", label: "Cafes" },
      { image: "/Icons/business/icon-4.svg", label: "Pubs" },
      { image: "/Icons/business/icon-5.svg", label: "Hotels" },
    ],
    moreLead: "Et",
    moreRest: "beaucoup plus...",
  },
}

const directImages = [
  "/images/partners/what-we-offer/piksou-direct-1.png",
  "/images/partners/what-we-offer/piksou-direct-2.png",
  "/images/partners/what-we-offer/piksou-direct-3.png",
]

const directImagePositions = ["is-center", "is-left", "is-right"]

export default function PiksouBusinessOffer({ locale = "en" }: PiksouBusinessOfferProps) {
  const t = content[locale]

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="text-left">
          <div className="relative h-24 w-80 max-w-full">
            <Image
              src="/images/partners/what-we-offer/piksou-store.svg"
              alt={t.brand}
              fill
              className="object-contain object-center"
              sizes="208px"
            />
          </div>
          <p className="mt-8 max-w-lg text-2xl font-norwester uppercase leading-tight text-[#48c774]">
            {t.title}
          </p>
          <button className="mt-6 min-w-[220px] rounded-full border border-[#48c774] px-12 py-3 font-handwritten text-lg font-black leading-none text-[#48c774] transition-colors duration-300 hover:bg-[#48c774] hover:text-white dark:border-[#48c774] dark:text-[#48c774]">
            {t.cta} <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="relative h-[360px]">
          <Image
            src="/images/partners/what-we-offer/piksou-direct.png"
            alt={t.brand}
            fill
            className="object-contain object-center"
            sizes="(max-width: 1024px) 90vw, 560px"
          />
        </div>
      </div>

      <h4 className="mt-14 text-center text-2xl font-norwester uppercase leading-tight text-[#087157] dark:text-[var(--text-main)]">
        {t.subtitle}
      </h4>

      <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-5">
        {t.categories.map((category) => (
          <div key={category.label} className="text-center">
            <div className="relative mx-auto h-16 w-16">
              <Image
                src={category.image}
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
              />
            </div>
            <p className="mt-3 text-sm font-norwester uppercase text-[#087157] dark:text-[var(--text-body)]">{category.label}</p>
          </div>
        ))}
      </div>

      <p className="handwritten mt-12 text-center text-3xl font-bold">
        <span className="text-[#48C774]">{t.moreLead}</span>{" "}
        <span className="text-[#075F46] dark:text-[var(--text-main)]">{t.moreRest}</span>
      </p>

      <div className="piksou-direct-carousel relative mx-auto mt-12 h-[430px] w-full max-w-[1180px] overflow-hidden">
        {directImages.map((image, index) => (
          <div
            key={image}
            className={`piksou-direct-slide ${directImagePositions[index]} absolute left-1/2 top-1/2 h-[360px] w-[720px] max-sm:h-[250px] max-sm:w-[390px]`}
          >
            <Image
              src={image}
              alt={`${t.brand} preview ${index + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 560px"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="min-w-[280px] rounded-full bg-[#48C774] px-14 py-4 font-handwritten text-xl font-bold leading-none text-white shadow-[0_10px_24px_rgba(72,199,116,0.22)]">
          {t.cta} <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}
