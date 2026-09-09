"use client"

import Link from "next/link"
import Image from "next/image"
import DecorativeImage from "@/components/partners/decorative-image"

interface HeroProps {
  locale?: "en" | "fr"
}

const content = {
  en: {
    title: "Reach Shoppers",
    titleLine2: "Before They Decide",
    titleHighlight: "Where to Buy.",
    subtitle: "PikSou is Mauritius' leading savings app where active shoppers search, compare and plan their purchases.",
    cta: "Contact Us",
  },
  fr: {
    title: "Touchez les aAcheteurs",
    titleLine2: "Avant qu'ils ne décident",
    titleHighlight: "où acheter.",
    subtitle: "PikSou est l'application d'épargne leader à Maurice où les acheteurs actifs cherchent, comparent et planifient leurs achats.",
    cta: "Contactez-nous",
  },
}

export default function Hero({ locale = "en" }: HeroProps) {
  const t = content[locale]
  const isFrench = locale === "fr"

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[720px] scroll-mt-24 overflow-hidden bg-[var(--page-bg)] pt-20 transition-colors duration-300 md:min-h-[640px] md:pt-24"
    >
      <DecorativeImage
        src="/images/partners/hero/hero-decoration-2.svg"
        className="-left-28 top-64 h-64 w-64 md:-left-40 md:top-80 md:h-[520px] md:w-[520px]"
        opacity="opacity-30"
      />
      <DecorativeImage
        src="/images/partners/hero/hero-decoration-3.svg"
        className="-right-14 top-20 h-48 w-48 md:-right-24 md:top-24 md:h-[360px] md:w-[360px]"
        opacity="opacity-35"
      />
      <DecorativeImage
        src="/images/partners/hero/hero-decoration-6.svg"
        className="bottom-4 left-1/3 h-24 w-24 md:bottom-0 md:left-[34%] md:h-44 md:w-44"
        opacity="opacity-35"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col px-6 sm:px-10 md:block lg:px-14 xl:px-20">
        <div className="flex max-w-[590px] flex-[0_0_auto] flex-col justify-center pt-6 text-left md:h-full md:pb-14 md:pt-0">
          <h1
            className={`handwritten relative font-bold leading-[1.08] text-[#087157] dark:text-[var(--text-main)] ${
              isFrench
                ? "text-[2.45rem] sm:text-[2.9rem] md:text-[3.35rem] lg:text-[4rem] xl:text-[4.35rem]"
                : "text-[2.85rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.7rem] xl:text-[5.15rem]"
            }`}
          >
            <span className="relative inline-block">
              {t.title}
              <Image
                src="/images/partners/hero/piksou-decoration.png"
                alt=""
                width={52}
                height={52}
                className="absolute -right-8 top-0 h-7 w-7 md:-right-11 md:h-10 md:w-10"
                aria-hidden="true"
              />
            </span>
            <span className="block text-[#48c774]">{t.titleLine2}</span>
            <span className="relative inline-block pb-5">
              {t.titleHighlight}
              <Image src="/images/partners/hero/hero-decoration-9.svg" alt="underline" width={200} height={30}/>
              {/* <span className="absolute bottom-0 left-7 h-0.5 w-[84%] rounded-full bg-[#087157]" />
              <span className="absolute bottom-2 left-10 h-0.5 w-[76%] rounded-full bg-[#087157]" /> */}
            </span>
          </h1>

          <p
            className={`font-norwester mt-5 max-w-[540px] text-xs font-black uppercase tracking-wide text-[#075F46] dark:text-[var(--text-body)] sm:text-sm md:mt-9 ${
              isFrench ? "leading-[1.25] md:max-w-[520px] md:text-sm" : "leading-[1.35] md:text-base"
            }`}
          >
            {locale === "en" ? (
              <>
                PikSou is Mauritius' leading savings app where active shoppers{" "}
                <span className="text-[#48c774]">search, compare <span className="text-[#075F46] dark:text-[var(--text-body)]">and</span> plan their purchases.</span>
              </>
            ) : (
              t.subtitle
            )}
          </p>

          <Link
            href="#contact-form"
            className="mt-5 inline-flex min-w-[170px] justify-center self-start rounded-full bg-[#48c774] px-8 py-2.5 font-handwritten text-lg font-bold text-white shadow-lg shadow-emerald-200 transition-colors duration-300 hover:bg-[#087157] dark:shadow-emerald-950/40 md:mt-8 md:min-w-[190px] md:px-9 md:py-3 md:text-xl"
          >
            {t.cta}
          </Link>
        </div>

        <div className="absolute bottom-0 right-[-70px] hidden h-[88vh] max-h-[840px] min-h-[620px] w-[62vw] max-w-[860px] items-end justify-center md:flex lg:right-[-100px] xl:right-[-135px]">
          <div className="absolute bottom-0 right-[-10%] z-0 h-[88%] w-[112%]">
            <Image
              src="/images/partners/hero/hero-decoration-7.svg"
              alt=""
              fill
              className="object-contain object-bottom"
              aria-hidden="true"
              priority
            />
          </div>
          <div className="relative z-10 h-full w-[68%] translate-y-[68px] lg:translate-y-[76px]">
            <Image
              src="/images/partners/hero/piksou-mobile-homepage.svg"
              alt="PikSou app preview"
              fill
              className="object-contain object-bottom drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        <div className="relative -mx-6 mt-auto flex min-h-0 flex-1 items-end justify-end overflow-hidden sm:-mx-10 md:hidden">
          <div className="absolute bottom-0 right-[-22%] h-[76%] w-[116%]">
            <Image
              src="/images/partners/hero/hero-decoration-7.svg"
              alt=""
              fill
              className="object-contain object-bottom"
              aria-hidden="true"
            />
          </div>
          <div className="relative z-10 h-full w-[62%] translate-y-[42px]">
            <Image
              src="/images/partners/hero/piksou-mobile-homepage.svg"
              alt="PikSou app preview"
              fill
              className="object-contain object-bottom drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
