import { useState, useEffect, useRef } from 'react'

export function useTimer(initialTime, onTimeUp) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setIsActive(false)
            onTimeUp && onTimeUp()
            return 0
          }
          return time - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isActive, timeRemaining, onTimeUp])

  const start = () => setIsActive(true)
  const pause = () => setIsActive(false)
  const reset = (newTime) => {
    setTimeRemaining(newTime || initialTime)
    setIsActive(false)
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return {
    timeRemaining,
    isActive,
    start,
    pause,
    reset,
    formatTime: () => formatTime(timeRemaining)
  }
}
