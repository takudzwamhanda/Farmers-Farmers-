# 🚀 Supabase Integration Guide

## ✅ Step 1: Environment Variables (COMPLETED)

Your environment variables are already configured in `.env.local`:
- ✅ VITE_SUPABASE_URL: https://pogmhrlpilgulwklvzdj.supabase.co
- ✅ VITE_SUPABASE_ANON_KEY: [Your key is configured]

## 🗄 Step 2: Database Setup

### 2.1 Access Supabase Dashboard
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project: `pogmhrlpilgulwklvzdj`

### 2.2 Run Database Schema
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire content from `DATABASE_SETUP.sql`
3. Paste it into the SQL Editor
4. Click **Run** to execute the schema

### 2.3 Verify Tables Created
In the **Table Editor**, you should see these tables:
- ✅ crops
- ✅ weather_data
- ✅ market_prices
- ✅ buyers
- ✅ farm_analytics
- ✅ user_profiles

## 🔐 Step 3: Authentication Setup

### 3.1 Enable Email Authentication
1. Go to **Authentication** > **Settings**
2. Enable **Email** provider
3. Configure email templates if needed

### 3.2 Test User Registration
1. Start your development server: `npm run dev`
2. Navigate to the app
3. Click "Sign up here"
4. Create a test account with:
   - Email: test@example.com
   - Password: password123
   - Full Name: Test Farmer
   - Phone: +263771234567
   - Location: Harare
   - Farm Size: 5.0 hectares
   - Experience: 3 years

## 🧪 Step 4: Testing the Integration

### 4.1 Test Authentication
- ✅ User registration should work
- ✅ User login should work
- ✅ User logout should work
- ✅ User profile should display correctly

### 4.2 Test Data Operations
1. **Crop Management**:
   - Add a new crop
   - View existing crops
   - Edit crop details
   - Delete crops

2. **Market Prices**:
   - View current prices
   - Filter by category
   - Search for specific crops

3. **Buyers Directory**:
   - Browse buyers
   - View contact information
   - Filter by location

4. **Weather Data**:
   - View current weather
   - Check 5-day forecast

5. **Farm Analytics**:
   - View revenue data
   - Check crop performance
   - Monitor key metrics

## 🔧 Step 5: Troubleshooting

### Common Issues and Solutions

#### Issue 1: Environment Variables Not Loading
```bash
# Solution: Restart the development server
npm run dev
```

#### Issue 2: Authentication Errors
- Check if email confirmation is required
- Verify Supabase project settings
- Check browser console for errors

#### Issue 3: Database Connection Errors
- Verify your Supabase URL and key
- Check if tables were created successfully
- Ensure RLS policies are in place

#### Issue 4: RLS Policy Errors
```sql
-- Check if user is authenticated
SELECT auth.uid();
```

## 📊 Step 6: Data Verification

### Check Sample Data
Run these queries in Supabase SQL Editor:

```sql
-- Check crops
SELECT COUNT(*) FROM crops;

-- Check market prices
SELECT COUNT(*) FROM market_prices;

-- Check buyers
SELECT COUNT(*) FROM buyers;

-- Check weather data
SELECT COUNT(*) FROM weather_data;
```

## 🎯 Step 7: Production Deployment

### 7.1 Build the App
```bash
npm run build
```

### 7.2 Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
4. Deploy

### 7.3 Deploy to Netlify
1. Build the project
2. Upload `dist` folder to Netlify
3. Configure environment variables

## 🔄 Step 8: Real-time Features

### 8.1 Enable Real-time Subscriptions
The app is already configured for real-time features. Test by:
1. Opening the app in multiple browsers
2. Adding a crop in one browser
3. Verifying it appears in the other browser

### 8.2 Real-time Updates
- Weather data updates every 30 minutes
- Market prices update every hour
- Crop status updates in real-time

## 📞 Support

### If You Need Help:
1. **Check Supabase Documentation**: [https://supabase.com/docs](https://supabase.com/docs)
2. **Review Error Logs**: Check browser console and Supabase logs
3. **Verify Setup**: Ensure all steps were completed correctly
4. **Test Incrementally**: Test each feature one by one

### Useful Commands:
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Check for linting issues
npm run lint

# Preview production build
npm run preview
```

## 🎉 Success Criteria

Your integration is successful when:
- ✅ Users can register and login
- ✅ Crop management works with real data
- ✅ Market prices display correctly
- ✅ Weather data is available
- ✅ Buyer directory is functional
- ✅ Farm analytics show data
- ✅ Real-time updates work
- ✅ App is responsive and fast

---

**🚀 Congratulations! Your Agricultural Support App is now fully integrated with Supabase!** 