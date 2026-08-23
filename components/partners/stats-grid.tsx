"use client"

import Image from "next/image"
import type { ReactNode } from "react"
import MetricCard from "@/components/partners/metric-card"

interface StatsGridProps {
  locale?: "en" | "fr"
}

const content = {
  en: {
    stats: [
      { icon: <StatIcon index={1} alt="Monthly active users" />, value: "10,000+", label: "Monthly Active Users" },
      { icon: <StatIcon index={2} alt="Product searches" />, value: "125,000+", label: "Product Searches Monthly" },
      { icon: <StatIcon index={3} alt="Mobile app download" />, value: "17,000+", label: "Mobile App Download" },
      { icon: <StatIcon index={4} alt="Retail partners" />, value: "15+", label: "Retail Partners Onboarded" },
      { icon: <StatIcon index={5} alt="Monthly promos" />, value: "10,000+", label: "Monthly Promos from Leading Retailers" },
      { icon: <StatIcon index={6} alt="Average session duration" />, value: "5m:12s", label: "Average Session Duration" },
      {
        icon: <StatIcon index={7} alt="Household savings" />,
        value: "Rs 1M+",
        label: "In Household Savings",
        description: "Helping Mauritian households save more on everyday purchases",
      },
      {
        icon: <StatIcon index={8} alt="User satisfaction" />,
        value: "4.8/5",
        label: "User Satisfaction Rating",
        description: "Loved by shoppers for saving time, money and effort.",
      },
      {
        icon: <StatIcon index={9} alt="Month on month growth" />,
        value: "50%",
        label: "Month on Month Growth",
        description: "Strong and consistent momentum across all key metrics.",
      },
    ],
  },
  fr: {
    stats: [
      { icon: <StatIcon index={1} alt="Utilisateurs actifs mensuels" />, value: "10,000+", label: "Utilisateurs Actifs Mensuels" },
      { icon: <StatIcon index={2} alt="Recherches produits" />, value: "125,000+", label: "Recherches de Produits Par Mois" },
      { icon: <StatIcon index={3} alt="Telechargements app" />, value: "17 000+", label: "Téléchargements de l'Application" },
      { icon: <StatIcon index={4} alt="Partenaires retail" />, value: "15+", label: "Partenaires Commerçants Intégrés" },
      { icon: <StatIcon index={5} alt="Promos mensuelles" />, value: "10 000+", label: "Promotions Mensuelles des Principaux Commerçants" },
      { icon: <StatIcon index={6} alt="Duree moyenne session" />, value: "5 min 12 s", label: "de Durée Moyenne de Session" },
      {
        icon: <StatIcon index={7} alt="Economies des menages" />,
        value: "Plus de 1 M de Rs",
        label: "d'Économies pour les Ménages",
        description: "Aider les foyers mauriciens à économiser davantage sur leurs achats quotidiens.",
      },
      {
        icon: <StatIcon index={8} alt="Satisfaction client" />,
        value: "4,8/5",
        label: "de Taux de Satisfaction",
        description: "Apprécié des acheteurs pour le gain de temps, d'argent et d'effort.",
      },
      {
        icon: <StatIcon index={9} alt="Croissance mensuelle" />,
        value: "50 %",
        label: "de Croissance Mensuelle",
        description: "Une dynamique forte et constante sur tous les indicateurs clés.",
      },
    ],
  },
}

function StatIcon({ index, alt }: { index: number; alt: string }) {
  return (
    <Image
      src={`/Icons/stastics/icon-${index}.svg`}
      alt={alt}
      width={88}
      height={88}
      className="h-full w-full object-contain"
    />
  )
}

export default function StatsGrid({ locale = "en" }: StatsGridProps) {
  const t = content[locale]

  return (
    <section className="relative overflow-hidden bg-[var(--section-bg)] px-4 pb-24 pt-4 transition-colors duration-300 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-35 [background:linear-gradient(115deg,transparent_0%,transparent_18%,rgba(15,79,61,0.045)_18.4%,transparent_32%),linear-gradient(70deg,transparent_0%,transparent_62%,rgba(15,79,61,0.05)_62.4%,transparent_76%)]" />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
        {t.stats.slice(0, 6).map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </div>
      <div className="relative z-10 mx-auto mt-14 grid max-w-6xl grid-cols-1 overflow-hidden rounded-[18px] border border-emerald-100 bg-white/45 shadow-[0_12px_34px_rgba(7,95,70,0.06)] dark:border-[var(--border-soft)] dark:bg-white/5 md:grid-cols-3 md:gap-10 md:border-0 md:bg-transparent md:shadow-none">
        {t.stats.slice(6).map((stat) => (
          <BottomMetric key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  )
}

function BottomMetric({
  icon,
  value,
  label,
  description,
}: {
  icon: ReactNode
  value: string
  label: string
  description?: string
}) {
  return (
    <div className="border-t border-emerald-100 px-5 py-7 text-left first:border-t-0 dark:border-[var(--border-soft)] md:border-t-0 md:px-0 md:py-0">
      <div className="flex items-center gap-4">
        <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center md:h-[86px] md:w-[86px]">
          {icon}
        </div>
        <div>
          <div className="font-norwester text-[2.45rem] leading-none text-[#48c774] sm:text-[2.8rem] md:text-[3.1rem]">
            {value}
          </div>
          <p className="mt-1 text-base font-black leading-tight text-black dark:text-[var(--text-body)] sm:text-lg">{label}</p>
        </div>
      </div>
      {description && (
        <p className="mt-4 max-w-[420px] text-base font-normal leading-relaxed text-black dark:text-[var(--text-muted)] sm:text-lg md:mt-5 md:max-w-[360px] md:text-xl md:leading-snug">
          {description}
        </p>
      )}
    </div>
  )
}
