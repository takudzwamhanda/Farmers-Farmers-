import React from 'react'
import { ArrowLeft, Sprout, Calendar, Thermometer, Droplets, Sun, TrendingUp } from 'lucide-react'
import './CropPages.css'

const SweetPotatoesPage = ({ onBack }) => {
  return (
    <div className="crop-page">
      <div className="crop-page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Crops
        </button>
        <h1 className="crop-title">Sweet Potatoes Farming</h1>
      </div>

      <div className="crop-content">
        <div className="crop-image-section">
          <img 
            src="/imgs/sweet potatoes.jpg" 
            alt="Sweet potatoes farming" 
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
                <li><strong>Plant Type:</strong> Perennial vine</li>
                <li><strong>Maturity Period:</strong> 90-150 days</li>
                <li><strong>Lifespan:</strong> Annual crop</li>
                <li><strong>Height:</strong> 0.3-0.5 meters (vine)</li>
                <li><strong>Spacing:</strong> 0.3-0.5 meters apart</li>
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
                <li><strong>Rainfall:</strong> 500-700mm per season</li>
                <li><strong>Humidity:</strong> Moderate</li>
                <li><strong>Altitude:</strong> 0-2000m above sea level</li>
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
                <li><strong>Planting:</strong> August - December</li>
                <li><strong>Establishment:</strong> 10-20 days</li>
                <li><strong>Harvesting:</strong> 90-150 days after planting</li>
                <li><strong>Weeding:</strong> 2-3 times after planting</li>
                <li><strong>Fertilization:</strong> At planting and mid-season</li>
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
                  <p>Plant vine cuttings in well-prepared soil at proper depth and spacing. Ensure good soil contact.</p>
                </div>
                <div className="practice-item">
                  <h4>Irrigation</h4>
                  <p>Maintain consistent soil moisture throughout growth cycle. Avoid waterlogging which can cause rot.</p>
                </div>
                <div className="practice-item">
                  <h4>Fertilization</h4>
                  <p>Apply balanced NPK fertilizer and organic matter. Potassium is important for tuber development.</p>
                </div>
                <div className="practice-item">
                  <h4>Pest Management</h4>
                  <p>Monitor for sweet potato weevils, aphids, and fungal diseases. Use integrated pest management.</p>
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
                  <p>Sweet potato chips, flour, puree, and processed food products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SweetPotatoesPage
