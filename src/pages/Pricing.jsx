import React from 'react'
import { Check, Star, Zap } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export function Pricing() {
  const plans = [
    {
      name: 'Basic',
      price: '$5',
      period: '/month',
      description: 'Perfect for individual traders getting started',
      features: [
        'Position Sizing Calculator',
        'Liquidation Price Calculator',
        'Risk/Reward Calculator',
        'Basic Trade Simulator',
        '50 calculations per month',
        'Email support'
      ],
      buttonText: 'Start Basic Plan',
      buttonVariant: 'secondary',
      popular: false
    },
    {
      name: 'Advanced',
      price: '$15',
      period: '/month',
      description: 'Best for professional traders and serious investors',
      features: [
        'All Basic features',
        'Unlimited calculations',
        'Advanced Trade Simulator',
        'Historical data analysis',
        'Portfolio tracking',
        'Priority support',
        'Export to CSV',
        'API access'
      ],
      buttonText: 'Start Advanced Plan',
      buttonVariant: 'primary',
      popular: true
    }
  ]

  const faqs = [
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.'
    },
    {
      question: 'Do you offer a free trial?',
      answer: 'We offer limited free access to our basic calculators. Sign up to try them out before subscribing.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers through our secure payment processor Stripe.'
    },
    {
      question: 'Is my trading data secure?',
      answer: 'Yes, we take security seriously. All calculations are performed locally in your browser, and we never store your trading data.'
    }
  ]

  return (
    <div className="py-8 animate-fade-in">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Choose Your Plan
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Select the perfect plan for your trading needs. All plans include access 
              to our core calculators with no hidden fees.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-text-secondary ml-1">{plan.period}</span>
                  </div>
                  <p className="text-text-secondary">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-text-primary">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={plan.buttonVariant} 
                  className="w-full"
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </Card>
            ))}
          </div>

          {/* Features Comparison */}
          <Card className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
              Why Choose Leverage Lever?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Instant Results
                </h3>
                <p className="text-text-secondary">
                  Get real-time calculations for all your trading decisions with precision and speed.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Proven Accuracy
                </h3>
                <p className="text-text-secondary">
                  Industry-standard calculations used by professional traders worldwide.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-warning" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Expert Support
                </h3>
                <p className="text-text-secondary">
                  Get help from our team of experienced traders and technical experts.
                </p>
              </div>
            </div>
          </Card>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-text-secondary">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                Ready to Start Trading Smarter?
              </h2>
              <p className="text-text-secondary mb-6">
                Join thousands of traders who trust Leverage Lever for their trading calculations.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="primary" size="lg">
                  Start Free Trial
                </Button>
                <Button variant="secondary" size="lg">
                  View Demo
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}