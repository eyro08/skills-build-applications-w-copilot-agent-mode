import { useEffect, useState } from 'react'

function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  return []
}

export function useCollection(endpoint) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      setStatus('loading')
      setError('')

      try {
        const response = await fetch(endpoint, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setItems(normalizeCollection(payload))
        setStatus('ready')
      } catch (loadError) {
        if (loadError.name === 'AbortError') {
          return
        }

        setItems([])
        setError(loadError.message || 'Unable to load data')
        setStatus('error')
      }
    }

    loadItems()

    return () => controller.abort()
  }, [endpoint])

  return { error, items, status }
}