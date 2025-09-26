import React from 'react'
import { ArrowLeft, Sprout, Calendar, Thermometer, Droplets, Sun, TrendingUp } from 'lucide-react'
import './CropPages.css'

const RabbitPage = ({ onBack }) => {
  return (
    <div className="crop-page">
      <div className="crop-page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Farming Projects
        </button>
        <h1 className="crop-title">Rabbit Farming</h1>
      </div>

      <div className="crop-content">
        <div className="crop-image-section">
          <img 
            src="/imgs/rabbit.jpg" 
            alt="Rabbit farming" 
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
                <li><strong>Animal Type:</strong> Small mammal</li>
                <li><strong>Gestation Period:</strong> 31 days</li>
                <li><strong>Life Span:</strong> 8-12 years</li>
                <li><strong>Maturity:</strong> 4-6 months</li>
                <li><strong>Weight Range:</strong> 2-8kg</li>
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
                <li><strong>Humidity:</strong> 50-70%</li>
                <li><strong>Ventilation:</strong> Good air circulation</li>
                <li><strong>Lighting:</strong> Natural and artificial</li>
                <li><strong>Space:</strong> 0.5-1 sq meter per rabbit</li>
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
                <li><strong>Daily Water:</strong> 500ml-1 liter</li>
                <li><strong>Feed Type:</strong> Hay, pellets, vegetables</li>
                <li><strong>Supplements:</strong> Vitamins and minerals</li>
                <li><strong>Feeding Frequency:</strong> 2-3 times daily</li>
                <li><strong>Feed Conversion:</strong> 3:1 ratio</li>
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
                <li><strong>Kindling:</strong> 31 days after breeding</li>
                <li><strong>Vaccination:</strong> Every 6 months</li>
                <li><strong>Health Checks:</strong> Monthly</li>
                <li><strong>Cleaning:</strong> Weekly deep cleaning</li>
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
                  <p>Provide clean, well-ventilated cages with proper drainage and bedding. Ensure adequate space per rabbit.</p>
                </div>
                <div className="practice-item">
                  <h4>Feeding</h4>
                  <p>Provide balanced nutrition with fresh water available at all times. Monitor feed consumption and growth.</p>
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
                  <p>High demand for meat, fur, and breeding stock</p>
                </div>
                <div className="market-item">
                  <h4>Export Potential</h4>
                  <p>Export opportunities for live animals and rabbit products</p>
                </div>
                <div className="market-item">
                  <h4>Value Addition</h4>
                  <p>Meat processing, fur products, and pet industry</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RabbitPage
