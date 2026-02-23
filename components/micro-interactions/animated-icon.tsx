"use client"

import { motion } from "framer-motion"
import type { TargetAndTransition } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedIconProps {
  children: ReactNode
  className?: string
  animation?: "bounce" | "rotate" | "pulse" | "shake"
  trigger?: "hover" | "always"
}

export default function AnimatedIcon({
  children,
  className = "",
  animation = "bounce",
  trigger = "hover",
}: AnimatedIconProps) {
  type AnimationName = NonNullable<AnimatedIconProps["animation"]>

  const animations: Record<AnimationName, TargetAndTransition> = {
    bounce: {
      y: [0, -10, 0],
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    rotate: {
      rotate: [0, 360],
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    pulse: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  }

  const alwaysAnimations: Record<AnimationName, TargetAndTransition> = {
    bounce: {
      y: [0, -5, 0],
      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
    },
    rotate: {
      rotate: [0, 360],
      transition: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
    },
    shake: {
      x: [0, -2, 2, -2, 2, 0],
      transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
    },
  }

  return (
    <motion.div
      className={className}
      whileHover={trigger === "hover" ? animations[animation] : undefined}
      animate={trigger === "always" ? alwaysAnimations[animation] : undefined}
    >
      {children}
    </motion.div>
  )
}
