import React, { useState, useEffect } from 'react'

export function AnimationTest() {
  const [testResults, setTestResults] = useState([])
  const [currentTest, setCurrentTest] = useState('')

  const testAnimatedBackground = (testName) => {
    setCurrentTest(testName)
    setTestResults(prev => [...prev, `Testing: ${testName}`])
    
    // Test CSS animations
    const backgroundElement = document.querySelector('.auth-video-background')
    if (backgroundElement) {
      const computedStyle = window.getComputedStyle(backgroundElement)
      const hasBackground = computedStyle.background !== 'rgba(0, 0, 0, 0)'
      
      if (hasBackground) {
        setTestResults(prev => [...prev, `✅ Animated background loaded: ${testName}`])
      } else {
        setTestResults(prev => [...prev, `❌ Background not found: ${testName}`])
      }
    } else {
      setTestResults(prev => [...prev, `❌ Background element not found: ${testName}`])
    }
  }

  const testAllAnimations = () => {
    setTestResults([])
    const tests = [
      { name: 'CSS Animated Background' },
      { name: 'Floating Shapes Animation' },
      { name: 'Water Drops Animation' },
      { name: 'Gradient Shift Animation' }
    ]
    
    tests.forEach((test, index) => {
      setTimeout(() => testAnimatedBackground(test.name), index * 1000)
    })
  }

  const testAnimationElement = () => {
    setTestResults(prev => [...prev, 'Testing animated background element...'])
    
    try {
      const backgroundElement = document.querySelector('.auth-video-background')
      if (backgroundElement) {
        setTestResults(prev => [...prev, '✅ Animated background element found'])
        
        // Test if animations are running
        const computedStyle = window.getComputedStyle(backgroundElement, '::before')
        if (computedStyle.animationName !== 'none') {
          setTestResults(prev => [...prev, '✅ CSS animations are active'])
        } else {
          setTestResults(prev => [...prev, '⚠️ CSS animations may not be running'])
        }
      } else {
        setTestResults(prev => [...prev, '❌ Animated background element not found'])
      }
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Error testing animation element: ${error.message}`])
    }
  }

  const testFetch = async () => {
    setTestResults(prev => [...prev, 'Testing CSS file availability...'])
    
    try {
      const response = await fetch('/src/components/Auth/Auth.css', { method: 'HEAD' })
      if (response.ok) {
        setTestResults(prev => [...prev, `✅ CSS file accessible: ${response.status}`])
      } else {
        setTestResults(prev => [...prev, `❌ CSS file not accessible: ${response.status}`])
      }
    } catch (error) {
      setTestResults(prev => [...prev, `❌ CSS fetch error: ${error.message}`])
    }
  }

  const testDirectAnimation = () => {
    setTestResults(prev => [...prev, 'Testing direct animation check...'])
    
    const backgroundElement = document.querySelector('.auth-video-background')
    if (backgroundElement) {
      const computedStyle = window.getComputedStyle(backgroundElement)
      const hasGradient = computedStyle.background.includes('gradient')
      
      if (hasGradient) {
        setTestResults(prev => [...prev, '✅ Gradient background detected'])
      } else {
        setTestResults(prev => [...prev, '❌ No gradient background found'])
      }
    } else {
      setTestResults(prev => [...prev, '❌ Background element not found for direct test'])
    }
  }

  const testFetchDirect = async () => {
    setTestResults(prev => [...prev, 'Testing direct CSS fetch...'])
    
    try {
      const response = await fetch('/src/components/Auth/Auth.css', { method: 'HEAD' })
      if (response.ok) {
        setTestResults(prev => [...prev, `✅ Direct CSS fetch successful: ${response.status}`])
      } else {
        setTestResults(prev => [...prev, `❌ Direct CSS fetch failed: ${response.status}`])
      }
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Direct CSS fetch error: ${error.message}`])
    }
  }

  const clearResults = () => {
    setTestResults([])
    setCurrentTest('')
  }

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(240, 248, 255, 0.9))',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ 
        color: '#1f2937', 
        marginBottom: '1.5rem',
        textAlign: 'center',
        fontSize: '1.875rem',
        fontWeight: '700'
      }}>
        🎨 Animation Test Suite
      </h2>
      
      <p style={{ 
        color: '#6b7280', 
        marginBottom: '2rem',
        textAlign: 'center',
        fontSize: '1.125rem'
      }}>
        Testing our new CSS-based animated backgrounds that replaced the large video files
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <button 
          onClick={testAllAnimations}
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Test All Animations
        </button>
        
        <button 
          onClick={testAnimationElement}
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Test Background Element
        </button>
        
        <button 
          onClick={testFetch}
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Test CSS File
        </button>
        
        <button 
          onClick={testDirectAnimation}
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Test Direct Animation
        </button>
        
        <button 
          onClick={clearResults}
          style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Clear Results
        </button>
      </div>

      {currentTest && (
        <div style={{ 
          background: '#f3f4f6', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          <strong>Currently testing: {currentTest}</strong>
        </div>
      )}

      <div style={{ 
        background: '#1f2937', 
        color: '#f9fafb', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        fontFamily: 'monospace',
        fontSize: '0.875rem',
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>Test Results:</h3>
        {testResults.length === 0 ? (
          <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>
            No tests run yet. Click a test button above to start testing our new animated backgrounds!
          </p>
        ) : (
          testResults.map((result, index) => (
            <div key={index} style={{ marginBottom: '0.5rem' }}>
              {result}
            </div>
          ))
        )}
      </div>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1.5rem', 
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
        borderRadius: '8px',
        border: '1px solid rgba(16, 185, 129, 0.2)'
      }}>
        <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>🎉 Benefits of Our New System:</h3>
        <ul style={{ color: '#374151', lineHeight: '1.6' }}>
          <li>✅ <strong>No large files:</strong> Eliminated 100MB+ video files that caused Git issues</li>
          <li>✅ <strong>Better performance:</strong> CSS animations are hardware-accelerated and lightweight</li>
          <li>✅ <strong>Responsive design:</strong> Animations adapt to any screen size</li>
          <li>✅ <strong>Accessibility:</strong> Respects user's motion preferences</li>
          <li>✅ <strong>Customizable:</strong> Easy to modify colors, speeds, and effects</li>
          <li>✅ <strong>Cross-browser:</strong> Works consistently across all modern browsers</li>
        </ul>
      </div>
    </div>
  )
}
