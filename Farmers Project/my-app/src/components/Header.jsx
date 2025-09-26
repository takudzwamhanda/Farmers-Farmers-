import { useState, useEffect } from 'react'
import { Sun, Moon, User, LogOut, Home } from 'lucide-react'
import { format } from 'date-fns'
import { useAuth } from '../context/AuthContext'
import { NotificationPanel } from './NotificationPanel'
import './Header.css'

export function Header({ isDarkMode, setIsDarkMode }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const { user, signOut } = useAuth()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
    }
    return user?.email || 'Farmer'
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-date-time">
          <div className="header-date">
            {format(currentDateTime, 'EEEE, MMMM do, yyyy')}
          </div>
          <div className="header-time">
            {format(currentDateTime, 'HH:mm:ss')}
          </div>
        </div>
      </div>

      <div className="header-right">
        <NotificationPanel />
        
        <button className="header-theme-btn" onClick={toggleTheme}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="header-user">
          <div className="header-user-avatar">
            {getUserDisplayName().charAt(0).toUpperCase()}
          </div>
          <div className="header-user-info">
            <div className="header-user-name">{getUserDisplayName()}</div>
            <div className="header-user-role">Farmer</div>
          </div>
          <button className="header-logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  )
} 