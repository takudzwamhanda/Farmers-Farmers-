import { useState, useEffect, useRef } from 'react'
import { Bell, X, Check, Trash2, Clock, RefreshCw } from 'lucide-react'
import { format } from 'date-fns'
import { useNotifications } from '../context/NotificationContext'
import './NotificationPanel.css'

export function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, refreshNotifications } = useNotifications()
  const panelRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
    setIsOpen(false)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'weather':
        return '🌧️'
      case 'market':
        return '💰'
      case 'crop':
        return '🌱'
      case 'buyer':
        return '🤝'
      case 'analytics':
        return '📊'
      case 'equipment':
        return '🔧'
      case 'community':
        return '👥'
      default:
        return '🔔'
    }
  }

  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return format(timestamp, 'MMM dd')
  }

  return (
    <div className="notification-panel-container" ref={panelRef}>
      <button 
        className="header-notification-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="header-notification-badge">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="notification-panel">
          <div className="notification-panel-header">
            <h3 className="notification-panel-title">Notifications</h3>
            <div className="notification-panel-actions">
              <button 
                className="notification-panel-action-btn"
                onClick={refreshNotifications}
                title="Refresh notifications"
              >
                <RefreshCw size={16} />
              </button>
              {unreadCount > 0 && (
                <button 
                  className="notification-panel-action-btn"
                  onClick={markAllAsRead}
                  title="Mark all as read"
                >
                  <Check size={16} />
                </button>
              )}
              <button 
                className="notification-panel-action-btn"
                onClick={() => setIsOpen(false)}
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="notification-panel-content">
            {notifications.length === 0 ? (
              <div className="notification-empty">
                <Bell size={48} className="notification-empty-icon" />
                <p className="notification-empty-text">No notifications</p>
              </div>
            ) : (
              <div className="notification-list">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${!notification.isRead ? 'unread' : ''} ${notification.priority ? 'priority' : ''}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="notification-item-content">
                      <div className="notification-item-header">
                        <span className="notification-item-icon">
                          {getNotificationIcon(notification.type)}
                        </span>
                        <div className="notification-item-info">
                          <h4 className="notification-item-title">{notification.title}</h4>
                          <p className="notification-item-message">{notification.message}</p>
                        </div>
                        <button 
                          className="notification-item-remove"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeNotification(notification.id)
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="notification-item-footer">
                        <div className="notification-item-time">
                          <Clock size={12} />
                          <span>{formatTimestamp(notification.timestamp)}</span>
                        </div>
                        {!notification.isRead && (
                          <div className="notification-item-unread-indicator"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
