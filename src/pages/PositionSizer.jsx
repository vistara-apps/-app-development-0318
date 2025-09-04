import React, { useState, useEffect } from 'react'
import { Calculator, DollarSign, Percent, TrendingDown, History, Save, RefreshCw } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { InputGroup, Input } from '../components/ui/InputGroup'
import { Button } from '../components/ui/Button'
import { TooltipButton } from '../components/ui/TooltipButton'
import { Spinner, LoadingOverlay } from '../components/ui/Spinner'
import { ProgressBar } from '../components/ui/Chart'
import { 
  isValidNumber, 
  isValidPercentage, 
  isValidPrice, 
  formatCurrency,
  validatePositionSizerForm 
} from '../utils/validation'
import { 
  STORAGE_KEYS, 
  saveFormData, 
  loadFormData, 
  saveCalculationToHistory 
} from '../utils/storage'

export function PositionSizer() {
  const [formData, setFormData] = useState({
    accountBalance: '',
    riskPercentage: '2',
    entryPrice: '',
    stopLossPrice: ''
  })
  
  const [formErrors, setFormErrors] = useState({})
  const [result, setResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [calculationHistory, setCalculationHistory] = useState([])
  
  // Load saved form data on component mount
  useEffect(() => {
    const savedData = loadFormData(STORAGE_KEYS.POSITION_SIZER)
    if (savedData) {
      setFormData(savedData)
    }
    
    // Load calculation history
    const history = loadFormData(STORAGE_KEYS.CALCULATION_HISTORY) || []
    const positionSizerHistory = history.filter(item => item.calculatorType === 'positionSizer')
    setCalculationHistory(positionSizerHistory.slice(0, 5)) // Show only the last 5 calculations
  }, [])
  
  // Save form data when it changes
  useEffect(() => {
    if (Object.values(formData).some(value => value !== '')) {
      saveFormData(STORAGE_KEYS.POSITION_SIZER, formData)
    }
  }, [formData])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error for this field when user types
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }
  
  const validateForm = () => {
    const validation = validatePositionSizerForm(formData)
    setFormErrors(validation.errors)
    return validation.isValid
  }

  const calculatePositionSize = () => {
    if (!validateForm()) {
      return
    }
    
    setIsCalculating(true)
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        const { accountBalance, riskPercentage, entryPrice, stopLossPrice } = formData
        
        const balance = parseFloat(accountBalance)
        const risk = parseFloat(riskPercentage) / 100
        const entry = parseFloat(entryPrice)
        const stopLoss = parseFloat(stopLossPrice)
        
        // Determine if this is a long or short position
        const isLong = entry > stopLoss
        const positionType = isLong ? 'long' : 'short'
    
        const riskAmount = balance * risk
        const stopLossDistance = Math.abs(entry - stopLoss)
        const positionSize = riskAmount / stopLossDistance
        const positionValue = positionSize * entry
        const positionPercentage = (positionValue / balance) * 100
        
        // Calculate leverage if using all available balance
        const maxLeverage = (balance > 0) ? (positionValue / balance).toFixed(2) : '0.00'
    
        const calculationResult = {
          positionSize: positionSize.toFixed(8),
          positionValue: positionValue.toFixed(2),
          positionPercentage: positionPercentage.toFixed(2),
          riskAmount: riskAmount.toFixed(2),
          stopLossDistance: stopLossDistance.toFixed(8),
          positionType,
          maxLeverage
        }
        
        setResult(calculationResult)
        
        // Save calculation to history
        saveCalculationToHistory('positionSizer', formData, calculationResult)
        
        // Update local history state
        setCalculationHistory(prev => {
          const newHistory = [{
            id: Date.now(),
            timestamp: new Date().toISOString(),
            calculatorType: 'positionSizer',
            formData: {...formData},
            result: calculationResult
          }, ...prev]
          
          return newHistory.slice(0, 5) // Keep only the last 5 calculations
        })
      } catch (error) {
        console.error('Calculation error:', error)
      } finally {
        setIsCalculating(false)
      }
    }, 600) // Simulate calculation delay
  }
  
  const loadFromHistory = (historyItem) => {
    setFormData(historyItem.formData)
    setResult(historyItem.result)
    setShowHistory(false)
  }
  
  const resetForm = () => {
    setFormData({
      accountBalance: '',
      riskPercentage: '2',
      entryPrice: '',
      stopLossPrice: ''
    })
    setFormErrors({})
    setResult(null)
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-heading text-text-primary">Trade Parameters</h2>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowHistory(!showHistory)}
                    aria-label="View calculation history"
                  >
                    <History className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={resetForm}
                    aria-label="Reset form"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {showHistory && calculationHistory.length > 0 ? (
                <div className="space-y-4 mb-6">
                  <h3 className="text-sm font-medium text-text-primary">Recent Calculations</h3>
                  {calculationHistory.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-3 bg-bg rounded-md hover:bg-surface/80 cursor-pointer transition-colors"
                      onClick={() => loadFromHistory(item)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-text-primary">
                          {item.result.positionType === 'long' ? '🔼 Long' : '🔽 Short'} - {item.result.positionSize} units
                        </span>
                        <span className="text-xs text-text-secondary">
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-text-secondary">
                        <span>Entry: ${item.formData.entryPrice}</span>
                        <span>Stop: ${item.formData.stopLossPrice}</span>
                        <span>Risk: {item.formData.riskPercentage}%</span>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setShowHistory(false)}
                  >
                    Back to Calculator
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <InputGroup 
                    label="Account Balance ($)"
                    required
                    error={formErrors.accountBalance}
                    helpText="Your total trading account balance in USD"
                  >
                    <Input
                      type="number"
                      placeholder="10000"
                      value={formData.accountBalance}
                      onChange={(e) => handleInputChange('accountBalance', e.target.value)}
                      icon={DollarSign}
                      aria-required="true"
                      aria-invalid={!!formErrors.accountBalance}
                      formatter={(value) => isValidNumber(value) ? formatCurrency(value, 2) : value}
                    />
                  </InputGroup>

                  <InputGroup 
                    label="Risk Per Trade (%)"
                    required
                    error={formErrors.riskPercentage}
                    helpText="Percentage of your account you're willing to risk on this trade"
                  >
                    <Input
                      type="number"
                      placeholder="2"
                      value={formData.riskPercentage}
                      onChange={(e) => handleInputChange('riskPercentage', e.target.value)}
                      icon={Percent}
                      aria-required="true"
                      aria-invalid={!!formErrors.riskPercentage}
                    />
                  </InputGroup>

                  <InputGroup 
                    label="Entry Price ($)"
                    required
                    error={formErrors.entryPrice}
                    helpText="The price at which you plan to enter the trade"
                  >
                    <Input
                      type="number"
                      placeholder="50000"
                      value={formData.entryPrice}
                      onChange={(e) => handleInputChange('entryPrice', e.target.value)}
                      icon={DollarSign}
                      aria-required="true"
                      aria-invalid={!!formErrors.entryPrice}
                      formatter={(value) => isValidNumber(value) ? formatCurrency(value, 2) : value}
                    />
                  </InputGroup>

                  <InputGroup 
                    label="Stop Loss Price ($)"
                    required
                    error={formErrors.stopLossPrice}
                    helpText="The price at which you'll exit to limit losses"
                  >
                    <Input
                      type="number"
                      placeholder="48000"
                      value={formData.stopLossPrice}
                      onChange={(e) => handleInputChange('stopLossPrice', e.target.value)}
                      icon={TrendingDown}
                      iconPosition="left"
                      aria-required="true"
                      aria-invalid={!!formErrors.stopLossPrice}
                      formatter={(value) => isValidNumber(value) ? formatCurrency(value, 2) : value}
                    />
                  </InputGroup>

                  <Button 
                    variant="primary" 
                    className="w-full"
                    onClick={calculatePositionSize}
                    disabled={isCalculating}
                  >
                    {isCalculating ? (
                      <span className="flex items-center justify-center">
                        <Spinner size="sm" className="mr-2" />
                        Calculating...
                      </span>
                    ) : (
                      'Calculate Position Size'
                    )}
                  </Button>
                </div>
              )}
            </Card>

            {/* Results */}
            <LoadingOverlay isLoading={isCalculating}>
              <Card>
                <h2 className="text-heading text-text-primary mb-6">Calculation Results</h2>
                
                {result ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-bg rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-text-secondary">Position Size:</span>
                        <span className="text-lg font-semibold text-primary">
                          {result.positionSize} units
                        </span>
                      </div>
                      <div className="text-xs text-text-secondary">
                        {result.positionType === 'long' ? '🔼 Long Position' : '🔽 Short Position'}
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
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-text-secondary">% of Account:</span>
                        <span className="text-lg font-semibold text-accent">
                          {result.positionPercentage}%
                        </span>
                      </div>
                      <ProgressBar 
                        value={parseFloat(result.positionPercentage)} 
                        max={100}
                        variant={parseFloat(result.positionPercentage) > 80 ? 'danger' : 'accent'}
                      />
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
                    
                    <div className="p-4 bg-bg rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary">Max Leverage:</span>
                        <span className="text-lg font-semibold text-primary">
                          {result.maxLeverage}x
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-md">
                      <p className="text-sm text-success">
                        ✓ This position size ensures you risk exactly {formData.riskPercentage}% 
                        of your account balance if your stop loss is hit.
                      </p>
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button 
                        variant="secondary" 
                        className="w-full"
                        onClick={() => {
                          // Save to clipboard
                          const text = `Position Size: ${result.positionSize} units\nPosition Value: $${result.positionValue}\nRisk Amount: $${result.riskAmount}\nStop Loss Distance: $${result.stopLossDistance}`
                          navigator.clipboard.writeText(text)
                            .then(() => alert('Results copied to clipboard!'))
                            .catch(err => console.error('Failed to copy: ', err))
                        }}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Copy Results
                      </Button>
                      <Button 
                        variant="primary" 
                        className="w-full"
                        onClick={calculatePositionSize}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Recalculate
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-12 w-12 text-text-secondary mx-auto mb-4" />
                    <p className="text-text-secondary">
                      Enter your trade parameters to calculate the optimal position size.
                    </p>
                    {calculationHistory.length > 0 && (
                      <Button 
                        variant="ghost" 
                        className="mt-4"
                        onClick={() => setShowHistory(true)}
                      >
                        <History className="h-4 w-4 mr-2" />
                        View Previous Calculations
                      </Button>
                    )}
                  </div>
                )}
              </Card>
            </LoadingOverlay>
          </div>
          
          {/* Mobile-friendly tips */}
          <div className="mt-8 lg:hidden">
            <Card>
              <h3 className="text-heading text-text-primary mb-4">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start">
                  <span className="text-success mr-2">✓</span>
                  <span>Risk 1-2% of your account per trade for conservative risk management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-success mr-2">✓</span>
                  <span>Place stop losses based on technical levels, not arbitrary percentages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-success mr-2">✓</span>
                  <span>Your calculations are automatically saved for future reference</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
