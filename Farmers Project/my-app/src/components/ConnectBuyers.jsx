import { useState, useEffect } from 'react'
import { 
  Users, 
  Search, 
  Star, 
  Phone, 
  Mail, 
  MapPin,
  Building,
  Filter,
  MessageCircle,
  X,
  Send,
  Eye,
  Calendar,
  DollarSign,
  Package
} from 'lucide-react'
import { format } from 'date-fns'
import './ConnectBuyers.css'

export function ConnectBuyers() {
  const [buyers, setBuyers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [loading, setLoading] = useState(true)
  
  // Modal states
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedBuyer, setSelectedBuyer] = useState(null)
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    phone: '',
    email: ''
  })

  // Comprehensive Zimbabwe buyers database
  const zimbabweBuyers = [
    {
      id: 1,
      name: 'Grain Marketing Board',
      category: 'Government',
      rating: 4.8,
      reviews: 156,
      location: 'Harare',
      contact: {
        phone: '+263 4 700 000',
        email: 'info@gmb.co.zw',
        address: '1 Simon Mazorodze Road, Harare'
      },
      crops: ['Maize', 'Wheat', 'Sorghum', 'Pearl Millet'],
      description: 'Official government agency for grain procurement and marketing',
      verified: true,
      lastActive: new Date(),
      paymentTerms: '30 days',
      minimumOrder: '5 tons'
    },
    {
      id: 2,
      name: 'Tobacco Sales Floor',
      category: 'Private',
      rating: 4.6,
      reviews: 89,
      location: 'Harare',
      contact: {
        phone: '+263 4 750 000',
        email: 'sales@tobaccosales.co.zw',
        address: '15 Enterprise Road, Harare'
      },
      crops: ['Tobacco'],
      description: 'Specialized tobacco auction floor and export company',
      verified: true,
      lastActive: new Date(),
      paymentTerms: '7 days',
      minimumOrder: '1 ton'
    },
    {
      id: 3,
      name: 'Cotton Marketing Board',
      category: 'Government',
      rating: 4.4,
      reviews: 67,
      location: 'Harare',
      contact: {
        phone: '+263 4 800 000',
        email: 'info@cmb.co.zw',
        address: '25 Samora Machel Avenue, Harare'
      },
      crops: ['Cotton'],
      description: 'Government agency for cotton marketing and export',
      verified: true,
      lastActive: new Date(),
      paymentTerms: '14 days',
      minimumOrder: '2 tons'
    },
    {
      id: 4,
      name: 'Harare Fresh Produce Market',
      category: 'Private',
      rating: 4.2,
      reviews: 234,
      location: 'Harare',
      contact: {
        phone: '+263 4 850 000',
        email: 'info@hararemarket.co.zw',
        address: 'Mbare Market Complex, Harare'
      },
      crops: ['Sweet Potato', 'Vegetables', 'Fruits'],
      description: 'Largest fresh produce market in Harare',
      verified: true,
      lastActive: new Date(),
      paymentTerms: 'Cash on delivery',
      minimumOrder: '100kg'
    },
    {
      id: 5,
      name: 'Zimbabwe Oil Seeds Association',
      category: 'Private',
      rating: 4.5,
      reviews: 45,
      location: 'Harare',
      contact: {
        phone: '+263 4 900 000',
        email: 'info@zosa.co.zw',
        address: '10 Leopold Takawira, Harare'
      },
      crops: ['Sunflower', 'Soybean'],
      description: 'Association representing oil seed producers and buyers',
      verified: true,
      lastActive: new Date(),
      paymentTerms: '21 days',
      minimumOrder: '1 ton'
    },
    {
      id: 6,
      name: 'Legume Traders Ltd',
      category: 'Private',
      rating: 4.3,
      reviews: 78,
      location: 'Bulawayo',
      contact: {
        phone: '+263 9 250 000',
        email: 'sales@legumetraders.co.zw',
        address: '5 Main Street, Bulawayo'
      },
      crops: ['Groundnuts', 'Soybean', 'Cowpea'],
      description: 'Specialized legume trading company',
      verified: true,
      lastActive: new Date(),
      paymentTerms: '14 days',
      minimumOrder: '500kg'
    },
    {
      id: 7,
      name: 'Zimbabwe Farmers Union',
      category: 'Cooperative',
      rating: 4.7,
      reviews: 123,
      location: 'Harare',
      contact: {
        phone: '+263 4 950 000',
        email: 'info@zfufarmers.co.zw',
        address: '8 Samora Machel Avenue, Harare'
      },
      crops: ['All Crops'],
      description: 'Farmer cooperative for collective marketing',
      verified: true,
      lastActive: new Date(),
      paymentTerms: '30 days',
      minimumOrder: '1 ton'
    },
    {
      id: 8,
      name: 'Export Trading Company',
      category: 'Private',
      rating: 4.1,
      reviews: 56,
      location: 'Harare',
      contact: {
        phone: '+263 4 980 000',
        email: 'exports@etc.co.zw',
        address: '12 Enterprise Road, Harare'
      },
      crops: ['Tobacco', 'Cotton', 'Soybean'],
      description: 'International trading company for export markets',
      verified: true,
      lastActive: new Date(),
      paymentTerms: '45 days',
      minimumOrder: '5 tons'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    // Simulate loading
    const simulateLoading = () => {
      setTimeout(() => {
        setBuyers(zimbabweBuyers)
        setLoading(false)
      }, 1000)
    }

    simulateLoading()

    return () => clearInterval(timer)
  }, [])

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'Government', name: 'Government' },
    { id: 'Private', name: 'Private' },
    { id: 'Cooperative', name: 'Cooperative' }
  ]

  const filteredBuyers = buyers.filter(buyer => {
    const matchesSearch = buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         buyer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         buyer.crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || buyer.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getRatingStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} className="connect-buyers-star-filled" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={16} className="connect-buyers-star-half" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="connect-buyers-star-empty" />)
    }

    return stars
  }

  if (loading) {
    return (
      <div className="connect-buyers">
        <div className="connect-buyers-loading">
          <div className="connect-buyers-loading-spinner"></div>
          <p>Loading buyers directory...</p>
        </div>
      </div>
    )
  }

  // Modal handlers
  const handleContactBuyer = (buyer) => {
    setSelectedBuyer(buyer)
    setContactForm({
      subject: `Inquiry about ${buyer.crops.join(', ')} supply`,
      message: `Hello ${buyer.name},\n\nI am interested in supplying ${buyer.crops.join(', ')} to your organization. Please provide more information about your current requirements, pricing, and delivery terms.\n\nThank you.`,
      phone: '',
      email: ''
    })
    setContactModalOpen(true)
  }

  const handleViewDetails = (buyer) => {
    setSelectedBuyer(buyer)
    setDetailsModalOpen(true)
  }

  const handleContactFormChange = (e) => {
    const { name, value } = e.target
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the contact form to your backend
    // For now, we'll simulate a successful submission
    alert(`Contact message sent to ${selectedBuyer.name}! They will get back to you soon.`)
    setContactModalOpen(false)
    setContactForm({
      subject: '',
      message: '',
      phone: '',
      email: ''
    })
  }

  const closeModals = () => {
    setContactModalOpen(false)
    setDetailsModalOpen(false)
    setSelectedBuyer(null)
  }

  return (
    <div className="connect-buyers">
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
      
      <div className="connect-buyers-header">
        <div className="connect-buyers-title">
          <h1 className="connect-buyers-title-text">Connect Buyers</h1>
          <p className="connect-buyers-subtitle">
            Find verified buyers for your agricultural products
          </p>
        </div>
        <div className="connect-buyers-time">
          <div className="connect-buyers-time-display">
            {format(currentDateTime, 'HH:mm:ss')}
          </div>
          <div className="connect-buyers-date-display">
            {format(currentDateTime, 'EEEE, MMMM do, yyyy')}
          </div>
        </div>
      </div>

      <div className="connect-buyers-controls">
        <div className="connect-buyers-search">
          <div className="connect-buyers-search-container">
            <Search size={20} className="connect-buyers-search-icon" />
            <input
              type="text"
              placeholder="Search buyers, crops, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="connect-buyers-search-input"
            />
          </div>
        </div>

        <div className="connect-buyers-filters">
          <div className="connect-buyers-filter-group">
            <Filter size={16} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="connect-buyers-filter-select"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="connect-buyers-content">
        <div className="connect-buyers-grid">
          {filteredBuyers.map((buyer) => (
            <div key={buyer.id} className="connect-buyers-card">
              <div className="connect-buyers-card-header">
                <div className="connect-buyers-card-title">
                  <h3 className="connect-buyers-card-name">{buyer.name}</h3>
                  <div className="connect-buyers-card-rating">
                    {getRatingStars(buyer.rating)}
                    <span className="connect-buyers-card-rating-text">
                      {buyer.rating} ({buyer.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="connect-buyers-card-verified">
                  {buyer.verified && (
                    <span className="connect-buyers-verified-badge">Verified</span>
                  )}
                </div>
              </div>

              <div className="connect-buyers-card-category">
                <Building size={16} />
                <span>{buyer.category}</span>
              </div>

              <div className="connect-buyers-card-description">
                {buyer.description}
              </div>

              <div className="connect-buyers-card-crops">
                <h4 className="connect-buyers-card-crops-title">Crops Accepted:</h4>
                <div className="connect-buyers-card-crops-list">
                  {buyer.crops.map((crop, index) => (
                    <span key={index} className="connect-buyers-crop-tag">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              <div className="connect-buyers-card-details">
                <div className="connect-buyers-card-detail">
                  <MapPin size={14} />
                  <span>{buyer.location}</span>
                </div>
                <div className="connect-buyers-card-detail">
                  <span>Payment: {buyer.paymentTerms}</span>
                </div>
                <div className="connect-buyers-card-detail">
                  <span>Min Order: {buyer.minimumOrder}</span>
                </div>
              </div>

              <div className="connect-buyers-card-contact">
                <div className="connect-buyers-card-contact-item">
                  <Phone size={16} />
                  <span>{buyer.contact.phone}</span>
                </div>
                <div className="connect-buyers-card-contact-item">
                  <Mail size={16} />
                  <span>{buyer.contact.email}</span>
                </div>
                <div className="connect-buyers-card-contact-item">
                  <MapPin size={16} />
                  <span>{buyer.contact.address}</span>
                </div>
              </div>

              <div className="connect-buyers-card-actions">
                <button 
                  className="connect-buyers-card-action-btn primary"
                  onClick={() => handleContactBuyer(buyer)}
                >
                  <MessageCircle size={16} />
                  Contact Buyer
                </button>
                <button 
                  className="connect-buyers-card-action-btn secondary"
                  onClick={() => handleViewDetails(buyer)}
                >
                  <Eye size={16} />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredBuyers.length === 0 && (
        <div className="connect-buyers-empty">
          <Users size={48} className="connect-buyers-empty-icon" />
          <h3 className="connect-buyers-empty-title">No buyers found</h3>
          <p className="connect-buyers-empty-description">
            Try adjusting your search terms or category filter.
          </p>
        </div>
      )}

      {/* Contact Buyer Modal */}
      {contactModalOpen && selectedBuyer && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Contact {selectedBuyer.name}</h3>
              <button className="modal-close-btn" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactFormChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactFormChange}
                  rows={6}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactFormChange}
                    placeholder="+263 7XX XXX XXX"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactFormChange}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={closeModals}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Send size={16} />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {detailsModalOpen && selectedBuyer && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedBuyer.name} - Company Details</h3>
              <button className="modal-close-btn" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            
            <div className="buyer-details-content">
              <div className="buyer-details-section">
                <h4>Company Information</h4>
                <div className="detail-item">
                  <Building size={16} />
                  <span><strong>Category:</strong> {selectedBuyer.category}</span>
                </div>
                <div className="detail-item">
                  <MapPin size={16} />
                  <span><strong>Location:</strong> {selectedBuyer.location}</span>
                </div>
                <div className="detail-item">
                  <span><strong>Description:</strong> {selectedBuyer.description}</span>
                </div>
              </div>
              
              <div className="buyer-details-section">
                <h4>Crops Accepted</h4>
                <div className="crops-grid">
                  {selectedBuyer.crops.map((crop, index) => (
                    <span key={index} className="crop-tag">{crop}</span>
                  ))}
                </div>
              </div>
              
              <div className="buyer-details-section">
                <h4>Business Terms</h4>
                <div className="terms-grid">
                  <div className="term-item">
                    <DollarSign size={16} />
                    <div>
                      <strong>Payment Terms:</strong>
                      <span>{selectedBuyer.paymentTerms}</span>
                    </div>
                  </div>
                  <div className="term-item">
                    <Package size={16} />
                    <div>
                      <strong>Minimum Order:</strong>
                      <span>{selectedBuyer.minimumOrder}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="buyer-details-section">
                <h4>Contact Information</h4>
                <div className="contact-grid">
                  <div className="contact-item">
                    <Phone size={16} />
                    <span>{selectedBuyer.contact.phone}</span>
                  </div>
                  <div className="contact-item">
                    <Mail size={16} />
                    <span>{selectedBuyer.contact.email}</span>
                  </div>
                  <div className="contact-item">
                    <MapPin size={16} />
                    <span>{selectedBuyer.contact.address}</span>
                  </div>
                </div>
              </div>
              
              <div className="buyer-details-section">
                <h4>Company Rating</h4>
                <div className="rating-display">
                  <div className="rating-stars">
                    {getRatingStars(selectedBuyer.rating)}
                  </div>
                  <span className="rating-text">
                    {selectedBuyer.rating} out of 5 ({selectedBuyer.reviews} reviews)
                  </span>
                </div>
              </div>
              
              <div className="buyer-details-section">
                <h4>Last Activity</h4>
                <div className="detail-item">
                  <Calendar size={16} />
                  <span>{format(selectedBuyer.lastActive, 'MMMM do, yyyy')}</span>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn-secondary" onClick={closeModals}>
                Close
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  closeModals()
                  handleContactBuyer(selectedBuyer)
                }}
              >
                <MessageCircle size={16} />
                Contact This Buyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 