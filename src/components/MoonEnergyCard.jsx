function MoonEnergyCard({ phase }) {
  const energy = {
    'New Moon': 'A time for stillness and new beginnings. Plant seeds of desire and dream forward. What do you want to call into your life this cycle?',
    'Waxing Crescent': 'Momentum is gathering. Take your first steps forward and begin to build. The universe is responding to your intentions.',
    'First Quarter': 'Push through any resistance you feel. This is a time of commitment and courage. Stay focused on your path.',
    'Waxing Gibbous': 'Things are growing and building. Refine your intentions and trust the process. The full moon is nearly here.',
    'Full Moon': 'The peak of the cycle. Celebrate how far you have come and release anything that no longer serves your highest good.',
    'Waning Gibbous': 'A time of gratitude and sharing. Reflect on your blessings and share your wisdom with others.',
    'Last Quarter': 'Let go of what did not work this cycle. Forgive yourself and others and create space for the new.',
    'Waning Crescent': 'Rest and restore. Surrender to the universe and prepare yourself for the new cycle that is coming.',
  }

  return (
    <div className="card">
      <p className="card-label">🌙 Moon Energy Today</p>
      <p className="card-body">{energy[phase]}</p>
    </div>
  )
}

export default MoonEnergyCard