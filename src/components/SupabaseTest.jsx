import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function SupabaseTest() {
  const [testResult, setTestResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const testConnection = async () => {
    setIsLoading(true)
    setTestResult('Testing connection...')
    
    try {
      // Test basic connection
      const { data, error } = await supabase.from('crops').select('count').limit(1)
      
      if (error) {
        if (error.code === 'PGRST116') {
          setTestResult('✅ Connection successful! Table "crops" not found (this is expected for new projects)')
        } else {
          setTestResult(`❌ Database error: ${error.message}`)
        }
      } else {
        setTestResult('✅ Connection successful! Database is working.')
      }
    } catch (error) {
      setTestResult(`❌ Connection failed: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testAuth = async () => {
    setIsLoading(true)
    setTestResult('Testing authentication...')
    
    try {
      const { data, error } = await supabase.auth.getSession()
      
      if (error) {
        setTestResult(`❌ Auth error: ${error.message}`)
      } else {
        setTestResult('✅ Authentication service is working!')
      }
    } catch (error) {
      setTestResult(`❌ Auth failed: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const showConfig = () => {
    const url = import.meta.env.VITE_SUPABASE_URL
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY
    
    if (!url || !key) {
      setTestResult('❌ Environment variables missing! Check your .env.local file')
      return
    }
    
    if (key === 'your_actual_anon_key_here') {
      setTestResult('❌ You still have the placeholder anon key! Replace it with your actual key.')
      return
    }
    
    setTestResult(`✅ Config found:
URL: ${url}
Key: ${key.substring(0, 20)}...`)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Supabase Connection Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={showConfig}
          style={{ marginRight: '10px', padding: '10px' }}
        >
          Show Config
        </button>
        <button 
          onClick={testConnection}
          style={{ marginRight: '10px', padding: '10px' }}
          disabled={isLoading}
        >
          Test Connection
        </button>
        <button 
          onClick={testAuth}
          style={{ padding: '10px' }}
          disabled={isLoading}
        >
          Test Auth
        </button>
      </div>
      
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace'
      }}>
        {testResult || 'Click a button to test your Supabase connection'}
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <h3>Common Issues:</h3>
        <ul>
          <li><strong>ERR_NAME_NOT_RESOLVED:</strong> Check your Supabase URL in .env.local</li>
          <li><strong>Missing environment variables:</strong> Create .env.local file</li>
          <li><strong>Invalid anon key:</strong> Replace placeholder with actual key</li>
          <li><strong>Project doesn't exist:</strong> Create new Supabase project</li>
        </ul>
      </div>
    </div>
  )
}
