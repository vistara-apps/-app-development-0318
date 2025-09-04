import React from 'react'
import { clsx } from 'clsx'

export function ProgressBar({ 
  value, 
  max = 100, 
  showLabel = true,
  size = 'md',
  variant = 'primary',
  className 
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4'
  }
  
  const variants = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    accent: 'bg-accent'
  }
  
  return (
    <div className="w-full">
      <div className={clsx('w-full bg-surface rounded-full overflow-hidden', sizes[size], className)}>
        <div 
          className={clsx('transition-all duration-500 ease-out rounded-full', variants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-text-secondary">{value}</span>
          <span className="text-xs text-text-secondary">{max}</span>
        </div>
      )}
    </div>
  )
}

export function RiskRewardBar({ 
  risk, 
  reward,
  showLabels = true,
  className 
}) {
  const ratio = reward / risk
  const isGoodRatio = ratio >= 2
  
  return (
    <div className={clsx('w-full', className)}>
      <div className="flex h-8 rounded-md overflow-hidden">
        <div 
          className="bg-danger flex items-center justify-center"
          style={{ width: `${(risk / (risk + reward)) * 100}%` }}
        >
          {showLabels && (
            <span className="text-xs font-medium text-white">Risk</span>
          )}
        </div>
        <div 
          className="bg-success flex items-center justify-center"
          style={{ width: `${(reward / (risk + reward)) * 100}%` }}
        >
          {showLabels && (
            <span className="text-xs font-medium text-white">Reward</span>
          )}
        </div>
      </div>
      
      {showLabels && (
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm text-danger">-${risk}</span>
          <span className={clsx('text-sm font-medium', isGoodRatio ? 'text-success' : 'text-warning')}>
            {ratio.toFixed(2)}:1
          </span>
          <span className="text-sm text-success">+${reward}</span>
        </div>
      )}
    </div>
  )
}

export function LiquidationMeter({
  entryPrice,
  currentPrice,
  liquidationPrice,
  position = 'long',
  className
}) {
  // For long positions: entry > liquidation
  // For short positions: entry < liquidation
  const isLong = position === 'long'
  
  // Calculate the range and current position
  const min = isLong ? liquidationPrice : entryPrice
  const max = isLong ? entryPrice : liquidationPrice
  const range = max - min
  
  // Calculate how close we are to liquidation (0-100%)
  let dangerPercentage = 0
  
  if (isLong) {
    // For long positions, we get liquidated when price falls
    dangerPercentage = Math.min(Math.max(((entryPrice - currentPrice) / (entryPrice - liquidationPrice)) * 100, 0), 100)
  } else {
    // For short positions, we get liquidated when price rises
    dangerPercentage = Math.min(Math.max(((currentPrice - entryPrice) / (liquidationPrice - entryPrice)) * 100, 0), 100)
  }
  
  // Determine color based on danger level
  let color = 'bg-success'
  if (dangerPercentage > 80) {
    color = 'bg-danger'
  } else if (dangerPercentage > 50) {
    color = 'bg-warning'
  } else if (dangerPercentage > 20) {
    color = 'bg-accent'
  }
  
  return (
    <div className={clsx('w-full', className)}>
      <div className="w-full h-4 bg-surface rounded-full overflow-hidden">
        <div 
          className={clsx('h-full transition-all duration-300', color)}
          style={{ width: `${dangerPercentage}%` }}
        />
      </div>
      
      <div className="mt-2 flex justify-between text-xs">
        <div className="flex flex-col items-start">
          <span className="text-text-secondary">Liquidation</span>
          <span className="text-danger font-medium">${liquidationPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-text-secondary">Current</span>
          <span className="text-text-primary font-medium">${currentPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-text-secondary">Entry</span>
          <span className="text-primary font-medium">${entryPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

