import PartnersPageHero from "@/components/partners/hero"
import WhatWeOffer from "@/components/partners/what-we-offer"
import PartnersPageLogos from "@/components/partners/partners-logos"
import Testimonials from "@/components/partners/testimonials"
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
      <WhatWeOffer locale={locale} />
      <PartnersPageLogos locale={locale} />
      <Testimonials locale={locale} />
      <PartnersPageForm locale={locale} />
      <Footer locale={locale} />
    </main>
  )
}
