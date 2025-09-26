import { useState, useEffect } from 'react'
import { 
  DollarSign, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  MapPin,
  Calendar,
  Filter
} from 'lucide-react'
import { format } from 'date-fns'
import './MarketPrices.css'

export function MarketPrices() {
  const [prices, setPrices] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [loading, setLoading] = useState(true)

  // Comprehensive Zimbabwe crop prices
  const zimbabweCropPrices = [
    {
      id: 1,
      name: 'Maize',
      category: 'Cereals',
      currentPrice: 350,
      previousPrice: 320,
      unit: 'USD/ton',
      market: 'Harare Market',
      location: 'Harare',
      trend: 'up',
      change: '+9.4%',
      lastUpdated: new Date(),
      description: 'White maize grain for human consumption and animal feed'
    },
    {
      id: 2,
      name: 'Tobacco',
      category: 'Cash Crops',
      currentPrice: 4500,
      previousPrice: 4200,
      unit: 'USD/ton',
      market: 'Tobacco Sales Floor',
      location: 'Harare',
      trend: 'up',
      change: '+7.1%',
      lastUpdated: new Date(),
      description: 'Flue-cured tobacco for export markets'
    },
    {
      id: 3,
      name: 'Cotton',
      category: 'Cash Crops',
      currentPrice: 1800,
      previousPrice: 1750,
      unit: 'USD/ton',
      market: 'Cotton Marketing Board',
      location: 'Harare',
      trend: 'up',
      change: '+2.9%',
      lastUpdated: new Date(),
      description: 'Raw cotton for textile industry'
    },
    {
      id: 4,
      name: 'Wheat',
      category: 'Cereals',
      currentPrice: 380,
      previousPrice: 395,
      unit: 'USD/ton',
      market: 'Grain Marketing Board',
      location: 'Harare',
      trend: 'down',
      change: '-3.8%',
      lastUpdated: new Date(),
      description: 'Bread wheat for flour production'
    },
    {
      id: 5,
      name: 'Soybean',
      category: 'Legumes',
      currentPrice: 550,
      previousPrice: 520,
      unit: 'USD/ton',
      market: 'Harare Market',
      location: 'Harare',
      trend: 'up',
      change: '+5.8%',
      lastUpdated: new Date(),
      description: 'Soybeans for oil extraction and animal feed'
    },
    {
      id: 6,
      name: 'Groundnuts',
      category: 'Legumes',
      currentPrice: 1100,
      previousPrice: 1050,
      unit: 'USD/ton',
      market: 'Harare Market',
      location: 'Harare',
      trend: 'up',
      change: '+4.8%',
      lastUpdated: new Date(),
      description: 'Shelled groundnuts for human consumption'
    },
    {
      id: 7,
      name: 'Sunflower',
      category: 'Oil Seeds',
      currentPrice: 650,
      previousPrice: 620,
      unit: 'USD/ton',
      market: 'Harare Market',
      location: 'Harare',
      trend: 'up',
      change: '+4.8%',
      lastUpdated: new Date(),
      description: 'Sunflower seeds for oil production'
    },
    {
      id: 8,
      name: 'Sweet Potato',
      category: 'Root Crops',
      currentPrice: 300,
      previousPrice: 280,
      unit: 'USD/ton',
      market: 'Harare Market',
      location: 'Harare',
      trend: 'up',
      change: '+7.1%',
      lastUpdated: new Date(),
      description: 'Fresh sweet potatoes for local consumption'
    },
    {
      id: 9,
      name: 'Sorghum',
      category: 'Cereals',
      currentPrice: 280,
      previousPrice: 290,
      unit: 'USD/ton',
      market: 'Grain Marketing Board',
      location: 'Harare',
      trend: 'down',
      change: '-3.4%',
      lastUpdated: new Date(),
      description: 'Sorghum grain for brewing and animal feed'
    },
    {
      id: 10,
      name: 'Pearl Millet',
      category: 'Cereals',
      currentPrice: 320,
      previousPrice: 310,
      unit: 'USD/ton',
      market: 'Harare Market',
      location: 'Harare',
      trend: 'up',
      change: '+3.2%',
      lastUpdated: new Date(),
      description: 'Pearl millet for human consumption'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    // Simulate real-time price updates
    const simulatePriceUpdates = () => {
      const updatedPrices = zimbabweCropPrices.map(price => ({
        ...price,
        currentPrice: price.currentPrice + (Math.random() - 0.5) * 20,
        lastUpdated: new Date()
      }))
      setPrices(updatedPrices)
      setLoading(false)
    }

    simulatePriceUpdates()

    return () => clearInterval(timer)
  }, [])

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'Cereals', name: 'Cereals' },
    { id: 'Cash Crops', name: 'Cash Crops' },
    { id: 'Legumes', name: 'Legumes' },
    { id: 'Oil Seeds', name: 'Oil Seeds' },
    { id: 'Root Crops', name: 'Root Crops' }
  ]

  const filteredPrices = prices.filter(price => {
    const matchesSearch = price.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         price.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || price.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="market-prices-trend-up" />
      case 'down':
        return <TrendingDown size={16} className="market-prices-trend-down" />
      default:
        return <Minus size={16} className="market-prices-trend-stable" />
    }
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'market-prices-trend-up'
      case 'down':
        return 'market-prices-trend-down'
      default:
        return 'market-prices-trend-stable'
    }
  }

  if (loading) {
    return (
      <div className="market-prices">
        <div className="market-prices-loading">
          <div className="market-prices-loading-spinner"></div>
          <p>Loading market prices...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="market-prices">
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
      
      <div className="market-prices-header">
        <div className="market-prices-title">
          <h1 className="market-prices-title-text">Market Prices</h1>
          <p className="market-prices-subtitle">
            Live price updates for agricultural products in Zimbabwe
          </p>
        </div>
        <div className="market-prices-time">
          <div className="market-prices-time-display">
            {format(currentDateTime, 'HH:mm:ss')}
          </div>
          <div className="market-prices-date-display">
            {format(currentDateTime, 'EEEE, MMMM do, yyyy')}
          </div>
        </div>
      </div>

      <div className="market-prices-controls">
        <div className="market-prices-search">
          <div className="market-prices-search-container">
            <Search size={20} className="market-prices-search-icon" />
            <input
              type="text"
              placeholder="Search crops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="market-prices-search-input"
            />
          </div>
        </div>

        <div className="market-prices-filters">
          <div className="market-prices-filter-group">
            <Filter size={16} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="market-prices-filter-select"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="market-prices-content">
        <div className="market-prices-grid">
          {filteredPrices.map((price) => (
            <div key={price.id} className="market-prices-card">
              <div className="market-prices-card-header">
                <div className="market-prices-card-title">
                  <h3 className="market-prices-card-name">{price.name}</h3>
                  <span className="market-prices-card-category">{price.category}</span>
                </div>
                <div className={`market-prices-card-trend ${getTrendColor(price.trend)}`}>
                  {getTrendIcon(price.trend)}
                  <span className="market-prices-card-change">{price.change}</span>
                </div>
              </div>

              <div className="market-prices-card-price">
                <div className="market-prices-card-current-price">
                  ${price.currentPrice.toFixed(0)}
                </div>
                <div className="market-prices-card-unit">{price.unit}</div>
              </div>

              <div className="market-prices-card-details">
                <div className="market-prices-card-detail">
                  <MapPin size={14} />
                  <span>{price.market}</span>
                </div>
                <div className="market-prices-card-detail">
                  <Calendar size={14} />
                  <span>Updated: {format(price.lastUpdated, 'HH:mm')}</span>
                </div>
              </div>

              <div className="market-prices-card-description">
                {price.description}
              </div>

              <div className="market-prices-card-stats">
                <div className="market-prices-card-stat">
                  <span className="market-prices-card-stat-label">Previous Price:</span>
                  <span className="market-prices-card-stat-value">
                    ${price.previousPrice.toFixed(0)}
                  </span>
                </div>
                <div className="market-prices-card-stat">
                  <span className="market-prices-card-stat-label">Location:</span>
                  <span className="market-prices-card-stat-value">{price.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredPrices.length === 0 && (
        <div className="market-prices-empty">
          <DollarSign size={48} className="market-prices-empty-icon" />
          <h3 className="market-prices-empty-title">No prices found</h3>
          <p className="market-prices-empty-description">
            Try adjusting your search terms or category filter.
          </p>
        </div>
      )}
    </div>
  )
} 