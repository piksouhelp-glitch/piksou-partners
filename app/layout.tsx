import type { Metadata } from "next"
import { Geist, Geist_Mono, Caveat } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const norwester = localFont({
  src: "../public/fonts/norwester/norwester.woff",
  variable: "--font-norwester",
  weight: "400",
})

const poppins = localFont({
  src: [
    { path: "../public/fonts/poppins/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/poppins/Poppins-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/poppins/Poppins-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Partner with PiKSou - Grow Your Business in Mauritius",
  description:
    "Join PiKSou's partner program to increase store visibility, access analytics insights, and drive orders from Mauritius's top grocery comparison platform.",
  openGraph: {
    title: "Partner with PiKSou - Grow Your Business",
    description:
      "Join PiKSou's partner program for increased visibility, analytics, and direct orders.",
    url: "https://piksou.mu/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${norwester.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
