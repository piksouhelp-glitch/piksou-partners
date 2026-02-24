"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { ReactNode } from "react"

interface RippleButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline"
}

export default function RippleButton({ children, className = "", onClick, variant = "primary" }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const addRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2
    const newRipple = { id: Date.now(), x, y }

    setRipples((prev) => [...prev, newRipple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)

    onClick?.()
  }

  const baseClasses = "relative overflow-hidden transition-all duration-200 font-medium rounded-lg"
  const variantClasses = {
    primary: "bg-gradient-to-r from-[#48C774] to-[#00BFFF] text-white hover:shadow-lg",
    secondary: "bg-[#FFC107] text-gray-900 hover:bg-[#FFD54F] hover:shadow-lg",
    outline:
      "border-2 border-[#48C774] text-[#48C774] hover:bg-[#48C774] hover:text-white dark:border-[#48C774] dark:text-[#48C774] dark:hover:bg-[#48C774] dark:hover:text-white",
  }

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={addRipple}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 100, height: 100, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  )
}
