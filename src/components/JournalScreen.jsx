import { useState, useEffect } from 'react'

function JournalScreen() {
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

  return (
    <div className="screen">
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
        <div className="card">
          <p className="card-label">🌕 Full Moon Release</p>
          <p className="card-text" style={{fontSize: '13px', marginBottom: '10px'}}>What are you ready to let go of this cycle?</p>
          <textarea className="journal-input" placeholder="Write what you are releasing…" rows="4" value={releaseText} onChange={(e) => setReleaseText(e.target.value)}></textarea>
        </div>
      )}

      {activeTab === 'reflect' && (
        <div className="card">
          <p className="card-label">📖 Reflect</p>
          <p className="card-text" style={{fontSize: '13px', marginBottom: '10px'}}>What did this moon cycle teach you?</p>
          <textarea className="journal-input" placeholder="Your reflections…" rows="4" value={reflectText} onChange={(e) => setReflectText(e.target.value)}></textarea>
        </div>
      )}
    </div>
  )
}

export default JournalScreen