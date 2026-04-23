function TopBar() {
  const date = new Date().toLocaleDateString('en-GB', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'long' 
  }).toUpperCase()

  return (
    <div className="topbar">
      <span className="topbar-date">{date}</span>
      <div className="topbar-icons">
        <a 
          href="https://buymeacoffee.com/monicasweb" 
          target="_blank" 
          rel="noreferrer"
          className="coffee-btn"
        >
          Buy Me A Coffee ☕
        </a>
      </div>
    </div>
  )
}

export default TopBar