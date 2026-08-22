"use client"

import Image from "next/image"

interface AudienceInsightsProps {
  locale?: "en" | "fr"
}

const content = {
  en: {
    chartTitle: "ACTIVE USERS",
    mapTitle: "Widespread Coverage",
    mapImageAlt: "Mauritius coverage placeholder",
    ageGroups: [
      { label: "18-24", value: 60 },
      { label: "25-34", value: 200 },
      { label: "35-44", value: 160 },
      { label: "45-54", value: 42 },
      { label: "55-64", value: 44 },
      { label: "65+", value: 32 },
    ],
  },
  fr: {
    chartTitle: "UTILISATEURS ACTIFS",
    mapTitle: "Couverture Nationale",
    mapImageAlt: "Placeholder couverture Maurice",
    ageGroups: [
      { label: "18-24", value: 60 },
      { label: "25-34", value: 200 },
      { label: "35-44", value: 160 },
      { label: "45-54", value: 42 },
      { label: "55-64", value: 44 },
      { label: "65+", value: 32 },
    ],
  },
}

export default function AudienceInsights({ locale = "en" }: AudienceInsightsProps) {
  const t = content[locale]
  const maxValue = Math.max(...t.ageGroups.map((group) => group.value))

  return (
    <section className="bg-[var(--page-bg)] px-4 pb-28 transition-colors duration-300 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-end gap-16 md:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center justify-center gap-2 md:justify-start">
            <span className="h-3 w-3 rounded-full bg-[#48c774]" />
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#087157] dark:text-[var(--text-main)]">
              {t.chartTitle}
            </span>
          </div>
          <div className="flex h-64 items-end justify-between gap-3 border-b border-emerald-100 dark:border-[var(--border-soft)]">
            {t.ageGroups.map((group) => (
              <div key={group.label} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-56 w-full items-end">
                  <div
                    className="w-full rounded-t-[8px] bg-[#48c774]"
                    style={{ height: `${(group.value / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-black text-[#087157] dark:text-[var(--text-main)]">{group.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="sr-only">{t.mapTitle}</p>
          <div className="relative h-[280px] w-full max-w-[360px]">
            <Image
              src="/images/partners/what-we-offer/data-map.svg"
              alt={t.mapImageAlt}
              fill
              className="object-contain"
              sizes="360px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
