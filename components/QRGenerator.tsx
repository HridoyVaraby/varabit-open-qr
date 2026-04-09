'use client'

import { useEffect, useCallback, useRef } from 'react'
import { QrCode } from 'lucide-react'
import { useQRCode } from '@/hooks/useQRCode'
import { QRControls, QRControlsRef } from '@/components/qr/QRControls'
import QRPreview, { QRPreviewRef } from '@/components/qr/QRPreview'

const DEFAULT_SIZE = 256
const STORAGE_KEY = 'varabit-qr-input'

export default function QRGenerator() {
  const { qrData, isGenerating, error, generate, clear } = useQRCode()
  const inputRef = useRef<QRControlsRef>(null)
  const previewRef = useRef<QRPreviewRef>(null)

  // Load saved input on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      generate(saved, DEFAULT_SIZE)
    }
  }, [])

  // Handle text input changes
  const handleTextChange = useCallback((text: string) => {
    localStorage.setItem(STORAGE_KEY, text)
    generate(text, DEFAULT_SIZE)
  }, [generate])

  // Handle download completion
  const handleDownloadComplete = useCallback(() => {
    // Could add toast notification here
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K: Focus input
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }

      // Cmd/Ctrl + D: Trigger download
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault()
        if (qrData) {
          previewRef.current?.triggerDownload()
        }
      }

      // Escape: Clear input
      if (e.key === 'Escape' && qrData) {
        handleTextChange('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [qrData, handleTextChange])

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black brutalist-border"
      >
        Skip to main content
      </a>

      {/* Status announcement for screen readers */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {isGenerating && 'Generating QR code...'}
        {qrData && !isGenerating && 'QR code ready'}
        {error && error}
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <QrCode className="w-10 h-10" aria-hidden="true" />
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">
              Varabit Open QR
            </h1>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Free. Fast. No tracking.
          </p>
          {/* Keyboard shortcuts hint */}
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-2 hidden md:block">
            <kbd className="px-1 py-0.5 brutalist-border text-xs">Cmd+K</kbd> Focus input &bull;
            <kbd className="px-1 py-0.5 brutalist-border text-xs ml-1">Cmd+D</kbd> Download &bull;
            <kbd className="px-1 py-0.5 brutalist-border text-xs ml-1">Esc</kbd> Clear
          </p>
        </header>

        {/* Main Content - Single Column */}
        <main id="main-content" className="space-y-8">
          {/* Input Section */}
          <section
            className="brutalist-border bg-gray-50 dark:bg-gray-900 p-6"
            aria-labelledby="input-heading"
          >
            <h2 id="input-heading" className="sr-only">QR Code Input</h2>
            <QRControls
              ref={inputRef}
              text={qrData || ''}
              onTextChange={handleTextChange}
              size={DEFAULT_SIZE}
              onSizeChange={() => {}}
              error={error}
            />
          </section>

          {/* Preview Section */}
          <section
            className="brutalist-border bg-gray-50 dark:bg-gray-900 p-6"
            aria-labelledby="preview-heading"
          >
            <h2 id="preview-heading" className="sr-only">QR Code Preview</h2>
            <QRPreview
              ref={previewRef}
              value={qrData || ''}
              size={DEFAULT_SIZE}
              isGenerating={isGenerating}
              onDownloadComplete={handleDownloadComplete}
            />
          </section>
        </main>

        {/* Footer */}
        <footer className="text-center mt-12 text-xs text-gray-500 dark:text-gray-500">
          <p>Open Source &bull; MIT License &bull; Built by Varabit</p>
        </footer>
      </div>
    </div>
  )
}
