'use client'

import { useState, useCallback, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

export interface UseQRCodeReturn {
  qrData: string | null
  isGenerating: boolean
  error: string | null
  generate: (text: string, size: number) => void
  clear: () => void
}

const DEBOUNCE_MS = 300
const MAX_CHARS = 2000

export function useQRCode(): UseQRCodeReturn {
  const [qrData, setQrData] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const clear = useCallback(() => {
    setQrData(null)
    setError(null)
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
  }, [])

  const generate = useCallback((text: string, size: number) => {
    // Clear existing debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // Handle empty input
    if (!text.trim()) {
      setQrData(null)
      setError(null)
      return
    }

    // Validate input length
    if (text.length > MAX_CHARS) {
      setError(`Input exceeds ${MAX_CHARS} characters. QR codes may not scan reliably.`)
      // Still generate, but with warning
    } else {
      setError(null)
    }

    // Set generating state immediately for feedback
    setIsGenerating(true)

    // Debounce QR generation
    debounceRef.current = setTimeout(() => {
      try {
        setQrData(text)
        setIsGenerating(false)
      } catch (err) {
        setError('Failed to generate QR code. Please try a shorter input.')
        setIsGenerating(false)
      }
    }, DEBOUNCE_MS)
  }, [])

  return {
    qrData,
    isGenerating,
    error,
    generate,
    clear,
  }
}
