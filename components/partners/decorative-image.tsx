import Image from "next/image"

interface DecorativeImageProps {
  src: string
  className: string
  opacity?: string
}

export default function DecorativeImage({
  src,
  className,
  opacity = "opacity-70",
}: DecorativeImageProps) {
  return (
    <div className={`pointer-events-none absolute ${className} ${opacity}`}>
      <Image src={src} alt="" fill className="object-contain" aria-hidden="true" />
    </div>
  )
}
