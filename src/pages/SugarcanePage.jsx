import React from 'react'
import { ArrowLeft, Sprout, Calendar, Thermometer, Droplets, Sun, TrendingUp } from 'lucide-react'
import './CropPages.css'

const SugarcanePage = ({ onBack }) => {
  return (
    <div className="crop-page">
      <div className="crop-page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Crops
        </button>
        <h1 className="crop-title">Sugarcane Farming</h1>
      </div>

      <div className="crop-content">
        <div className="crop-image-section">
          <img 
            src="/imgs/sugarcane.jpg" 
            alt="Sugarcane farming" 
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
                <li><strong>Plant Type:</strong> Perennial grass</li>
                <li><strong>Maturity Period:</strong> 12-18 months</li>
                <li><strong>Lifespan:</strong> 5-8 years</li>
                <li><strong>Height:</strong> 2-6 meters</li>
                <li><strong>Spacing:</strong> 0.5-1.5 meters apart</li>
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
                <li><strong>Rainfall:</strong> 1500-3000mm annually</li>
                <li><strong>Humidity:</strong> High (70-90%)</li>
                <li><strong>Altitude:</strong> 0-1000m above sea level</li>
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
                <li><strong>Soil Type:</strong> Deep, well-drained loamy</li>
                <li><strong>pH Level:</strong> 6.0-7.5</li>
                <li><strong>Watering:</strong> High water requirement</li>
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
                <li><strong>Flowering:</strong> 10-12 months after planting</li>
                <li><strong>Harvesting:</strong> 12-18 months after planting</li>
                <li><strong>Ratooning:</strong> 3-4 cycles possible</li>
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
                  <p>Plant stem cuttings (setts) in well-prepared furrows. Ensure proper spacing and depth for optimal growth.</p>
                </div>
                <div className="practice-item">
                  <h4>Irrigation</h4>
                  <p>Maintain consistent soil moisture throughout growth cycle. Flood irrigation or drip irrigation recommended.</p>
                </div>
                <div className="practice-item">
                  <h4>Fertilization</h4>
                  <p>Apply balanced NPK fertilizer and organic matter. Nitrogen and potassium are particularly important.</p>
                </div>
                <div className="practice-item">
                  <h4>Pest Management</h4>
                  <p>Monitor for sugarcane borers, aphids, and fungal diseases. Use integrated pest management.</p>
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
                  <p>High demand for sugar processing and local consumption</p>
                </div>
                <div className="market-item">
                  <h4>Export Potential</h4>
                  <p>Export opportunities for raw sugar and processed products</p>
                </div>
                <div className="market-item">
                  <h4>Processing</h4>
                  <p>Sugar production, molasses, ethanol, and biofuel production</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SugarcanePage
