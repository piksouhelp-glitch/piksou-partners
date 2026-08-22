import type { ReactNode } from "react"

interface MetricCardProps {
  icon: ReactNode
  value: string
  label: string
  description?: string
}

export default function MetricCard({ icon, value, label, description }: MetricCardProps) {
  return (
    <div className="flex min-h-[170px] flex-col items-center text-center">
      <div className="mb-5 flex h-[78px] w-[78px] items-center justify-center">
        {icon}
      </div>
      <div className="font-norwester text-[2.65rem] leading-none text-[#48c774] md:text-[3rem]">
        {value}
      </div>
      <p className="mt-3 max-w-[190px] text-base font-black leading-tight text-black dark:text-[var(--text-body)] md:text-lg">
        {label}
      </p>
      {description && (
        <p className="mt-3 max-w-[240px] text-sm font-semibold leading-snug text-[#31584d] dark:text-[var(--text-muted)]">
          {description}
        </p>
      )}
    </div>
  )
}
