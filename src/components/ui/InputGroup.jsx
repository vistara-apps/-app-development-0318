import React from 'react'
import { clsx } from 'clsx'

export function InputGroup({ 
  label, 
  children, 
  variant = 'default',
  className,
  error,
  ...props 
}) {
  const variants = {
    default: "space-y-2",
    withLabel: "space-y-2",
    inline: "flex items-center space-x-4"
  }

  return (
    <div className={clsx(variants[variant], className)} {...props}>
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-danger">{error}</p>
      )}
    </div>
  )
}

export function Input({ 
  type = 'text',
  className,
  error,
  ...props 
}) {
  return (
    <input
      type={type}
      className={clsx(
        "input-field w-full",
        error && "border-danger focus:border-danger",
        className
      )}
      {...props}
    />
  )
}