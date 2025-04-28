import { useEffect, useRef, useSyncExternalStore } from 'react'

export type Effect = (...args: Array<any>) => void

export const useDebounce = <T extends Effect>(callback: T, delay: number):
  ((...args: Parameters<T>) => void) => {
  const timerRef = useRef<number | null>(null)

  const handler = (...args: Parameters<T>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return handler
}

export const useThrottle = <T extends Effect>(callback: T, delay: number):
  ((...args: Parameters<T>) => void) => {
  const latest = useRef(Date.now())
  const handler = (...args: Parameters<T>) => {
    if (Date.now() - latest.current >= delay) {
      callback(...args)
      latest.current = Date.now()
    }
  }
  return handler
}

const getSnapshot = () => navigator.onLine ? '在线' : '离线'

const subscribe = (notify: () => void) => {
  window.addEventListener('online', notify)
  window.addEventListener('offline', notify)
  return () => {
    window.removeEventListener('online', notify)
    window.removeEventListener('offline', notify)
  }
}

export const useNetworkState = () => {
  return useSyncExternalStore(subscribe, getSnapshot)
}
