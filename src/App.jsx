import './App.css'
import MoonDisplay from './components/MoonDisplay'
import AffirmationCard from './components/AffirmationCard'
import MoonEnergyCard from './components/MoonEnergyCard'
import { getMoonPhase } from './moonPhase'

function App() {
  const moon = getMoonPhase()

  return (
    <div className="app">
      <h1 className="app-title">Luna</h1>
      <MoonDisplay />
      <AffirmationCard phase={moon.name} />
      <MoonEnergyCard phase={moon.name} />
    </div>
  )
}

export default App