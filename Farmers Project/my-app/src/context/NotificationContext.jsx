import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [notificationInterval, setNotificationInterval] = useState(null)
  const [lastNotificationTime, setLastNotificationTime] = useState(0)

  // Enhanced notification templates with more variety
  const notificationTemplates = {
    weather: [
      { title: 'Weather Alert', message: 'Heavy rain expected {time}. Consider covering your crops.', icon: '🌧️' },
      { title: 'Weather Update', message: 'Drought conditions detected. Increase irrigation frequency.', icon: '☀️' },
      { title: 'Storm Warning', message: 'Strong winds expected. Secure farm equipment and structures.', icon: '💨' },
      { title: 'Temperature Alert', message: 'Frost warning {time}. Protect sensitive crops.', icon: '❄️' },
      { title: 'Humidity Alert', message: 'High humidity detected. Monitor for fungal diseases.', icon: '💧' },
      { title: 'Weather Forecast', message: 'Perfect planting conditions expected {time}.', icon: '🌤️' },
      { title: 'Rain Prediction', message: 'Light showers expected {time}. Good for seed germination.', icon: '🌦️' },
      { title: 'Wind Advisory', message: 'Moderate winds {time}. Check irrigation systems.', icon: '🌪️' }
    ],
    market: [
      { title: 'Market Price Update', message: '{crop} prices have {change} by {percentage} this week.', icon: '💰' },
      { title: 'Price Alert', message: '{crop} prices dropped by {percentage}. Consider storage options.', icon: '📉' },
      { title: 'Market Opportunity', message: 'High demand for {crop} in {market}.', icon: '📈' },
      { title: 'Export Opportunity', message: 'International buyers seeking quality {crop}.', icon: '🌍' },
      { title: 'Price Forecast', message: '{crop} prices expected to {trend} {time}.', icon: '🔮' },
      { title: 'Market Analysis', message: 'Peak season approaching for {crop} exports.', icon: '📊' },
      { title: 'Supply Alert', message: 'Low supply of {crop} in local markets.', icon: '⚠️' },
      { title: 'Demand Update', message: 'Increased demand for organic {crop} products.', icon: '📈' }
    ],
    crop: [
      { title: 'Crop Management Reminder', message: 'Time to fertilize your {crop} field. Optimal time is now.', icon: '🌱' },
      { title: 'Harvest Alert', message: 'Your {crop} is ready for harvest. Schedule equipment.', icon: '🌾' },
      { title: 'Pest Alert', message: '{pest} infestation detected. Apply treatment within 24 hours.', icon: '🐛' },
      { title: 'Irrigation Reminder', message: 'Soil moisture low in {field}. Time to irrigate.', icon: '💧' },
      { title: 'Crop Rotation', message: 'Plan crop rotation for next season. Consider {legume}.', icon: '🔄' },
      { title: 'Seedling Care', message: 'Transplant {crop} seedlings when they reach 4-6 inches.', icon: '🌿' },
      { title: 'Disease Alert', message: 'Early signs of {disease} detected in {crop}.', icon: '🦠' },
      { title: 'Growth Update', message: '{crop} showing excellent growth. Monitor for optimal harvest time.', icon: '📈' }
    ],
    buyer: [
      { title: 'New Buyer Interest', message: '{buyer} seeking fresh {crop} weekly.', icon: '🤝' },
      { title: 'Contract Opportunity', message: '{buyer} offering long-term supply contract.', icon: '📋' },
      { title: 'Buyer Request', message: 'Organic certification required for premium pricing.', icon: '🏷️' },
      { title: 'Market Connection', message: 'New buyer network available in your region.', icon: '🌐' },
      { title: 'Bulk Order', message: 'Large order request for {crop} next month. Check capacity.', icon: '📦' },
      { title: 'Quality Feedback', message: 'Buyer satisfied with last {crop} shipment quality.', icon: '✅' },
      { title: 'New Market', message: 'Opportunity to supply {crop} to {market}.', icon: '🆕' },
      { title: 'Price Negotiation', message: 'Buyer willing to pay premium for {quality} {crop}.', icon: '💎' }
    ],
    analytics: [
      { title: 'Yield Analysis', message: 'Your {crop} yield increased by {percentage} this season.', icon: '📊' },
      { title: 'Profit Report', message: 'Monthly profit analysis ready. Check dashboard.', icon: '💹' },
      { title: 'Efficiency Score', message: 'Your farm efficiency improved by {percentage} this month.', icon: '🎯' },
      { title: 'Resource Usage', message: 'Water usage optimization recommendations available.', icon: '💡' },
      { title: 'Cost Analysis', message: '{input} costs reduced by {percentage} with new supplier.', icon: '📉' },
      { title: 'Performance Alert', message: 'Your farm ranks in top {rank} of regional farms.', icon: '🏆' },
      { title: 'Trend Analysis', message: '{metric} showing positive trend this quarter.', icon: '📈' },
      { title: 'Benchmark Report', message: 'Compare your performance with regional averages.', icon: '📋' }
    ],
    equipment: [
      { title: 'Maintenance Due', message: '{equipment} maintenance scheduled for {time}.', icon: '🔧' },
      { title: 'Equipment Alert', message: '{equipment} showing signs of wear.', icon: '⚠️' },
      { title: 'New Equipment', message: 'Smart farming sensors available for your farm.', icon: '📡' },
      { title: 'Fuel Alert', message: '{equipment} fuel level low. Refill before {time}.', icon: '⛽' },
      { title: 'Upgrade Available', message: 'GPS guidance system upgrade for your {equipment}.', icon: '🧭' },
      { title: 'Warranty Alert', message: '{equipment} warranty expiring soon. Renew now.', icon: '📅' },
      { title: 'Repair Needed', message: '{equipment} requires immediate attention.', icon: '🚨' },
      { title: 'New Technology', message: 'Drone technology available for crop monitoring.', icon: '🚁' }
    ],
    community: [
      { title: 'Community Event', message: 'Local farmers meeting {time} at {location}.', icon: '👥' },
      { title: 'Knowledge Share', message: 'New farming technique workshop available.', icon: '📚' },
      { title: 'Network Alert', message: 'Connect with {number} new farmers in your area.', icon: '🤝' },
      { title: 'Support Available', message: 'Government subsidy applications open now.', icon: '🏛️' },
      { title: 'Training Alert', message: 'Sustainable farming certification course starting.', icon: '🎓' },
      { title: 'Community Success', message: 'Local farmers achieved {percentage} yield increase.', icon: '🎉' },
      { title: 'Expert Visit', message: 'Agricultural expert visiting {location} {time}.', icon: '👨‍🌾' },
      { title: 'Group Purchase', message: 'Bulk purchase opportunity for {input} with other farmers.', icon: '🛒' }
    ]
  }

  // Enhanced variation system
  const variations = {
    time: ['tomorrow', 'this weekend', 'next week', 'tonight', 'in 2 days', 'in 3 days', 'next month', 'this month'],
    crop: ['maize', 'wheat', 'tomatoes', 'cassava', 'rice', 'vegetables', 'soybeans', 'cotton', 'sugarcane', 'potatoes', 'onions', 'peppers'],
    percentage: ['15%', '20%', '25%', '30%', '18%', '22%', '35%', '12%', '28%', '40%', '16%', '24%'],
    change: ['increased', 'decreased', 'risen', 'fallen', 'grown', 'dropped'],
    market: ['local markets', 'supermarkets', 'export markets', 'processing plants', 'restaurants', 'wholesale markets'],
    trend: ['rise', 'fall', 'increase', 'decrease', 'stabilize'],
    pest: ['aphids', 'armyworms', 'fall armyworms', 'stemborers', 'leaf miners', 'whiteflies'],
    field: ['maize field', 'wheat field', 'vegetable garden', 'rice paddy', 'cassava plot'],
    legume: ['beans', 'peas', 'lentils', 'chickpeas', 'soybeans', 'groundnuts'],
    disease: ['rust', 'blight', 'mildew', 'wilt', 'leaf spot', 'root rot'],
    buyer: ['local restaurant', 'supermarket chain', 'export company', 'processing plant', 'wholesale market'],
    quality: ['premium', 'organic', 'grade A', 'export quality', 'fresh'],
    input: ['fertilizer', 'seeds', 'pesticides', 'herbicides', 'fuel', 'equipment parts'],
    rank: ['20%', '15%', '25%', '30%', '10%'],
    metric: ['yield', 'profit', 'efficiency', 'water usage', 'cost management'],
    equipment: ['tractor', 'irrigation pump', 'harvester', 'planter', 'sprayer', 'generator'],
    location: ['community hall', 'agricultural center', 'farmers market', 'training center', 'local school'],
    number: ['3', '5', '7', '10', '12', '15']
  }

  // Generate a random notification with better variety
  const generateRandomNotification = useCallback(() => {
    const types = Object.keys(notificationTemplates)
    const randomType = types[Math.floor(Math.random() * types.length)]
    const templates = notificationTemplates[randomType]
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
    
    // Create a more dynamic message with multiple variations
    let message = randomTemplate.message
    
    // Replace all placeholders with random variations
    Object.keys(variations).forEach(key => {
      const placeholder = `{${key}}`
      if (message.includes(placeholder)) {
        const randomVariation = variations[key][Math.floor(Math.random() * variations[key].length)]
        message = message.replace(placeholder, randomVariation)
      }
    })
    
    return {
      id: Date.now() + Math.random(),
      type: randomType,
      title: randomTemplate.title,
      message: message,
      timestamp: new Date(),
      isRead: false,
      icon: randomTemplate.icon
    }
  }, [])

  // Add notification function with duplicate prevention
  const addNotification = useCallback((notification) => {
    const now = Date.now()
    
    // Prevent adding notifications too frequently (minimum 2 minutes apart)
    if (now - lastNotificationTime < 120000) {
      return
    }
    
    const newNotification = {
      id: now + Math.random(),
      timestamp: new Date(),
      isRead: false,
      ...notification
    }
    
    setNotifications(prev => {
      // Check for duplicate messages in recent notifications
      const recentNotifications = prev.slice(0, 5)
      const isDuplicate = recentNotifications.some(n => 
        n.message === notification.message && 
        n.type === notification.type
      )
      
      if (isDuplicate) {
        return prev // Return current state without adding duplicate
      }
      
      // Only increment unread count if we're actually adding a new notification
      setUnreadCount(prev => prev + 1)
      setLastNotificationTime(now)
      
      return [newNotification, ...prev]
    })
  }, [lastNotificationTime])

  // Initialize with diverse sample notifications
  useEffect(() => {
    const sampleNotifications = [
      {
        id: 1,
        type: 'weather',
        title: 'Weather Alert',
        message: 'Heavy rain expected tomorrow. Consider covering your crops.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: false,
        icon: '🌧️'
      },
      {
        id: 2,
        type: 'market',
        title: 'Market Price Update',
        message: 'Tomato prices have increased by 22% this week.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        isRead: false,
        icon: '💰'
      },
      {
        id: 3,
        type: 'crop',
        title: 'Crop Management Reminder',
        message: 'Time to fertilize your maize field. Optimal time is now.',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        isRead: false,
        icon: '🌱'
      },
      {
        id: 4,
        type: 'buyer',
        title: 'New Buyer Interest',
        message: 'Local restaurant seeking fresh vegetables weekly.',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        isRead: false,
        icon: '🤝'
      },
      {
        id: 5,
        type: 'equipment',
        title: 'Maintenance Due',
        message: 'Tractor maintenance scheduled for next week.',
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
        isRead: false,
        icon: '🔧'
      }
    ]
    setNotifications(sampleNotifications)
    setUnreadCount(sampleNotifications.filter(n => !n.isRead).length)

    // Start real-time notification generation with better timing
    const startRealTimeNotifications = () => {
      const interval = setInterval(() => {
        // Generate new notification with 20% probability (reduced frequency)
        if (Math.random() < 0.2) {
          const newNotification = generateRandomNotification()
          addNotification(newNotification)
        }
      }, 60000) // Check every 1 minute instead of 30 seconds

      setNotificationInterval(interval)
    }

    // Start after 3 minutes to let user settle in
    const startDelay = setTimeout(startRealTimeNotifications, 180000)

    return () => {
      clearTimeout(startDelay)
      if (notificationInterval) {
        clearInterval(notificationInterval)
      }
    }
  }, [generateRandomNotification, addNotification])

  // Cleanup old notifications (older than 7 days)
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      setNotifications(prev => 
        prev.filter(notification => notification.timestamp > sevenDaysAgo)
      )
    }, 3600000) // Check every hour

    return () => clearInterval(cleanupInterval)
  }, [])

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
    setUnreadCount(0)
  }

  const removeNotification = (notificationId) => {
    const notification = notifications.find(n => n.id === notificationId)
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
    if (notification && !notification.isRead) {
      setUnreadCount(prev => Math.max(0, prev - 1))
    }
  }

  const clearAllNotifications = () => {
    setNotifications([])
    setUnreadCount(0)
  }

  // Function to manually trigger a specific type of notification (for testing)
  const triggerNotification = useCallback((type) => {
    const templates = notificationTemplates[type] || notificationTemplates.weather
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
    const newNotification = {
      id: Date.now() + Math.random(),
      type: type,
      title: randomTemplate.title,
      message: randomTemplate.message,
      timestamp: new Date(),
      isRead: false,
      icon: randomTemplate.icon
    }
    addNotification(newNotification)
  }, [addNotification])

  // Function to add priority notification (appears at top)
  const addPriorityNotification = useCallback((notification) => {
    const priorityNotification = {
      id: Date.now() + Math.random(),
      timestamp: new Date(),
      isRead: false,
      priority: true,
      ...notification
    }
    setNotifications(prev => [priorityNotification, ...prev])
    setUnreadCount(prev => prev + 1)
  }, [])

  // Function to manually refresh notifications (for testing and user control)
  const refreshNotifications = useCallback(() => {
    const newNotification = generateRandomNotification()
    addNotification(newNotification)
  }, [generateRandomNotification, addNotification])

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification,
      removeNotification,
      clearAllNotifications,
      triggerNotification,
      addPriorityNotification,
      refreshNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
