'use client'

import React, { useEffect, useRef, useState } from 'react'

export interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  snapPoint?: number // Height as percentage of viewport (0-100)
  showHandle?: boolean
  closeOnBackdropClick?: boolean
  className?: string
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  title,
  snapPoint = 75, // Default to 75% of viewport height
  showHandle = true,
  closeOnBackdropClick = true,
  className = '',
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const [startY, setStartY] = useState<number | null>(null)
  const [currentY, setCurrentY] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
    setIsDragging(true)
  }

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === null) return

    const currentTouch = e.touches[0].clientY
    setCurrentY(currentTouch)

    // Only allow dragging down
    if (currentTouch > startY) {
      const sheet = sheetRef.current
      if (sheet) {
        const delta = currentTouch - startY
        sheet.style.transform = `translateY(${delta}px)`
      }
    }
  }

  // Handle touch end
  const handleTouchEnd = () => {
    if (startY !== null && currentY !== null) {
      const delta = currentY - startY

      // If dragged down more than 100px, close the sheet
      if (delta > 100) {
        onClose()
      } else {
        // Snap back to original position
        const sheet = sheetRef.current
        if (sheet) {
          sheet.style.transform = 'translateY(0)'
        }
      }
    }

    setStartY(null)
    setCurrentY(null)
    setIsDragging(false)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={closeOnBackdropClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={`
          fixed bottom-0 left-0 right-0 z-50
          bg-white rounded-t-2xl shadow-2xl
          transition-transform duration-300 ease-out
          ${isDragging ? '' : 'transform-gpu'}
          ${className}
        `}
        style={{
          maxHeight: `${snapPoint}vh`,
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'bottom-sheet-title' : undefined}
      >
        {/* Handle for dragging */}
        {showHandle && (
          <div
            className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>
        )}

        {/* Header with title */}
        {title && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h2 id="bottom-sheet-title" className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div
          className="overflow-y-auto"
          style={{
            maxHeight: title
              ? `calc(${snapPoint}vh - 60px)` // Account for header
              : `calc(${snapPoint}vh - 30px)`, // Account for handle only
          }}
        >
          {children}
        </div>
      </div>
    </>
  )
}
