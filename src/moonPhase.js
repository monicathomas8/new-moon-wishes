export function getMoonPhase() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const c = Math.floor(365.25 * year)
  const e = Math.floor(30.6 * month)
  const jd = c + e + day - 694039.09
  const phase = (jd / 29.5305882) % 1
  const index = Math.round(phase * 8) % 8

  const phases = [
    { name: 'New Moon', emoji: '🌑', energy: 'Set your intentions. A new cycle begins - plant your seeds of desire.' },
    { name: 'Waxing Crescent', emoji: '🌒', energy: 'Take your first steps. Momentum is gathering - trust the process.' },
    { name: 'First Quarter', emoji: '🌓', energy: 'Push through resistance. Commit to your path and stay focused.' },
    { name: 'Waxing Gibbous', emoji: '🌔', energy: 'Refine and trust. Your intentions are growing - stay patient.' },
    { name: 'Full Moon', emoji: '🌕', energy: 'Release what no longer serves you. The moon is fully illuminated.' },
    { name: 'Waning Gibbous', emoji: '🌖', energy: 'Give thanks. Share your wisdom and reflect on your growth.' },
    { name: 'Last Quarter', emoji: '🌗', energy: 'Let go and forgive. Clear space for what is coming next.' },
    { name: 'Waning Crescent', emoji: '🌘', energy: 'Rest and restore. Surrender and prepare for the new cycle.' },
  ]

  return phases[index]
}

export function getDaysUntilFullMoon() {
  const phases = []
  const today = new Date()

  for (let i = 1; i <= 30; i++) {
    const future = new Date()
    future.setDate(today.getDate() + i)
    
    const year = future.getFullYear()
    const month = future.getMonth() + 1
    const day = future.getDate()

    const c = Math.floor(365.25 * year)
    const e = Math.floor(30.6 * month)
    const jd = c + e + day - 694039.09
    const phase = (jd / 29.5305882) % 1
    const index = Math.round(phase * 8) % 8

    if (index === 4) {
      return i
    }
  }
  return null
}