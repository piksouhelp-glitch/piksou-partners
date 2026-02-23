import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

interface FooterProps {
  locale?: "en" | "fr"
}

const content = {
  en: {
    contactSupport: "Contact & Support",
    followUs: "Follow Us",
    quickLinks: "Quick Links",
    legal: "Legal & Important",
    links: [
      { href: "#hero", label: "Home" },
      { href: "#what-we-offer", label: "What We Offer" },
      { href: "#partners-logos", label: "Partners" },
      { href: "#testimonials", label: "Testimonials" },
      { href: "#contact-form", label: "Contact" },
    ],
    legalLinks: [
      { href: "#contact-form", label: "Partnership Form" },
      { href: "#hero", label: "Top of Page" },
    ],
    socialText: "Stay updated with the latest deals and tips!",
    madeWith: "Made with love in Mauritius",
    trademark:
      "All supermarket trademarks belong to their respective owners. PiKSou is an independent savings tool.",
  },
  fr: {
    contactSupport: "Contact & Support",
    followUs: "Suivez-nous",
    quickLinks: "Liens Rapides",
    legal: "Légal & Important",
    links: [
      { href: "#hero", label: "Accueil" },
      { href: "#what-we-offer", label: "Nos Offres" },
      { href: "#partners-logos", label: "Partenaires" },
      { href: "#testimonials", label: "Témoignages" },
      { href: "#contact-form", label: "Contact" },
    ],
    legalLinks: [
      { href: "#contact-form", label: "Formulaire de Partenariat" },
      { href: "#hero", label: "Haut de Page" },
    ],
    socialText: "Restez informé des dernières offres et conseils !",
    madeWith: "Fait avec amour à Maurice",
    trademark:
      "Toutes les marques de supermarchés appartiennent à leurs propriétaires respectifs. PiKSou est un outil d'économies indépendant.",
  },
}

export default function Footer({ locale = "en" }: FooterProps) {
  const t = content[locale]

  return (
    <footer className="bg-gray-900 dark:bg-black text-white font-handwritten transition-colors duration-300" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">{t.contactSupport}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-[#48C774]" />
                <a href="mailto:contact@piksou.com" className="hover:text-[#48C774] transition-colors duration-300">
                  contact@piksou.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-[#48C774]" />
                <a href="tel:+23058308566" className="hover:text-[#48C774] transition-colors duration-300">
                  +230 5830 8566
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#48C774] mt-1" />
                <div>Trianon, Quatre Bornes, Mauritius</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">{t.followUs}</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61584774459115"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-300 p-2 rounded-lg hover:bg-gray-800"
                aria-label="Facebook"
              >
                <img src="/Icons/facebook-color.svg" alt="" className="w-6 h-6" aria-hidden="true" />
              </a>
              <a
                href="https://www.tiktok.com/@.piksou"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-300 p-2 rounded-lg hover:bg-gray-800"
                aria-label="TikTok"
              >
                <img src="/Icons/tiktok2.png" alt="" className="w-6 h-6" aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/23058308566"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-300 p-2 rounded-lg hover:bg-gray-800"
                aria-label="WhatsApp"
              >
                <img src="/Icons/whatsapp-color.svg" alt="" className="w-6 h-6" aria-hidden="true" />
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-3">{t.socialText}</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              {t.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#48C774] transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">{t.legal}</h3>
            <ul className="space-y-2">
              {t.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#48C774] transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400 transition-colors duration-300">
          <p className="mb-4">{t.madeWith}</p>
          <p>{t.trademark}</p>
        </div>
      </div>
    </footer>
  )
}
