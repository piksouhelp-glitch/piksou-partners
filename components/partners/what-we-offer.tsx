import Image from "next/image";

interface Pillar {
  iconImage: string;
  title: string;
  description: string;
  image: string;
}

interface PillarsProps {
  locale?: "en" | "fr";
}

const contentEn = {
  sectionLabel: "What We Offer",
  sectionTitle: "Partner with",
  sectionTitleHighlight: "PikSou",
  sectionTitleEnd: "and",
  sectionTitleUnderline: "unlock",
  sectionSubtitle: "powerful tools to grow your business",
  pillars: [
    {
      iconImage: "/images/partners/what-we-offer/visiblity-icon.png",
      title: "Increased Visibility",
      description:
        "We partner directly with stores to increase visibility of their promotions, drive traffic and generate revenue.",
      image: "/images/partners/what-we-offer/visiblity.png",
    },
    {
      iconImage: "/images/partners/what-we-offer/stastics-icon.png",
      title: "Data Analytics & Insights",
      description:
        "We provide detailed analytics on key metrics that enable smarter decisions and drive more sales.",
      image: "/images/partners/what-we-offer/stastics.png",
    },
    {
      iconImage: "/images/partners/what-we-offer/push-notification-icon.png",
      title: "Push Orders",
      description:
        "Users want to order directly from the app. We push orders straight to your e-commerce store.",
      image: "/images/partners/what-we-offer/push-notification.png",
    },
  ] as Pillar[],
};

const contentFr = {
  sectionLabel: "Ce Que Nous Offrons",
  sectionTitle: "Devenez partenaire de",
  sectionTitleHighlight: "PikSou",
  sectionTitleEnd: "pour",
  sectionTitleUnderline: "développer",
  sectionSubtitle: "votre activité commerciale",
  pillars: [
    {
      iconImage: "/images/partners/what-we-offer/visiblity-icon.png",
      title: "Visibilité Accrue",
      description:
        "Nous collaborons directement avec les magasins pour augmenter la visibilité de leurs promotions et générer du trafic.",
      image: "/images/partners/what-we-offer/app.svg",
    },
    {
      iconImage: "/images/partners/what-we-offer/stastics-icon.png",
      title: "Analyses et Données",
      description:
        "Nous fournissons des analyses détaillées sur des métriques clés pour des décisions plus éclairées.",
      image: "/images/partners/what-we-offer/stastics.png",
    },
    {
      iconImage: "/images/partners/what-we-offer/push-notification-icon.png",
      title: "Commandes Directes",
      description:
        "Selon la demande des clients, on pourra bientôt envoyer des commandes directement vers votre magasin.",
      image: "/images/partners/what-we-offer/push-notification.png",
    },
  ] as Pillar[],
};

export default function WhatWeOffer({ locale = "en" }: PillarsProps) {
  const content = locale === "fr" ? contentFr : contentEn;

  return (
    <section
      id="what-we-offer"
      className="scroll-mt-24 py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Corner Decorations */}
      {/* Top Left */}
      <div className="absolute top-16 left-0 w-20 h-20 md:w-36 md:h-36 pointer-events-none">
        <Image
          src="/images/partners/what-we-offer/arrow-decoration-4.svg"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      {/* Top Right */}
      <div className="absolute top-16 right-0 w-20 h-20 md:w-36 md:h-36 pointer-events-none">
        <Image
          src="/images/partners/what-we-offer/arrow-decoration-3.svg"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-24 -left-4 md:-left-8 w-32 h-32 md:w-64 md:h-64 pointer-events-none">
        <Image
          src="/images/partners/what-we-offer/arrow-decoration-1.svg"
          alt=""
          fill
          className="object-cover object-right"
          aria-hidden="true"
        />
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-16 -right-4 md:-right-8 w-32 h-32 md:w-64 md:h-64 pointer-events-none">
        <Image
          src="/images/partners/what-we-offer/arrow-decoration-2.svg"
          alt=""
          fill
          className="object-cover object-left"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sugarcane-green font-bold dark:text-emerald-400 mb-4 text-xl">
            {content.sectionLabel}
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {content.sectionTitle}{" "}
            <span className="handwritten text-sugarcane-green dark:text-emerald-400">
              {content.sectionTitleHighlight}
            </span>{" "}
            {content.sectionTitleEnd}{" "}
            <span className="relative inline-block">
              <span className="handwritten text-sugarcane-green dark:text-emerald-400">
                {content.sectionTitleUnderline}
              </span>
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 7 Q 25 0, 50 4 T 100 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-emerald-400"
                />
              </svg>
            </span>{" "}
            {content.sectionSubtitle}
          </h2>
        </div>

        {/* Pillars Grid - middle column is wider */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1fr] gap-4 md:gap-6 items-end">
          {content.pillars.map((pillar, index) => (
            <div key={index} className="flex flex-col">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 md:w-16 md:h-16 relative">
                  <Image
                    src={pillar.iconImage}
                    alt={pillar.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="handwritten text-xl md:text-2xl text-center text-sugarcane-green dark:text-white mb-3">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="font-sans font-bold text-sm text-center text-gray-400 dark:text-gray-400 mb-6 px-2">
                {pillar.description}
              </p>

              {/* Image/Mockup - Middle one is larger */}
              <div className="flex-1 flex items-end justify-center">
                <div
                  className={`relative ${
                    index === 1
                      ? "w-full overflow-hidden h-[19rem] md:h-[25rem] lg:h-[30rem] -translate-y-3 md:-translate-y-7 lg:-translate-y-8"
                      : index === 0
                      ? "w-full md:w-full lg:w-[108%] h-72 md:h-96 lg:h-[26rem]"
                      : "w-[92%] md:w-[90%] h-64 md:h-80 lg:h-96"
                  }`}
                >
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className={
                      index === 1
                        ? "object-contain scale-[1.1] md:scale-[1.15] lg:scale-[1.18] translate-y-4 md:translate-y-5"
                        : "object-contain"
                    }
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
