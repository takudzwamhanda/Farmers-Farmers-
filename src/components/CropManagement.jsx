import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Calendar, 
  Droplets, 
  Thermometer, 
  Info,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'
import { format, addDays, addMonths } from 'date-fns'
import './CropManagement.css'

export function CropManagement() {
  const [crops, setCrops] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedCrop, setSelectedCrop] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  // Comprehensive Zimbabwe crop database
  const zimbabweCrops = [
    {
      id: 1,
      name: 'Maize',
      category: 'Cereals',
      plantingMonths: ['October', 'November', 'December'],
      harvestMonths: ['March', 'April', 'May'],
      growthPeriod: '120-150 days',
      expectedYield: '2-4 tons/ha',
      soilRequirements: 'Well-drained loamy soil',
      climateNeeds: 'Warm, moderate rainfall',
      fertilizerRecommendation: 'NPK 8-14-7 or 7-21-7',
      commonDiseases: ['Maize streak virus', 'Grey leaf spot', 'Common rust'],
      commonPests: ['Fall armyworm', 'Stem borer', 'Aphids'],
      marketPrice: 'USD 250-350/ton',
      farmingTips: 'Plant early in the season, practice crop rotation',
      spacing: '75cm x 25cm',
      temperature: '20-30°C',
      waterNeeds: 'Moderate'
    },
    {
      id: 2,
      name: 'Tobacco',
      category: 'Cash Crops',
      plantingMonths: ['August', 'September'],
      harvestMonths: ['January', 'February', 'March'],
      growthPeriod: '120-140 days',
      expectedYield: '1.5-2.5 tons/ha',
      soilRequirements: 'Sandy loam, well-drained',
      climateNeeds: 'Warm, moderate humidity',
      fertilizerRecommendation: 'NPK 6-18-6',
      commonDiseases: ['Tobacco mosaic virus', 'Black shank', 'Blue mold'],
      commonPests: ['Aphids', 'Whiteflies', 'Thrips'],
      marketPrice: 'USD 3000-5000/ton',
      farmingTips: 'Requires careful curing process',
      spacing: '120cm x 60cm',
      temperature: '22-28°C',
      waterNeeds: 'High'
    },
    {
      id: 3,
      name: 'Cotton',
      category: 'Cash Crops',
      plantingMonths: ['November', 'December'],
      harvestMonths: ['April', 'May', 'June'],
      growthPeriod: '150-180 days',
      expectedYield: '1-2 tons/ha',
      soilRequirements: 'Deep, well-drained soil',
      climateNeeds: 'Warm, moderate rainfall',
      fertilizerRecommendation: 'NPK 8-16-8',
      commonDiseases: ['Bacterial blight', 'Verticillium wilt'],
      commonPests: ['Bollworm', 'Aphids', 'Whiteflies'],
      marketPrice: 'USD 1500-2500/ton',
      farmingTips: 'Requires good pest management',
      spacing: '90cm x 30cm',
      temperature: '25-35°C',
      waterNeeds: 'Moderate'
    },
    {
      id: 4,
      name: 'Wheat',
      category: 'Cereals',
      plantingMonths: ['May', 'June'],
      harvestMonths: ['October', 'November'],
      growthPeriod: '120-140 days',
      expectedYield: '2-3 tons/ha',
      soilRequirements: 'Well-drained clay loam',
      climateNeeds: 'Cool, moderate rainfall',
      fertilizerRecommendation: 'NPK 10-20-10',
      commonDiseases: ['Rust', 'Powdery mildew', 'Septoria'],
      commonPests: ['Aphids', 'Armyworm'],
      marketPrice: 'USD 300-400/ton',
      farmingTips: 'Plant in cool season',
      spacing: '20cm x 5cm',
      temperature: '15-25°C',
      waterNeeds: 'Moderate'
    },
    {
      id: 5,
      name: 'Soybean',
      category: 'Legumes',
      plantingMonths: ['November', 'December'],
      harvestMonths: ['March', 'April'],
      growthPeriod: '100-120 days',
      expectedYield: '1.5-2.5 tons/ha',
      soilRequirements: 'Well-drained, fertile soil',
      climateNeeds: 'Warm, moderate rainfall',
      fertilizerRecommendation: 'NPK 5-15-5',
      commonDiseases: ['Soybean rust', 'Bacterial blight'],
      commonPests: ['Aphids', 'Bean fly'],
      marketPrice: 'USD 400-600/ton',
      farmingTips: 'Good for crop rotation',
      spacing: '50cm x 5cm',
      temperature: '20-30°C',
      waterNeeds: 'Moderate'
    },
    {
      id: 6,
      name: 'Groundnuts',
      category: 'Legumes',
      plantingMonths: ['November', 'December'],
      harvestMonths: ['March', 'April'],
      growthPeriod: '90-120 days',
      expectedYield: '1-2 tons/ha',
      soilRequirements: 'Sandy loam, well-drained',
      climateNeeds: 'Warm, moderate rainfall',
      fertilizerRecommendation: 'NPK 5-15-5',
      commonDiseases: ['Leaf spot', 'Rust'],
      commonPests: ['Aphids', 'Thrips'],
      marketPrice: 'USD 800-1200/ton',
      farmingTips: 'Requires good soil preparation',
      spacing: '60cm x 15cm',
      temperature: '25-35°C',
      waterNeeds: 'Moderate'
    },
    {
      id: 7,
      name: 'Sunflower',
      category: 'Oil Seeds',
      plantingMonths: ['November', 'December'],
      harvestMonths: ['March', 'April'],
      growthPeriod: '100-120 days',
      expectedYield: '1-2 tons/ha',
      soilRequirements: 'Well-drained soil',
      climateNeeds: 'Warm, moderate rainfall',
      fertilizerRecommendation: 'NPK 8-16-8',
      commonDiseases: ['Downy mildew', 'Rust'],
      commonPests: ['Aphids', 'Birds'],
      marketPrice: 'USD 500-800/ton',
      farmingTips: 'Good for crop rotation',
      spacing: '75cm x 25cm',
      temperature: '20-30°C',
      waterNeeds: 'Moderate'
    },
    {
      id: 8,
      name: 'Sweet Potato',
      category: 'Root Crops',
      plantingMonths: ['October', 'November'],
      harvestMonths: ['March', 'April'],
      growthPeriod: '120-150 days',
      expectedYield: '8-15 tons/ha',
      soilRequirements: 'Sandy loam, well-drained',
      climateNeeds: 'Warm, moderate rainfall',
      fertilizerRecommendation: 'NPK 5-15-5',
      commonDiseases: ['Sweet potato virus', 'Black rot'],
      commonPests: ['Sweet potato weevil', 'Aphids'],
      marketPrice: 'USD 200-400/ton',
      farmingTips: 'Requires good soil preparation',
      spacing: '100cm x 30cm',
      temperature: '25-35°C',
      waterNeeds: 'Moderate'
    },
    {
      id: 9,
      name: 'Sorghum',
      category: 'Cereals',
      plantingMonths: ['November', 'December'],
      harvestMonths: ['March', 'April'],
      growthPeriod: '100-120 days',
      expectedYield: '2-3 tons/ha',
      soilRequirements: 'Well-drained soil',
      climateNeeds: 'Warm, drought tolerant',
      fertilizerRecommendation: 'NPK 8-16-8',
      commonDiseases: ['Anthracnose', 'Downy mildew'],
      commonPests: ['Sorghum midge', 'Stem borer'],
      marketPrice: 'USD 200-300/ton',
      farmingTips: 'Drought resistant crop',
      spacing: '75cm x 15cm',
      temperature: '25-35°C',
      waterNeeds: 'Low'
    },
    {
      id: 10,
      name: 'Pearl Millet',
      category: 'Cereals',
      plantingMonths: ['November', 'December'],
      harvestMonths: ['March', 'April'],
      growthPeriod: '90-120 days',
      expectedYield: '1.5-2.5 tons/ha',
      soilRequirements: 'Sandy soil, well-drained',
      climateNeeds: 'Warm, drought tolerant',
      fertilizerRecommendation: 'NPK 8-16-8',
      commonDiseases: ['Downy mildew', 'Rust'],
      commonPests: ['Birds', 'Aphids'],
      marketPrice: 'USD 250-350/ton',
      farmingTips: 'Very drought resistant',
      spacing: '60cm x 10cm',
      temperature: '25-35°C',
      waterNeeds: 'Low'
    }
  ]

  const [newCrop, setNewCrop] = useState({
    cropType: '',
    plantingDate: '',
    fieldSize: '',
    location: '',
    notes: ''
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAddCrop = () => {
    if (!newCrop.cropType || !newCrop.plantingDate || !newCrop.fieldSize) {
      alert('Please fill in all required fields')
      return
    }

    const selectedCropInfo = zimbabweCrops.find(crop => crop.name === newCrop.cropType)
    const plantingDate = new Date(newCrop.plantingDate)
    const harvestDate = addDays(plantingDate, parseInt(selectedCropInfo.growthPeriod.split('-')[0]))

    const cropToAdd = {
      id: Date.now(),
      ...newCrop,
      harvestDate: harvestDate,
      status: 'Growing',
      health: 'Good',
      ...selectedCropInfo
    }

    setCrops([...crops, cropToAdd])
    setNewCrop({
      cropType: '',
      plantingDate: '',
      fieldSize: '',
      location: '',
      notes: ''
    })
    setShowAddForm(false)
  }

  const filteredCrops = crops.filter(crop =>
    crop.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.cropType?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCropStatus = (plantingDate, growthPeriod) => {
    const today = new Date()
    const planting = new Date(plantingDate)
    const daysSincePlanting = Math.floor((today - planting) / (1000 * 60 * 60 * 24))
    const growthDays = parseInt(growthPeriod.split('-')[0])

    if (daysSincePlanting < 30) return 'Seedling'
    if (daysSincePlanting < growthDays * 0.7) return 'Growing'
    if (daysSincePlanting < growthDays) return 'Mature'
    return 'Ready for Harvest'
  }

  return (
    <div className="crop-management">
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
      
      <div className="crop-management-header">
        <div className="crop-management-title">
          <h1 className="crop-management-title-text">Crop Management</h1>
          <p className="crop-management-subtitle">
            Manage your crops and track their growth progress
          </p>
        </div>
        <button 
          className="crop-management-add-btn"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={20} />
          Add New Crop
        </button>
      </div>

      <div className="crop-management-search">
        <div className="crop-management-search-container">
          <Search size={20} className="crop-management-search-icon" />
          <input
            type="text"
            placeholder="Search crops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="crop-management-search-input"
          />
        </div>
      </div>

      {showAddForm && (
        <div className="crop-management-modal">
          <div className="crop-management-modal-content">
            <h2 className="crop-management-modal-title">Add New Crop</h2>
            <div className="crop-management-form">
              <div className="crop-management-form-group">
                <label className="crop-management-form-label">Crop Type</label>
                <select
                  value={newCrop.cropType}
                  onChange={(e) => setNewCrop({...newCrop, cropType: e.target.value})}
                  className="crop-management-form-select"
                >
                  <option value="">Select a crop</option>
                  {zimbabweCrops.map(crop => (
                    <option key={crop.id} value={crop.name}>{crop.name}</option>
                  ))}
                </select>
              </div>

              <div className="crop-management-form-group">
                <label className="crop-management-form-label">Planting Date</label>
                <input
                  type="date"
                  value={newCrop.plantingDate}
                  onChange={(e) => setNewCrop({...newCrop, plantingDate: e.target.value})}
                  className="crop-management-form-input"
                />
              </div>

              <div className="crop-management-form-group">
                <label className="crop-management-form-label">Field Size (hectares)</label>
                <input
                  type="number"
                  value={newCrop.fieldSize}
                  onChange={(e) => setNewCrop({...newCrop, fieldSize: e.target.value})}
                  className="crop-management-form-input"
                  placeholder="e.g., 2.5"
                />
              </div>

              <div className="crop-management-form-group">
                <label className="crop-management-form-label">Location</label>
                <input
                  type="text"
                  value={newCrop.location}
                  onChange={(e) => setNewCrop({...newCrop, location: e.target.value})}
                  className="crop-management-form-input"
                  placeholder="e.g., Field A, North Section"
                />
              </div>

              <div className="crop-management-form-group">
                <label className="crop-management-form-label">Notes</label>
                <textarea
                  value={newCrop.notes}
                  onChange={(e) => setNewCrop({...newCrop, notes: e.target.value})}
                  className="crop-management-form-textarea"
                  placeholder="Additional notes..."
                />
              </div>

              <div className="crop-management-form-actions">
                <button 
                  className="crop-management-form-cancel"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button 
                  className="crop-management-form-submit"
                  onClick={handleAddCrop}
                >
                  Add Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="crop-management-grid">
        {filteredCrops.map(crop => (
          <div key={crop.id} className="crop-management-card">
            <div className="crop-management-card-header">
              <div className="crop-management-card-title">
                <h3 className="crop-management-card-name">{crop.cropType || crop.name}</h3>
                <span className={`crop-management-card-status crop-management-card-status-${crop.status?.toLowerCase()}`}>
                  {getCropStatus(crop.plantingDate, crop.growthPeriod)}
                </span>
              </div>
              <div className="crop-management-card-actions">
                <button 
                  className="crop-management-card-action"
                  onClick={() => setSelectedCrop(crop)}
                >
                  <Eye size={16} />
                </button>
                <button className="crop-management-card-action">
                  <Edit size={16} />
                </button>
                <button className="crop-management-card-action">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="crop-management-card-content">
              <div className="crop-management-card-info">
                <div className="crop-management-card-info-item">
                  <Calendar size={16} />
                  <span>Planted: {format(new Date(crop.plantingDate), 'MMM dd, yyyy')}</span>
                </div>
                <div className="crop-management-card-info-item">
                  <Droplets size={16} />
                  <span>Field Size: {crop.fieldSize} ha</span>
                </div>
                <div className="crop-management-card-info-item">
                  <Thermometer size={16} />
                  <span>Location: {crop.location}</span>
                </div>
              </div>

              {crop.notes && (
                <div className="crop-management-card-notes">
                  <p className="crop-management-card-notes-text">{crop.notes}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedCrop && (
        <div className="crop-management-modal">
          <div className="crop-management-modal-content crop-management-modal-large">
            <div className="crop-management-modal-header">
              <h2 className="crop-management-modal-title">{selectedCrop.cropType || selectedCrop.name}</h2>
              <button 
                className="crop-management-modal-close"
                onClick={() => setSelectedCrop(null)}
              >
                ×
              </button>
            </div>
            <div className="crop-management-modal-body">
              <div className="crop-management-details">
                <div className="crop-management-details-section">
                  <h3 className="crop-management-details-title">Crop Information</h3>
                  <div className="crop-management-details-grid">
                    <div className="crop-management-details-item">
                      <span className="crop-management-details-label">Category:</span>
                      <span className="crop-management-details-value">{selectedCrop.category}</span>
                    </div>
                    <div className="crop-management-details-item">
                      <span className="crop-management-details-label">Growth Period:</span>
                      <span className="crop-management-details-value">{selectedCrop.growthPeriod}</span>
                    </div>
                    <div className="crop-management-details-item">
                      <span className="crop-management-details-label">Expected Yield:</span>
                      <span className="crop-management-details-value">{selectedCrop.expectedYield}</span>
                    </div>
                    <div className="crop-management-details-item">
                      <span className="crop-management-details-label">Market Price:</span>
                      <span className="crop-management-details-value">{selectedCrop.marketPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="crop-management-details-section">
                  <h3 className="crop-management-details-title">Growing Requirements</h3>
                  <div className="crop-management-details-grid">
                    <div className="crop-management-details-item">
                      <span className="crop-management-details-label">Soil Requirements:</span>
                      <span className="crop-management-details-value">{selectedCrop.soilRequirements}</span>
                    </div>
                    <div className="crop-management-details-item">
                      <span className="crop-management-details-label">Climate Needs:</span>
                      <span className="crop-management-details-value">{selectedCrop.climateNeeds}</span>
                    </div>
                    <div className="crop-management-details-item">
                      <span className="crop-management-details-label">Temperature:</span>
                      <span className="crop-management-details-value">{selectedCrop.temperature}</span>
                    </div>
                    <div className="crop-management-details-item">
                      <span className="crop-management-details-label">Water Needs:</span>
                      <span className="crop-management-details-value">{selectedCrop.waterNeeds}</span>
                    </div>
                  </div>
                </div>

                <div className="crop-management-details-section">
                  <h3 className="crop-management-details-title">Management Tips</h3>
                  <div className="crop-management-details-content">
                    <p className="crop-management-details-text">{selectedCrop.farmingTips}</p>
                    <div className="crop-management-details-item">
                      <span className="crop-management-details-label">Fertilizer:</span>
                      <span className="crop-management-details-value">{selectedCrop.fertilizerRecommendation}</span>
                    </div>
                    <div className="crop-management-details-item">
                      <span className="crop-management-details-label">Spacing:</span>
                      <span className="crop-management-details-value">{selectedCrop.spacing}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 