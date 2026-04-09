'use client'

import { memo, useRef, useCallback, useState, forwardRef, useImperativeHandle } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Download, QrCode } from 'lucide-react'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/utils'

export interface QRPreviewProps {
  value: string
  size: number
  isGenerating: boolean
  className?: string
  onDownloadComplete?: () => void
}

export interface QRPreviewRef {
  triggerDownload: () => void
}

const QRPreview = forwardRef<QRPreviewRef, QRPreviewProps>(
  ({ value, size, isGenerating, className, onDownloadComplete }, ref) => {
    const qrRef = useRef<HTMLDivElement>(null)
    const [downloadStatus, setDownloadStatus] = useState<'idle' | 'success'>('idle')

    const downloadQRCode = useCallback(() => {
      const svgElement = qrRef.current?.querySelector('svg')
      if (!svgElement) return

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

        // Show success feedback
        setDownloadStatus('success')
        onDownloadComplete?.()
        setTimeout(() => setDownloadStatus('idle'), 2000)
      }

      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
    }, [size, onDownloadComplete])

    useImperativeHandle(ref, () => ({
      triggerDownload: downloadQRCode,
    }))

    return (
      <div className={cn('space-y-4', className)}>
        <h3 className="text-sm font-semibold uppercase tracking-wide">
          QR Code Preview
        </h3>

        {/* QR Display */}
        <div className="brutalist-border bg-white dark:bg-black p-8 min-h-[300px] flex items-center justify-center">
          {isGenerating ? (
            <Skeleton className="w-[200px] h-[200px]" />
          ) : value ? (
            <div ref={qrRef} className="bg-white dark:bg-black">
              <QRCodeSVG
                value={value}
                size={Math.min(size, 280)}
                fgColor="currentColor"
                bgColor="transparent"
                level="H"
                includeMargin={true}
                className="text-black dark:text-white"
              />
            </div>
          ) : (
            <div className="text-center text-gray-400 dark:text-gray-600">
              <QrCode className="w-24 h-24 mx-auto mb-4 opacity-30" aria-hidden="true" />
              <p className="text-sm">Enter text to generate QR code</p>
            </div>
          )}
        </div>

        {/* Download Button */}
        {value && (
          <button
            onClick={downloadQRCode}
            disabled={isGenerating}
            className={cn(
              'brutalist-btn w-full py-3 px-6 font-semibold uppercase tracking-wide',
              'flex items-center justify-center gap-2',
              'bg-black text-white dark:bg-white dark:text-black',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white'
            )}
            aria-label="Download QR code as PNG"
          >
            {downloadStatus === 'success' ? (
              <>✓ Downloaded!</>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download PNG
              </>
            )}
          </button>
        )}
      </div>
    )
  }
)

QRPreview.displayName = 'QRPreview'

export default memo(QRPreview)
