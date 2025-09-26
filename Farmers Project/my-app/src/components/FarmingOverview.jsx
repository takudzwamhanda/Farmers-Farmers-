import { useState } from 'react'
import { 
  Target, 
  MapPin, 
  Droplets, 
  Sprout, 
  TrendingUp, 
  FileText, 
  Users, 
  Leaf, 
  Calculator,
  Info,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from 'lucide-react'
import './FarmingOverview.css'

export function FarmingOverview() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedCategory, setSelectedCategory] = useState('crop')

  const farmingCategories = [
    {
      id: 'crop',
      name: 'Crop Farming',
      examples: ['Maize', 'Tomatoes', 'Groundnuts', 'Sweet Potatoes'],
      starterCapital: '$500–$2,000+',
      essentials: ['Seeds', 'Tools', 'Fertilizer', 'Irrigation'],
      description: 'Traditional field farming with seasonal crops',
      icon: '🌾',
      difficulty: 'Beginner',
      timeToHarvest: '3-6 months'
    },
    {
      id: 'livestock',
      name: 'Livestock',
      examples: ['Chickens', 'Goats', 'Cattle', 'Pigs'],
      starterCapital: '$800–$5,000+',
      essentials: ['Housing', 'Feed', 'Vet Care', 'Fencing'],
      description: 'Animal husbandry for meat, milk, or breeding',
      icon: '🐄',
      difficulty: 'Intermediate',
      timeToHarvest: '6-18 months'
    },
    {
      id: 'mixed',
      name: 'Mixed Farming',
      examples: ['Crops + Livestock', 'Integrated Systems'],
      starterCapital: '$1,500–$7,000+',
      essentials: ['Combo of above', 'Management Systems'],
      description: 'Combined approach for sustainability and diversity',
      icon: '🌿',
      difficulty: 'Advanced',
      timeToHarvest: 'Varies'
    },
    {
      id: 'greenhouse',
      name: 'Greenhouse',
      examples: ['Leafy Greens', 'Tomatoes', 'Herbs'],
      starterCapital: '$2,000–$10,000+',
      essentials: ['Structure', 'Climate Control', 'Irrigation'],
      description: 'Controlled environment for year-round production',
      icon: '🏗️',
      difficulty: 'Intermediate',
      timeToHarvest: '2-4 months'
    },
    {
      id: 'urban',
      name: 'Urban Farming',
      examples: ['Vertical Gardens', 'Container Crops', 'Hydroponics'],
      starterCapital: '$300–$1,000+',
      essentials: ['Pots', 'Soil', 'Water System', 'Space'],
      description: 'Small-scale farming in urban environments',
      icon: '🏙️',
      difficulty: 'Beginner',
      timeToHarvest: '1-3 months'
    }
  ]

  const keyConsiderations = [
    {
      icon: Target,
      title: 'Goals & Objectives',
      items: [
        'Profit generation and ROI expectations',
        'Subsistence farming for family needs',
        'Sustainability and environmental impact',
        'Community development and job creation'
      ]
    },
    {
      icon: MapPin,
      title: 'Land & Location',
      items: [
        'Soil quality and testing requirements',
        'Climate and weather patterns',
        'Water access and availability',
        'Topography and drainage'
      ]
    },
    {
      icon: Droplets,
      title: 'Irrigation Systems',
      items: [
        'Boreholes and water sources',
        'River and stream access',
        'Municipal water connections',
        'Drip, sprinkler, or manual systems'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Market & Sales',
      items: [
        'Target buyer identification',
        'Pricing trends and competition',
        'Value addition opportunities',
        'Distribution channels'
      ]
    },
    {
      icon: FileText,
      title: 'Legal & Permits',
      items: [
        'Land ownership and tenure',
        'Farming licenses and permits',
        'Environmental compliance',
        'Zoning and land use regulations'
      ]
    },
    {
      icon: Users,
      title: 'Labor & Skills',
      items: [
        'Team setup and management',
        'Training and skill development',
        'Management tools and systems',
        'Seasonal labor requirements'
      ]
    },
    {
      icon: Leaf,
      title: 'Sustainability & Risk',
      items: [
        'Organic farming practices',
        'Crop rotation strategies',
        'Insurance and risk management',
        'Drought and climate adaptation'
      ]
    }
  ]

  const selectedCategoryData = farmingCategories.find(cat => cat.id === selectedCategory)

  return (
    <div className="farming-overview">
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
      
      <div className="farming-overview-header">
        <div className="farming-overview-title">
          <h1>🌾 Farming Project Dashboard</h1>
          <p className="farming-overview-subtitle">
            Your comprehensive guide to starting a successful farming project
          </p>
        </div>
        <div className="farming-overview-cta">
          <button className="btn-primary">
            Get Started Today
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="farming-overview-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Info size={16} />
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          <Sprout size={16} />
          Farming Categories
        </button>
        <button 
          className={`tab-btn ${activeTab === 'planning' ? 'active' : ''}`}
          onClick={() => setActiveTab('planning')}
        >
          <Calculator size={16} />
          Planning Tools
        </button>
      </div>

      <div className="farming-overview-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="overview-intro">
              <h2>🔍 Key Considerations for Your Farming Project</h2>
              <p>
                Starting a farming project requires careful planning and consideration of multiple factors. 
                Use this guide to evaluate your readiness and make informed decisions.
              </p>
            </div>

            <div className="considerations-grid">
              {keyConsiderations.map((consideration, index) => (
                <div key={index} className="consideration-card">
                  <div className="consideration-icon">
                    <consideration.icon size={24} />
                  </div>
                  <h3>{consideration.title}</h3>
                  <ul>
                    {consideration.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="overview-tips">
              <h3><Lightbulb size={20} /> Pro Tips for Beginners</h3>
              <div className="tips-grid">
                <div className="tip-item">
                  <CheckCircle size={16} />
                  <span>Start small and scale up gradually</span>
                </div>
                <div className="tip-item">
                  <CheckCircle size={16} />
                  <span>Research local market demand thoroughly</span>
                </div>
                <div className="tip-item">
                  <CheckCircle size={16} />
                  <span>Build relationships with experienced farmers</span>
                </div>
                <div className="tip-item">
                  <CheckCircle size={16} />
                  <span>Keep detailed records from day one</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="categories-section">
            <div className="categories-intro">
              <h2>🌿 Choose Your Farming Path</h2>
              <p>
                Different farming approaches require different levels of investment, expertise, and time commitment. 
                Select the category that best fits your goals and resources.
              </p>
            </div>

            <div className="category-selector">
              {farmingCategories.map((category) => (
                <button
                  key={category.id}
                  className={`category-option ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                </button>
              ))}
            </div>

            {selectedCategoryData && (
              <div className="category-details">
                <div className="category-header">
                  <h3>{selectedCategoryData.icon} {selectedCategoryData.name}</h3>
                  <p className="category-description">{selectedCategoryData.description}</p>
                </div>

                <div className="category-info-grid">
                  <div className="info-card">
                    <h4>Examples</h4>
                    <div className="examples-list">
                      {selectedCategoryData.examples.map((example, index) => (
                        <span key={index} className="example-tag">{example}</span>
                      ))}
                    </div>
                  </div>

                  <div className="info-card">
                    <h4>Starter Capital</h4>
                    <div className="capital-display">
                      <span className="capital-amount">{selectedCategoryData.starterCapital}</span>
                      <span className="capital-note">Estimated minimum investment</span>
                    </div>
                  </div>

                  <div className="info-card">
                    <h4>Essentials</h4>
                    <ul className="essentials-list">
                      {selectedCategoryData.essentials.map((essential, index) => (
                        <li key={index}>{essential}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="info-card">
                    <h4>Project Details</h4>
                    <div className="project-details">
                      <div className="detail-item">
                        <span className="detail-label">Difficulty:</span>
                        <span className="detail-value">{selectedCategoryData.difficulty}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Time to Harvest:</span>
                        <span className="detail-value">{selectedCategoryData.timeToHarvest}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="category-actions">
                  <button className="btn-secondary">
                    <Calculator size={16} />
                    Calculate Costs
                  </button>
                  <button className="btn-primary">
                    <ArrowRight size={16} />
                    Learn More
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'planning' && (
          <div className="planning-section">
            <div className="planning-intro">
              <h2>📋 Planning Tools & Resources</h2>
              <p>
                Use these tools to plan your farming project effectively and increase your chances of success.
              </p>
            </div>

            <div className="planning-tools-grid">
              <div className="planning-tool">
                <div className="tool-icon">
                  <Calculator size={24} />
                </div>
                <h3>Cost Calculator</h3>
                <p>Estimate startup costs, operational expenses, and potential returns for your farming project.</p>
                <button className="tool-btn">Launch Calculator</button>
              </div>

              <div className="planning-tool">
                <div className="tool-icon">
                  <MapPin size={24} />
                </div>
                <h3>Land Assessment</h3>
                <p>Evaluate soil quality, water availability, and climate suitability for your chosen crops or livestock.</p>
                <button className="tool-btn">Assess Land</button>
              </div>

              <div className="planning-tool">
                <div className="tool-icon">
                  <TrendingUp size={24} />
                </div>
                <h3>Market Analysis</h3>
                <p>Research market demand, pricing trends, and competition in your target area.</p>
                <button className="tool-btn">Analyze Market</button>
              </div>

              <div className="planning-tool">
                <div className="tool-icon">
                  <FileText size={24} />
                </div>
                <h3>Legal Checklist</h3>
                <p>Ensure compliance with all legal requirements, permits, and regulations for your farming operation.</p>
                <button className="tool-btn">View Checklist</button>
              </div>

              <div className="planning-tool">
                <div className="tool-icon">
                  <Users size={24} />
                </div>
                <h3>Team Planning</h3>
                <p>Plan your workforce, training needs, and management structure for optimal operations.</p>
                <button className="tool-btn">Plan Team</button>
              </div>

              <div className="planning-tool">
                <div className="tool-icon">
                  <Leaf size={24} />
                </div>
                <h3>Sustainability Guide</h3>
                <p>Learn about sustainable farming practices, risk management, and environmental stewardship.</p>
                <button className="tool-btn">Read Guide</button>
              </div>
            </div>

            <div className="planning-checklist">
              <h3>✅ Pre-Startup Checklist</h3>
              <div className="checklist-grid">
                <div className="checklist-item">
                  <input type="checkbox" id="goal-setting" />
                  <label htmlFor="goal-setting">Define clear farming goals and objectives</label>
                </div>
                <div className="checklist-item">
                  <input type="checkbox" id="market-research" />
                  <label htmlFor="market-research">Conduct thorough market research</label>
                </div>
                <div className="checklist-item">
                  <input type="checkbox" id="land-assessment" />
                  <label htmlFor="land-assessment">Assess land suitability and access</label>
                </div>
                <div className="checklist-item">
                  <input type="checkbox" id="financial-planning" />
                  <label htmlFor="financial-planning">Create detailed financial projections</label>
                </div>
                <div className="checklist-item">
                  <input type="checkbox" id="legal-compliance" />
                  <label htmlFor="legal-compliance">Ensure legal compliance and permits</label>
                </div>
                <div className="checklist-item">
                  <input type="checkbox" id="skill-assessment" />
                  <label htmlFor="skill-assessment">Assess required skills and training needs</label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="farming-overview-footer">
        <div className="footer-content">
          <div className="footer-text">
            <h3>Ready to Start Your Farming Journey?</h3>
            <p>Join thousands of successful farmers who started with proper planning and guidance.</p>
          </div>
          <div className="footer-actions">
            <button className="btn-secondary">Download Guide</button>
            <button className="btn-primary">
              Get Started
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
