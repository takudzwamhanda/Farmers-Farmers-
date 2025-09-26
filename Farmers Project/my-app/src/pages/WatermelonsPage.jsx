import React from 'react'
import { ArrowLeft, Sprout, Calendar, Thermometer, Droplets, Sun, TrendingUp } from 'lucide-react'
import './CropPages.css'

const WatermelonsPage = ({ onBack }) => {
  return (
    <div className="crop-page">
      <div className="crop-page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Crops
        </button>
        <h1 className="crop-title">Watermelon Farming</h1>
      </div>

      <div className="crop-content">
        <div className="crop-image-section">
          <img 
            src="/imgs/watermelons.jpg" 
            alt="Watermelon farming" 
            className="crop-main-image"
          />
        </div>

        <div className="crop-info-grid">
          <div className="crop-card">
            <div className="crop-card-header">
              <Sprout className="crop-card-icon" />
              <h3>Growing Information</h3>
            </div>
            <div className="crop-card-content">
              <ul>
                <li><strong>Plant Type:</strong> Annual vine</li>
                <li><strong>Maturity Period:</strong> 80-100 days</li>
                <li><strong>Lifespan:</strong> Annual crop</li>
                <li><strong>Height:</strong> 0.3-0.5 meters (vine)</li>
                <li><strong>Spacing:</strong> 1-2 meters apart</li>
              </ul>
            </div>
          </div>

          <div className="crop-card">
            <div className="crop-card-header">
              <Thermometer className="crop-card-icon" />
              <h3>Climate Requirements</h3>
            </div>
            <div className="crop-card-content">
              <ul>
                <li><strong>Temperature:</strong> 20-35°C</li>
                <li><strong>Rainfall:</strong> 600-800mm per season</li>
                <li><strong>Humidity:</strong> Moderate</li>
                <li><strong>Altitude:</strong> 0-1500m above sea level</li>
                <li><strong>Frost Tolerance:</strong> Not frost tolerant</li>
              </ul>
            </div>
          </div>

          <div className="crop-card">
            <div className="crop-card-header">
              <Droplets className="crop-card-icon" />
              <h3>Soil & Water</h3>
            </div>
            <div className="crop-card-content">
              <ul>
                <li><strong>Soil Type:</strong> Well-drained sandy loam</li>
                <li><strong>pH Level:</strong> 6.0-7.0</li>
                <li><strong>Watering:</strong> Regular, consistent moisture</li>
                <li><strong>Drainage:</strong> Good drainage required</li>
                <li><strong>Organic Matter:</strong> High content preferred</li>
              </ul>
            </div>
          </div>

          <div className="crop-card">
            <div className="crop-card-header">
              <Calendar className="crop-card-icon" />
              <h3>Growing Calendar</h3>
            </div>
            <div className="crop-card-content">
              <ul>
                <li><strong>Planting:</strong> August - December</li>
                <li><strong>Flowering:</strong> 40-50 days after planting</li>
                <li><strong>Harvesting:</strong> 80-100 days after planting</li>
                <li><strong>Pruning:</strong> Remove excess vines</li>
                <li><strong>Fertilization:</strong> Every 3-4 weeks</li>
              </ul>
            </div>
          </div>

          <div className="crop-card full-width">
            <div className="crop-card-header">
              <Sun className="crop-card-icon" />
              <h3>Best Practices</h3>
            </div>
            <div className="crop-card-content">
              <div className="practices-grid">
                <div className="practice-item">
                  <h4>Planting</h4>
                  <p>Plant seeds or seedlings in well-prepared soil with proper spacing. Ensure good seed-to-soil contact.</p>
                </div>
                <div className="practice-item">
                  <h4>Irrigation</h4>
                  <p>Maintain consistent soil moisture throughout growth cycle. Avoid waterlogging which can cause root rot.</p>
                </div>
                <div className="practice-item">
                  <h4>Fertilization</h4>
                  <p>Apply balanced NPK fertilizer and organic matter. Potassium is important for fruit quality.</p>
                </div>
                <div className="practice-item">
                  <h4>Pest Management</h4>
                  <p>Monitor for cucumber beetles, aphids, and fungal diseases. Use integrated pest management.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="crop-card full-width">
            <div className="crop-card-header">
              <TrendingUp className="crop-card-icon" />
              <h3>Market Information</h3>
            </div>
            <div className="crop-card-content">
              <div className="market-info">
                <div className="market-item">
                  <h4>Local Market</h4>
                  <p>High demand for fresh consumption and local markets</p>
                </div>
                <div className="market-item">
                  <h4>Export Potential</h4>
                  <p>Export opportunities to regional markets and processing industries</p>
                </div>
                <div className="market-item">
                  <h4>Processing</h4>
                  <p>Watermelon juice, sorbet, and processed food products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WatermelonsPage
