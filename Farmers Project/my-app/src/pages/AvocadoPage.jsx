import React from 'react'
import { ArrowLeft, Sprout, Calendar, Thermometer, Droplets, Sun, TrendingUp } from 'lucide-react'
import './CropPages.css'

const AvocadoPage = ({ onBack }) => {
  return (
    <div className="crop-page">
      <div className="crop-page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Crops
        </button>
        <h1 className="crop-title">Avocado Farming</h1>
      </div>

      <div className="crop-content">
        <div className="crop-image-section">
          <img 
            src="/imgs/avocado.jpg" 
            alt="Avocado farming" 
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
                <li><strong>Plant Type:</strong> Evergreen tree</li>
                <li><strong>Maturity Period:</strong> 3-5 years</li>
                <li><strong>Lifespan:</strong> 50+ years</li>
                <li><strong>Height:</strong> 15-20 meters</li>
                <li><strong>Spacing:</strong> 6-8 meters apart</li>
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
                <li><strong>Temperature:</strong> 15-30°C</li>
                <li><strong>Rainfall:</strong> 1000-1500mm annually</li>
                <li><strong>Humidity:</strong> Moderate to high</li>
                <li><strong>Altitude:</strong> 500-1500m above sea level</li>
                <li><strong>Frost Tolerance:</strong> Sensitive</li>
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
                <li><strong>Soil Type:</strong> Well-drained loamy</li>
                <li><strong>pH Level:</strong> 5.5-7.0</li>
                <li><strong>Watering:</strong> Regular, deep watering</li>
                <li><strong>Drainage:</strong> Excellent required</li>
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
                <li><strong>Planting:</strong> January - March</li>
                <li><strong>Flowering:</strong> August - October</li>
                <li><strong>Harvesting:</strong> March - September</li>
                <li><strong>Pruning:</strong> After harvest</li>
                <li><strong>Fertilization:</strong> Every 3-4 months</li>
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
                  <p>Plant in well-prepared holes with organic matter. Ensure proper spacing for air circulation and sunlight penetration.</p>
                </div>
                <div className="practice-item">
                  <h4>Irrigation</h4>
                  <p>Deep watering every 7-10 days during dry periods. Avoid waterlogging which can cause root rot.</p>
                </div>
                <div className="practice-item">
                  <h4>Fertilization</h4>
                  <p>Use balanced NPK fertilizer and organic matter. Apply during active growth periods.</p>
                </div>
                <div className="practice-item">
                  <h4>Pest Management</h4>
                  <p>Monitor for avocado lace bugs, thrips, and fungal diseases. Use integrated pest management.</p>
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
                  <p>High demand in urban areas for fresh consumption and processing</p>
                </div>
                <div className="market-item">
                  <h4>Export Potential</h4>
                  <p>Growing export market to neighboring countries and Europe</p>
                </div>
                <div className="market-item">
                  <h4>Processing</h4>
                  <p>Oil extraction, guacamole, and cosmetic industry uses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvocadoPage
