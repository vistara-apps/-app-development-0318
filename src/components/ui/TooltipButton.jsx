import React, { useState } from 'react'
import { clsx } from 'clsx'
import { HelpCircle } from 'lucide-react'

export function TooltipButton({ 
  children, 
  tooltip, 
  variant = 'default',
  icon: Icon = HelpCircle,
  className 
}) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={clsx(
          "inline-flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-colors duration-200",
          className
        )}
      >
        {variant === 'withIcon' && <Icon className="h-4 w-4" />}
        {children}
      </button>
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-surface border border-text-secondary/20 rounded-md text-sm text-text-primary whitespace-nowrap z-10 animate-fade-in">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-surface"></div>
        </div>
      )}
    </div>
  )
}