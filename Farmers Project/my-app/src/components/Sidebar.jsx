import { useState, useContext, useEffect } from 'react'
import { 
  Home, 
  Sprout, 
  BookOpen,
  Cloud, 
  DollarSign, 
  Users, 
  BarChart3,
  Menu,
  X,
  Target
} from 'lucide-react'
import { SidebarContext } from '../context/SidebarContext'
import './Sidebar.css'

export function Sidebar({ currentSection, setCurrentSection }) {
  const { isOpen, toggleSidebar } = useContext(SidebarContext)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile/tablet
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'sidebar-nav-icon-blue' },
    { id: 'farming-overview', label: 'Farming Overview', icon: Target, color: 'sidebar-nav-icon-emerald' },
    { id: 'crops', label: 'Crop Management', icon: Sprout, color: 'sidebar-nav-icon-green' },
    { id: 'crop-pages', label: 'Crop Guides', icon: BookOpen, color: 'sidebar-nav-icon-orange' },
    { id: 'weather', label: 'Weather Forecast', icon: Cloud, color: 'sidebar-nav-icon-sky' },
    { id: 'prices', label: 'Market Prices', icon: DollarSign, color: 'sidebar-nav-icon-yellow' },
    { id: 'buyers', label: 'Connect Buyers', icon: Users, color: 'sidebar-nav-icon-purple' },
    { id: 'analytics', label: 'Farm Analytics', icon: BarChart3, color: 'sidebar-nav-icon-red' }
  ]

  // On desktop, sidebar is always visible, so we don't need the sidebar-open class
  const sidebarClass = isMobile ? `sidebar ${isOpen ? 'sidebar-open' : ''}` : 'sidebar'

  return (
    <>
      {/* Mobile overlay - only show on mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <div className={sidebarClass}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Sprout className="sidebar-logo-icon" />
            <span className="sidebar-logo-text">FarmZim</span>
          </div>
          {/* Only show close button on mobile */}
          {isMobile && (
            <button className="sidebar-close-btn" onClick={toggleSidebar}>
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentSection === item.id
            
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${isActive ? 'sidebar-nav-item-active' : ''}`}
                onClick={() => {
                  setCurrentSection(item.id)
                  // Only close sidebar on mobile after navigation
                  if (isMobile) {
                    toggleSidebar()
                  }
                }}
              >
                <div className={`sidebar-nav-icon ${item.color} ${isActive ? 'sidebar-nav-icon-active' : ''}`}>
                  <Icon size={20} />
                </div>
                <span className="sidebar-nav-label">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-content">
            <p className="sidebar-footer-text">Agricultural Support</p>
            <p className="sidebar-footer-subtext">Zimbabwe</p>
          </div>
        </div>
      </div>

      {/* Mobile menu button - only show on mobile */}
      {isMobile && (
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
      )}
    </>
  )
} 