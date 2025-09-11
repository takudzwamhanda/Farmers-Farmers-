import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for common operations
export const supabaseHelpers = {
  // Crop management functions
  async getCrops() {
    const { data, error } = await supabase
      .from('crops')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  async addCrop(cropData) {
    const { data, error } = await supabase
      .from('crops')
      .insert([cropData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async updateCrop(id, updates) {
    const { data, error } = await supabase
      .from('crops')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deleteCrop(id) {
    const { error } = await supabase
      .from('crops')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  // Weather data functions
  async getWeatherData(location) {
    const { data, error } = await supabase
      .from('weather_data')
      .select('*')
      .eq('location', location)
      .order('created_at', { ascending: false })
      .limit(1)
    
    if (error) throw error
    return data[0]
  },

  async saveWeatherData(weatherData) {
    const { data, error } = await supabase
      .from('weather_data')
      .insert([weatherData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Market prices functions
  async getMarketPrices() {
    const { data, error } = await supabase
      .from('market_prices')
      .select('*')
      .order('updated_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async updateMarketPrice(priceData) {
    const { data, error } = await supabase
      .from('market_prices')
      .upsert([priceData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Buyers functions
  async getBuyers() {
    const { data, error } = await supabase
      .from('buyers')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  async addBuyer(buyerData) {
    const { data, error } = await supabase
      .from('buyers')
      .insert([buyerData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Analytics functions
  async getFarmAnalytics(farmId) {
    const { data, error } = await supabase
      .from('farm_analytics')
      .select('*')
      .eq('farm_id', farmId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async saveFarmAnalytics(analyticsData) {
    const { data, error } = await supabase
      .from('farm_analytics')
      .insert([analyticsData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // User management functions
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  async signUp(email, password, userData = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    
    if (error) throw error
    return data
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return true
  }
} 