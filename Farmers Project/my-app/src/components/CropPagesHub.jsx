import React, { useState } from 'react'
import { Search, Grid3X3, List } from 'lucide-react'
import './CropPagesHub.css'

// Import all crop pages
import AvocadoPage from '../pages/AvocadoPage'
import BananaPage from '../pages/BananaPage'
import PawpawPage from '../pages/PawpawPage'
import SugarcanePage from '../pages/SugarcanePage'
import MaizePage from '../pages/MaizePage'
import CattlePage from '../pages/CattlePage'
import TomatoesPage from '../pages/TomatoesPage'
import PoultryPage from '../pages/PoultryPage'
import CarrotsPage from '../pages/CarrotsPage'
import PotatoesPage from '../pages/PotatoesPage'
import CottonPage from '../pages/CottonPage'
import MushroomPage from '../pages/MushroomPage'
import PigeryPage from '../pages/PigeryPage'
import GoatsPage from '../pages/GoatsPage'
import SheepPage from '../pages/SheepPage'
import RabbitPage from '../pages/RabbitPage'
import AfricanMapPage from '../pages/AfricanMapPage'
import TobaccoPage from '../pages/TobaccoPage'
import OnionPage from '../pages/OnionPage'
import PepperPage from '../pages/PepperPage'
import CabbagePage from '../pages/CabbagePage'
import WatermelonsPage from '../pages/WatermelonsPage'
import OkraPage from '../pages/OkraPage'
import GroundNutsPage from '../pages/GroundNutsPage'
import SoyaBeansPage from '../pages/SoyaBeansPage'
import RoundNutsPage from '../pages/RoundNutsPage'
import SweetPotatoesPage from '../pages/SweetPotatoesPage'
import BrocoliPage from '../pages/BrocoliPage'
import LetticePage from '../pages/LetticePage'
import GreenPepperPage from '../pages/GreenPepperPage'
import HotPepperPage from '../pages/HotPepperPage'
import ChalloteOnionPage from '../pages/ChalloteOnionPage'

const cropData = [
  {
    id: 'avocado',
    name: 'Avocado',
    category: 'Fruits',
    image: '/imgs/avocado.jpg',
    description: 'Learn about avocado farming techniques and best practices',
    page: AvocadoPage
  },
  {
    id: 'banana',
    name: 'Banana',
    category: 'Fruits',
    image: '/imgs/banana.jpg',
    description: 'Comprehensive guide to banana cultivation',
    page: BananaPage
  },
  {
    id: 'pawpaw',
    name: 'Pawpaw',
    category: 'Fruits',
    image: '/imgs/pawpaw.jpg',
    description: 'Papaya farming and management techniques',
    page: PawpawPage
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    category: 'Cash Crops',
    image: '/imgs/sugarcane.jpg',
    description: 'Sugarcane cultivation and processing',
    page: SugarcanePage
  },
  {
    id: 'maize',
    name: 'Maize',
    category: 'Cereals',
    image: '/imgs/maize.jpg',
    description: 'Maize farming and grain production',
    page: MaizePage
  },
  {
    id: 'tomatoes',
    name: 'Tomatoes',
    category: 'Vegetables',
    image: '/imgs/tomatoes.jpg',
    description: 'Tomato farming and greenhouse techniques',
    page: TomatoesPage
  },
  {
    id: 'carrots',
    name: 'Carrots',
    category: 'Vegetables',
    image: '/imgs/carrots.jpg',
    description: 'Carrot cultivation and root crop farming',
    page: CarrotsPage
  },
  {
    id: 'potatoes',
    name: 'Potatoes',
    category: 'Root Crops',
    image: '/imgs/potatoes.jpg',
    description: 'Potato farming and tuber production',
    page: PotatoesPage
  },
  {
    id: 'cotton',
    name: 'Cotton',
    category: 'Cash Crops',
    image: '/imgs/cotton.jpg',
    description: 'Cotton cultivation and fiber production',
    page: CottonPage
  },
  {
    id: 'tobacco',
    name: 'Tobacco',
    category: 'Cash Crops',
    image: '/imgs/tobacco.jpg',
    description: 'Tobacco farming and curing process',
    page: TobaccoPage
  },
  {
    id: 'onion',
    name: 'Onion',
    category: 'Vegetables',
    image: '/imgs/king onion.jpg',
    description: 'Onion farming and bulb production',
    page: OnionPage
  },
  {
    id: 'pepper',
    name: 'Pepper',
    category: 'Vegetables',
    image: '/imgs/pepper.jpg',
    description: 'Pepper cultivation and spice farming',
    page: PepperPage
  },
  {
    id: 'cabbage',
    name: 'Cabbage',
    category: 'Vegetables',
    image: '/imgs/cabbage.jpg',
    description: 'Cabbage farming and leafy vegetable production',
    page: CabbagePage
  },
  {
    id: 'watermelons',
    name: 'Watermelons',
    category: 'Fruits',
    image: '/imgs/watermelons.jpg',
    description: 'Watermelon farming and fruit production',
    page: WatermelonsPage
  },
  {
    id: 'okra',
    name: 'Okra',
    category: 'Vegetables',
    image: '/imgs/okra.jpg',
    description: 'Okra farming and pod production',
    page: OkraPage
  },
  {
    id: 'ground-nuts',
    name: 'Ground Nuts',
    category: 'Legumes',
    image: '/imgs/ground nuts.jpg',
    description: 'Ground nuts farming and peanut production',
    page: GroundNutsPage
  },
  {
    id: 'soya-beans',
    name: 'Soya Beans',
    category: 'Legumes',
    image: '/imgs/soya beans.jpg',
    description: 'Soya beans farming and protein crop production',
    page: SoyaBeansPage
  },
  {
    id: 'round-nuts',
    name: 'Round Nuts',
    category: 'Legumes',
    image: '/imgs/round nuts.jpg',
    description: 'Round nuts farming and Bambara groundnuts',
    page: RoundNutsPage
  },
  {
    id: 'sweet-potatoes',
    name: 'Sweet Potatoes',
    category: 'Root Crops',
    image: '/imgs/sweet potatoes.jpg',
    description: 'Sweet potato farming and tuber production',
    page: SweetPotatoesPage
  },
  {
    id: 'brocoli',
    name: 'Broccoli',
    category: 'Vegetables',
    image: '/imgs/brocoli.jpg',
    description: 'Broccoli farming and green vegetable production',
    page: BrocoliPage
  },
  {
    id: 'lettice',
    name: 'Lettuce',
    category: 'Vegetables',
    image: '/imgs/lettice.jpg',
    description: 'Lettuce farming and leafy green production',
    page: LetticePage
  },
  {
    id: 'green-pepper',
    name: 'Green Pepper',
    category: 'Vegetables',
    image: '/imgs/green pepper.jpg',
    description: 'Green pepper farming and bell pepper production',
    page: GreenPepperPage
  },
  {
    id: 'hot-pepper',
    name: 'Hot Pepper',
    category: 'Vegetables',
    image: '/imgs/hot pepper.jpg',
    description: 'Hot pepper farming and chili production',
    page: HotPepperPage
  },
  {
    id: 'challote-onion',
    name: 'Challote Onion',
    category: 'Vegetables',
    image: '/imgs/challote onion.jpg',
    description: 'Challote onion farming and specialty onion production',
    page: ChalloteOnionPage
  },
  {
    id: 'cattle',
    name: 'Cattle',
    category: 'Livestock',
    image: '/imgs/cattle.jpg',
    description: 'Cattle farming and dairy production',
    page: CattlePage
  },
  {
    id: 'poultry',
    name: 'Poultry',
    category: 'Livestock',
    image: '/imgs/poultry.jpg',
    description: 'Poultry farming and egg production',
    page: PoultryPage
  },
  {
    id: 'mushroom',
    name: 'Mushroom',
    category: 'Fungi',
    image: '/imgs/mushroom.jpg',
    description: 'Mushroom farming and fungal cultivation',
    page: MushroomPage
  },
  {
    id: 'pigery',
    name: 'Piggery',
    category: 'Livestock',
    image: '/imgs/pigery.jpg',
    description: 'Pig farming and pork production',
    page: PigeryPage
  },
  {
    id: 'goats',
    name: 'Goats',
    category: 'Livestock',
    image: '/imgs/goats.jpg',
    description: 'Goat farming and milk production',
    page: GoatsPage
  },
  {
    id: 'sheep',
    name: 'Sheep',
    category: 'Livestock',
    image: '/imgs/sheep.jpg',
    description: 'Sheep farming and wool production',
    page: SheepPage
  },
  {
    id: 'rabbit',
    name: 'Rabbit',
    category: 'Livestock',
    image: '/imgs/rabbit.jpg',
    description: 'Rabbit farming and meat production',
    page: RabbitPage
  },
  {
    id: 'african-map',
    name: 'African Agricultural Map',
    category: 'Special',
    image: '/imgs/african map drawn with various crops.jpg',
    description: 'African agricultural map and crop distribution',
    page: AfricanMapPage
  }
]

