import React from 'react'
import { ArrowLeft, Sprout, Calendar, Thermometer, Droplets, Sun, TrendingUp } from 'lucide-react'
import './CropPages.css'

const MushroomPage = ({ onBack }) => {
  return (
    <div className="crop-page">
      <div className="crop-page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Crops
        </button>
        <h1 className="crop-title">Mushroom Farming</h1>
      </div>

      <div className="crop-content">
        <div className="crop-image-section">
          <img 
            src="/imgs/mushroom.jpg" 
            alt="Mushroom farming" 
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
                <li><strong>Plant Type:</strong> Fungus</li>
                <li><strong>Maturity Period:</strong> 3-6 weeks</li>
                <li><strong>Lifespan:</strong> Perennial</li>
                <li><strong>Height:</strong> 5-15cm</li>
                <li><strong>Spacing:</strong> 10-15cm apart</li>
              </ul>
            </div>
          </div>

          <div className="crop-card">
            <div className="crop-card-header">
              <Thermometer className="crop-card-icon" />
              <h3>Environmental Requirements</h3>
            </div>
            <div className="crop-card-content">
              <ul>
                <li><strong>Temperature:</strong> 15-25°C</li>
                <li><strong>Humidity:</strong> 80-90%</li>
                <li><strong>Light:</strong> Indirect or low light</li>
                <li><strong>Ventilation:</strong> Good air circulation</li>
                <li><strong>CO2 Level:</strong> Low (fresh air)</li>
              </ul>
            </div>
          </div>

          <div className="crop-card">
            <div className="crop-card-header">
              <Droplets className="crop-card-icon" />
              <h3>Substrate & Water</h3>
            </div>
            <div className="crop-card-content">
              <ul>
                <li><strong>Substrate:</strong> Straw, sawdust, compost</li>
                <li><strong>pH Level:</strong> 6.0-7.0</li>
                <li><strong>Moisture:</strong> 60-70%</li>
                <li><strong>Watering:</strong> Mist regularly</li>
                <li><strong>Sterilization:</strong> Required</li>
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
                <li><strong>Inoculation:</strong> Year-round</li>
                <li><strong>Colonization:</strong> 10-14 days</li>
                <li><strong>Fruiting:</strong> 3-6 weeks</li>
                <li><strong>Harvesting:</strong> When caps open</li>
                <li><strong>Flushing:</strong> Every 7-10 days</li>
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
                  <h4>Substrate Preparation</h4>
                  <p>Prepare and sterilize substrate properly. Use quality spawn and maintain sterile conditions.</p>
                </div>
                <div className="practice-item">
                  <h4>Environmental Control</h4>
                  <p>Maintain optimal temperature, humidity, and ventilation. Monitor CO2 levels regularly.</p>
                </div>
                <div className="practice-item">
                  <h4>Hygiene</h4>
                  <p>Maintain strict hygiene standards. Clean and disinfect growing areas regularly.</p>
                </div>
                <div className="practice-item">
                  <h4>Harvesting</h4>
                  <p>Harvest at the right stage when caps are fully developed but not over-mature.</p>
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
                  <p>Dried mushrooms, mushroom powder, and supplements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MushroomPage
