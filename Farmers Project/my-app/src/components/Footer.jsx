import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart, Sprout } from 'lucide-react'
import './Footer.css'

export function Footer({ currentSection, setCurrentSection }) {
  const currentYear = new Date().getFullYear()

  const handleLinkClick = (section) => {
    if (section && setCurrentSection) {
      setCurrentSection(section)
    }
  }

  const quickLinks = [
    { name: 'Dashboard', section: 'dashboard' },
    { name: 'Crops', section: 'crops' },
    { name: 'Weather', section: 'weather' },
    { name: 'Prices', section: 'prices' }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', color: '#1877F2' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: '#1DA1F2' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: '#E4405F' }
  ]

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Main Footer */}
        <div className="footer-main">
          {/* Company Info */}
          <div className="footer-section company-section">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Sprout size={20} />
              </div>
              <div className="footer-logo-text">
                <h3>FarmZim</h3>
                <p>Empowering Zimbabwean Farmers</p>
              </div>
            </div>
            <div className="footer-social">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    title={social.name}
                    style={{ '--social-color': social.color }}
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Access</h4>
            <div className="footer-quick-links">
              {quickLinks.map((link) => (
                <button 
                  key={link.name}
                  className="footer-quick-link"
                  onClick={() => handleLinkClick(link.section)}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact</h4>
            <div className="footer-contact">
              <a href="tel:+263 771 830 494" className="footer-contact-item">
                <Phone size={14} />
                <span>+263 771 830 494</span>
              </a>
              <a href="mailto:mhandatakudzwa07@gmail.com" className="footer-contact-item">
                <Mail size={14} />
                <span>mhandatakudzwa07@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section with Border */}
      <div className="footer-copyright-section">
        <div className="footer-copyright-border"></div>
        <div className="footer-copyright-content">
          <p className="footer-copyright-text">
            © {currentYear} FarmZim. Made with{' '}
            <Heart size={14} className="footer-heart" /> in Zimbabwe
          </p>
        </div>
      </div>
    </footer>
  )
} 