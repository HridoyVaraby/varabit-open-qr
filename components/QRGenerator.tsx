'use client'

import { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Download, QrCode, Type, Palette, Maximize2, X } from 'lucide-react'

export default function QRGenerator() {
  const [text, setText] = useState('')
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [size, setSize] = useState(256)
  const qrRef = useRef<HTMLDivElement>(null)

  const downloadQRCode = () => {
    const svgElement = qrRef.current?.querySelector('svg')
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        canvas.width = size
        canvas.height = size
        ctx?.drawImage(img, 0, 0)
        const pngUrl = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.download = `qrcode-${Date.now()}.png`
        link.href = pngUrl
        link.click()
      }

      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
    }
  }

  const clearText = () => {
    setText('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <QrCode className="w-12 h-12 text-purple-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Varabit Open QR
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Free, fast, and privacy-focused QR code generator
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            {/* Text Input */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-5 h-5 text-purple-600" />
                <label className="font-semibold text-gray-700 dark:text-gray-200">
                  Enter Text or URL
                </label>
              </div>
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text, URL, or any content to generate QR code..."
                  className="w-full h-32 px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 outline-none resize-none bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400"
                />
                {text && (
                  <button
                    onClick={clearText}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Color Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-purple-600" />
                <label className="font-semibold text-gray-700 dark:text-gray-200">
                  Customize Colors
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Foreground Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                      {fgColor}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                      {bgColor}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Size Control */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Maximize2 className="w-5 h-5 text-purple-600" />
                <label className="font-semibold text-gray-700 dark:text-gray-200">
                  QR Code Size: {size}px
                </label>
              </div>
              <input
                type="range"
                min="128"
                max="512"
                step="32"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>128px</span>
                <span>512px</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">
                QR Code Preview
              </h3>
              <div className="flex flex-col items-center justify-center min-h-[350px] bg-gray-50 dark:bg-gray-700 rounded-xl p-8">
                {text ? (
                  <div ref={qrRef} className="p-4 bg-white rounded-lg shadow-lg">
                    <QRCodeSVG
                      value={text}
                      size={size}
                      fgColor={fgColor}
                      bgColor={bgColor}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                ) : (
                  <div className="text-center text-gray-400 dark:text-gray-500">
                    <QrCode className="w-24 h-24 mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Enter text to generate QR code</p>
                  </div>
                )}
              </div>

              {text && (
                <button
                  onClick={downloadQRCode}
                  className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Download QR Code
                </button>
              )}
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Features
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Instant QR code generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Customizable colors and size</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Download as high-quality PNG</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>No tracking, completely free</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Works offline after loading</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
          <p>Built with ❤️ by Varabit - Open Source & Free Forever</p>
        </div>
      </div>
    </div>
  )
}
