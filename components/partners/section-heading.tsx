interface SectionHeadingProps {
  eyebrow?: string
  title: string
  highlight?: string
  subtitle?: string
  align?: "center" | "left"
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left"

  return (
    <div className={`max-w-4xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#0c6f53]">
          {eyebrow}
        </p>
      )}
      <h2 className="handwritten text-4xl font-bold leading-tight text-[#087157] dark:text-[var(--text-main)] md:text-5xl">
        {title}
        {highlight && <span className="text-[#47c878]"> {highlight}</span>}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-3xl text-sm font-bold leading-relaxed text-[#16392f] dark:text-[var(--text-body)] md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  )
}