export function CropPagesHub({ onBack }) {
  const [selectedCrop, setSelectedCrop] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', ...new Set(cropData.map(crop => crop.category))]

  const filteredCrops = cropData.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCropClick = (crop) => {
    setSelectedCrop(crop)
  }

  const handleBackToHub = () => {
    setSelectedCrop(null)
  }

  if (selectedCrop) {
    const CropPage = selectedCrop.page
    return <CropPage onBack={handleBackToHub} />
  }

  return (
    <div className="crop-pages-hub">
      <div className="crop-pages-hub-header">
        <button className="crop-pages-hub-back-btn" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h1 className="crop-pages-hub-title">Crop & Farming Guides</h1>
        <p className="crop-pages-hub-subtitle">
          Comprehensive guides for all your farming needs
        </p>
      </div>

      <div className="crop-pages-hub-controls">
        <div className="crop-pages-hub-search">
          <Search size={20} className="crop-pages-hub-search-icon" />
          <input
            type="text"
            placeholder="Search crops, livestock, or farming projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="crop-pages-hub-search-input"
          />
        </div>

        <div className="crop-pages-hub-filters">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="crop-pages-hub-category-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          <div className="crop-pages-hub-view-toggle">
            <button
              className={`crop-pages-hub-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 size={20} />
            </button>
            <button
              className={`crop-pages-hub-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className={`crop-pages-hub-content ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
        {filteredCrops.map(crop => (
          <div
            key={crop.id}
            className="crop-pages-hub-card"
            onClick={() => handleCropClick(crop)}
          >
            <div className="crop-pages-hub-card-image">
              <img src={crop.image} alt={crop.name} />
              <div className="crop-pages-hub-card-overlay">
                <span className="crop-pages-hub-card-category">{crop.category}</span>
              </div>
            </div>
            <div className="crop-pages-hub-card-content">
              <h3 className="crop-pages-hub-card-title">{crop.name}</h3>
              <p className="crop-pages-hub-card-description">{crop.description}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="crop-pages-hub-empty">
          <p>No crops found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}
