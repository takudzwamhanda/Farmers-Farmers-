import React from 'react'
import { ArrowLeft, Sprout, Calendar, Thermometer, Droplets, Sun, TrendingUp } from 'lucide-react'
import './CropPages.css'

const AfricanMapPage = ({ onBack }) => {
  return (
    <div className="crop-page">
      <div className="crop-page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Farming Projects
        </button>
        <h1 className="crop-title">African Agricultural Map</h1>
      </div>

      <div className="crop-content">
        <div className="crop-image-section">
          <img 
            src="/imgs/african map drawn with various crops.jpg" 
            alt="African agricultural map" 
            className="crop-main-image"
          />
        </div>

        <div className="crop-info-grid">
          <div className="crop-card">
            <div className="crop-card-header">
              <Sprout className="crop-card-icon" />
              <h3>Regional Crops</h3>
            </div>
            <div className="crop-card-content">
              <ul>
                <li><strong>North Africa:</strong> Wheat, barley, olives</li>
                <li><strong>West Africa:</strong> Cassava, yam, cocoa</li>
                <li><strong>East Africa:</strong> Maize, coffee, tea</li>
                <li><strong>Central Africa:</strong> Cassava, plantains</li>
                <li><strong>Southern Africa:</strong> Maize, sugarcane</li>
              </ul>
            </div>
          </div>

          <div className="crop-card">
            <div className="crop-card-header">
              <Thermometer className="crop-card-icon" />
              <h3>Climate Zones</h3>
            </div>
            <div className="crop-card-content">
              <ul>
                <li><strong>Desert:</strong> Northern regions</li>
                <li><strong>Savanna:</strong> Central regions</li>
                <li><strong>Rainforest:</strong> Central Africa</li>
                <li><strong>Mediterranean:</strong> Northern coast</li>
                <li><strong>Highland:</strong> Eastern regions</li>
              </ul>
            </div>
          </div>

          <div className="crop-card">
            <div className="crop-card-header">
              <Droplets className="crop-card-icon" />
              <h3>Water Resources</h3>
            </div>
            <div className="crop-card-content">
              <ul>
                <li><strong>Major Rivers:</strong> Nile, Niger, Congo</li>
                <li><strong>Rainfall:</strong> Variable across regions</li>
                <li><strong>Irrigation:</strong> Limited infrastructure</li>
                <li><strong>Groundwater:</strong> Available in most areas</li>
                <li><strong>Water Management:</strong> Critical for farming</li>
              </ul>
            </div>
          </div>

          <div className="crop-card">
            <div className="crop-card-header">
              <Calendar className="crop-card-icon" />
              <h3>Growing Seasons</h3>
            </div>
            <div className="crop-card-content">
              <ul>
                <li><strong>Northern:</strong> Winter crops</li>
                <li><strong>Southern:</strong> Summer crops</li>
                <li><strong>Equatorial:</strong> Year-round</li>
                <li><strong>Highland:</strong> Two seasons</li>
                <li><strong>Coastal:</strong> Tropical crops</li>
              </ul>
            </div>
          </div>

          <div className="crop-card full-width">
            <div className="crop-card-header">
              <Sun className="crop-card-icon" />
              <h3>Agricultural Practices</h3>
            </div>
            <div className="crop-card-content">
              <div className="practices-grid">
                <div className="practice-item">
                  <h4>Traditional Farming</h4>
                  <p>Subsistence farming with traditional methods and local knowledge passed down through generations.</p>
                </div>
                <div className="practice-item">
                  <h4>Modern Agriculture</h4>
                  <p>Commercial farming with modern techniques, irrigation systems, and technology adoption.</p>
                </div>
                <div className="practice-item">
                  <h4>Mixed Farming</h4>
                  <p>Combination of crop cultivation and livestock rearing for sustainable agricultural systems.</p>
                </div>
                <div className="practice-item">
                  <h4>Organic Farming</h4>
                  <p>Natural farming methods without synthetic inputs, focusing on soil health and biodiversity.</p>
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
                  <h4>Local Markets</h4>
                  <p>High demand for staple crops and fresh produce across all regions</p>
                </div>
                <div className="market-item">
                  <h4>Export Potential</h4>
                  <p>Significant export opportunities for cash crops and processed products</p>
                </div>
                <div className="market-item">
                  <h4>Value Addition</h4>
                  <p>Processing industries for food products, textiles, and industrial uses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AfricanMapPage
