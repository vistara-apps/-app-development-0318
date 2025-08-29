import React from 'react'
import { clsx } from 'clsx'

export function Spinner({ size = 'md', className }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <div className={clsx('animate-spin', sizes[size], className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="w-full h-full"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  )
}

export function LoadingOverlay({ isLoading, children, message = 'Loading...' }) {
  if (!isLoading) return children

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-bg/80 flex flex-col items-center justify-center z-10 rounded-lg">
        <Spinner size="lg" className="text-primary mb-2" />
        {message && <p className="text-text-primary">{message}</p>}
      </div>
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
    </div>
  )
}

