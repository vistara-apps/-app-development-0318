import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { PositionSizer } from './pages/PositionSizer'
import { LiquidationCalculator } from './pages/LiquidationCalculator'
import { RiskRewardCalculator } from './pages/RiskRewardCalculator'
import { TradeSimulator } from './pages/TradeSimulator'
import { Pricing } from './pages/Pricing'

function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/position-sizer" element={<PositionSizer />} />
          <Route path="/liquidation-calculator" element={<LiquidationCalculator />} />
          <Route path="/risk-reward" element={<RiskRewardCalculator />} />
          <Route path="/trade-simulator" element={<TradeSimulator />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </main>
    </div>
  )
}

export default App