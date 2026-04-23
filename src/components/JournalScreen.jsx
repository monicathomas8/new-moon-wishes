import { useState, useEffect } from 'react'
import MoonDisplay from './MoonDisplay'

function JournalScreen({ reflectToday, setReflectToday, pastCycles, setPastCycles }) {
  const [activeTab, setActiveTab] = useState('wishes')
  const [wishes, setWishes] = useState(() => {
    const saved = localStorage.getItem('luna-wishes')
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Find more peace in my daily routine', checked: false },
      { id: 2, text: 'Attract opportunities that align with my gifts', checked: false },
      { id: 3, text: 'Strengthen my connection with nature', checked: false },
    ]
  })

  const [newWish, setNewWish] = useState('')
  const [releaseText, setReleaseText] = useState(() => localStorage.getItem('luna-release') || '')
  const [reflectText, setReflectText] = useState(() => localStorage.getItem('luna-reflect') || '')
  const [expandedCycle, setExpandedCycle] = useState(null)

  useEffect(() => {
    localStorage.setItem('luna-wishes', JSON.stringify(wishes))
  }, [wishes])

  useEffect(() => {
    localStorage.setItem('luna-release', releaseText)
  }, [releaseText])

  useEffect(() => {
    localStorage.setItem('luna-reflect', reflectText)
  }, [reflectText])

  function addWish() {
    if (newWish.trim() === '') return
    setWishes([...wishes, { id: Date.now(), text: newWish, checked: false }])
    setNewWish('')
  }

  function toggleWish(id) {
    setWishes(wishes.map(wish =>
      wish.id === id ? { ...wish, checked: !wish.checked } : wish
    ))
  }

  function saveCycle() {
    const currentDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    
    const cycle = {
      id: Date.now(),
      date: currentDate,
      phase: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }),
      wishes: wishes.filter(w => w.checked).length,
      totalWishes: wishes.length,
      release: releaseText,
      reflect: reflectToday,
    }

    const existingIndex = pastCycles.findIndex(c => c.date === currentDate)
    
    if (existingIndex !== -1) {
      const updated = [...pastCycles]
      updated[existingIndex] = cycle
      setPastCycles(updated)
    } else {
      setPastCycles([cycle, ...pastCycles].slice(0, 12))
    }
  }

  return (
    <div className="screen">
        <h2 className="screen-title">My Moon Journal</h2>
        <MoonDisplay />

        <div className="journal-tabs">
            <button className={`journal-tab ${activeTab === 'wishes' ? 'tab-active' : ''}`} onClick={() => setActiveTab('wishes')}>🌑 Wishes</button>
            <button className={`journal-tab ${activeTab === 'release' ? 'tab-active' : ''}`} onClick={() => setActiveTab('release')}>🌕 Release</button>
            <button className={`journal-tab ${activeTab === 'reflect' ? 'tab-active' : ''}`} onClick={() => setActiveTab('reflect')}>📖 Reflect</button>
        </div>

        {activeTab === 'wishes' && (
            <div className="card">
            <p className="card-label">🌑 New Moon Wishes</p>
            {wishes.map(wish => (
                <div key={wish.id} className="wish-item" onClick={() => toggleWish(wish.id)}>
                <div className={`wish-check ${wish.checked ? 'wish-checked' : ''}`}></div>
                <p className={`wish-text ${wish.checked ? 'wish-done' : ''}`}>{wish.text}</p>
                </div>
            ))}
            <div className="add-wish">
                <input
                className="wish-input"
                type="text"
                placeholder="Add a new wish..."
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addWish()}
                />
                <button className="add-wish-btn" onClick={addWish}>+</button>
            </div>
            </div>
        )}

        {activeTab === 'release' && (
          <>
            <div className="card">
              <p className="card-label">🌕 Full Moon Release</p>
              <p className="card-text" style={{fontSize: '13px', marginBottom: '10px'}}>What are you ready to let go of this cycle?</p>
              <textarea className="journal-input" placeholder="Write what you are releasing…" rows="4" value={releaseText} onChange={(e) => setReleaseText(e.target.value)}></textarea>
            </div>
            <div className="card">
              <p className="card-label">🌿 Looking Back This Month</p>
              <p className="card-text" style={{fontSize: '13px', marginBottom: '10px'}}>What did this moon cycle teach you?</p>
              <textarea className="journal-input" placeholder="Your reflections…" rows="4" value={reflectText} onChange={(e) => setReflectText(e.target.value)}></textarea>
            </div>
            <button className="save-cycle-btn" onClick={saveCycle}>🌙 Save This Cycle</button>
          </>
        )}

        {activeTab === 'reflect' && (
          <>
            <div className="card">
              <p className="card-label">🌿 Today's Reflection</p>
              <p className="card-text" style={{fontSize: '13px', marginBottom: '10px'}}>What has been growing in your life since the new moon?</p>
              <textarea 
                className="journal-input" 
                placeholder="Write your thoughts here…" 
                rows="3"
                value={reflectToday}
                onChange={(e) => setReflectToday(e.target.value)}
              ></textarea>
            </div>
            <div className="card">
              <p className="card-label">📖 Past Cycles</p>
              {pastCycles.length === 0 && (
                <p className="card-body">No past cycles saved yet. Complete a cycle and save it!</p>
              )}
              {pastCycles.map(cycle => (
                <div key={cycle.id} className="past-cycle-item" onClick={() => setExpandedCycle(expandedCycle === cycle.id ? null : cycle.id)}>
                  <div className="past-cycle-header">
                    <span className="activity-icon">🌕</span>
                    <div className="activity-text">
                      <strong>{cycle.date}</strong>
                      {cycle.wishes} of {cycle.totalWishes} wishes checked
                    </div>
                    <span className="expand-icon">{expandedCycle === cycle.id ? '▲' : '▼'}</span>
                  </div>
                  {expandedCycle === cycle.id && (
                    <div className="past-cycle-expanded">
                      {cycle.release && <p><strong>Released:</strong> {cycle.release}</p>}
                      {cycle.reflect && <p><strong>Reflected:</strong> {cycle.reflect}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
    </div>
  )
}

export default JournalScreen