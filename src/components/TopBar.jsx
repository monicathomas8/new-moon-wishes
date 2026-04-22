function TopBar() {
  const date = new Date().toLocaleDateString('en-GB', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'long' 
  }).toUpperCase()

  return (
    <div className="topbar">
      <span className="topbar-date">{date}</span>
      <span className="topbar-icon">🌿</span>
    </div>
  )
}

export default TopBar