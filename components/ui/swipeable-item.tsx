'use client'

import React, { useRef, useState, useEffect } from 'react'

export interface SwipeableItemProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  leftAction?: {
    label: string
    icon?: string
    color: string // e.g., 'bg-red-500'
  }
  rightAction?: {
    label: string
    icon?: string
    color: string // e.g., 'bg-green-500'
  }
  threshold?: number // Swipe distance threshold in pixels
  className?: string
}

export function SwipeableItem({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftAction,
  rightAction,
  threshold = 80,
  className = '',
}: SwipeableItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchCurrent, setTouchCurrent] = useState<number | null>(null)
  const [isSwiping, setIsSwiping] = useState(false)
  const [swipeDistance, setSwipeDistance] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
    setIsSwiping(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return

    const currentTouch = e.touches[0].clientX
    const distance = currentTouch - touchStart

    // Only allow swipe in enabled directions
    if (distance < 0 && onSwipeLeft) {
      // Swiping left (negative distance)
      setSwipeDistance(Math.max(distance, -threshold * 1.5)) // Max 1.5x threshold
    } else if (distance > 0 && onSwipeRight) {
      // Swiping right (positive distance)
      setSwipeDistance(Math.min(distance, threshold * 1.5))
    }

    setTouchCurrent(currentTouch)
  }

  const handleTouchEnd = () => {
    if (touchStart === null || touchCurrent === null) {
      resetSwipe()
      return
    }

    const distance = touchCurrent - touchStart

    // Check if swipe threshold was exceeded
    if (distance < -threshold && onSwipeLeft) {
      // Swiped left past threshold
      onSwipeLeft()
    } else if (distance > threshold && onSwipeRight) {
      // Swiped right past threshold
      onSwipeRight()
    }

    // Reset state
    resetSwipe()
  }

  const resetSwipe = () => {
    setTouchStart(null)
    setTouchCurrent(null)
    setIsSwiping(false)
    setSwipeDistance(0)
  }

  // Calculate action reveal percentage
  const revealPercentage = Math.abs(swipeDistance) / threshold
  const isActionRevealed = revealPercentage >= 1

  // Determine which action is being revealed
  const revealingLeft = swipeDistance < 0
  const revealingRight = swipeDistance > 0

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Actions */}
      {leftAction && (
        <div
          className={`absolute inset-y-0 right-0 flex items-center justify-end px-6 ${leftAction.color} transition-opacity duration-150`}
          style={{
            width: revealingLeft ? `${Math.abs(swipeDistance)}px` : '0px',
            opacity: revealingLeft ? Math.min(revealPercentage, 1) : 0,
          }}
        >
          <div className="flex flex-col items-center text-white">
            {leftAction.icon && <span className="text-2xl mb-1">{leftAction.icon}</span>}
            <span className="text-xs font-semibold">{leftAction.label}</span>
          </div>
        </div>
      )}

      {rightAction && (
        <div
          className={`absolute inset-y-0 left-0 flex items-center justify-start px-6 ${rightAction.color} transition-opacity duration-150`}
          style={{
            width: revealingRight ? `${swipeDistance}px` : '0px',
            opacity: revealingRight ? Math.min(revealPercentage, 1) : 0,
          }}
        >
          <div className="flex flex-col items-center text-white">
            {rightAction.icon && <span className="text-2xl mb-1">{rightAction.icon}</span>}
            <span className="text-xs font-semibold">{rightAction.label}</span>
          </div>
        </div>
      )}

      {/* Swipeable Content */}
      <div
        ref={itemRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(${swipeDistance}px)`,
          transition: isSwiping ? 'none' : 'transform 0.3s ease-out',
        }}
        className="relative bg-white touch-pan-y"
      >
        {children}
      </div>

      {/* Visual indicator when action will trigger */}
      {isActionRevealed && (
        <div className="absolute inset-0 pointer-events-none bg-white/10 animate-pulse" />
      )}
    </div>
  )
}
