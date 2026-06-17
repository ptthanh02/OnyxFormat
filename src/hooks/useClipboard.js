import { useState, useCallback, useRef } from 'react'

export function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)

  const copy = useCallback(async (text) => {
    if (!text) return false
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), timeout)
      return true
    } catch {
      return false
    }
  }, [timeout])

  return { copy, copied }
}
