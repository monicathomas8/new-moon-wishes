import { useState, useRef } from 'react'

const allMeditations = [
  { phase: 'New Moon', emoji: '🌑', title: 'Planting Seeds in the Dark', duration: '9 min', energy: 'Intention & new beginnings', audioUrl: 'https://res.cloudinary.com/debnitfjn/video/upload/v1777319000/luna-new-moon.mp3_yv1t5f.mp3' },
  { phase: 'Waxing Crescent', emoji: '🌒', title: 'Taking Your First Steps', duration: '7 min', energy: 'Courage & momentum', audioUrl: 'https://res.cloudinary.com/debnitfjn/video/upload/v1777318524/luna-waxing-crescent.mp3_tbpbdi.mp3' },
  { phase: 'First Quarter', emoji: '🌓', title: 'Courage & Commitment', duration: '10 min', energy: 'Strength & commitment', audioUrl: 'https://res.cloudinary.com/debnitfjn/video/upload/v1777318580/luna-first-quarter.mp3_qpcemc.mp3' },
  { phase: 'Waxing Gibbous', emoji: '🌔', title: 'Trust the Growing', duration: '10 min', energy: 'Trust & patience', audioUrl: 'https://res.cloudinary.com/debnitfjn/video/upload/v1777318566/luna-waxing-gibbous.mp3_mwivju.mp3' },
  { phase: 'Full Moon', emoji: '🌕', title: 'Release & Illuminate', duration: '10 min', energy: 'Release & gratitude', audioUrl: 'https://res.cloudinary.com/debnitfjn/video/upload/v1777318588/luna-full-moon-v2.mp3_og49rk.mp3' },
  { phase: 'Waning Gibbous', emoji: '🌖', title: 'Gratitude & Sharing Your Light', duration: '9 min', energy: 'Gratitude & reflection', audioUrl: 'https://res.cloudinary.com/debnitfjn/video/upload/v1777318557/luna-waning-gibbous.mp3_zh3qdu.mp3' },
  { phase: 'Last Quarter', emoji: '🌗', title: 'Release, Forgive & Clear', duration: '9 min', energy: 'Forgiveness & clearing', audioUrl: 'https://res.cloudinary.com/debnitfjn/video/upload/v1777318548/luna-last-quarter.mp3_icaijk.mp3' },
  { phase: 'Waning Crescent', emoji: '🌘', title: 'Rest, Surrender & Prepare', duration: '9 min', energy: 'Rest & surrender', audioUrl: 'https://res.cloudinary.com/debnitfjn/video/upload/v1777318573/luna-waning-crescent-v2.mp3_w35n8q.mp3' },
]

function MeditationCatalogue({ phase, onBack }) {
  const audioRef = useRef(null)
  const [playingPhase, setPlayingPhase] = useState(null)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const handlePlay = (meditation) => {
    const audio = audioRef.current
    if (!audio) return
    if (playingPhase === meditation.phase) {
      audio.pause()
      setPlayingPhase(null)
      return
    }
    audio.src = meditation.audioUrl
    audio.play()
      .then(() => setPlayingPhase(meditation.phase))
      .catch(console.error)
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio) return
    setCurrentTime(audio.currentTime)
    setProgress((audio.currentTime / audio.duration) * 100 || 0)
  }

  const handleEnded = () => {
    setPlayingPhase(null)
    setProgress(0)
    setCurrentTime(0)
  }

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const playingMeditation = allMeditations.find(m => m.phase === playingPhase)

  return (
    <div className="screen">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={handleEnded}
        preload="none"
      />

      <div className="catalogue-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2 className="screen-title">Meditations</h2>
      </div>

      <p className="catalogue-subtitle">A meditation for every phase of the cycle</p>

      {playingMeditation && (
        <div className="now-playing-bar">
            <div className="now-playing-top">
                <span className="now-playing-label">Now Playing</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="now-playing-time">{formatTime(currentTime)} / {formatTime(duration)}</span>
                    <button
                        className="catalogue-play-btn catalogue-play-active"
                        onClick={() => handlePlay(playingMeditation)}
                        >
                        ⏸
                    </button>
                </div>
            </div>
          <p className="now-playing-title">{playingMeditation.emoji} {playingMeditation.title}</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {allMeditations.map((meditation) => (
        <div
          key={meditation.phase}
          className={`catalogue-item ${meditation.phase === phase ? 'catalogue-item-active' : ''}`}
        >
          <div className="catalogue-emoji">{meditation.emoji}</div>
          <div className="catalogue-info">
            <div className="catalogue-phase-row">
              <span className="catalogue-phase-name">{meditation.phase}</span>
              {meditation.phase === phase && <span className="catalogue-today-badge">TODAY</span>}
            </div>
            <p className="catalogue-title">{meditation.title}</p>
            <p className="catalogue-meta">{meditation.duration} · {meditation.energy}</p>
          </div>
          <button
            className={`catalogue-play-btn ${playingPhase === meditation.phase ? 'catalogue-play-active' : ''}`}
            onClick={() => handlePlay(meditation)}
          >
            {playingPhase === meditation.phase ? '⏸' : '▶'}
          </button>
        </div>
      ))}
    </div>
  )
}

export default MeditationCatalogue