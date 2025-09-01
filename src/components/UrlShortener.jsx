import React, { useState } from 'react'

const UrlShortener = ({ addUrl, isShortCodeUnique }) => {
  const [longUrl, setLongUrl] = useState('')
  const [customShortCode, setCustomShortCode] = useState('')
  const [validityMinutes, setValidityMinutes] = useState(30)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const generateShortCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const isValidShortCode = (code) => {
    if (!code) return true 
    const regex = /^[a-zA-Z0-9]{3,20}$/
    return regex.test(code)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!longUrl.trim()) {
      setError('Please enter a URL')
      return
    }

    if (!isValidUrl(longUrl)) {
      setError('Please enter a valid URL (include http:// or https://)')
      return
    }

    if (!isValidShortCode(customShortCode)) {
      setError('Custom shortcode must be 3-20 characters long and contain only letters and numbers')
      return
    }

    setIsLoading(true)

    try {
      let finalShortCode = customShortCode.trim()
      
      if (finalShortCode) {
        if (!isShortCodeUnique(finalShortCode)) {
          setError('This custom shortcode is already taken. Please choose another one.')
          setIsLoading(false)
          return
        }
      } else {
        do {
          finalShortCode = generateShortCode()
        } while (!isShortCodeUnique(finalShortCode))
      }

      const expiryTime = new Date()
      expiryTime.setMinutes(expiryTime.getMinutes() + validityMinutes)

      const newUrl = {
        id: Date.now(),
        longUrl: longUrl.trim(),
        shortCode: finalShortCode,
        shortUrl: `${window.location.origin}/${finalShortCode}`,
        createdAt: new Date().toISOString(),
        expiresAt: expiryTime.toISOString(),
        validityMinutes: validityMinutes,
        clicks: 0,
        lastAccessed: null
      }

      addUrl(newUrl)
      setSuccess(`URL shortened successfully! Short URL: ${newUrl.shortUrl}`)
      
      setLongUrl('')
      setCustomShortCode('')
      setValidityMinutes(30)
      
    } catch (err) {
      setError('An error occurred while shortening the URL')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Shorten Your URL
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="longUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Long URL *
            </label>
            <input
              type="url"
              id="longUrl"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com/very-long-url-here"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="customShortCode" className="block text-sm font-medium text-gray-700 mb-2">
              Custom Shortcode (Optional)
            </label>
            <input
              type="text"
              id="customShortCode"
              value={customShortCode}
              onChange={(e) => setCustomShortCode(e.target.value)}
              placeholder="my-custom-link"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              3-20 characters, letters and numbers only. Leave empty for auto-generation.
            </p>
          </div>

          <div>
            <label htmlFor="validityMinutes" className="block text-sm font-medium text-gray-700 mb-2">
              Validity Period (minutes) *
            </label>
            <input
              type="number"
              id="validityMinutes"
              value={validityMinutes}
              onChange={(e) => setValidityMinutes(Math.max(1, parseInt(e.target.value) || 30))}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Default: 30 minutes. Minimum: 1 minute.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md font-medium text-white transition-colors ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        
      </div>
    </div>
  )
}

export default UrlShortener
