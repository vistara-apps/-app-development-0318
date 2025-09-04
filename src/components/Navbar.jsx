import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Calculator, Menu, X, TrendingUp, Home, DollarSign, Shield, Target, BarChart3 } from 'lucide-react'
import { Button } from './ui/Button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Navigation items with icons for mobile
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Position Sizer', href: '/position-sizer', icon: Calculator },
    { name: 'Liquidation Calculator', href: '/liquidation-calculator', icon: Shield },
    { name: 'Risk/Reward', href: '/risk-reward', icon: Target },
    { name: 'Trade Simulator', href: '/trade-simulator', icon: BarChart3 },
    { name: 'Pricing', href: '/pricing', icon: DollarSign },
  ]
  
  // Handle scroll events to add shadow to navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <nav className={`sticky top-0 z-50 bg-surface border-b border-text-secondary/20 transition-shadow duration-300 ${
      scrolled ? 'shadow-lg' : ''
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" aria-label="Leverage Lever Home">
              <TrendingUp className="h-8 w-8 text-primary" />
              <span className="text-xl md:text-2xl font-bold text-text-primary">Leverage Lever</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                  }`}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Button variant="primary">Subscribe</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="touch-target inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Animated slide down */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-surface border-t border-text-secondary/20">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                }`}
                onClick={() => setIsOpen(false)}
                aria-current={location.pathname === item.href ? 'page' : undefined}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
          <div className="px-3 py-2 mt-4">
            <Button variant="primary" className="w-full">Subscribe</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
