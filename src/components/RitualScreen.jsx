import MoonEnergyCard from "./MoonEnergyCard"
import CrystalCard from './CrystalCard'
import MoonDisplay from './MoonDisplay'

function RitualScreen({ phase }) {
  const rituals = {
    'New Moon': {
      title: 'New Moon Ritual',
      subtitle: 'Set intentions & dream forward',
      activities: [
        { icon: '📝', title: 'Write Your Wishes', desc: 'Write down 3-10 wishes or intentions for this cycle.' },
        { icon: '🕯️', title: 'Light a Candle', desc: 'Light a white or black candle and sit in stillness.' },
        { icon: '🛁', title: 'Cleansing Bath', desc: 'Take a bath with sea salt to cleanse your energy.' },
      ]
    },
    'Waxing Crescent': {
      title: 'Waxing Crescent Ritual',
      subtitle: 'Take action & build momentum',
      activities: [
        { icon: '📝', title: 'Review Your Wishes', desc: 'Look back at your new moon list. What first step can you take?' },
        { icon: '🚶', title: 'Intentional Walk', desc: 'Walk outside with purpose. Notice signs and synchronicities.' },
        { icon: '🌱', title: 'Plant Something', desc: 'Plant a seed - literally or metaphorically.' },
      ]
    },
    'First Quarter': {
      title: 'First Quarter Ritual',
      subtitle: 'Push through & commit',
      activities: [
        { icon: '💪', title: 'Face a Challenge', desc: 'Do one thing today that feels uncomfortable but necessary.' },
        { icon: '🕯️', title: 'Candle Intention', desc: 'Light an orange candle. Speak your commitment aloud.' },
        { icon: '📝', title: 'Journal', desc: 'Write about what is holding you back and how to overcome it.' },
      ]
    },
    'Waxing Gibbous': {
      title: 'Waxing Gibbous Ritual',
      subtitle: 'Refine, trust & build momentum',
      activities: [
        { icon: '📝', title: 'Review Your Wishes', desc: 'Look back at your new moon list. What is already moving toward you?' },
        { icon: '🕯️', title: 'Candle Intention', desc: 'Light a green or gold candle. Speak your intention aloud.' },
        { icon: '🌿', title: 'Nature Walk', desc: 'Walk outside. Notice what is growing around you.' },
      ]
    },
    'Full Moon': {
      title: 'Full Moon Ritual',
      subtitle: 'Celebrate, release & illuminate',
      activities: [
        { icon: '🌕', title: 'Moon Bathe', desc: 'Sit under the moonlight and soak in its energy.' },
        { icon: '🔥', title: 'Release Ceremony', desc: 'Write what you want to release and burn it safely.' },
        { icon: '💎', title: 'Charge Crystals', desc: 'Place your crystals outside or on a windowsill overnight.' },
      ]
    },
    'Waning Gibbous': {
      title: 'Waning Gibbous Ritual',
      subtitle: 'Give thanks & share wisdom',
      activities: [
        { icon: '🙏', title: 'Gratitude List', desc: 'Write 10 things you are grateful for this cycle.' },
        { icon: '🤝', title: 'Share & Give', desc: 'Do something kind for someone else today.' },
        { icon: '📖', title: 'Reflect', desc: 'Journal about what this cycle has taught you.' },
      ]
    },
    'Last Quarter': {
      title: 'Last Quarter Ritual',
      subtitle: 'Release & forgive',
      activities: [
        { icon: '🔥', title: 'Let It Go', desc: 'Write what did not work this cycle and burn or bury it.' },
        { icon: '🛁', title: 'Cleansing Bath', desc: 'Wash away what no longer serves you.' },
        { icon: '🧘', title: 'Forgiveness Practice', desc: 'Forgive yourself and others. Create space for the new.' },
      ]
    },
    'Waning Crescent': {
      title: 'Waning Crescent Ritual',
      subtitle: 'Rest, restore & surrender',
      activities: [
        { icon: '😴', title: 'Rest', desc: 'Go to bed early. Let your body and mind fully restore.' },
        { icon: '🧘', title: 'Meditation', desc: 'Sit in stillness and surrender to what is.' },
        { icon: '🌿', title: 'Gentle Movement', desc: 'Do some gentle yoga or stretching to release tension.' },
      ]
    },
  }

  const ritual = rituals[phase]

  return (
    <div className="screen">
      <h2 className="screen-title">My Ritual</h2>
      <div className="ritual-header">
        <MoonDisplay />
        <h2 className="ritual-title">{ritual.title}</h2>
        <p className="ritual-subtitle">{ritual.subtitle}</p>
      </div>

      <div className="meditation-card">
        <p className="card-label">🧘 Guided Meditation</p>
        <p className="meditation-title">Coming Soon</p>
        <div className="play-button">▶</div>
        <p className="meditation-duration">Meditation coming soon</p>
      </div>

      <div className="card">
        <p className="card-label">🌙 Ritual Activities</p>
        {ritual.activities.map((activity) => (
          <div key={activity.title} className="activity-item">
            <span className="activity-icon">{activity.icon}</span>
            <div className="activity-text">
              <strong>{activity.title}</strong>
              {activity.desc}
            </div>
          </div>
        ))}
      </div>
      <MoonEnergyCard phase={phase} />
      <CrystalCard phase={phase} />
    </div>
  )
}

export default RitualScreen