import React, { useState, useEffect } from 'react'

export function VideoTest() {
  const [videoSrc, setVideoSrc] = useState('/background-vidz/5.mp4')
  const [testResults, setTestResults] = useState([])
  const [currentTest, setCurrentTest] = useState('')

  const testVideo = (src, testName) => {
    setCurrentTest(testName)
    setTestResults(prev => [...prev, `Testing: ${testName} - ${src}`])
    
    const video = document.createElement('video')
    video.src = src
    video.load()
    
    video.onloadstart = () => {
      setTestResults(prev => [...prev, `✅ Load started: ${testName}`])
    }
    
    video.oncanplay = () => {
      setTestResults(prev => [...prev, `✅ Can play: ${testName}`])
    }
    
    video.onerror = (e) => {
      setTestResults(prev => [...prev, `❌ Error: ${testName} - ${e.message || 'Unknown error'}`])
      console.error(`Video test error for ${testName}:`, e)
    }
    
    // Test after a delay
    setTimeout(() => {
      if (video.readyState === 0) {
        setTestResults(prev => [...prev, `❌ Failed to load: ${testName}`])
      }
    }, 3000)
  }

  const testAllPaths = () => {
    setTestResults([])
    const tests = [
      { path: '/background-vidz/5.mp4', name: 'Public folder path' },
      { path: './background-vidz/5.mp4', name: 'Relative path' },
      { path: '../public/background-vidz/5.mp4', name: 'Public relative path' },
      { path: 'background-vidz/5.mp4', name: 'No slash path' },
      { path: `${window.location.origin}/background-vidz/5.mp4`, name: 'Full URL path' }
    ]
    
    tests.forEach((test, index) => {
      setTimeout(() => testVideo(test.path, test.name), index * 1000)
    })
  }

  const testVideoElement = () => {
    setTestResults(prev => [...prev, 'Testing video element creation...'])
    
    try {
      const video = document.createElement('video')
      video.src = '/background-vidz/5.mp4'
      video.load()
      
      video.onloadstart = () => {
        setTestResults(prev => [...prev, '✅ Video element created and loading started'])
      }
      
      video.oncanplay = () => {
        setTestResults(prev => [...prev, '✅ Video element can play'])
      }
      
      video.onerror = (e) => {
        setTestResults(prev => [...prev, `❌ Video element error: ${e.message || 'Unknown error'}`])
      }
      
      // Add to DOM temporarily
      video.style.position = 'absolute'
      video.style.left = '-9999px'
      document.body.appendChild(video)
      
      setTimeout(() => {
        document.body.removeChild(video)
      }, 5000)
      
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Video element creation failed: ${error.message}`])
    }
  }

  const testFetch = async () => {
    setTestResults(prev => [...prev, 'Testing fetch request...'])
    
    try {
      const response = await fetch('/background-vidz/5.mp4', { method: 'HEAD' })
      setTestResults(prev => [...prev, `✅ Fetch response: ${response.status} ${response.statusText}`])
      
      if (response.ok) {
        const contentLength = response.headers.get('content-length')
        const contentType = response.headers.get('content-type')
        setTestResults(prev => [...prev, `✅ Content-Length: ${contentLength}, Content-Type: ${contentType}`])
      }
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Fetch failed: ${error.message}`])
    }
  }

  const clearResults = () => {
    setTestResults([])
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Video Loading Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={testAllPaths} style={{ padding: '10px', marginRight: '10px' }}>
          Test All Video Paths
        </button>
        
        <button onClick={testVideoElement} style={{ padding: '10px', marginRight: '10px' }}>
          Test Video Element
        </button>
        
        <button onClick={testFetch} style={{ padding: '10px', marginRight: '10px' }}>
          Test Fetch Request
        </button>
        
        <button onClick={clearResults} style={{ padding: '10px', marginRight: '10px' }}>
          Clear Results
        </button>
        
        <input 
          value={videoSrc} 
          onChange={(e) => setVideoSrc(e.target.value)}
          placeholder="Enter video path to test"
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        
        <button onClick={() => testVideo(videoSrc, 'Custom Path')} style={{ padding: '10px' }}>
          Test Current Path
        </button>
      </div>
      
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '5px',
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        <h3>Test Results:</h3>
        {testResults.length === 0 ? (
          <p>Click "Test All Video Paths" to start testing</p>
        ) : (
          testResults.map((result, index) => (
            <div key={index} style={{ marginBottom: '5px', fontFamily: 'monospace' }}>
              {result}
            </div>
          ))
        )}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Direct Video Test:</h3>
        <video 
          controls 
          width="100%" 
          style={{ maxWidth: '600px' }}
          onError={(e) => console.log('Direct video error:', e)}
          onLoadStart={() => console.log('Direct video loading started')}
          onCanPlay={() => console.log('Direct video can play')}
        >
          <source src="/background-vidz/5.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '5px' }}>
        <h3>Current Status:</h3>
        <p><strong>Current Test:</strong> {currentTest || 'None'}</p>
        <p><strong>Total Tests:</strong> {testResults.length}</p>
        <p><strong>Success Count:</strong> {testResults.filter(r => r.includes('✅')).length}</p>
        <p><strong>Error Count:</strong> {testResults.filter(r => r.includes('❌')).length}</p>
      </div>
    </div>
  )
}
