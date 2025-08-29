/**
 * Validation utility functions for form inputs
 */

/**
 * Validates if a value is a valid number
 * @param {string} value - The value to validate
 * @returns {boolean} - Whether the value is a valid number
 */
export const isValidNumber = (value) => {
  if (value === '' || value === null || value === undefined) return false
  return !isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) >= 0
}

/**
 * Validates if a value is a valid percentage (0-100)
 * @param {string} value - The value to validate
 * @returns {boolean} - Whether the value is a valid percentage
 */
export const isValidPercentage = (value) => {
  if (!isValidNumber(value)) return false
  const numValue = parseFloat(value)
  return numValue >= 0 && numValue <= 100
}

/**
 * Validates if a value is a valid price
 * @param {string} value - The value to validate
 * @returns {boolean} - Whether the value is a valid price
 */
export const isValidPrice = (value) => {
  return isValidNumber(value) && parseFloat(value) > 0
}

/**
 * Formats a number as currency
 * @param {number} value - The value to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (value, decimals = 2) => {
  if (!isValidNumber(value)) return ''
  return parseFloat(value).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

/**
 * Formats a number as a percentage
 * @param {number} value - The value to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted percentage string
 */
export const formatPercentage = (value, decimals = 2) => {
  if (!isValidNumber(value)) return ''
  return parseFloat(value).toFixed(decimals) + '%'
}

/**
 * Validates a complete position sizing form
 * @param {Object} formData - The form data to validate
 * @returns {Object} - Object with validation results
 */
export const validatePositionSizerForm = (formData) => {
  const { accountBalance, riskPercentage, entryPrice, stopLossPrice } = formData
  const errors = {}
  
  if (!isValidNumber(accountBalance) || parseFloat(accountBalance) <= 0) {
    errors.accountBalance = 'Please enter a valid account balance'
  }
  
  if (!isValidPercentage(riskPercentage)) {
    errors.riskPercentage = 'Please enter a valid percentage between 0 and 100'
  } else if (parseFloat(riskPercentage) > 10) {
    errors.riskPercentage = 'Risk percentage above 10% is not recommended'
  }
  
  if (!isValidPrice(entryPrice)) {
    errors.entryPrice = 'Please enter a valid entry price'
  }
  
  if (!isValidPrice(stopLossPrice)) {
    errors.stopLossPrice = 'Please enter a valid stop loss price'
  } else if (
    isValidPrice(entryPrice) && 
    isValidPrice(stopLossPrice) && 
    parseFloat(stopLossPrice) === parseFloat(entryPrice)
  ) {
    errors.stopLossPrice = 'Stop loss price cannot be equal to entry price'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Validates a complete liquidation calculator form
 * @param {Object} formData - The form data to validate
 * @returns {Object} - Object with validation results
 */
export const validateLiquidationCalculatorForm = (formData) => {
  const { collateral, leverage, entryPrice, position } = formData
  const errors = {}
  
  if (!isValidNumber(collateral) || parseFloat(collateral) <= 0) {
    errors.collateral = 'Please enter a valid collateral amount'
  }
  
  if (!isValidNumber(leverage) || parseFloat(leverage) <= 0) {
    errors.leverage = 'Please enter a valid leverage value'
  } else if (parseFloat(leverage) > 100) {
    errors.leverage = 'Leverage above 100x is extremely risky'
  }
  
  if (!isValidPrice(entryPrice)) {
    errors.entryPrice = 'Please enter a valid entry price'
  }
  
  if (position && !['long', 'short'].includes(position)) {
    errors.position = 'Please select a valid position type'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Validates a complete risk/reward calculator form
 * @param {Object} formData - The form data to validate
 * @returns {Object} - Object with validation results
 */
export const validateRiskRewardForm = (formData) => {
  const { entryPrice, stopLossPrice, takeProfitPrice } = formData
  const errors = {}
  
  if (!isValidPrice(entryPrice)) {
    errors.entryPrice = 'Please enter a valid entry price'
  }
  
  if (!isValidPrice(stopLossPrice)) {
    errors.stopLossPrice = 'Please enter a valid stop loss price'
  }
  
  if (!isValidPrice(takeProfitPrice)) {
    errors.takeProfitPrice = 'Please enter a valid take profit price'
  }
  
  if (
    isValidPrice(entryPrice) && 
    isValidPrice(stopLossPrice) && 
    isValidPrice(takeProfitPrice)
  ) {
    const entry = parseFloat(entryPrice)
    const stopLoss = parseFloat(stopLossPrice)
    const takeProfit = parseFloat(takeProfitPrice)
    
    if (stopLoss === entry) {
      errors.stopLossPrice = 'Stop loss price cannot be equal to entry price'
    }
    
    if (takeProfit === entry) {
      errors.takeProfitPrice = 'Take profit price cannot be equal to entry price'
    }
    
    if (stopLoss < entry && takeProfit < entry) {
      errors.takeProfitPrice = 'For a long position, take profit must be above entry price'
    }
    
    if (stopLoss > entry && takeProfit > entry) {
      errors.takeProfitPrice = 'For a short position, take profit must be below entry price'
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

