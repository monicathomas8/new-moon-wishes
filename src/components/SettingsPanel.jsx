import { useState, useEffect } from 'react'

function SettingsPanel({ onClose }) {
  const [allPhases, setAllPhases] = useState(
    () => localStorage.getItem('luna-notif-all') === 'true'
  )
  const [keyMoons, setKeyMoons] = useState(
    () => localStorage.getItem('luna-notif-key') === 'true'
  )

  const notificationsOn = allPhases || keyMoons

useEffect(() => {
    localStorage.setItem('luna-notif-all', allPhases)
    localStorage.setItem('luna-notif-key', keyMoons)
    localStorage.setItem('luna-notif-on', notificationsOn)
  }, [allPhases, keyMoons])

  function handleMainToggle() {
    if (notificationsOn) {
      setAllPhases(false)
      setKeyMoons(false)
    } else {
      setKeyMoons(true)
    }
  }

  function handleAllPhases(value) {
    setAllPhases(value)
    if (value) setKeyMoons(true)
  }

  return (
    <div className="settings-overlay">
      <div className="settings-panel">
        <div className="settings-header">
          <h2 className="settings-title">Settings</h2>
          <button className="settings-close" onClick={onClose}>✕</button>
        </div>

        <div className="settings-row">
          <span className="settings-label">🔔 Moon Notifications</span>
          <div className={`toggle-switch ${notificationsOn ? 'toggle-on' : ''}`} onClick={handleMainToggle}>
            <div className="toggle-thumb"></div>
          </div>
        </div>

        <div className="settings-sub">
          <div className="settings-row">
            <span className="settings-label">🌙 All Phase Changes</span>
            <div
              className={`toggle-switch ${allPhases ? 'toggle-on' : ''}`}
              onClick={() => handleAllPhases(!allPhases)}
            >
              <div className="toggle-thumb"></div>
            </div>
          </div>

          <div className={`settings-row ${allPhases ? 'settings-disabled' : ''}`}>
            <span className="settings-label">🌕 Full & New Moon Only</span>
            <div
              className={`toggle-switch ${keyMoons ? 'toggle-on' : ''}`}
              onClick={() => !allPhases && setKeyMoons(!keyMoons)}
            >
              <div className="toggle-thumb"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SettingsPanel