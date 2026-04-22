import { getMoonPhase, getDaysUntilFullMoon } from '../moonPhase'

function MoonDisplay() {
  const moon = getMoonPhase()
  const daysUntilFull = getDaysUntilFullMoon()

  return (
    <div className="moon-hero">
      <div className={`moon-circle ${moon.name.toLowerCase().replace(' ', '-')}`}></div>
      <p className="moon-name">{moon.emoji} {moon.name}</p>
      <p className="moon-date">
        {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
      {daysUntilFull && (
        <p className="moon-countdown">🌕 Full moon in {daysUntilFull} days</p>
      )}
    </div>
  )
}

export default MoonDisplay