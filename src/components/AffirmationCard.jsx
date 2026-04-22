function AffirmationCard({ phase }) {
  const affirmations = {
    'New Moon': 'I plant seeds of intention and trust in new beginnings.',
    'Waxing Crescent': 'I take small steps forward with courage and faith.',
    'First Quarter': 'I push through resistance and commit to my path.',
    'Waxing Gibbous': 'I trust the process and refine my intentions.',
    'Full Moon': 'I celebrate my growth and release what no longer serves me.',
    'Waning Gibbous': 'I am grateful for all that I have received.',
    'Last Quarter': 'I forgive, release and create space for the new.',
    'Waning Crescent': 'I rest, restore and surrender to the universe.',
  }

  return (
    <div className="card">
      <p className="card-label">✨ Daily Affirmation</p>
      <p className="card-text">{affirmations[phase]}</p>
    </div>
  )
}

export default AffirmationCard