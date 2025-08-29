import React, { useState } from 'react'
import { clsx } from 'clsx'

export function Tabs({ children, defaultValue, variant = 'default', className }) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  const variants = {
    default: "border-b border-text-secondary/20",
    underlined: "border-b-2 border-transparent"
  }

  return (
    <div className={clsx("w-full", className)}>
      <div className={clsx("flex space-x-8", variants[variant])}>
        {React.Children.map(children, (child) => {
          if (child.type === TabsList) {
            return React.cloneElement(child, { activeTab, setActiveTab, variant })
          }
          return null
        })}
      </div>
      <div className="mt-6">
        {React.Children.map(children, (child) => {
          if (child.type === TabsContent && child.props.value === activeTab) {
            return child
          }
          return null
        })}
      </div>
    </div>
  )
}

export function TabsList({ children, activeTab, setActiveTab, variant }) {
  return (
    <>
      {React.Children.map(children, (child) => {
        if (child.type === TabsTrigger) {
          return React.cloneElement(child, { 
            activeTab, 
            setActiveTab,
            isActive: activeTab === child.props.value,
            variant
          })
        }
        return child
      })}
    </>
  )
}

export function TabsTrigger({ children, value, activeTab, setActiveTab, isActive, variant }) {
  const variants = {
    default: isActive 
      ? "border-b-2 border-primary text-primary" 
      : "text-text-secondary hover:text-text-primary",
    underlined: isActive 
      ? "border-b-2 border-primary text-primary" 
      : "text-text-secondary hover:text-text-primary border-b-2 border-transparent"
  }

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={clsx(
        "pb-3 px-1 font-medium text-sm transition-colors duration-200",
        variants[variant]
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ children, value }) {
  return <div>{children}</div>
}