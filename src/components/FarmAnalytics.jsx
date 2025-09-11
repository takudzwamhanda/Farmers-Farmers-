import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Crop,
  Target,
  PieChart,
  Activity
} from 'lucide-react'
import { format } from 'date-fns'
import './FarmAnalytics.css'

export function FarmAnalytics() {
  const [analytics, setAnalytics] = useState(null)
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    // Simulate analytics data
    const simulateAnalyticsData = () => {
      const analyticsData = {
        revenue: {
          current: 45000,
          previous: 38000,
          change: '+18.4%',
          trend: 'up'
        },
        expenses: {
          current: 28000,
          previous: 25000,
          change: '+12.0%',
          trend: 'up'
        },
        profit: {
          current: 17000,
          previous: 13000,
          change: '+30.8%',
          trend: 'up'
        },
        cropPerformance: [
          {
            name: 'Maize',
            yield: 15.2,
            revenue: 19000,
            cost: 12000,
            profit: 7000,
            efficiency: 85
          },
          {
            name: 'Tobacco',
            yield: 2.8,
            revenue: 14000,
            cost: 8000,
            profit: 6000,
            efficiency: 92
          },
          {
            name: 'Soybean',
            yield: 4.5,
            revenue: 7200,
            cost: 4500,
            profit: 2700,
            efficiency: 78
          },
          {
            name: 'Wheat',
            yield: 8.1,
            revenue: 4800,
            cost: 3500,
            profit: 1300,
            efficiency: 82
          }
        ],
        monthlyRevenue: [
          { month: 'Jan', revenue: 12000 },
          { month: 'Feb', revenue: 15000 },
          { month: 'Mar', revenue: 18000 },
          { month: 'Apr', revenue: 22000 },
          { month: 'May', revenue: 25000 },
          { month: 'Jun', revenue: 28000 },
          { month: 'Jul', revenue: 32000 },
          { month: 'Aug', revenue: 35000 },
          { month: 'Sep', revenue: 38000 },
          { month: 'Oct', revenue: 42000 },
          { month: 'Nov', revenue: 45000 },
          { month: 'Dec', revenue: 48000 }
        ],
        cropDistribution: [
          { crop: 'Maize', percentage: 35 },
          { crop: 'Tobacco', percentage: 25 },
          { crop: 'Soybean', percentage: 20 },
          { crop: 'Wheat', percentage: 15 },
          { crop: 'Others', percentage: 5 }
        ],
        keyMetrics: {
          totalAcres: 150,
          averageYield: 7.6,
          costPerAcre: 187,
          revenuePerAcre: 300,
          profitMargin: 37.8
        }
      }

      setAnalytics(analyticsData)
      setLoading(false)
    }

    simulateAnalyticsData()

    return () => clearInterval(timer)
  }, [])

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 
      <TrendingUp size={16} className="farm-analytics-trend-up" /> : 
      <TrendingDown size={16} className="farm-analytics-trend-down" />
  }

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'farm-analytics-trend-up' : 'farm-analytics-trend-down'
  }

  if (loading) {
    return (
      <div className="farm-analytics">
        <div className="farm-analytics-loading">
          <div className="farm-analytics-loading-spinner"></div>
          <p>Loading analytics data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="farm-analytics">
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
      
      <div className="farm-analytics-header">
        <div className="farm-analytics-title">
          <h1 className="farm-analytics-title-text">Farm Analytics</h1>
          <p className="farm-analytics-subtitle">
            Track your farm's performance, revenue, and profitability
          </p>
        </div>
        <div className="farm-analytics-time">
          <div className="farm-analytics-time-display">
            {format(currentDateTime, 'HH:mm:ss')}
          </div>
          <div className="farm-analytics-date-display">
            {format(currentDateTime, 'EEEE, MMMM do, yyyy')}
          </div>
        </div>
      </div>

      {analytics && (
        <>
          <div className="farm-analytics-overview">
            <div className="farm-analytics-overview-card">
              <div className="farm-analytics-overview-header">
                <DollarSign size={24} className="farm-analytics-overview-icon" />
                <h3 className="farm-analytics-overview-title">Total Revenue</h3>
              </div>
              <div className="farm-analytics-overview-content">
                <div className="farm-analytics-overview-value">
                  ${analytics.revenue.current.toLocaleString()}
                </div>
                <div className={`farm-analytics-overview-change ${getTrendColor(analytics.revenue.trend)}`}>
                  {getTrendIcon(analytics.revenue.trend)}
                  <span>{analytics.revenue.change}</span>
                </div>
              </div>
            </div>

            <div className="farm-analytics-overview-card">
              <div className="farm-analytics-overview-header">
                <Activity size={24} className="farm-analytics-overview-icon" />
                <h3 className="farm-analytics-overview-title">Total Expenses</h3>
              </div>
              <div className="farm-analytics-overview-content">
                <div className="farm-analytics-overview-value">
                  ${analytics.expenses.current.toLocaleString()}
                </div>
                <div className={`farm-analytics-overview-change ${getTrendColor(analytics.expenses.trend)}`}>
                  {getTrendIcon(analytics.expenses.trend)}
                  <span>{analytics.expenses.change}</span>
                </div>
              </div>
            </div>

            <div className="farm-analytics-overview-card">
              <div className="farm-analytics-overview-header">
                <TrendingUp size={24} className="farm-analytics-overview-icon" />
                <h3 className="farm-analytics-overview-title">Net Profit</h3>
              </div>
              <div className="farm-analytics-overview-content">
                <div className="farm-analytics-overview-value">
                  ${analytics.profit.current.toLocaleString()}
                </div>
                <div className={`farm-analytics-overview-change ${getTrendColor(analytics.profit.trend)}`}>
                  {getTrendIcon(analytics.profit.trend)}
                  <span>{analytics.profit.change}</span>
                </div>
              </div>
            </div>

            <div className="farm-analytics-overview-card">
              <div className="farm-analytics-overview-header">
                <Target size={24} className="farm-analytics-overview-icon" />
                <h3 className="farm-analytics-overview-title">Profit Margin</h3>
              </div>
              <div className="farm-analytics-overview-content">
                <div className="farm-analytics-overview-value">
                  {analytics.keyMetrics.profitMargin}%
                </div>
                <div className="farm-analytics-overview-change farm-analytics-trend-up">
                  <TrendingUp size={16} />
                  <span>+5.2%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="farm-analytics-content">
            <div className="farm-analytics-section">
              <h2 className="farm-analytics-section-title">
                <BarChart3 size={20} />
                Crop Performance
              </h2>
              <div className="farm-analytics-crop-performance">
                {analytics.cropPerformance.map((crop, index) => (
                  <div key={index} className="farm-analytics-crop-card">
                    <div className="farm-analytics-crop-header">
                      <h3 className="farm-analytics-crop-name">{crop.name}</h3>
                      <div className="farm-analytics-crop-efficiency">
                        {crop.efficiency}% Efficiency
                      </div>
                    </div>
                    <div className="farm-analytics-crop-stats">
                      <div className="farm-analytics-crop-stat">
                        <span className="farm-analytics-crop-stat-label">Yield:</span>
                        <span className="farm-analytics-crop-stat-value">{crop.yield} tons</span>
                      </div>
                      <div className="farm-analytics-crop-stat">
                        <span className="farm-analytics-crop-stat-label">Revenue:</span>
                        <span className="farm-analytics-crop-stat-value">${crop.revenue.toLocaleString()}</span>
                      </div>
                      <div className="farm-analytics-crop-stat">
                        <span className="farm-analytics-crop-stat-label">Cost:</span>
                        <span className="farm-analytics-crop-stat-value">${crop.cost.toLocaleString()}</span>
                      </div>
                      <div className="farm-analytics-crop-stat">
                        <span className="farm-analytics-crop-stat-label">Profit:</span>
                        <span className="farm-analytics-crop-stat-value farm-analytics-profit">
                          ${crop.profit.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="farm-analytics-section">
              <h2 className="farm-analytics-section-title">
                <PieChart size={20} />
                Key Metrics
              </h2>
              <div className="farm-analytics-metrics">
                <div className="farm-analytics-metric-card">
                  <div className="farm-analytics-metric-icon">
                    <Crop size={24} />
                  </div>
                  <div className="farm-analytics-metric-content">
                    <div className="farm-analytics-metric-value">{analytics.keyMetrics.totalAcres}</div>
                    <div className="farm-analytics-metric-label">Total Acres</div>
                  </div>
                </div>

                <div className="farm-analytics-metric-card">
                  <div className="farm-analytics-metric-icon">
                    <Target size={24} />
                  </div>
                  <div className="farm-analytics-metric-content">
                    <div className="farm-analytics-metric-value">{analytics.keyMetrics.averageYield}</div>
                    <div className="farm-analytics-metric-label">Avg Yield (tons/ha)</div>
                  </div>
                </div>

                <div className="farm-analytics-metric-card">
                  <div className="farm-analytics-metric-icon">
                    <DollarSign size={24} />
                  </div>
                  <div className="farm-analytics-metric-content">
                    <div className="farm-analytics-metric-value">${analytics.keyMetrics.costPerAcre}</div>
                    <div className="farm-analytics-metric-label">Cost per Acre</div>
                  </div>
                </div>

                <div className="farm-analytics-metric-card">
                  <div className="farm-analytics-metric-icon">
                    <TrendingUp size={24} />
                  </div>
                  <div className="farm-analytics-metric-content">
                    <div className="farm-analytics-metric-value">${analytics.keyMetrics.revenuePerAcre}</div>
                    <div className="farm-analytics-metric-label">Revenue per Acre</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="farm-analytics-section">
              <h2 className="farm-analytics-section-title">
                <Calendar size={20} />
                Monthly Revenue Trend
              </h2>
              <div className="farm-analytics-chart">
                <div className="farm-analytics-chart-container">
                  {analytics.monthlyRevenue.map((month, index) => (
                    <div key={index} className="farm-analytics-chart-bar">
                      <div 
                        className="farm-analytics-chart-bar-fill"
                        style={{ height: `${(month.revenue / 50000) * 100}%` }}
                      ></div>
                      <div className="farm-analytics-chart-bar-label">{month.month}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
} 