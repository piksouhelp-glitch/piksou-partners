"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import DecorativeImage from "@/components/partners/decorative-image"
import AdvertisementsOffer from "@/components/partners/offers/advertisements-offer"
import PiksouBusinessOffer from "@/components/partners/offers/piksou-business-offer"
import RetailIntelligenceOffer from "@/components/partners/offers/retail-intelligence-offer"
import RewardsCampaignOffer from "@/components/partners/offers/rewards-campaign-offer"
import SectionHeading from "@/components/partners/section-heading"

interface PillarsProps {
  locale?: "en" | "fr"
}

type OfferId = "ads" | "intel" | "rewards" | "business"

const tabs: Array<{
  id: OfferId
  filledIcon: string
  outlinedIcon: string
  label: Record<"en" | "fr", string>
}> = [
  {
    id: "ads",
    filledIcon: "/icons/what-we-offer/megaphone-filled.svg",
    outlinedIcon: "/icons/what-we-offer/megaphone-outlined.svg",
    label: { en: "Advertisements", fr: "Publicites" },
  },
  {
    id: "intel",
    filledIcon: "/icons/what-we-offer/stastics-filled.svg",
    outlinedIcon: "/icons/what-we-offer/stastics-outlined.svg",
    label: { en: "Retail Intelligence & Insights", fr: "Retail Intelligence & Insights" },
  },
  {
    id: "rewards",
    filledIcon: "/icons/what-we-offer/present-filled.svg",
    outlinedIcon: "/icons/what-we-offer/present-outlined.svg",
    label: { en: "Rewards Campaign", fr: "Campagne Rewards" },
  },
  {
    id: "business",
    filledIcon: "/icons/what-we-offer/store-filled.svg",
    outlinedIcon: "/icons/what-we-offer/store-outlined.svg",
    label: { en: "PikSou Business", fr: "PikSou Business" },
  },
]

const content = {
  en: {
    sectionTitle: "What",
    sectionHighlight: "We Offer",
  },
  fr: {
    sectionTitle: "Ce Que",
    sectionHighlight: "Nous Offrons",
  },
}

function renderOffer(offerId: OfferId, locale: "en" | "fr") {
  switch (offerId) {
    case "intel":
      return <RetailIntelligenceOffer locale={locale} />
    case "rewards":
      return <RewardsCampaignOffer locale={locale} />
    case "business":
      return <PiksouBusinessOffer locale={locale} />
    case "ads":
    default:
      return <AdvertisementsOffer locale={locale} />
  }
}

export default function WhatWeOffer({ locale = "en" }: PillarsProps) {
  const t = content[locale]
  const [activeTab, setActiveTab] = useState<OfferId>("ads")
  const [isMobileTabOpen, setIsMobileTabOpen] = useState(false)
  const activeTabConfig = tabs.find((tab) => tab.id === activeTab) ?? tabs[0]

  useEffect(() => {
    const validOfferIds = new Set<OfferId>(["ads", "intel", "rewards", "business"])

    const activateFromHash = () => {
      const offerId = window.location.hash.replace("#what-we-offer-", "") as OfferId

      if (validOfferIds.has(offerId)) {
        setActiveTab(offerId)
      }
    }

    const handleOfferTab = (event: Event) => {
      const offerId = (event as CustomEvent<OfferId>).detail

      if (validOfferIds.has(offerId)) {
        setActiveTab(offerId)
      }
    }

    activateFromHash()
    window.addEventListener("hashchange", activateFromHash)
    window.addEventListener("piksou:offer-tab", handleOfferTab)

    return () => {
      window.removeEventListener("hashchange", activateFromHash)
      window.removeEventListener("piksou:offer-tab", handleOfferTab)
    }
  }, [])

  return (
    <section
      id="what-we-offer"
      className="relative scroll-mt-24 overflow-hidden bg-[var(--page-bg)] px-4 py-24 transition-colors duration-300 sm:px-6 lg:px-8"
    >
      <DecorativeImage
        src="/images/partners/what-we-offer/arrow-decoration-1.svg"
        className="-left-16 bottom-72 h-44 w-44 md:h-72 md:w-72"
        opacity="opacity-70"
      />
      <DecorativeImage
        src="/images/partners/what-we-offer/arrow-decoration-2.svg"
        className="-right-16 bottom-28 h-44 w-44 md:h-72 md:w-72"
        opacity="opacity-70"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading title={t.sectionTitle} highlight={t.sectionHighlight} />

        <div className="relative mx-auto mt-10 max-w-sm md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileTabOpen((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-full border border-emerald-100 bg-[#f7f8f7] px-5 py-3 text-[#48C774] shadow-[0_8px_24px_rgba(15,79,61,0.08)] dark:border-[var(--border-soft)] dark:bg-[var(--surface-soft)]"
            aria-expanded={isMobileTabOpen}
          >
            <span className="flex items-center gap-3">
              <span className="relative h-5 w-5">
                <Image
                  src={activeTabConfig.filledIcon}
                  alt=""
                  fill
                  className="object-contain"
                  aria-hidden="true"
                />
              </span>
              <span className="handwritten text-xl font-bold">{activeTabConfig.label[locale]}</span>
            </span>
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${isMobileTabOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {isMobileTabOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                className="absolute left-0 right-0 top-full z-20 mt-2 rounded-[12px] border border-emerald-100 bg-white py-2 shadow-[0_8px_24px_rgba(15,79,61,0.12)] dark:border-[var(--border-soft)] dark:bg-[var(--surface-bg)]"
              >
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id)
                        setIsMobileTabOpen(false)
                      }}
                      className={`flex w-full items-center gap-3 px-5 py-3 text-left transition-colors ${
                        isActive ? "text-[#48C774]" : "text-[#075F46] hover:bg-emerald-50 dark:text-[var(--text-body)] dark:hover:bg-emerald-500/10"
                      }`}
                    >
                      <span className="relative h-5 w-5">
                        <Image
                          src={isActive ? tab.filledIcon : tab.outlinedIcon}
                          alt=""
                          fill
                          className="object-contain"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="handwritten text-xl font-bold">{tab.label[locale]}</span>
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mx-auto mt-12 hidden max-w-5xl flex-wrap justify-center gap-2 rounded-full border border-emerald-100 bg-[#f7f8f7] p-2 shadow-[0_8px_24px_rgba(15,79,61,0.08)] dark:border-[var(--border-soft)] dark:bg-[var(--surface-soft)] md:flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex min-h-12 items-center justify-center rounded-full px-5 py-2 text-sm font-black transition-all ${
                activeTab === tab.id
                  ? "min-h-16 flex-col gap-1 bg-white text-[#48C774] shadow-[0_8px_24px_rgba(15,79,61,0.12)] dark:bg-[var(--surface-bg)]"
                  : "flex-row gap-2 text-[#075F46] hover:bg-white/80 dark:text-[var(--text-body)] dark:hover:bg-white/5"
              }`}
              aria-pressed={activeTab === tab.id}
            >
              <span className="relative h-5 w-5">
                <Image
                  src={activeTab === tab.id ? tab.filledIcon : tab.outlinedIcon}
                  alt=""
                  fill
                  className="object-contain"
                  aria-hidden="true"
                />
              </span>
              <span className="handwritten text-xl font-bold">{tab.label[locale]}</span>
            </button>
          ))}
        </div>

        <div className="relative mt-20 min-h-[640px] overflow-visible md:min-h-[720px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ x: 120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -120, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {renderOffer(activeTab, locale)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
