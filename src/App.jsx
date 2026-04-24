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
import SettingsPanel from './components/SettingsPanel'
import { getMoonPhase } from './moonPhase'

function App() {
  const moon = getMoonPhase()
  const [currentScreen, setCurrentScreen] = useState('today')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [reflectToday, setReflectToday] = useState(() => localStorage.getItem('luna-reflect-today') || '')
  const [pastCycles, setPastCycles] = useState(() => {
  const saved = localStorage.getItem('luna-past-cycles')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('luna-past-cycles', JSON.stringify(pastCycles))
  }, [pastCycles])

  useEffect(() => {
    localStorage.setItem('luna-reflect-today', reflectToday)
  }, [reflectToday])

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  sendMoonNotification()

  function sendMoonNotification() {
    if (Notification.permission !== 'granted') return
    
    const notifOn = localStorage.getItem('luna-notif-on') === 'true'
    if (!notifOn) return

    const allPhases = localStorage.getItem('luna-notif-all') === 'true'
    const keyMoons = localStorage.getItem('luna-notif-key') === 'true'
    const isKeyMoon = moon.name === 'Full Moon' || moon.name === 'New Moon'

    if (!allPhases && !keyMoons) return
    if (!allPhases && keyMoons && !isKeyMoon) return

    new Notification(`🌙 ${moon.name}`, {
      body: moon.energy,
      icon: '/moon-192.png'
    })
  }

  useEffect(() => {
    const lastPhase = localStorage.getItem('luna-last-phase')
    
    if (lastPhase !== moon.name) {
      localStorage.setItem('luna-last-phase', moon.name)
      
      if (lastPhase !== null) {
        sendMoonNotification()
      }
    }
  }, [])

  return (
    <div className="app">
      <TopBar onSettingsOpen={() => setSettingsOpen(true)} />
        {settingsOpen && <SettingsPanel onClose={() => setSettingsOpen(false)} />}

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
              id="reflect-today-home"
              name="reflect-today-home"
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
        <JournalScreen 
          reflectToday={reflectToday}
          setReflectToday={setReflectToday}
          pastCycles={pastCycles}
          setPastCycles={setPastCycles}
        />
      )}

      {currentScreen === 'guide' && (
        <GuideScreen />
      )}

      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  )
}

export default App