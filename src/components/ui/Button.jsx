import React from 'react'
import { clsx } from 'clsx'

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  disabled = false,
  ...props 
}) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-white",
    secondary: "bg-surface hover:bg-surface/80 text-text-primary border border-text-secondary/20",
    danger: "bg-danger hover:bg-danger/90 text-white",
    ghost: "hover:bg-surface/50 text-text-primary"
  }
  
  const sizes = {
    sm: "px-3 py-2 text-sm rounded-sm",
    md: "px-6 py-3 text-base rounded-md",
    lg: "px-8 py-4 text-lg rounded-lg"
  }

  return (
    <button
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}