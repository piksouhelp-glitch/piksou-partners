"use client"

import { CheckCircle, Image as ImageIcon, ListTodo, Monitor, Scale, Search, Target, Tv, Users } from "lucide-react"
import ComparisonCard from "@/components/partners/comparison-card"
import DecorativeImage from "@/components/partners/decorative-image"

interface WhyPikSouProps {
  locale?: "en" | "fr"
}

const content = {
  en: {
    title: "Why PikSou?",
    subtitle:
      "PikSou reaches shoppers when they are already searching, comparing, and deciding. Your message appears at the exact moment purchase decisions are made.",
    traditional: {
      title: "Traditional Advertising",
      tagline: "Interrupts. Competes. Gets ignored.",
      items: [
        { icon: <Tv size={18} />, label: "TV / Radio", desc: "Broad reach, but passive and hard to measure." },
        { icon: <Users size={18} />, label: "Social Media", desc: "People scroll for entertainment, not to shop." },
        { icon: <ImageIcon size={18} />, label: "Display Ads", desc: "Seen out of context with low relevance." },
        { icon: <Monitor size={18} />, label: "Billboards & Print", desc: "High cost and no way to target intent." },
      ],
      footer: "Reaches people who may never buy, with results you can't track",
    },
    piksou: {
      title: "PikSou",
      tagline: "Intent-driven. Relevant. Measurable.",
      items: [
        { icon: <Search size={18} />, label: "Already Searching", desc: "Shoppers search for products, brands, and categories." },
        { icon: <Scale size={18} />, label: "Already Comparing", desc: "They compare prices, stores and promotions." },
        { icon: <ListTodo size={18} />, label: "Already Planning", desc: "They add items to lists and plan baskets." },
        { icon: <CheckCircle size={18} />, label: "Already Deciding", desc: "They decide where and what to buy." },
        { icon: <Target size={18} />, label: "Highly Relevant & Targeted", desc: "Show your ads only to interested shoppers." },
      ],
      footer: "Reaches people who are ready to buy, with results you can track",
    },
  },
  fr: {
    title: "Pourquoi PikSou?",
    subtitle:
      "PikSou touche les acheteurs lorsqu'ils sont déjà en train de rechercher, comparer et décider. Votre message apparaît au moment précis où les décisions d'achat sont prises.",
    traditional: {
      title: "Publicité Traditionnelle",
      tagline: "Interrompt. Rivalise. Est ignoree.",
      items: [
        { icon: <Tv size={18} />, label: "TV / Radio", desc: "Large portée, mais passive et difficile à mesurer." },
        { icon: <Users size={18} />, label: "Reseaux Sociaux", desc: "Les gens défilent pour se divertir, pas pour acheter." },
        { icon: <ImageIcon size={18} />, label: "Affichage", desc: "Vu hors contexte avec une faible pertinence." },
        { icon: <Monitor size={18} />, label: "Panneaux & Print", desc: "Coût élevé et aucune façon de cibler l'intention." },
      ],
      footer: "Touche des personnes qui n'achèteront peut-être jamais, avec des résultats que vous ne pouvez pas suivre.",
    },
    piksou: {
      title: "PikSou",
      tagline: "Basé sur l'intention. Pertinent. Mesurable.",
      items: [
        { icon: <Search size={18} />, label: "Deja en Recherche", desc: "Les acheteurs recherchent des produits, des marques et des catégories." },
        { icon: <Scale size={18} />, label: "Deja en Comparaison", desc: "Ils comparent les prix, les magasins et les promotions." },
        { icon: <ListTodo size={18} />, label: "Deja en Planification", desc: "Ils ajoutent des articles à des listes et planifient leurs paniers." },
        { icon: <CheckCircle size={18} />, label: "Deja en Decision", desc: "Ils décident où et quoi acheter." },
        { icon: <Target size={18} />, label: "Pertinent & Cible", desc: "Affichez vos publicités uniquement aux acheteurs intéressés." },
      ],
      footer: "Touche des personnes prêtes à acheter, avec des résultats mesurables.",
    },
  },
}

export default function WhyPikSou({ locale = "en" }: WhyPikSouProps) {
  const t = content[locale]

  return (
    <section
      id="why-piksou"
      className="font-poppins relative scroll-mt-24 overflow-hidden bg-[var(--section-bg)] px-4 py-20 transition-colors duration-300 sm:px-6 md:py-24 lg:px-8"
    >
      <DecorativeImage
        src="/images/partners/what-we-offer/arrow-decoration-1.svg"
        className="-left-10 bottom-10 h-40 w-40 md:h-60 md:w-60"
        opacity="opacity-70"
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="handwritten text-5xl font-bold leading-tight text-[#087157] dark:text-[var(--text-main)] md:text-6xl lg:text-7xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm font-semibold leading-relaxed text-[#16392f] dark:text-[var(--text-body)] md:text-base">
            {t.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
          <ComparisonCard {...t.traditional} variant="muted" locale={locale} />
          <ComparisonCard {...t.piksou} variant="brand" locale={locale} />
        </div>
      </div>
    </section>
  )
}
