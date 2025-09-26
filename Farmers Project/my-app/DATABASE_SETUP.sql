-- Agricultural Support App Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Enable RLS (Row Level Security)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create crops table
CREATE TABLE IF NOT EXISTS crops (
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
CREATE TABLE IF NOT EXISTS weather_data (
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
CREATE TABLE IF NOT EXISTS market_prices (
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
CREATE TABLE IF NOT EXISTS buyers (
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
CREATE TABLE IF NOT EXISTS farm_analytics (
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
CREATE TABLE IF NOT EXISTS user_profiles (
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
CREATE INDEX IF NOT EXISTS idx_crops_user_id ON crops(user_id);
CREATE INDEX IF NOT EXISTS idx_crops_planting_date ON crops(planting_date);
CREATE INDEX IF NOT EXISTS idx_weather_data_location ON weather_data(location);
CREATE INDEX IF NOT EXISTS idx_market_prices_crop_name ON market_prices(crop_name);
CREATE INDEX IF NOT EXISTS idx_farm_analytics_user_id ON farm_analytics(user_id);

-- Create functions for automatic timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_crops_updated_at ON crops;
CREATE TRIGGER update_crops_updated_at BEFORE UPDATE ON crops
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
-- Sample Zimbabwe crops
INSERT INTO crops (name, variety, status) VALUES
('Maize', 'Hybrid', 'planted'),
('Wheat', 'Winter', 'planted'),
('Sorghum', 'Local', 'planted'),
('Tobacco', 'Virginia', 'planted'),
('Cotton', 'Upland', 'planted'),
('Soybean', 'Improved', 'planted'),
('Groundnuts', 'Local', 'planted'),
('Sunflower', 'High Oil', 'planted')
ON CONFLICT DO NOTHING;

-- Sample market prices
INSERT INTO market_prices (crop_name, market_location, price_per_unit, unit, trend) VALUES
('Maize', 'Harare', 250.00, 'kg', 'up'),
('Wheat', 'Bulawayo', 300.00, 'kg', 'stable'),
('Sorghum', 'Mutare', 200.00, 'kg', 'down'),
('Tobacco', 'Harare', 5000.00, 'kg', 'up'),
('Cotton', 'Gweru', 180.00, 'kg', 'stable'),
('Soybean', 'Harare', 400.00, 'kg', 'up'),
('Groundnuts', 'Bulawayo', 350.00, 'kg', 'stable'),
('Sunflower', 'Chinhoyi', 280.00, 'kg', 'down')
ON CONFLICT DO NOTHING;

-- Sample buyers
INSERT INTO buyers (name, company, email, phone, location, crops_interested, rating, verified) VALUES
('John Smith', 'Zimbabwe Grains', 'john@zimgrains.com', '+263771234567', 'Harare', ARRAY['Maize', 'Wheat'], 4.5, true),
('Sarah Johnson', 'African Markets', 'sarah@africanmarkets.co.zw', '+263772345678', 'Bulawayo', ARRAY['Sorghum', 'Cotton'], 4.2, true),
('Michael Chen', 'Harare Trading Co', 'michael@hararetrading.co.zw', '+263773456789', 'Harare', ARRAY['Tobacco', 'Soybean'], 4.8, true),
('Grace Moyo', 'Zimbabwe Agri Export', 'grace@agriexport.co.zw', '+263774567890', 'Mutare', ARRAY['Groundnuts', 'Sunflower'], 4.3, true)
ON CONFLICT DO NOTHING;

-- Sample weather data
INSERT INTO weather_data (location, temperature, humidity, wind_speed, wind_direction, precipitation, condition) VALUES
('Harare', 25.5, 65, 12.5, 'SE', 0.0, 'sunny'),
('Bulawayo', 28.2, 45, 18.0, 'NW', 0.0, 'partly_cloudy'),
('Mutare', 23.8, 75, 8.5, 'NE', 2.5, 'light_rain'),
('Gweru', 26.1, 55, 15.2, 'SW', 0.0, 'clear'),
('Chinhoyi', 24.3, 68, 10.8, 'E', 1.2, 'overcast')
ON CONFLICT DO NOTHING; 