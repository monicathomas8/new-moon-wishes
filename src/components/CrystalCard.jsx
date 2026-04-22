function CrystalCard({ phase }) {
  const crystals = {
    'New Moon': { name: 'Black Tourmaline', emoji: '🖤', desc: 'Hold during reflection. Protects your energy and grounds new intentions.' },
    'Waxing Crescent': { name: 'Carnelian', emoji: '🧡', desc: 'Carry with you. Boosts courage, motivation and creative energy.' },
    'First Quarter': { name: "Tiger's Eye", emoji: '🟤', desc: 'Hold when you feel resistance. Strengthens willpower and confidence.' },
    'Waxing Gibbous': { name: 'Green Aventurine', emoji: '💚', desc: 'Hold during reflection. Supports growth, abundance and forward momentum.' },
    'Full Moon': { name: 'Selenite', emoji: '🤍', desc: 'Place under the moonlight. Amplifies energy and brings clarity.' },
    'Waning Gibbous': { name: 'Amethyst', emoji: '💜', desc: 'Keep nearby. Encourages gratitude, wisdom and spiritual connection.' },
    'Last Quarter': { name: 'Smoky Quartz', emoji: '🩶', desc: 'Hold during release. Absorbs and transmutes negative energy.' },
    'Waning Crescent': { name: 'Moonstone', emoji: '🌸', desc: 'Sleep with it nearby. Supports rest, intuition and surrender.' },
  }

  const crystal = crystals[phase]

  return (
    <div className="crystal-card">
      <span className="crystal-icon">{crystal.emoji}</span>
      <div className="crystal-info">
        <p className="card-label">💎 Recommended Crystal</p>
        <p className="crystal-name">{crystal.name}</p>
        <p className="crystal-desc">{crystal.desc}</p>
      </div>
    </div>
  )
}

export default CrystalCard