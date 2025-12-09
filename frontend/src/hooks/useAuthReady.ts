"use client"

import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"

export function useAuthReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const auth = getAuth()
    const unsub = onAuthStateChanged(auth, () => {
      setReady(true)
      unsub()
    })
  }, [])

  return ready
}
