import PartnersPageHero from "@/components/partners/hero"
import WhatWeOffer from "@/components/partners/what-we-offer"
import WhyPikSou from "@/components/partners/why-piksou"
import StatsGrid from "@/components/partners/stats-grid"
import RetailFuture from "@/components/partners/retail-future"
import PartnersPageForm from "@/components/partners/form"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

type PageSearchParams = Promise<{
  lang?: string | string[]
}>

function resolveLocale(lang: string | string[] | undefined): "en" | "fr" {
  if (Array.isArray(lang)) return lang[0] === "fr" ? "fr" : "en"
  return lang === "fr" ? "fr" : "en"
}

export default async function Home({ searchParams }: { searchParams: PageSearchParams }) {
  const params = await searchParams
  const locale = resolveLocale(params?.lang)

  return (
    <main className="min-h-screen">
      <Navbar locale={locale} />
      <PartnersPageHero locale={locale} />
      <div className="space-y-10 md:space-y-14">
        <WhyPikSou locale={locale} />
        <StatsGrid locale={locale} />
        <WhatWeOffer locale={locale} />
        <RetailFuture locale={locale} />
        <PartnersPageForm locale={locale} />
      </div>
      <Footer locale={locale} />
    </main>
  )
}
