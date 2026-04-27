import { useState, useRef, useEffect } from 'react'
import MoonEnergyCard from "./MoonEnergyCard"
import MeditationCatalogue from './MeditationCatalogue'
import CrystalCard from './CrystalCard'
import MoonDisplay from './MoonDisplay'


const meditationAudio = {
  'New Moon': 'https://res.cloudinary.com/debnitfjn/video/upload/v1777319000/luna-new-moon.mp3_yv1t5f.mp3',
  'Waxing Crescent': 'https://res.cloudinary.com/debnitfjn/video/upload/v1777318524/luna-waxing-crescent.mp3_tbpbdi.mp3',
  'First Quarter': 'https://res.cloudinary.com/debnitfjn/video/upload/v1777318580/luna-first-quarter.mp3_qpcemc.mp3',
  'Waxing Gibbous': 'https://res.cloudinary.com/debnitfjn/video/upload/v1777318566/luna-waxing-gibbous.mp3_mwivju.mp3',
  'Full Moon': 'https://res.cloudinary.com/debnitfjn/video/upload/v1777318588/luna-full-moon-v2.mp3_og49rk.mp3',
  'Waning Gibbous': 'https://res.cloudinary.com/debnitfjn/video/upload/v1777318557/luna-waning-gibbous.mp3_zh3qdu.mp3',
  'Last Quarter': 'https://res.cloudinary.com/debnitfjn/video/upload/v1777318548/luna-last-quarter.mp3_icaijk.mp3',
  'Waning Crescent': 'https://res.cloudinary.com/debnitfjn/video/upload/v1777318573/luna-waning-crescent-v2.mp3_w35n8q.mp3',
}

const meditationDurations = {
  'New Moon': '9 min',
  'Waxing Crescent': '7 min',
  'First Quarter': '10 min',
  'Waxing Gibbous': '10 min',
  'Full Moon': '10 min',
  'Waning Gibbous': '9 min',
  'Last Quarter': '9 min',
  'Waning Crescent': '9 min',
}

function MeditationPlayer({ phase }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime(0)
    setDuration(0)
  }, [phase])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      setIsLoading(true)
      audio.play()
        .then(() => { setIsPlaying(true); setIsLoading(false) })
        .catch(() => setIsLoading(false))
    }
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio) return
    setCurrentTime(audio.currentTime)
    setProgress((audio.currentTime / audio.duration) * 100 || 0)
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime(0)
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    if (!audio) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration
  }

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="meditation-card">
      <audio
        ref={audioRef}
        src={meditationAudio[phase]}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={handleEnded}
        preload="metadata"
      />
      <p className="card-label">🧘 Guided Meditation</p>
      <p className="meditation-title">{phase} Meditation</p>
      <div className="play-button" onClick={togglePlay}>
        {isLoading ? '⏳' : isPlaying ? '⏸' : '▶'}
      </div>
      <p className="meditation-duration">{meditationDurations[phase]} · Breath & Visualisation</p>
      <div className="progress-bar" onClick={handleSeek}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-times">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}

function RitualScreen({ phase }) {
  const [showCatalogue, setShowCatalogue] = useState(false)
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
  if (showCatalogue) {
    return <MeditationCatalogue phase={phase} onBack={() => setShowCatalogue(false)} />
  }

  return (
    <div className="screen">
      <h2 className="screen-title">My Ritual</h2>
      <div className="ritual-header">
        <MoonDisplay />
        <h2 className="ritual-title">{ritual.title}</h2>
        <p className="ritual-subtitle">{ritual.subtitle}</p>
      </div>

      <MeditationPlayer phase={phase} />

      <button className="more-meditations-btn" onClick={() => setShowCatalogue(true)}>
        🎧 More Meditations
      </button>

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