import React from 'react'
import { clsx } from 'clsx'

export function Card({ children, className, variant = 'default', ...props }) {
  const variants = {
    default: "bg-surface shadow-card",
    transparent: "bg-transparent"
  }

  return (
    <div
      className={clsx(
        "rounded-lg p-6",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}