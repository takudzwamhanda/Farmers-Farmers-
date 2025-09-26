import { useState, useEffect } from 'react'
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudLightning, 
  Wind, 
  Thermometer,
  Droplets,
  Eye,
  MapPin,
  Calendar
} from 'lucide-react'
import { format, addDays } from 'date-fns'
import './WeatherForecast.css'

export function WeatherForecast() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    // Simulate weather data for Zimbabwe
    const simulateWeatherData = () => {
      const currentWeatherData = {
        temperature: 24,
        condition: 'Sunny',
        humidity: 65,
        windSpeed: 12,
        visibility: 10,
        pressure: 1013,
        location: 'Harare, Zimbabwe',
        coordinates: '17.8252° S, 31.0335° E',
        lastUpdated: new Date()
      }

      const forecastData = Array.from({ length: 5 }, (_, i) => {
        const date = addDays(new Date(), i + 1)
        const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Thunderstorm']
        const condition = conditions[Math.floor(Math.random() * conditions.length)]
        
        return {
          date,
          condition,
          highTemp: Math.floor(Math.random() * 15) + 20,
          lowTemp: Math.floor(Math.random() * 10) + 10,
          humidity: Math.floor(Math.random() * 30) + 50,
          windSpeed: Math.floor(Math.random() * 20) + 5,
          precipitation: Math.floor(Math.random() * 100),
          uvIndex: Math.floor(Math.random() * 10) + 1
        }
      })

      setCurrentWeather(currentWeatherData)
      setForecast(forecastData)
      setLoading(false)
    }

    simulateWeatherData()

    return () => clearInterval(timer)
  }, [])

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun size={24} />
      case 'partly cloudy':
        return <Cloud size={24} />
      case 'cloudy':
        return <Cloud size={24} />
      case 'light rain':
        return <CloudRain size={24} />
      case 'thunderstorm':
        return <CloudLightning size={24} />
      default:
        return <Sun size={24} />
    }
  }

  const getWeatherColor = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return 'from-yellow-400 to-orange-500'
      case 'partly cloudy':
        return 'from-blue-400 to-blue-500'
      case 'cloudy':
        return 'from-gray-400 to-gray-500'
      case 'light rain':
        return 'from-blue-500 to-blue-600'
      case 'thunderstorm':
        return 'from-purple-500 to-purple-600'
      default:
        return 'from-blue-400 to-blue-500'
    }
  }

  const getFarmingTips = (condition, temperature) => {
    if (condition.toLowerCase().includes('rain')) {
      return 'Good time for planting. Ensure proper drainage in fields.'
    } else if (temperature > 30) {
      return 'High temperatures. Increase irrigation frequency.'
    } else if (temperature < 15) {
      return 'Cool temperatures. Protect sensitive crops with covers.'
    } else {
      return 'Optimal conditions for crop growth and maintenance.'
    }
  }

  if (loading) {
    return (
      <div className="weather-forecast">
        <div className="weather-forecast-loading">
          <div className="weather-forecast-loading-spinner"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="weather-forecast">
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
      
      <div className="weather-forecast-header">
        <div className="weather-forecast-title">
          <h1 className="weather-forecast-title-text">Weather Forecast</h1>
          <p className="weather-forecast-subtitle">
            Current conditions and 5-day forecast for your location
          </p>
        </div>
        <div className="weather-forecast-time">
          <div className="weather-forecast-time-display">
            {format(currentDateTime, 'HH:mm:ss')}
          </div>
          <div className="weather-forecast-date-display">
            {format(currentDateTime, 'EEEE, MMMM do, yyyy')}
          </div>
        </div>
      </div>

      {currentWeather && (
        <div className="weather-forecast-current">
          <div className="weather-forecast-current-card">
            <div className="weather-forecast-current-header">
              <div className="weather-forecast-current-location">
                <MapPin size={20} />
                <div>
                  <h2 className="weather-forecast-current-location-text">
                    {currentWeather.location}
                  </h2>
                  <p className="weather-forecast-current-coordinates">
                    {currentWeather.coordinates}
                  </p>
                </div>
              </div>
              <div className="weather-forecast-current-updated">
                Last updated: {format(currentWeather.lastUpdated, 'HH:mm')}
              </div>
            </div>

            <div className="weather-forecast-current-main">
              <div className="weather-forecast-current-icon">
                {getWeatherIcon(currentWeather.condition)}
              </div>
              <div className="weather-forecast-current-details">
                <div className="weather-forecast-current-temperature">
                  {currentWeather.temperature}°C
                </div>
                <div className="weather-forecast-current-condition">
                  {currentWeather.condition}
                </div>
              </div>
            </div>

            <div className="weather-forecast-current-stats">
              <div className="weather-forecast-current-stat">
                <Droplets size={16} />
                <span>Humidity: {currentWeather.humidity}%</span>
              </div>
              <div className="weather-forecast-current-stat">
                <Wind size={16} />
                <span>Wind: {currentWeather.windSpeed} km/h</span>
              </div>
              <div className="weather-forecast-current-stat">
                <Eye size={16} />
                <span>Visibility: {currentWeather.visibility} km</span>
              </div>
              <div className="weather-forecast-current-stat">
                <Thermometer size={16} />
                <span>Pressure: {currentWeather.pressure} hPa</span>
              </div>
            </div>

            <div className="weather-forecast-current-tips">
              <h3 className="weather-forecast-current-tips-title">
                Farming Tips
              </h3>
              <p className="weather-forecast-current-tips-text">
                {getFarmingTips(currentWeather.condition, currentWeather.temperature)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="weather-forecast-section">
        <h2 className="weather-forecast-section-title">
          <Calendar size={20} />
          5-Day Forecast
        </h2>
        <div className="weather-forecast-grid">
          {forecast.map((day, index) => (
            <div key={index} className="weather-forecast-day-card">
              <div className="weather-forecast-day-header">
                <div className="weather-forecast-day-date">
                  {format(day.date, 'EEE')}
                </div>
                <div className="weather-forecast-day-full-date">
                  {format(day.date, 'MMM do')}
                </div>
              </div>

              <div className="weather-forecast-day-icon">
                {getWeatherIcon(day.condition)}
              </div>

              <div className="weather-forecast-day-condition">
                {day.condition}
              </div>

              <div className="weather-forecast-day-temps">
                <span className="weather-forecast-day-high">
                  {day.highTemp}°
                </span>
                <span className="weather-forecast-day-low">
                  {day.lowTemp}°
                </span>
              </div>

              <div className="weather-forecast-day-details">
                <div className="weather-forecast-day-detail">
                  <Droplets size={12} />
                  <span>{day.humidity}%</span>
                </div>
                <div className="weather-forecast-day-detail">
                  <Wind size={12} />
                  <span>{day.windSpeed} km/h</span>
                </div>
                <div className="weather-forecast-day-detail">
                  <span>UV: {day.uvIndex}</span>
                </div>
              </div>

              {day.precipitation > 0 && (
                <div className="weather-forecast-day-precipitation">
                  {day.precipitation}% chance of rain
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="weather-forecast-section">
        <h2 className="weather-forecast-section-title">
          Weather Alerts
        </h2>
        <div className="weather-forecast-alerts">
          <div className="weather-forecast-alert">
            <div className="weather-forecast-alert-icon">
              <CloudLightning size={20} />
            </div>
            <div className="weather-forecast-alert-content">
              <h3 className="weather-forecast-alert-title">
                Thunderstorm Warning
              </h3>
              <p className="weather-forecast-alert-description">
                Thunderstorms expected in the afternoon. Secure loose items and avoid outdoor activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 