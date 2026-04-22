import PhaseBar from './PhaseBar'
import { getMoonPhase } from '../moonPhase'

function GuideScreen() {
  const moon = getMoonPhase()
  const phases = [
    { emoji: '🌑', name: 'New Moon · Intention', desc: 'Set intentions. Plant seeds of desire. A time for stillness, new beginnings and dreaming forward.', crystal: 'Black Tourmaline' },
    { emoji: '🌒', name: 'Waxing Crescent · Action', desc: 'Take first steps. Begin to build. Momentum is gathering.', crystal: 'Carnelian' },
    { emoji: '🌓', name: 'First Quarter · Courage', desc: 'Push through resistance. Commit to your path.', crystal: "Tiger's Eye" },
    { emoji: '🌔', name: 'Waxing Gibbous · Trust', desc: 'Refine and trust. Things are growing.', crystal: 'Green Aventurine' },
    { emoji: '🌕', name: 'Full Moon · Release', desc: 'Celebrate, release and illuminate. The peak of the cycle — what no longer serves you can be let go.', crystal: 'Selenite' },
    { emoji: '🌖', name: 'Waning Gibbous · Gratitude', desc: 'Give thanks. Share wisdom.', crystal: 'Amethyst' },
    { emoji: '🌗', name: 'Last Quarter · Release', desc: 'Let go of what did not work. Forgive and clear.', crystal: 'Smoky Quartz' },
    { emoji: '🌘', name: 'Waning Crescent · Rest', desc: 'Rest, restore and surrender. Prepare for the new cycle.', crystal: 'Moonstone' },
  ]

  return (
    <div className="screen">
      <h2 className="screen-title">Moon Guide</h2>
      <PhaseBar currentPhase={moon.name} />
      <div className="card" style={{marginBottom: '6px'}}>
        <p className="card-label">🌙 The Lunar Cycle</p>
        <p className="card-body">The moon completes a full cycle every 29.5 days. Each phase carries its own energy and invites different practices to align your inner world with nature's rhythm.</p>
      </div>
      {phases.map((phase) => (
        <div key={phase.name} className="phase-info-item">
          <span className="phase-info-moon">{phase.emoji}</span>
          <div className="phase-info-content">
            <p className="phase-info-name">{phase.name}</p>
            <p className="phase-info-desc">{phase.desc}</p>
            <p className="phase-info-crystal">✨ Crystal: {phase.crystal}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GuideScreen