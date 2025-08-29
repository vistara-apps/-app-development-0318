import React, { useState } from 'react'
import { BarChart3, DollarSign, TrendingUp, TrendingDown, Play } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { InputGroup, Input } from '../components/ui/InputGroup'
import { Button } from '../components/ui/Button'
import { TooltipButton } from '../components/ui/TooltipButton'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs'

export function TradeSimulator() {
  const [formData, setFormData] = useState({
    entryPrice: '',
    stopLossPrice: '',
    takeProfitPrice: '',
    positionSize: '',
    leverage: '1'
  })
  
  const [scenarios, setScenarios] = useState([])
  const [customPrice, setCustomPrice] = useState('')

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateScenarios = () => {
    const { entryPrice, stopLossPrice, takeProfitPrice, positionSize, leverage } = formData
    
    if (!entryPrice || !positionSize) {
      return
    }

    const entry = parseFloat(entryPrice)
    const position = parseFloat(positionSize)
    const lev = parseFloat(leverage)
    const stopLoss = stopLossPrice ? parseFloat(stopLossPrice) : null
    const takeProfit = takeProfitPrice ? parseFloat(takeProfitPrice) : null

    // Generate price scenarios
    const priceRanges = [
      { label: '-20%', price: entry * 0.8 },
      { label: '-10%', price: entry * 0.9 },
      { label: '-5%', price: entry * 0.95 },
      { label: 'Entry', price: entry },
      { label: '+5%', price: entry * 1.05 },
      { label: '+10%', price: entry * 1.1 },
      { label: '+20%', price: entry * 1.2 },
    ]

    const calculatedScenarios = priceRanges.map(scenario => {
      const priceDiff = scenario.price - entry
      const pnl = priceDiff * position * lev
      const pnlPercentage = ((scenario.price - entry) / entry) * 100 * lev
      
      let status = 'open'
      if (stopLoss && ((priceDiff < 0 && scenario.price <= stopLoss) || (priceDiff > 0 && scenario.price <= stopLoss))) {
        status = 'stopped'
      } else if (takeProfit && ((priceDiff > 0 && scenario.price >= takeProfit) || (priceDiff < 0 && scenario.price >= takeProfit))) {
        status = 'profit'
      }

      return {
        ...scenario,
        pnl: pnl.toFixed(2),
        pnlPercentage: pnlPercentage.toFixed(2),
        status
      }
    })

    setScenarios(calculatedScenarios)
  }

  const calculateCustomScenario = () => {
    if (!customPrice || !formData.entryPrice || !formData.positionSize) {
      return null
    }

    const entry = parseFloat(formData.entryPrice)
    const position = parseFloat(formData.positionSize)
    const lev = parseFloat(formData.leverage)
    const price = parseFloat(customPrice)

    const priceDiff = price - entry
    const pnl = priceDiff * position * lev
    const pnlPercentage = ((price - entry) / entry) * 100 * lev

    return {
      price: price.toFixed(2),
      pnl: pnl.toFixed(2),
      pnlPercentage: pnlPercentage.toFixed(2)
    }
  }

  const customResult = calculateCustomScenario()

  const getStatusColor = (status) => {
    switch (status) {
      case 'profit': return 'text-success'
      case 'stopped': return 'text-danger'
      default: return 'text-text-primary'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'profit': return 'Take Profit Hit'
      case 'stopped': return 'Stop Loss Hit'
      default: return 'Position Open'
    }
  }

  return (
    <div className="py-8 animate-fade-in">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-warning" />
            </div>
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Trade Scenario Simulator
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Simulate different market scenarios and visualize potential outcomes 
              for your trades at various price points.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Input Form */}
            <Card>
              <h2 className="text-heading text-text-primary mb-6">Trade Parameters</h2>
              
              <div className="space-y-6">
                <InputGroup 
                  label={
                    <div className="flex items-center space-x-2">
                      <span>Entry Price ($)</span>
                      <TooltipButton 
                        variant="withIcon"
                        tooltip="The price at which you entered or plan to enter"
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
                      <span>Position Size (units)</span>
                      <TooltipButton 
                        variant="withIcon"
                        tooltip="Number of units/coins in your position"
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

                <InputGroup 
                  label={
                    <div className="flex items-center space-x-2">
                      <span>Leverage (x)</span>
                      <TooltipButton 
                        variant="withIcon"
                        tooltip="Leverage multiplier (1 for spot trading)"
                      />
                    </div>
                  }
                >
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                    <Input
                      type="number"
                      placeholder="1"
                      value={formData.leverage}
                      onChange={(e) => handleInputChange('leverage', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </InputGroup>

                <div className="grid grid-cols-2 gap-4">
                  <InputGroup 
                    label={
                      <div className="flex items-center space-x-2">
                        <span>Stop Loss ($)</span>
                        <TooltipButton 
                          variant="withIcon"
                          tooltip="Optional: Stop loss price"
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
                        <span>Take Profit ($)</span>
                        <TooltipButton 
                          variant="withIcon"
                          tooltip="Optional: Take profit price"
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
                </div>

                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={generateScenarios}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Run Simulation
                </Button>
              </div>
            </Card>

            {/* Custom Price Calculator */}
            <Card>
              <h2 className="text-heading text-text-primary mb-6">Custom Price Scenario</h2>
              
              <div className="space-y-6">
                <InputGroup 
                  label={
                    <div className="flex items-center space-x-2">
                      <span>Custom Exit Price ($)</span>
                      <TooltipButton 
                        variant="withIcon"
                        tooltip="Enter any price to see the P&L at that level"
                      />
                    </div>
                  }
                >
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                    <Input
                      type="number"
                      placeholder="52000"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </InputGroup>

                {customResult && (
                  <div className="space-y-4">
                    <div className="p-4 bg-bg rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary">Exit Price:</span>
                        <span className="text-lg font-semibold text-text-primary">
                          ${customResult.price}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-bg rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary">P&L:</span>
                        <span className={`text-lg font-semibold ${
                          parseFloat(customResult.pnl) >= 0 ? 'text-success' : 'text-danger'
                        }`}>
                          ${customResult.pnl}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-bg rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary">P&L (%):</span>
                        <span className={`text-lg font-semibold ${
                          parseFloat(customResult.pnlPercentage) >= 0 ? 'text-success' : 'text-danger'
                        }`}>
                          {customResult.pnlPercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {!customResult && formData.entryPrice && formData.positionSize && (
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 text-text-secondary mx-auto mb-4" />
                    <p className="text-text-secondary">
                      Enter a custom price to see the P&L calculation.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Simulation Results */}
          {scenarios.length > 0 && (
            <Card>
              <h2 className="text-heading text-text-primary mb-6">Simulation Results</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-text-secondary/20">
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">Scenario</th>
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">Price</th>
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">P&L</th>
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">P&L (%)</th>
                      <th className="text-left py-3 px-4 text-text-secondary font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((scenario, index) => (
                      <tr key={index} className="border-b border-text-secondary/10">
                        <td className="py-3 px-4 text-text-primary font-medium">
                          {scenario.label}
                        </td>
                        <td className="py-3 px-4 text-text-primary">
                          ${scenario.price.toFixed(2)}
                        </td>
                        <td className={`py-3 px-4 font-semibold ${
                          parseFloat(scenario.pnl) >= 0 ? 'text-success' : 'text-danger'
                        }`}>
                          ${scenario.pnl}
                        </td>
                        <td className={`py-3 px-4 font-semibold ${
                          parseFloat(scenario.pnlPercentage) >= 0 ? 'text-success' : 'text-danger'
                        }`}>
                          {scenario.pnlPercentage}%
                        </td>
                        <td className={`py-3 px-4 ${getStatusColor(scenario.status)}`}>
                          {getStatusLabel(scenario.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}