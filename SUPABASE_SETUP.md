# Supabase Setup Guide for Agricultural Support App

## 🚀 Quick Setup

### 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `farmers-app-zimbabwe`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to Zimbabwe (e.g., Europe)

### 2. Get Your Credentials

1. Go to **Settings** > **API**
2. Copy your **Project URL** and **anon/public key**
3. Create a `.env.local` file in the `my-app` directory:

```bash
# my-app/.env.local
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Database Schema Setup

Run the following SQL in your Supabase SQL Editor:

```sql
-- Enable RLS (Row Level Security)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create crops table
CREATE TABLE crops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  variety VARCHAR(100),
  planting_date DATE NOT NULL,
  expected_harvest_date DATE,
  field_size DECIMAL(10,2),
  field_size_unit VARCHAR(20) DEFAULT 'hectares',
  soil_type VARCHAR(50),
  irrigation_type VARCHAR(50),
  status VARCHAR(50) DEFAULT 'planted',
  health_status VARCHAR(50) DEFAULT 'good',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create weather_data table
CREATE TABLE weather_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location VARCHAR(100) NOT NULL,
  temperature DECIMAL(5,2),
  humidity INTEGER,
  wind_speed DECIMAL(5,2),
  wind_direction VARCHAR(10),
  precipitation DECIMAL(5,2),
  condition VARCHAR(50),
  forecast_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create market_prices table
CREATE TABLE market_prices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  crop_name VARCHAR(100) NOT NULL,
  market_location VARCHAR(100) NOT NULL,
  price_per_unit DECIMAL(10,2) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  trend VARCHAR(20) DEFAULT 'stable',
  source VARCHAR(100),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create buyers table
CREATE TABLE buyers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  company VARCHAR(200),
  email VARCHAR(255),
  phone VARCHAR(50),
  location VARCHAR(200),
  crops_interested TEXT[],
  rating DECIMAL(3,2) DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create farm_analytics table
CREATE TABLE farm_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  farm_id UUID,
  revenue DECIMAL(12,2) DEFAULT 0,
  expenses DECIMAL(12,2) DEFAULT 0,
  profit DECIMAL(12,2) DEFAULT 0,
  crop_performance JSONB,
  monthly_data JSONB,
  key_metrics JSONB,
  period VARCHAR(20) DEFAULT 'monthly',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name VARCHAR(200),
  phone VARCHAR(50),
  location VARCHAR(200),
  farm_size DECIMAL(10,2),
  farm_size_unit VARCHAR(20) DEFAULT 'hectares',
  primary_crops TEXT[],
  experience_years INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE farm_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Crops policies
CREATE POLICY "Users can view their own crops" ON crops
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own crops" ON crops
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own crops" ON crops
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own crops" ON crops
  FOR DELETE USING (auth.uid() = user_id);

-- Weather data policies (public read, authenticated write)
CREATE POLICY "Anyone can view weather data" ON weather_data
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert weather data" ON weather_data
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Market prices policies (public read, authenticated write)
CREATE POLICY "Anyone can view market prices" ON market_prices
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert market prices" ON market_prices
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Buyers policies (public read, authenticated write)
CREATE POLICY "Anyone can view buyers" ON buyers
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert buyers" ON buyers
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Farm analytics policies
CREATE POLICY "Users can view their own analytics" ON farm_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics" ON farm_analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analytics" ON farm_analytics
  FOR UPDATE USING (auth.uid() = user_id);

-- User profiles policies
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create indexes for better performance
CREATE INDEX idx_crops_user_id ON crops(user_id);
CREATE INDEX idx_crops_planting_date ON crops(planting_date);
CREATE INDEX idx_weather_data_location ON weather_data(location);
CREATE INDEX idx_market_prices_crop_name ON market_prices(crop_name);
CREATE INDEX idx_farm_analytics_user_id ON farm_analytics(user_id);

-- Create functions for automatic timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_crops_updated_at BEFORE UPDATE ON crops
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 4. Seed Data (Optional)

Run this SQL to add initial data:

```sql
-- Insert sample Zimbabwe crops
INSERT INTO crops (name, variety, status) VALUES
('Maize', 'Hybrid', 'planted'),
('Wheat', 'Winter', 'planted'),
('Sorghum', 'Local', 'planted'),
('Tobacco', 'Virginia', 'planted'),
('Cotton', 'Upland', 'planted');

-- Insert sample market prices
INSERT INTO market_prices (crop_name, market_location, price_per_unit, unit, trend) VALUES
('Maize', 'Harare', 250.00, 'kg', 'up'),
('Wheat', 'Bulawayo', 300.00, 'kg', 'stable'),
('Sorghum', 'Mutare', 200.00, 'kg', 'down');

-- Insert sample buyers
INSERT INTO buyers (name, company, email, phone, location, crops_interested, rating, verified) VALUES
('John Smith', 'Zimbabwe Grains', 'john@zimgrains.com', '+263771234567', 'Harare', ARRAY['Maize', 'Wheat'], 4.5, true),
('Sarah Johnson', 'African Markets', 'sarah@africanmarkets.co.zw', '+263772345678', 'Bulawayo', ARRAY['Sorghum', 'Cotton'], 4.2, true);
```

## 🔧 Environment Variables

Create a `.env.local` file in your `my-app` directory:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional APIs
VITE_WEATHER_API_KEY=your-weather-api-key
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## 🎯 Next Steps

1. **Test the Connection**: Run the app and check if data loads
2. **Add Authentication**: Implement user sign-up/login
3. **Real-time Features**: Enable real-time subscriptions
4. **File Storage**: Set up image uploads for crops
5. **Deploy**: Deploy to production

## 📊 Database Schema Overview

### Tables:

1. **crops**: User's crop management data
2. **weather_data**: Weather information for locations
3. **market_prices**: Current market prices for crops
4. **buyers**: Directory of verified buyers
5. **farm_analytics**: Farm performance and financial data
6. **user_profiles**: Extended user information

### Key Features:

- **Row Level Security (RLS)**: Users can only access their own data
- **Real-time subscriptions**: Live updates for prices and weather
- **Scalable structure**: Ready for production use
- **Zimbabwe-specific**: Designed for local agricultural needs

## 🆘 Troubleshooting

### Common Issues:

1. **Environment variables not loading**: Make sure to restart your dev server
2. **RLS errors**: Check if user is authenticated
3. **Connection errors**: Verify your Supabase URL and key
4. **Permission errors**: Ensure RLS policies are correct

### Support:

- Check [Supabase Documentation](https://supabase.com/docs)
- Review [Supabase Discord](https://discord.supabase.com)
- Check app console for specific error messages 