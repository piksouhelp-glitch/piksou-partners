import type { ReactNode } from "react"

interface ComparisonItem {
  icon: ReactNode
  label: string
  desc: string
}

interface ComparisonCardProps {
  title: string
  tagline: string
  items: ComparisonItem[]
  footer: string
  variant: "muted" | "brand"
  locale?: "en" | "fr"
}

export default function ComparisonCard({
  title,
  tagline,
  items,
  footer,
  variant,
  locale = "en",
}: ComparisonCardProps) {
  const isBrand = variant === "brand"
  const isFrench = locale === "fr"

  return (
    <article
      className={`font-poppins relative mt-8 flex h-full flex-col rounded-[8px] border pt-10 shadow-sm ${
        isBrand
          ? "border-[#48c774]/40 bg-[#f7fff9] dark:bg-emerald-950/25"
          : "border-slate-200 bg-[#f2f2f2] dark:border-emerald-900/40 dark:bg-white/5"
      }`}
    >
      <div
        className={`absolute left-1/2 top-0 w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-[8px] px-4 py-2.5 text-center text-sm font-bold leading-tight text-white shadow-md sm:w-[76%] md:text-lg ${
          isBrand ? "bg-[#087157]" : "bg-[#7c7c7c]"
        }`}
      >
        {title}
      </div>
      <p
        className={`px-4 pb-5 text-center font-bold leading-tight md:px-5 ${
          isBrand ? "text-[#087157] dark:text-[var(--text-main)]" : "text-[#343434] dark:text-[var(--text-body)]"
        } ${isFrench ? "text-base md:text-lg" : "text-base md:text-xl"}`}
      >
        {tagline}
      </p>
      <div className="flex flex-1 flex-col gap-4 px-4 md:px-5">
        {items.map((item) => (
          <div
            key={item.label}
            className={`rounded-[10px] p-3 sm:grid sm:items-center sm:gap-3 sm:rounded-none sm:p-0 ${
              isBrand ? "bg-white/70 dark:bg-white/5 sm:bg-transparent" : "bg-white/55 dark:bg-white/5 sm:bg-transparent"
            } ${
              isFrench
                ? "sm:grid-cols-[38px_minmax(118px,0.9fr)_auto_minmax(0,1.35fr)]"
                : "sm:grid-cols-[38px_minmax(104px,0.85fr)_auto_minmax(0,1.15fr)]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full sm:h-[38px] sm:w-[38px] ${
                  isBrand ? "bg-[#48c774] text-white" : "bg-[#e2e2e2] text-[#343434] dark:bg-white/10 dark:text-[var(--text-body)]"
                }`}
              >
                {item.icon}
              </div>
              <h3 className="text-base font-bold leading-tight text-[#343434] dark:text-[var(--text-body)] sm:hidden">
                {item.label}
              </h3>
            </div>
            <h3 className={`hidden font-bold leading-tight text-[#343434] dark:text-[var(--text-body)] sm:block ${isFrench ? "text-sm" : "text-sm sm:text-base"}`}>
              {item.label}
            </h3>
            <span className="hidden h-10 w-px bg-[#a8a8a8] dark:bg-emerald-200/25 sm:block" aria-hidden="true" />
            <p className={`mt-2 font-normal leading-relaxed text-[#4a4a4a] dark:text-[var(--text-muted)] sm:mt-0 sm:pl-2 sm:leading-snug ${isFrench ? "text-sm" : "text-sm"}`}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
      <div
        className={`mt-5 rounded-b-[8px] px-4 py-3 text-center text-xs font-bold leading-tight ${
          isBrand ? "bg-[#48c774] text-white" : "bg-[#dedede] text-[#343434] dark:bg-white/10 dark:text-[var(--text-body)]"
        } ${isFrench ? "md:text-[13px]" : "md:text-sm"}`}
      >
        {footer}
      </div>
    </article>
  )
}
