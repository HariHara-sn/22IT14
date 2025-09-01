import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import UrlShortener from './components/UrlShortener'
import Analytics from './components/Analytics'
import RedirectHandler from './components/RedirectHandler'
import Navigation from './components/Navigation'

function App() {
  const [urls, setUrls] = useState([])
  const [activeTab, setActiveTab] = useState('shortener')

  useEffect(() => {
    const savedUrls = localStorage.getItem('shortenedUrls')
    if (savedUrls) {
      setUrls(JSON.parse(savedUrls))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('shortenedUrls', JSON.stringify(urls))
  }, [urls])

  const addUrl = (newUrl) => {
    setUrls(prev => [newUrl, ...prev])
  }

  const updateUrlClicks = (shortCode) => {
    setUrls(prev => prev.map(url => 
      url.shortCode === shortCode 
        ? { ...url, clicks: url.clicks + 1, lastAccessed: new Date().toISOString() }
        : url
    ))
  }

  const isShortCodeUnique = (shortCode) => {
    return !urls.some(url => url.shortCode === shortCode)
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div>
                {activeTab === 'shortener' && (
                  <UrlShortener 
                    addUrl={addUrl} 
                    isShortCodeUnique={isShortCodeUnique}
                  />
                )}
                {activeTab === 'analytics' && (
                  <Analytics urls={urls} />
                )}
              </div>
            } />
            <Route path="/:shortCode" element={
              <RedirectHandler 
                urls={urls} 
                updateUrlClicks={updateUrlClicks}
              />
            } />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
