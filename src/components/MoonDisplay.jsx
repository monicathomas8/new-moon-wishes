import { getMoonPhase } from '../moonPhase'

function MoonDisplay() {
  const moon = getMoonPhase()

  return (
    <div className="moon-hero">
      <div className="moon-circle"></div>
      <p className="moon-name">{moon.emoji} {moon.name}</p>
      <p className="moon-date">
        {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
    </div>
  )
}

export default MoonDisplay