import { useState, useEffect } from 'react'
import { 
  Sprout, 
  Cloud, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Calendar,
  MapPin,
  Thermometer
} from 'lucide-react'
import { format } from 'date-fns'
import './Dashboard.css'

export function Dashboard() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      title: 'Active Crops',
      value: '12',
      change: '+2',
      icon: Sprout,
      color: 'green',
      gradient: 'dashboard-stat-icon-green'
    },
    {
      title: 'Weather Alert',
      value: 'Sunny',
      change: 'Good',
      icon: Cloud,
      color: 'blue',
      gradient: 'dashboard-stat-icon-blue'
    },
    {
      title: 'Market Prices',
      value: 'Stable',
      change: '+5%',
      icon: DollarSign,
      color: 'yellow',
      gradient: 'dashboard-stat-icon-yellow'
    },
    {
      title: 'Connected Buyers',
      value: '8',
      change: '+1',
      icon: Users,
      color: 'purple',
      gradient: 'dashboard-stat-icon-purple'
    }
  ]

  const quickActions = [
    {
      title: 'Add New Crop',
      description: 'Record a new crop planting',
      icon: Sprout,
      color: 'green'
    },
    {
      title: 'Check Weather',
      description: 'View 5-day forecast',
      icon: Cloud,
      color: 'blue'
    },
    {
      title: 'Market Prices',
      description: 'Check current prices',
      icon: DollarSign,
      color: 'yellow'
    },
    {
      title: 'Find Buyers',
      description: 'Connect with buyers',
      icon: Users,
      color: 'purple'
    }
  ]

  return (
    <div className="dashboard">
      {/* Water Drops Animation */}
      <div className="water-drops-container">
        {Array.from({ length: 50 }, (_, i) => (
          <div 
            key={i} 
            className="water-drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1 className="dashboard-title-text">Farm Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome back! Here's what's happening on your farm today.
          </p>
        </div>
        <div className="dashboard-time">
          <div className="dashboard-time-display">
            {format(currentDateTime, 'HH:mm:ss')}
          </div>
          <div className="dashboard-date-display">
            {format(currentDateTime, 'EEEE, MMMM do, yyyy')}
          </div>
        </div>
      </div>

      <div className="dashboard-stats">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className={`dashboard-stat-card dashboard-stat-${stat.color}`}>
              <div className={`dashboard-stat-icon ${stat.gradient}`}>
                <Icon size={24} />
              </div>
              <div className="dashboard-stat-content">
                <h3 className="dashboard-stat-title">{stat.title}</h3>
                <div className="dashboard-stat-value">{stat.value}</div>
                <div className="dashboard-stat-change">
                  <TrendingUp size={16} />
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Quick Actions</h2>
          <div className="dashboard-actions">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <div key={index} className={`dashboard-action-card dashboard-action-${action.color}`}>
                  <div className={`dashboard-action-icon dashboard-action-icon-${action.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="dashboard-action-content">
                    <h3 className="dashboard-action-title">{action.title}</h3>
                    <p className="dashboard-action-description">{action.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Today's Overview</h2>
          <div className="dashboard-overview">
            <div className="dashboard-overview-card">
              <div className="dashboard-overview-header">
                <Calendar className="dashboard-overview-icon" />
                <h3 className="dashboard-overview-title">Today's Tasks</h3>
              </div>
              <div className="dashboard-overview-content">
                <ul className="dashboard-overview-list">
                  <li className="dashboard-overview-item">Water maize field</li>
                  <li className="dashboard-overview-item">Check tobacco seedlings</li>
                  <li className="dashboard-overview-item">Harvest sweet potatoes</li>
                  <li className="dashboard-overview-item">Apply fertilizer to wheat</li>
                </ul>
              </div>
            </div>

            <div className="dashboard-overview-card">
              <div className="dashboard-overview-header">
                <MapPin className="dashboard-overview-icon" />
                <h3 className="dashboard-overview-title">Location</h3>
              </div>
              <div className="dashboard-overview-content">
                <div className="dashboard-overview-location">
                  <p className="dashboard-overview-location-text">Harare, Zimbabwe</p>
                  <p className="dashboard-overview-location-coords">17.8252° S, 31.0335° E</p>
                </div>
              </div>
            </div>

            <div className="dashboard-overview-card">
              <div className="dashboard-overview-header">
                <Thermometer className="dashboard-overview-icon" />
                <h3 className="dashboard-overview-title">Current Weather</h3>
              </div>
              <div className="dashboard-overview-content">
                <div className="dashboard-overview-weather">
                  <div className="dashboard-overview-temperature">24°C</div>
                  <div className="dashboard-overview-condition">Sunny</div>
                  <div className="dashboard-overview-humidity">Humidity: 65%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 