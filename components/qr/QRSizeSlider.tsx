'use client'

import { cn } from '@/lib/utils'

interface QRSizeSliderProps {
  size: number
  onChange: (size: number) => void
  className?: string
}

const SIZES = [128, 256, 384, 512] as const
const MIN_SIZE = 128
const MAX_SIZE = 512

export function QRSizeSlider({ size, onChange, className }: QRSizeSliderProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold uppercase tracking-wide">
          Size: {size}px
        </label>
      </div>

      {/* Preset buttons */}
      <div className="grid grid-cols-4 gap-2">
        {SIZES.map((presetSize) => (
          <button
            key={presetSize}
            onClick={() => onChange(presetSize)}
            className={cn(
              'brutalist-btn py-2 px-3 text-xs font-semibold transition-all',
              size === presetSize
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-white text-black dark:bg-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900'
            )}
            aria-label={`Set size to ${presetSize}px`}
            aria-pressed={size === presetSize}
          >
            {presetSize}
          </button>
        ))}
      </div>

      {/* Range slider */}
      <div className="relative">
        <input
          type="range"
          min={MIN_SIZE}
          max={MAX_SIZE}
          step={32}
          value={size}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-800 appearance-none cursor-pointer accent-black dark:accent-white"
          aria-label={`QR code size: ${size} pixels`}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{MIN_SIZE}px</span>
          <span>{MAX_SIZE}px</span>
        </div>
      </div>
    </div>
  )
}
