import Image from "next/image"

interface RewardsCampaignOfferProps {
  locale?: "en" | "fr"
}

const content = {
  en: {
    title: "Verified Purchases Rewards Program",
    steps: [
      { icon: "/Icons/rewards/icon-1.svg", label: "Verify purchases" },
      { icon: "/Icons/rewards/icon-2.svg", label: "Reward shoppers" },
      { icon: "/Icons/rewards/icon-3.svg", label: "Grow your brands" },
    ],
    howItWorks: "How it works",
    flow: [
      {
        image: "/images/partners/what-we-offer/mobile-homepage.svg",
        title: "Discover",
        desc: "Shoppers find promotions on PikSou",
      },
      {
        image: "/images/partners/what-we-offer/shop.svg",
        title: "Shop",
        desc: "They buy what they need at their favorite stores",
      },
      {
        image: "/images/partners/what-we-offer/receipt-scanner.svg",
        title: "Verify",
        desc: "They scan their receipt. We verify real purchases.",
      },
      {
        image: "/images/partners/what-we-offer/reward-system.svg",
        title: "Reward",
        desc: "Shoppers get instant rewards they can use and love.",
      },
      {
        image: "/images/partners/what-we-offer/analytics-site.svg",
        title: "Grow",
        desc: "You get real insights that grow your brands.",
      },
    ],
    partnerTitle: "Becoming a founding partner",
    partnerCopy:
      "Join a select group of forward-thinking distributors shaping the future of promotions in Mauritius.",
    partnerBenefits: [
      { image: "/Icons/rewards/icon-5.png", title: "Early Access", desc: "to exclusive features" },
      { image: "/Icons/rewards/icon-6.png", title: "Co-Create", desc: "smarter promo solutions" },
      { image: "/Icons/rewards/icon-7.png", title: "Stronger", desc: "partnerships" },
      { image: "/Icons/rewards/icon-8.png", title: "Better Results", desc: "together" },
    ],
    shoppersWin: "Shoppers Win",
    distributorsWin: "Distributors Win",
    shopperWins: [
      { image: "/Icons/rewards/icon-9.png", label: "Save on brands they love" },
      { image: "/Icons/rewards/icon-10.png", label: "Instant rewards that feel great" },
      { image: "/Icons/rewards/icon-11.png", label: "Personalized offers just for them" },
      { image: "/Icons/rewards/icon-12.png", label: "Smarter shopping experience" },
    ],
    distributorWins: [
      { image: "/Icons/rewards/icon-8.png", label: "Measure real ROI" },
      { image: "/Icons/rewards/icon-13.png", label: "Acquire new customers" },
      { image: "/Icons/rewards/icon-14.png", label: "Increase repeat purchases" },
      { image: "/Icons/rewards/icon-15.png", label: "Understand your shoppers" },
    ],
    signoff: "Smarter every time. Stronger every campaign!",
  },
  fr: {
    title: "Programme de recompenses achats verifies",
    steps: [
      { icon: "/Icons/rewards/icon-1.svg", label: "Verifier les achats" },
      { icon: "/Icons/rewards/icon-2.svg", label: "Recompenser les shoppers" },
      { icon: "/Icons/rewards/icon-3.svg", label: "Developper vos marques" },
    ],
    howItWorks: "Comment ca marche",
    flow: [
      {
        image: "/images/partners/what-we-offer/mobile-homepage.svg",
        title: "Decouvrir",
        desc: "Les shoppers trouvent les promotions sur PikSou",
      },
      {
        image: "/images/partners/what-we-offer/shop.svg",
        title: "Acheter",
        desc: "Ils achetent dans leurs magasins favoris",
      },
      {
        image: "/images/partners/what-we-offer/receipt-scanner.svg",
        title: "Verifier",
        desc: "Ils scannent leur recu. Nous verifions l'achat.",
      },
      {
        image: "/images/partners/what-we-offer/reward-system.svg",
        title: "Recompenser",
        desc: "Ils recoivent des recompenses instantanees.",
      },
      {
        image: "/images/partners/what-we-offer/analytics-dashboard.svg",
        title: "Grandir",
        desc: "Vous obtenez des insights reels pour vos marques.",
      },
    ],
    partnerTitle: "Devenir partenaire fondateur",
    partnerCopy:
      "Rejoignez des distributeurs qui faconnent l'avenir des promotions a Maurice.",
    partnerBenefits: [
      { image: "/Icons/rewards/icon-5.png", title: "Acces anticipe", desc: "aux nouvelles features" },
      { image: "/Icons/rewards/icon-6.png", title: "Co-creer", desc: "des solutions promo" },
      { image: "/Icons/rewards/icon-7.png", title: "Plus forts", desc: "ensemble" },
      { image: "/Icons/rewards/icon-8.png", title: "Meilleurs resultats", desc: "mesurables" },
    ],
    shoppersWin: "Les shoppers gagnent",
    distributorsWin: "Les distributeurs gagnent",
    shopperWins: [
      { image: "/Icons/rewards/icon-9.png", label: "Economiser sur les marques aimees" },
      { image: "/Icons/rewards/icon-10.png", label: "Des recompenses instantanees" },
      { image: "/Icons/rewards/icon-11.png", label: "Des offres personnalisees" },
      { image: "/Icons/rewards/icon-12.png", label: "Une experience plus intelligente" },
    ],
    distributorWins: [
      { image: "/Icons/rewards/icon-8.png", label: "Mesurer le ROI reel" },
      { image: "/Icons/rewards/icon-13.png", label: "Acquerir de nouveaux clients" },
      { image: "/Icons/rewards/icon-14.png", label: "Augmenter les achats repetes" },
      { image: "/Icons/rewards/icon-15.png", label: "Comprendre vos shoppers" },
    ],
    signoff: "Plus malin a chaque fois. Plus fort a chaque campagne!",
  },
}

