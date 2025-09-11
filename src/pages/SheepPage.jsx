import React from 'react'
import { ArrowLeft, Sprout, Calendar, Thermometer, Droplets, Sun, TrendingUp } from 'lucide-react'
import './CropPages.css'

const SheepPage = ({ onBack }) => {
  return (
    <div className="crop-page">
      <div className="crop-page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Farming Projects
        </button>
        <h1 className="crop-title">Sheep Farming</h1>
      </div>

      <div className="crop-content">
        <div className="crop-image-section">
          <img 
            src="/imgs/sheep.jpg" 
            alt="Sheep farming" 
            className="crop-main-image"
          />
        </div>

        <div className="crop-info-grid">
          <div className="crop-card">
            <div className="crop-card-header">
              <Sprout className="crop-card-icon" />
              <h3>Breeding Information</h3>
            </div>
            <div className="crop-card-content">
              <ul>
                <li><strong>Animal Type:</strong> Small ruminant</li>
                <li><strong>Gestation Period:</strong> 150 days</li>
                <li><strong>Life Span:</strong> 10-12 years</li>
                <li><strong>Maturity:</strong> 6-12 months</li>
                <li><strong>Weight Range:</strong> 30-100kg</li>
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
                <li><strong>Temperature:</strong> 15-35°C</li>
                <li><strong>Humidity:</strong> Moderate</li>
                <li><strong>Altitude:</strong> 0-3000m above sea level</li>
                <li><strong>Shelter:</strong> Required for protection</li>
                <li><strong>Space:</strong> 15-20 sq meters per sheep</li>
              </ul>
            </div>
          </div>

          <div className="crop-card">
            <div className="crop-card-header">
              <Droplets className="crop-card-icon" />
              <h3>Feeding & Water</h3>
            </div>
            <div className="crop-card-content">
              <ul>
                <li><strong>Daily Water:</strong> 5-10 liters</li>
                <li><strong>Feed Type:</strong> Grass, hay, browse</li>
                <li><strong>Supplements:</strong> Minerals and vitamins</li>
                <li><strong>Grazing:</strong> 6-8 hours daily</li>
                <li><strong>Concentrates:</strong> As needed</li>
              </ul>
            </div>
          </div>

          <div className="crop-card">
            <div className="crop-card-header">
              <Calendar className="crop-card-icon" />
              <h3>Management Calendar</h3>
            </div>
            <div className="crop-card-content">
              <ul>
                <li><strong>Breeding:</strong> Year-round</li>
                <li><strong>Lambing:</strong> 5 months after breeding</li>
                <li><strong>Vaccination:</strong> Every 6-12 months</li>
                <li><strong>Deworming:</strong> Every 3-4 months</li>
                <li><strong>Shearing:</strong> Every 6-12 months</li>
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
                  <h4>Housing</h4>
                  <p>Provide clean, well-ventilated shelters with adequate space. Ensure proper drainage and bedding.</p>
                </div>
                <div className="practice-item">
                  <h4>Feeding</h4>
                  <p>Provide balanced nutrition with fresh water available at all times. Rotate grazing areas for pasture management.</p>
                </div>
                <div className="practice-item">
                  <h4>Health Management</h4>
                  <p>Regular vaccinations, deworming, and health monitoring. Maintain proper hygiene and biosecurity measures.</p>
                </div>
                <div className="practice-item">
                  <h4>Breeding</h4>
                  <p>Select quality breeding stock. Practice proper breeding techniques and record keeping.</p>
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
                  <p>High demand for meat, wool, and breeding stock</p>
                </div>
                <div className="market-item">
                  <h4>Export Potential</h4>
                  <p>Export opportunities for live animals and sheep products</p>
                </div>
                <div className="market-item">
                  <h4>Value Addition</h4>
                  <p>Meat processing, wool products, leather, and manure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SheepPage
