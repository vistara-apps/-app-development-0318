import React, { useState } from 'react'
import { Shield, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { InputGroup, Input } from '../components/ui/InputGroup'
import { Button } from '../components/ui/Button'
import { TooltipButton } from '../components/ui/TooltipButton'

export function LiquidationCalculator() {
  const [formData, setFormData] = useState({
    entryPrice: '',
    leverage: '10',
    positionSize: '',
    marginAmount: '',
    positionType: 'long'
  })
  
  const [result, setResult] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateLiquidation = () => {
    const { entryPrice, leverage, positionSize, marginAmount, positionType } = formData
    
    if (!entryPrice || !leverage || (!positionSize && !marginAmount)) {
      return
    }

    const entry = parseFloat(entryPrice)
    const lev = parseFloat(leverage)
    const margin = marginAmount ? parseFloat(marginAmount) : (parseFloat(positionSize) * entry) / lev
    const position = positionSize ? parseFloat(positionSize) : (margin * lev) / entry

    // Simplified liquidation calculation (assuming 0.5% maintenance margin)
    const maintenanceMargin = 0.005 // 0.5%
    
    let liquidationPrice
    if (positionType === 'long') {
      liquidationPrice = entry * (1 - (1 / lev) + maintenanceMargin)
    } else {
      liquidationPrice = entry * (1 + (1 / lev) - maintenanceMargin)
    }

    const distanceToLiquidation = Math.abs(entry - liquidationPrice)
    const distancePercentage = (distanceToLiquidation / entry) * 100
    const positionValue = position * entry

    setResult({
      liquidationPrice: liquidationPrice.toFixed(2),
      distanceToLiquidation: distanceToLiquidation.toFixed(2),
      distancePercentage: distancePercentage.toFixed(2),
      marginUsed: margin.toFixed(2),
      positionValue: positionValue.toFixed(2),
      positionSize: position.toFixed(8)
    })
  }

  return (
    <div className="py-8 animate-fade-in">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-danger/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-danger" />
            </div>
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Liquidation Price Calculator
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Calculate the exact price at which your leveraged position will be liquidated 
              to manage your risk effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <h2 className="text-heading text-text-primary mb-6">Position Details</h2>
              
              <div className="space-y-6">
                <InputGroup label="Position Type">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleInputChange('positionType', 'long')}
                      className={`flex-1 py-3 px-4 rounded-md border transition-colors duration-200 ${
                        formData.positionType === 'long'
                          ? 'bg-success/20 border-success text-success'
                          : 'bg-surface border-text-secondary/20 text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      Long Position
                    </button>
                    <button
                      onClick={() => handleInputChange('positionType', 'short')}
                      className={`flex-1 py-3 px-4 rounded-md border transition-colors duration-200 ${
                        formData.positionType === 'short'
                          ? 'bg-danger/20 border-danger text-danger'
                          : 'bg-surface border-text-secondary/20 text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      Short Position
                    </button>
                  </div>
                </InputGroup>

                <InputGroup 
                  label={
                    <div className="flex items-center space-x-2">
                      <span>Entry Price ($)</span>
                      <TooltipButton 
                        variant="withIcon"
                        tooltip="The price at which you entered the position"
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
                      <span>Leverage (x)</span>
                      <TooltipButton 
                        variant="withIcon"
                        tooltip="The leverage multiplier for your position"
                      />
                    </div>
                  }
                >
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                    <Input
                      type="number"
                      placeholder="10"
                      value={formData.leverage}
                      onChange={(e) => handleInputChange('leverage', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </InputGroup>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <div className="flex items-center justify-center">
                    <span className="text-text-secondary font-medium">OR</span>
                  </div>
                </div>

                <InputGroup 
                  label={
                    <div className="flex items-center space-x-2">
                      <span>Margin Amount ($)</span>
                      <TooltipButton 
                        variant="withIcon"
                        tooltip="The margin/collateral amount you put up for the position"
                      />
                    </div>
                  }
                >
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                    <Input
                      type="number"
                      placeholder="500"
                      value={formData.marginAmount}
                      onChange={(e) => handleInputChange('marginAmount', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </InputGroup>

                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={calculateLiquidation}
                >
                  Calculate Liquidation Price
                </Button>
              </div>
            </Card>

            {/* Results */}
            <Card>
              <h2 className="text-heading text-text-primary mb-6">Liquidation Analysis</h2>
              
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-danger/10 border border-danger/20 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Liquidation Price:</span>
                      <span className="text-xl font-bold text-danger">
                        ${result.liquidationPrice}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-bg rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Distance to Liquidation:</span>
                      <span className="text-lg font-semibold text-warning">
                        ${result.distanceToLiquidation}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-bg rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Distance (%):</span>
                      <span className="text-lg font-semibold text-warning">
                        {result.distancePercentage}%
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-bg rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Position Size:</span>
                      <span className="text-lg font-semibold text-text-primary">
                        {result.positionSize} units
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-bg rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Position Value:</span>
                      <span className="text-lg font-semibold text-primary">
                        ${result.positionValue}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-bg rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Margin Used:</span>
                      <span className="text-lg font-semibold text-accent">
                        ${result.marginUsed}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-md">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                      <div>
                        <p className="text-sm text-warning font-medium mb-1">
                          Risk Warning
                        </p>
                        <p className="text-sm text-warning">
                          Your position will be automatically liquidated if the price reaches 
                          ${result.liquidationPrice}. Consider setting stop-losses above this level.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Shield className="h-12 w-12 text-text-secondary mx-auto mb-4" />
                  <p className="text-text-secondary">
                    Enter your position details to calculate the liquidation price.
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