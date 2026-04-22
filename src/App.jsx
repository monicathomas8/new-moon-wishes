import { useState, useEffect } from 'react'
import './App.css'
import TopBar from './components/TopBar'
import MoonDisplay from './components/MoonDisplay'
import AffirmationCard from './components/AffirmationCard'
import MoonEnergyCard from './components/MoonEnergyCard'
import PhaseBar from './components/PhaseBar'
import CrystalCard from './components/CrystalCard'
import BottomNav from './components/BottomNav'
import RitualScreen from './components/RitualScreen'
import JournalScreen from './components/JournalScreen'
import GuideScreen from './components/GuideScreen'
import { getMoonPhase } from './moonPhase'

function App() {
  const moon = getMoonPhase()
  const [currentScreen, setCurrentScreen] = useState('today')
  const [reflectToday, setReflectToday] = useState(() => localStorage.getItem('luna-reflect-today') || '')

  useEffect(() => {
    localStorage.setItem('luna-reflect-today', reflectToday)
  }, [reflectToday])

  return (
    <div className="app">
      <TopBar />

      {currentScreen === 'today' && (
        <>
          <h1 className="app-title">Luna</h1>
          <MoonDisplay />
          <PhaseBar currentPhase={moon.name} />
          <AffirmationCard phase={moon.name} />
          <MoonEnergyCard phase={moon.name} />
          <div className="card">
            <p className="card-label">🌿 Reflect With the Moon</p>
            <p className="card-text" style={{fontSize: '13px', marginBottom: '8px'}}>What has been growing in your life since the new moon?</p>
            <textarea
              className="journal-input"
              placeholder="Write your thoughts here…"
              rows="3"
              value={reflectToday}
              onChange={(e) => setReflectToday(e.target.value)}
            ></textarea>
          </div>
          <CrystalCard phase={moon.name} />
        </>
      )}

      {currentScreen === 'ritual' && (
        <RitualScreen phase={moon.name} />
      )}

      {currentScreen === 'journal' && (
        <JournalScreen />
      )}

      {currentScreen === 'guide' && (
        <GuideScreen />
      )}

      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  )
}

export default App