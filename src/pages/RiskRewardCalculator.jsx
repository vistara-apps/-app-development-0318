import React, { useState } from 'react'
import { Target, DollarSign, TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { InputGroup, Input } from '../components/ui/InputGroup'
import { Button } from '../components/ui/Button'
import { TooltipButton } from '../components/ui/TooltipButton'

export function RiskRewardCalculator() {
  const [formData, setFormData] = useState({
    entryPrice: '',
    stopLossPrice: '',
    takeProfitPrice: '',
    positionSize: ''
  })
  
  const [result, setResult] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateRiskReward = () => {
    const { entryPrice, stopLossPrice, takeProfitPrice, positionSize } = formData
    
    if (!entryPrice || !stopLossPrice || !takeProfitPrice) {
      return
    }

    const entry = parseFloat(entryPrice)
    const stopLoss = parseFloat(stopLossPrice)
    const takeProfit = parseFloat(takeProfitPrice)
    const position = positionSize ? parseFloat(positionSize) : 1

    const risk = Math.abs(entry - stopLoss)
    const reward = Math.abs(takeProfit - entry)
    const riskRewardRatio = reward / risk
    
    const potentialLoss = risk * position
    const potentialProfit = reward * position
    
    const riskPercentage = (risk / entry) * 100
    const rewardPercentage = (reward / entry) * 100

    // Determine if long or short position based on prices
    const isLong = takeProfit > entry
    const positionType = isLong ? 'Long' : 'Short'

    setResult({
      riskRewardRatio: riskRewardRatio.toFixed(2),
      potentialLoss: potentialLoss.toFixed(2),
      potentialProfit: potentialProfit.toFixed(2),
      riskAmount: risk.toFixed(2),
      rewardAmount: reward.toFixed(2),
      riskPercentage: riskPercentage.toFixed(2),
      rewardPercentage: rewardPercentage.toFixed(2),
      positionType
    })
  }

  const getRiskRewardColor = (ratio) => {
    if (ratio >= 2) return 'text-success'
    if (ratio >= 1.5) return 'text-warning'
    return 'text-danger'
  }

  const getRiskRewardMessage = (ratio) => {
    if (ratio >= 2) return 'Excellent risk/reward ratio! This trade has favorable odds.'
    if (ratio >= 1.5) return 'Good risk/reward ratio. Consider this trade carefully.'
    return 'Poor risk/reward ratio. Consider adjusting your targets.'
  }

  return (
    <div className="py-8 animate-fade-in">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Risk/Reward Calculator
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Analyze the potential profit against potential loss for any trade setup 
              to make data-driven trading decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <h2 className="text-heading text-text-primary mb-6">Trade Setup</h2>
              
              <div className="space-y-6">
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

                <InputGroup 
                  label={
                    <div className="flex items-center space-x-2">
                      <span>Take Profit Price ($)</span>
                      <TooltipButton 
                        variant="withIcon"
                        tooltip="The price at which you'll exit to take profits"
                      />
                    </div>
                  }
                >
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-success" />
                    <Input
                      type="number"
                      placeholder="55000"
                      value={formData.takeProfitPrice}
                      onChange={(e) => handleInputChange('takeProfitPrice', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </InputGroup>

                <InputGroup 
                  label={
                    <div className="flex items-center space-x-2">
                      <span>Position Size (units) - Optional</span>
                      <TooltipButton 
                        variant="withIcon"
                        tooltip="Number of units/coins in your position (leave empty for ratio only)"
                      />
                    </div>
                  }
                >
                  <Input
                    type="number"
                    placeholder="0.1"
                    value={formData.positionSize}
                    onChange={(e) => handleInputChange('positionSize', e.target.value)}
                  />
                </InputGroup>

                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={calculateRiskReward}
                >
                  Calculate Risk/Reward
                </Button>
              </div>
            </Card>

            {/* Results */}
            <Card>
              <h2 className="text-heading text-text-primary mb-6">Analysis Results</h2>
              
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-bg rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Position Type:</span>
                      <span className={`text-lg font-semibold ${
                        result.positionType === 'Long' ? 'text-success' : 'text-danger'
                      }`}>
                        {result.positionType}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 bg-primary/10 border border-primary/20 rounded-md">
                    <div className="text-center">
                      <p className="text-text-secondary mb-2">Risk/Reward Ratio</p>
                      <p className={`text-3xl font-bold ${getRiskRewardColor(parseFloat(result.riskRewardRatio))}`}>
                        1:{result.riskRewardRatio}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-danger/10 border border-danger/20 rounded-md">
                      <div className="text-center">
                        <p className="text-text-secondary text-sm mb-1">Risk Amount</p>
                        <p className="text-lg font-semibold text-danger">
                          ${result.riskAmount}
                        </p>
                        <p className="text-xs text-text-secondary">
                          ({result.riskPercentage}%)
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-success/10 border border-success/20 rounded-md">
                      <div className="text-center">
                        <p className="text-text-secondary text-sm mb-1">Reward Amount</p>
                        <p className="text-lg font-semibold text-success">
                          ${result.rewardAmount}
                        </p>
                        <p className="text-xs text-text-secondary">
                          ({result.rewardPercentage}%)
                        </p>
                      </div>
                    </div>
                  </div>

                  {formData.positionSize && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-bg rounded-md">
                        <div className="flex justify-between items-center">
                          <span className="text-text-secondary">Potential Loss:</span>
                          <span className="text-lg font-semibold text-danger">
                            ${result.potentialLoss}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 bg-bg rounded-md">
                        <div className="flex justify-between items-center">
                          <span className="text-text-secondary">Potential Profit:</span>
                          <span className="text-lg font-semibold text-success">
                            ${result.potentialProfit}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={`mt-6 p-4 rounded-md border ${
                    parseFloat(result.riskRewardRatio) >= 2 
                      ? 'bg-success/10 border-success/20' 
                      : parseFloat(result.riskRewardRatio) >= 1.5
                      ? 'bg-warning/10 border-warning/20'
                      : 'bg-danger/10 border-danger/20'
                  }`}>
                    <p className={`text-sm font-medium ${
                      parseFloat(result.riskRewardRatio) >= 2 
                        ? 'text-success' 
                        : parseFloat(result.riskRewardRatio) >= 1.5
                        ? 'text-warning'
                        : 'text-danger'
                    }`}>
                      {getRiskRewardMessage(parseFloat(result.riskRewardRatio))}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="h-12 w-12 text-text-secondary mx-auto mb-4" />
                  <p className="text-text-secondary">
                    Enter your trade setup to analyze the risk/reward ratio.
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