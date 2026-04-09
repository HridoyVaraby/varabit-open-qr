'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { QRSizeSlider } from './QRSizeSlider'

export interface QRControlsProps {
  text: string
  onTextChange: (text: string) => void
  size: number
  onSizeChange: (size: number) => void
  error?: string | null
  className?: string
}

export interface QRControlsRef {
  focus: () => void
}

const MAX_CHARS = 2000
const WARNING_THRESHOLD = 1800

export const QRControls = forwardRef<QRControlsRef, QRControlsProps>(
  ({ text, onTextChange, size, onSizeChange, error, className }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useImperativeHandle(ref, () => ({
      focus: () => textareaRef.current?.focus(),
    }))

    const charCount = text.length
    const isNearLimit = charCount > WARNING_THRESHOLD
    const isOverLimit = charCount > MAX_CHARS

    return (
      <div className={cn('space-y-6', className)}>
        {/* Text Input */}
        <div className="space-y-2">
          <label
            htmlFor="qr-input"
            className="block text-sm font-semibold uppercase tracking-wide"
          >
            Enter Text or URL
          </label>
          <div className="relative">
            <textarea
              ref={textareaRef}
              id="qr-input"
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Enter text, URL, or any content to generate QR code..."
              className={cn(
                'brutalist-input w-full h-32 p-4 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 resize-none',
                'focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white'
              )}
              aria-describedby="char-counter"
            />
            {text && (
              <button
                onClick={() => onTextChange('')}
                className="absolute top-3 right-3 p-1 text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Character counter */}
          <div className="flex justify-between items-center">
            <span id="char-counter" className="text-xs">
              {charCount} / {MAX_CHARS} characters
            </span>
            {isNearLimit && !isOverLimit && (
              <span
                className="text-xs font-semibold text-amber-600 dark:text-amber-400"
                role="alert"
              >
                Approaching limit
              </span>
            )}
            {isOverLimit && (
              <span
                className="text-xs font-semibold text-red-600 dark:text-red-400"
                role="alert"
              >
                Too long!
              </span>
            )}
          </div>
        </div>

        {/* Size Slider */}
        <QRSizeSlider size={size} onChange={onSizeChange} />

        {/* Error message */}
        {error && (
          <p
            className="text-sm font-semibold text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

QRControls.displayName = 'QRControls'