export default function RewardsCampaignOffer({ locale = "en" }: RewardsCampaignOfferProps) {
  const t = content[locale]
  const isFrench = locale === "fr"

  return (
    <div className="relative mx-auto max-w-6xl">
      <div
        className="pointer-events-none absolute top-[42px] z-0 hidden h-[620px] w-[820px] lg:block"
        style={{ right: "calc(50% - 50vw)" }}
      >
        <Image
          src="/images/partners/what-we-offer/decoration-2.svg"
          alt=""
          fill
          className="object-contain object-right"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:translate-x-10 lg:grid-cols-[0.9fr_1.1fr] xl:translate-x-14">
        <div className="text-center lg:text-left">
          <h3 className="mx-auto max-w-md text-center text-3xl font-norwester uppercase leading-tight text-[#48c774] md:text-4xl lg:mx-0">
            {t.title}
          </h3>
          <div className="mx-auto mt-12 flex max-w-xs flex-col items-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-5 lg:mx-0 lg:justify-start">
            {t.steps.map((step, index) => (
              <div
                key={step.label}
                className={`flex flex-col items-center gap-3 sm:flex-row ${
                  isFrench ? "sm:gap-3" : "sm:gap-4"
                }`}
              >
                <div className={`flex items-center justify-center ${isFrench ? "gap-3" : "gap-3"}`}>
                  <div className={`relative shrink-0 ${isFrench ? "h-11 w-11 md:h-12 md:w-12" : "h-12 w-12"}`}>
                    <Image
                      src={step.icon}
                      alt=""
                      fill
                      className="object-contain"
                      aria-hidden="true"
                    />
                  </div>
                  <p
                    className={`max-w-[140px] text-left font-semibold leading-tight text-[#087157] dark:text-[var(--text-body)] ${
                      isFrench
                        ? "text-base sm:max-w-[170px] md:text-[1.05rem]"
                        : "text-lg sm:max-w-[110px]"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {index < t.steps.length - 1 && (
                  <>
                    <span
                      className="text-3xl font-bold leading-none text-[#48c774] sm:hidden"
                      aria-hidden="true"
                    >
                      ↓
                    </span>
                    <span
                      className={`hidden font-bold leading-none text-[#48c774] sm:block ${
                        isFrench ? "text-2xl" : "text-3xl"
                      }`}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[420px] overflow-visible lg:-mr-[4vw] xl:-mr-[6vw]">
          <div className="absolute bottom-[-34px] right-[-2vw] h-[540px] w-[700px] lg:hidden">
            <Image
              src="/images/partners/what-we-offer/decoration-2.svg"
              alt=""
              fill
              className="object-contain object-bottom"
              aria-hidden="true"
            />
          </div>
          <div className="absolute bottom-0 right-[8vw] z-10 h-[420px] w-[520px] lg:right-[6vw]">
            <Image
              src="/images/partners/what-we-offer/piksou-reward.svg"
              alt={t.title}
              fill
              className="object-contain object-right"
              sizes="(max-width: 1024px) 90vw, 620px"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-center gap-3 sm:gap-6">
        <span className="h-px w-16 bg-[#075F46] dark:bg-[var(--border-soft)] sm:w-32 md:w-48" />
        <h4 className="shrink-0 whitespace-nowrap text-xl font-norwester uppercase text-[#075F46] dark:text-[var(--text-main)]">
          {t.howItWorks}
        </h4>
        <span className="h-px w-16 bg-[#075F46] dark:bg-[var(--border-soft)] sm:w-32 md:w-48" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-5">
        {t.flow.map((item) => (
          <div key={item.title} className="grid grid-cols-[92px_1fr] items-center gap-5 text-left sm:block sm:text-center">
            <div className="relative h-24 w-24 sm:mx-auto sm:mb-4">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
              />
            </div>
            <div>
              <h5 className="text-lg font-norwester uppercase text-[#087157] dark:text-[var(--text-main)]">{item.title}</h5>
              <p className="mt-2 font-poppins text-sm font-semibold leading-snug text-[#087157] dark:text-[var(--text-body)]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-[8px] border border-[#48c774] bg-white/20 p-6 dark:bg-white/5 md:p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.25fr_2.5fr] md:items-center">
          <div className="md:pr-6">
            <h4 className="text-2xl font-norwester uppercase leading-tight text-[#087157] dark:text-[var(--text-main)]">
              {t.partnerTitle}
            </h4>
            <div className="mt-6 grid grid-cols-[72px_1fr] items-center gap-5">
              <div className="relative h-[72px] w-[72px] self-center">
                <Image
                  src="/Icons/rewards/icon-4.png"
                  alt=""
                  fill
                  className="object-contain"
                  aria-hidden="true"
                />
              </div>
              <p className="max-w-[320px] font-poppins text-sm font-semibold leading-relaxed text-[#087157] dark:text-[var(--text-body)]">
                {t.partnerCopy}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 border-emerald-100 md:grid-cols-4 md:border-l md:pl-8">
            {t.partnerBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="text-center"
              >
                <div className="relative mx-auto h-16 w-16">
                  <Image
                    src={benefit.image}
                    alt=""
                    fill
                    className="object-contain"
                    aria-hidden="true"
                  />
                </div>
                <h5 className="mt-3 text-lg font-norwester uppercase leading-tight text-[#087157] dark:text-[var(--text-main)]">
                  {benefit.title}
                </h5>
                <p className="mt-1 text-sm font-semibold leading-tight text-[#087157] dark:text-[var(--text-body)]">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-14 md:grid-cols-2">
        <WinList title={t.shoppersWin} items={t.shopperWins} />
        <WinList title={t.distributorsWin} items={t.distributorWins} />
      </div>

      <p className="handwritten mt-12 text-center text-3xl font-bold leading-snug text-[#48c774]">
        Smarter <span className="text-[#087157] dark:text-[var(--text-main)]">every time.</span>
        <br />
        Stronger <span className="text-[#087157] dark:text-[var(--text-main)]">every campaign!</span>
      </p>
    </div>
  )
}

function WinList({
  title,
  items,
}: {
  title: string
  items: Array<{ image: string; label: string }>
}) {
  return (
    <div>
      <h4 className="mb-6 text-xl font-norwester uppercase text-[#087157] dark:text-[var(--text-main)]">{title}</h4>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.label} className="grid grid-cols-[52px_1fr] items-center gap-4">
            <div className="relative h-[52px] w-[52px]">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
              />
            </div>
            <span className="text-base font-semibold leading-snug text-[#087157] dark:text-[var(--text-body)]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
