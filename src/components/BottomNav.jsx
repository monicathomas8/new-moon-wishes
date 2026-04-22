function BottomNav({ currentScreen, onNavigate }) {
  const items = [
    { id: 'today', icon: '🌙', label: 'Today' },
    { id: 'ritual', icon: '🔮', label: 'Ritual' },
    { id: 'journal', icon: '📖', label: 'My Moon' },
    { id: 'guide', icon: '🌿', label: 'Guide' },
  ]

  return (
    <div className="bottom-nav">
      {items.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${currentScreen === item.id ? 'nav-active' : ''}`}
          onClick={() => onNavigate(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </div>
  )
}

export default BottomNav