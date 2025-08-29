import React from 'react'
import { Link } from 'react-router-dom'
import { Calculator, Shield, TrendingUp, Target, BarChart3, Zap } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export function Home() {
  const features = [
    {
      icon: Calculator,
      title: 'Position Sizing Calculator',
      description: 'Calculate optimal position sizes based on your risk tolerance and account balance.',
      href: '/position-sizer',
      color: 'text-primary'
    },
    {
      icon: Shield,
      title: 'Liquidation Price Predictor',
      description: 'Know exactly when your leveraged positions will be liquidated.',
      href: '/liquidation-calculator',
      color: 'text-danger'
    },
    {
      icon: Target,
      title: 'Risk/Reward Calculator',
      description: 'Analyze the potential profit against potential loss for any trade.',
      href: '/risk-reward',
      color: 'text-accent'
    },
    {
      icon: BarChart3,
      title: 'Trade Scenario Simulator',
      description: 'Simulate different market scenarios and visualize potential outcomes.',
      href: '/trade-simulator',
      color: 'text-warning'
    }
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-bg to-surface/20">
        <div className="container-custom text-center">
          <h1 className="text-6xl font-bold text-text-primary mb-6">
            Master Your Crypto Trades
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Calculate optimal position sizes, predict liquidation prices, and analyze risk/reward ratios 
            with precision. Make data-driven trading decisions that protect your capital.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/position-sizer">
              <Button variant="primary" size="lg">
                Start Calculating
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="secondary" size="lg">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Powerful Trading Tools
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Everything you need to make informed trading decisions and manage risk effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Link 
                key={feature.title} 
                to={feature.href}
                className="block transform hover:scale-105 transition-transform duration-200"
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-surface ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-heading text-text-primary mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-text-secondary">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-surface/20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Why Choose Leverage Lever?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-heading text-text-primary mb-2">Instant Calculations</h3>
              <p className="text-text-secondary">
                Get real-time results for all your trading calculations with precision and speed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-heading text-text-primary mb-2">Risk Management</h3>
              <p className="text-text-secondary">
                Protect your capital with advanced risk management tools and calculations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-warning" />
              </div>
              <h3 className="text-heading text-text-primary mb-2">Better Profits</h3>
              <p className="text-text-secondary">
                Make smarter trading decisions that lead to more consistent profitability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom text-center">
          <Card className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Ready to Level Up Your Trading?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Join thousands of traders who use Leverage Lever to make better trading decisions.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/position-sizer">
                <Button variant="primary" size="lg">
                  Try Free Calculator
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="secondary" size="lg">
                  Subscribe Now
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}