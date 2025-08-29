import React, { useState } from 'react'
import { Calculator, DollarSign, Percent, TrendingDown } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { InputGroup, Input } from '../components/ui/InputGroup'
import { Button } from '../components/ui/Button'
import { TooltipButton } from '../components/ui/TooltipButton'

export function PositionSizer() {
  const [formData, setFormData] = useState({
    accountBalance: '',
    riskPercentage: '2',
    entryPrice: '',
    stopLossPrice: ''
  })
  
  const [result, setResult] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculatePositionSize = () => {
    const { accountBalance, riskPercentage, entryPrice, stopLossPrice } = formData
    
    if (!accountBalance || !riskPercentage || !entryPrice || !stopLossPrice) {
      return
    }

    const balance = parseFloat(accountBalance)
    const risk = parseFloat(riskPercentage) / 100
    const entry = parseFloat(entryPrice)
    const stopLoss = parseFloat(stopLossPrice)

    const riskAmount = balance * risk
    const stopLossDistance = Math.abs(entry - stopLoss)
    const positionSize = riskAmount / stopLossDistance
    const positionValue = positionSize * entry
    const positionPercentage = (positionValue / balance) * 100

    setResult({
      positionSize: positionSize.toFixed(8),
      positionValue: positionValue.toFixed(2),
      positionPercentage: positionPercentage.toFixed(2),
      riskAmount: riskAmount.toFixed(2),
      stopLossDistance: stopLossDistance.toFixed(8)
    })
  }

  return (
    <div className="py-8 animate-fade-in">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Position Sizing Calculator
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Calculate the optimal position size for your trades based on your risk tolerance 
              and stop-loss distance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <h2 className="text-heading text-text-primary mb-6">Trade Parameters</h2>
              
              <div className="space-y-6">
                <InputGroup 
                  label={
                    <div className="flex items-center space-x-2">
                      <span>Account Balance ($)</span>
                      <TooltipButton 
                        variant="withIcon"
                        tooltip="Your total trading account balance in USD"
                      />
                    </div>
                  }
                >
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                    <Input
                      type="number"
                      placeholder="10000"
                      value={formData.accountBalance}
                      onChange={(e) => handleInputChange('accountBalance', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </InputGroup>

                <InputGroup 
                  label={
                    <div className="flex items-center space-x-2">
                      <span>Risk Per Trade (%)</span>
                      <TooltipButton 
                        variant="withIcon"
                        tooltip="Percentage of your account you're willing to risk on this trade"
                      />
                    </div>
                  }
                >
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                    <Input
                      type="number"
                      placeholder="2"
                      value={formData.riskPercentage}
                      onChange={(e) => handleInputChange('riskPercentage', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </InputGroup>

                <InputGroup 
                  label={
                    <div className="flex items-center space-x-2">
                      <span>Entry Price ($)</span>
                      <TooltipButton 
                        variant="withIcon"
                        tooltip="The price at which you plan to enter the trade"
                      />
                    </div>
                  }
                >
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                    <Input
                      type="number"
                      placeholder="50000"
                      value={formData.entryPrice}
                      onChange={(e) => handleInputChange('entryPrice', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </InputGroup>

                <InputGroup 
                  label={
                    <div className="flex items-center space-x-2">
                      <span>Stop Loss Price ($)</span>
                      <TooltipButton 
                        variant="withIcon"
                        tooltip="The price at which you'll exit to limit losses"
                      />
                    </div>
                  }
                >
                  <div className="relative">
                    <TrendingDown className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-danger" />
                    <Input
                      type="number"
                      placeholder="48000"
                      value={formData.stopLossPrice}
                      onChange={(e) => handleInputChange('stopLossPrice', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </InputGroup>

                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={calculatePositionSize}
                >
                  Calculate Position Size
                </Button>
              </div>
            </Card>

            {/* Results */}
            <Card>
              <h2 className="text-heading text-text-primary mb-6">Calculation Results</h2>
              
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-bg rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Position Size:</span>
                      <span className="text-lg font-semibold text-primary">
                        {result.positionSize} units
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-bg rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Position Value:</span>
                      <span className="text-lg font-semibold text-text-primary">
                        ${result.positionValue}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-bg rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">% of Account:</span>
                      <span className="text-lg font-semibold text-accent">
                        {result.positionPercentage}%
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-bg rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Risk Amount:</span>
                      <span className="text-lg font-semibold text-danger">
                        ${result.riskAmount}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-bg rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Stop Loss Distance:</span>
                      <span className="text-lg font-semibold text-warning">
                        ${result.stopLossDistance}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-md">
                    <p className="text-sm text-success">
                      ✓ This position size ensures you risk exactly {formData.riskPercentage}% 
                      of your account balance if your stop loss is hit.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-12 w-12 text-text-secondary mx-auto mb-4" />
                  <p className="text-text-secondary">
                    Enter your trade parameters to calculate the optimal position size.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}