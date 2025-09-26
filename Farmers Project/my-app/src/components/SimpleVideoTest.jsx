import React, { useState, useEffect } from 'react'

export function SimpleVideoTest() {
  const [videoStatus, setVideoStatus] = useState('Loading...')
  const [videoError, setVideoError] = useState(null)

  useEffect(() => {
    // Test video 5.mp4 (smallest file)
    const video = document.createElement('video')
    video.src = '/background-vidz/5.mp4'
    video.muted = true
    video.autoplay = false
    video.controls = true
    
    video.onloadstart = () => {
      setVideoStatus('Video loading started...')
    }
    
    video.oncanplay = () => {
      setVideoStatus('Video can play! ✅')
    }
    
    video.onerror = (e) => {
      const error = e.target.error
      let errorMessage = 'Unknown error'
      
      if (error) {
        switch (error.code) {
          case 1:
            errorMessage = 'MEDIA_ERR_ABORTED - Video loading aborted'
            break
          case 2:
            errorMessage = 'MEDIA_ERR_NETWORK - Network error'
            break
          case 3:
            errorMessage = 'MEDIA_ERR_DECODE - Video decoding error'
            break
          case 4:
            errorMessage = 'MEDIA_ERR_SRC_NOT_SUPPORTED - Video format not supported'
            break
          default:
            errorMessage = `Error code: ${error.code}`
        }
      }
      
      setVideoStatus(`Video error: ${errorMessage} ❌`)
      setVideoError(errorMessage)
    }
    
    // Load the video
    video.load()
    
    // Cleanup
    return () => {
      video.remove()
    }
  }, [])

  const testDirectAccess = async () => {
    try {
      const response = await fetch('/background-vidz/5.mp4', { method: 'HEAD' })
      if (response.ok) {
        const size = response.headers.get('content-length')
        const type = response.headers.get('content-type')
        setVideoStatus(`File accessible! Size: ${size} bytes, Type: ${type} ✅`)
      } else {
        setVideoStatus(`File not accessible: ${response.status} ${response.statusText} ❌`)
      }
    } catch (error) {
      setVideoStatus(`Fetch error: ${error.message} ❌`)
    }
  }

  const testVideoElement = () => {
    const video = document.createElement('video')
    video.src = '/background-vidz/5.mp4'
    video.muted = true
    video.controls = true
    video.style.width = '300px'
    video.style.height = '200px'
    video.style.border = '2px solid red'
    
    // Add to page
    const container = document.getElementById('video-container')
    if (container) {
      container.innerHTML = ''
      container.appendChild(video)
    }
    
    video.load()
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Simple Video Test</h2>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Status: {videoStatus}</h3>
        {videoError && <p style={{ color: 'red' }}>Error: {videoError}</p>}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={testDirectAccess} style={{ padding: '10px', marginRight: '10px' }}>
          Test File Access
        </button>
        
        <button onClick={testVideoElement} style={{ padding: '10px' }}>
          Test Video Element
        </button>
      </div>
      
      <div id="video-container" style={{ marginTop: '20px' }}>
        {/* Video will be inserted here */}
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '5px' }}>
        <h3>Debug Info:</h3>
        <p><strong>Current URL:</strong> {window.location.href}</p>
        <p><strong>Video Path:</strong> /background-vidz/5.mp4</p>
        <p><strong>Full Video URL:</strong> {window.location.origin}/background-vidz/5.mp4</p>
        <p><strong>User Agent:</strong> {navigator.userAgent}</p>
      </div>
    </div>
  )
}
