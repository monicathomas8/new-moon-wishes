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
    { name: 'New Moon', emoji: '🌑' },
    { name: 'Waxing Crescent', emoji: '🌒' },
    { name: 'First Quarter', emoji: '🌓' },
    { name: 'Waxing Gibbous', emoji: '🌔' },
    { name: 'Full Moon', emoji: '🌕' },
    { name: 'Waning Gibbous', emoji: '🌖' },
    { name: 'Last Quarter', emoji: '🌗' },
    { name: 'Waning Crescent', emoji: '🌘' },
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