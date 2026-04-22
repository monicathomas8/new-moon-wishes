import { useState } from 'react'
import './App.css'
import TopBar from './components/TopBar'
import MoonDisplay from './components/MoonDisplay'
import AffirmationCard from './components/AffirmationCard'
import MoonEnergyCard from './components/MoonEnergyCard'
import PhaseBar from './components/PhaseBar'
import CrystalCard from './components/CrystalCard'
import BottomNav from './components/BottomNav'
import { getMoonPhase } from './moonPhase'

function App() {
  const moon = getMoonPhase()
  const [currentScreen, setCurrentScreen] = useState('today')

  return (
    <div className="app">
      <TopBar />
      <h1 className='app-title'>Luna</h1>
      <MoonDisplay />
      <PhaseBar currentPhase={moon.name} />
      <AffirmationCard phase={moon.name} />
      <MoonEnergyCard phase={moon.name} />
      <CrystalCard phase={moon.name} />
      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  )
}

export default App