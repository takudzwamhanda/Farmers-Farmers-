# 🌾 Agricultural Support App for Zimbabwe

A comprehensive agricultural support application designed specifically for Zimbabwean farmers. This app provides crop management, weather forecasts, market prices, buyer connections, and farm analytics to help farmers optimize their operations.

## 🚀 Features

### Core Features
- **Crop Management**: Add, track, and manage crops with detailed information
- **Weather Forecast**: Current conditions and 5-day forecasts with farming tips
- **Market Prices**: Live price updates with trend indicators and market locations
- **Connect Buyers**: Directory of verified buyers with ratings and contact information
- **Farm Analytics**: Revenue tracking, crop performance, and profitability analysis

### Design Features
- **Vibrant Color Scheme**: Color-coded sections (green for crops, blue for weather, yellow for prices, purple for buyers, red for analytics)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes with persistent preferences
- **Modern UI**: Card-based layout with hover effects and gradients

### Technical Features
- **Supabase Integration**: Full backend with authentication, database, and real-time features
- **User Authentication**: Secure sign-up/login with user profiles
- **Real-time Data**: Live updates for prices, weather, and analytics
- **Offline Support**: Works offline with local data caching
- **Search & Filter**: Advanced search and filtering capabilities

## 🛠 Tech Stack

- **Frontend**: React.js, Vite
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **Styling**: CSS3 with custom design system
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React Context API

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Follow the setup guide in `SUPABASE_SETUP.md`
   - Copy your project URL and anon key

4. **Environment Variables**
   Create a `.env.local` file in the `my-app` directory:
   ```bash
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

## 🗄 Database Schema

The app uses the following Supabase tables:

### Core Tables
- **crops**: User's crop management data
- **weather_data**: Weather information for locations
- **market_prices**: Current market prices for crops
- **buyers**: Directory of verified buyers
- **farm_analytics**: Farm performance and financial data
- **user_profiles**: Extended user information

### Key Features
- **Row Level Security (RLS)**: Users can only access their own data
- **Real-time subscriptions**: Live updates for prices and weather
- **Scalable structure**: Ready for production use
- **Zimbabwe-specific**: Designed for local agricultural needs

## 🎯 Usage

### User Registration
1. Navigate to the app
2. Click "Sign up here" on the login screen
3. Fill in your details (name, email, phone, location, farm size, experience)
4. Create a password (minimum 6 characters)
5. Verify your email (check your inbox)

### Adding Crops
1. Go to "Crop Management" section
2. Click "Add New Crop"
3. Select a crop from the Zimbabwe crop database
4. Enter field size, planting date, and other details
5. Save to track your crop

### Viewing Market Prices
1. Navigate to "Market Prices" section
2. View current prices for all crops
3. Filter by category or search for specific crops
4. Monitor price trends (up, down, stable)

### Connecting with Buyers
1. Go to "Connect Buyers" section
2. Browse verified buyers by category
3. View ratings, contact information, and crop preferences
4. Filter by location or crop type

## 🎨 Design System

### Color Palette
- **Primary Blue**: #3b82f6 (Navigation, buttons)
- **Success Green**: #10b981 (Crops, success states)
- **Warning Yellow**: #f59e0b (Prices, warnings)
- **Info Purple**: #8b5cf6 (Buyers)
- **Danger Red**: #ef4444 (Analytics, errors)

### Typography
- **Primary Font**: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'
- **Monospace**: 'Courier New' (for timestamps)

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean input fields with icons
- **Navigation**: Sidebar with gradient icons

## 🔒 Security

- **Authentication**: Secure user registration and login
- **Data Protection**: Row Level Security (RLS) policies
- **Input Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error management

## 📱 Responsive Design

The app is fully responsive and works on:
- **Desktop**: Full-featured experience with sidebar
- **Tablet**: Adapted layout with collapsible sidebar
- **Mobile**: Mobile-first design with overlay navigation

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables

### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure your server for SPA routing

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── Auth/           # Authentication components
│   ├── Dashboard/      # Dashboard components
│   └── ...
├── context/            # React contexts
├── lib/                # Utility libraries
├── styles/             # Global styles
└── App.jsx            # Main app component
```

### Key Commands
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Zimbabwe Farmers**: For their valuable input and feedback
- **Supabase Team**: For providing an excellent backend platform
- **React Community**: For the amazing ecosystem and tools
- **Open Source Contributors**: For the libraries and tools used

## 📞 Support

For support and questions:
- Check the [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for detailed setup instructions
- Review the [Supabase Documentation](https://supabase.com/docs)
- Open an issue on GitHub

---

**Built with ❤️ for Zimbabwean Farmers**
