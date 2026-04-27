export function getMoonPhase() {
  const date = new Date()
  const phase = calculatePhase(date)
  const index = getPhaseIndex(phase)
  return { ...phases[index], illumination: Math.round(getIllumination(phase) * 100) }
}
 
export function getDaysUntilFullMoon() {
  const today = new Date()
  for (let i = 1; i <= 30; i++) {
    const future = new Date()
    future.setDate(today.getDate() + i)
    const phase = calculatePhase(future)
    const index = getPhaseIndex(phase)
    if (index === 4) return i
  }
  return null
}
 
export function getDaysUntilNewMoon() {
  const today = new Date()
  for (let i = 1; i <= 30; i++) {
    const future = new Date()
    future.setDate(today.getDate() + i)
    const phase = calculatePhase(future)
    const index = getPhaseIndex(phase)
    if (index === 0) return i
  }
  return null
}
 
// Core calculation — Julian Date based, accurate to within hours
function calculatePhase(date) {
  // Known new moon: January 6, 2000 18:14 UTC (J2000)
  const knownNewMoon = new Date('2000-01-06T18:14:00Z')
  const synodicMonth = 29.530588853 // days
 
  const daysSince = (date - knownNewMoon) / (1000 * 60 * 60 * 24)
  const phase = ((daysSince % synodicMonth) + synodicMonth) % synodicMonth
 
  return phase
}
 
// Returns illumination fraction 0-1
function getIllumination(phase) {
  const synodicMonth = 29.530588853
  return (1 - Math.cos((2 * Math.PI * phase) / synodicMonth)) / 2
}
 
// Maps phase (days into cycle) to 0-7 index
function getPhaseIndex(phase) {
  const synodicMonth = 29.530588853
  const fraction = phase / synodicMonth
 
  if (fraction < 0.0625) return 0       // New Moon
  if (fraction < 0.1875) return 1       // Waxing Crescent
  if (fraction < 0.3125) return 2       // First Quarter
  if (fraction < 0.4375) return 3       // Waxing Gibbous
  if (fraction < 0.5625) return 4       // Full Moon
  if (fraction < 0.6875) return 5       // Waning Gibbous
  if (fraction < 0.8125) return 6       // Last Quarter
  if (fraction < 0.9375) return 7       // Waning Crescent
  return 0                               // Back to New Moon
}
 
const phases = [
  {
    name: 'New Moon',
    emoji: '🌑',
    energy: 'Set your intentions. A new cycle begins — plant your seeds of desire.',
    affirmation: 'I trust in new beginnings and the seeds I plant today.',
    ritual: 'Write your wishes. Light a candle. Set your intentions for the cycle ahead.',
    crystal: 'Black Tourmaline',
  },
  {
    name: 'Waxing Crescent',
    emoji: '🌒',
    energy: 'Take your first steps. Momentum is gathering — trust the process.',
    affirmation: 'I take one small step forward with courage and trust.',
    ritual: 'Take action on one intention. Begin something new, however small.',
    crystal: 'Carnelian',
  },
  {
    name: 'First Quarter',
    emoji: '🌓',
    energy: 'Push through resistance. Commit to your path and stay focused.',
    affirmation: 'I push through resistance and commit to my path.',
    ritual: 'Face one challenge today. Do something that feels uncomfortable but necessary.',
    crystal: "Tiger's Eye",
  },
  {
    name: 'Waxing Gibbous',
    emoji: '🌔',
    energy: 'Refine and trust. Your intentions are growing — stay patient.',
    affirmation: 'I trust what I cannot yet see. Growth is happening.',
    ritual: 'Review your intentions. What needs refining? Stay committed.',
    crystal: 'Green Aventurine',
  },
  {
    name: 'Full Moon',
    emoji: '🌕',
    energy: 'Release what no longer serves you. The moon is fully illuminated.',
    affirmation: 'I release what no longer serves me and make space for the new.',
    ritual: 'Write what you are releasing. Step outside and look up at the moon.',
    crystal: 'Selenite',
  },
  {
    name: 'Waning Gibbous',
    emoji: '🌖',
    energy: 'Give thanks. Share your wisdom and reflect on your growth.',
    affirmation: 'I am grateful for all this cycle has brought me.',
    ritual: 'Express gratitude. Tell someone you appreciate them.',
    crystal: 'Amethyst',
  },
  {
    name: 'Last Quarter',
    emoji: '🌗',
    energy: 'Let go and forgive. Clear space for what is coming next.',
    affirmation: 'I forgive, release, and clear space for new beginnings.',
    ritual: 'Write what you are forgiving. Let it go at the roots of an imaginary tree.',
    crystal: 'Smoky Quartz',
  },
  {
    name: 'Waning Crescent',
    emoji: '🌘',
    energy: 'Rest and restore. Surrender and prepare for the new cycle.',
    affirmation: 'I allow myself to rest. The next cycle is coming.',
    ritual: 'Rest. Spend time in stillness. Prepare your intentions for the new moon.',
    crystal: 'Moonstone',
  },
]
 