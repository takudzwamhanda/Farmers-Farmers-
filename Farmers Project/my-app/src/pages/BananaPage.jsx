import React from 'react'
import { ArrowLeft, Sprout, Calendar, Thermometer, Droplets, Sun, TrendingUp } from 'lucide-react'
import './CropPages.css'

const BananaPage = ({ onBack }) => {
  return (
    <div className="crop-page">
      <div className="crop-page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Crops
        </button>
        <h1 className="crop-title">Banana Farming</h1>
      </div>

      <div className="crop-content">
        <div className="crop-image-section">
          <img 
            src="/imgs/banana.jpg" 
            alt="Banana farming" 
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
                <li><strong>Plant Type:</strong> Herbaceous perennial</li>
                <li><strong>Maturity Period:</strong> 9-15 months</li>
                <li><strong>Lifespan:</strong> 15-25 years</li>
                <li><strong>Height:</strong> 3-8 meters</li>
                <li><strong>Spacing:</strong> 2-3 meters apart</li>
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
                <li><strong>Rainfall:</strong> 1200-2500mm annually</li>
                <li><strong>Humidity:</strong> High (80-90%)</li>
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
                <li><strong>Soil Type:</strong> Rich, well-drained loamy</li>
                <li><strong>pH Level:</strong> 5.5-7.0</li>
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
                <li><strong>Planting:</strong> Year-round (rainy season preferred)</li>
                <li><strong>Flowering:</strong> 8-10 months after planting</li>
                <li><strong>Harvesting:</strong> 12-15 months after planting</li>
                <li><strong>Pruning:</strong> Remove old leaves regularly</li>
                <li><strong>Fertilization:</strong> Every 2-3 months</li>
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
                  <p>Plant suckers or tissue culture plants in well-prepared holes. Ensure good soil preparation with organic matter.</p>
                </div>
                <div className="practice-item">
                  <h4>Irrigation</h4>
                  <p>Maintain consistent soil moisture. Drip irrigation is recommended for optimal water efficiency.</p>
                </div>
                <div className="practice-item">
                  <h4>Fertilization</h4>
                  <p>Apply balanced NPK fertilizer and organic matter. Potassium is particularly important for fruit quality.</p>
                </div>
                <div className="practice-item">
                  <h4>Pest Management</h4>
                  <p>Monitor for banana weevils, nematodes, and fungal diseases. Use integrated pest management.</p>
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
                  <p>Banana chips, flour, wine, and animal feed production</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BananaPage
