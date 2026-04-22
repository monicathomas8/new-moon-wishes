function PhaseBar({ currentPhase }) {
  const phases = [
    { name: 'New Moon', emoji: '🌑' },
    { name: 'Waxing Crescent', emoji: '🌒' },
    { name: 'First Quarter', emoji: '🌓' },
    { name: 'Waxing Gibbous', emoji: '🌔' },
    { name: 'Full Moon', emoji: '🌕' },
    { name: 'Waning Gibbous', emoji: '🌖' },
    { name: 'Last Quarter', emoji: '🌗' },
    { name: 'Waning Crescent', emoji: '🌘' },
  ]

  return (
    <div className="phase-bar">
      {phases.map((phase) => (
        <div
          key={phase.name}
          className={`phase-item ${phase.name === currentPhase ? 'phase-active' : ''}`}
        >
          <span className="phase-emoji">{phase.emoji}</span>
          <span className="phase-label">{phase.name}</span>
        </div>
      ))}
    </div>
  )
}

export default PhaseBar