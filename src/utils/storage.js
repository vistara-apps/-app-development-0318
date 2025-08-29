/**
 * Storage utility functions for persisting data
 */

const STORAGE_KEYS = {
  POSITION_SIZER: 'leverage-lever-position-sizer',
  LIQUIDATION_CALCULATOR: 'leverage-lever-liquidation-calculator',
  RISK_REWARD: 'leverage-lever-risk-reward',
  TRADE_SIMULATOR: 'leverage-lever-trade-simulator',
  CALCULATION_HISTORY: 'leverage-lever-calculation-history'
}

/**
 * Saves form data to local storage
 * @param {string} key - Storage key
 * @param {Object} data - Data to save
 */
export const saveFormData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

/**
 * Loads form data from local storage
 * @param {string} key - Storage key
 * @returns {Object|null} - Retrieved data or null if not found
 */
export const loadFormData = (key) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return null
  }
}

/**
 * Saves a calculation result to history
 * @param {string} calculatorType - Type of calculator
 * @param {Object} formData - Input form data
 * @param {Object} result - Calculation result
 */
export const saveCalculationToHistory = (calculatorType, formData, result) => {
  try {
    const history = loadCalculationHistory() || []
    
    // Add new calculation to history
    history.unshift({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      calculatorType,
      formData,
      result
    })
    
    // Keep only the last 20 calculations
    const trimmedHistory = history.slice(0, 20)
    
    localStorage.setItem(STORAGE_KEYS.CALCULATION_HISTORY, JSON.stringify(trimmedHistory))
  } catch (error) {
    console.error('Error saving calculation to history:', error)
  }
}

/**
 * Loads calculation history from local storage
 * @returns {Array|null} - Calculation history or null if not found
 */
export const loadCalculationHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.CALCULATION_HISTORY)
    return history ? JSON.parse(history) : []
  } catch (error) {
    console.error('Error loading calculation history:', error)
    return []
  }
}

/**
 * Clears calculation history
 */
export const clearCalculationHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CALCULATION_HISTORY)
  } catch (error) {
    console.error('Error clearing calculation history:', error)
  }
}

// Export storage keys for use in components
export { STORAGE_KEYS }

