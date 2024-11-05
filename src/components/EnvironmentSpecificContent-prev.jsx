// components/EnvironmentSpecificContent.jsx
'use client'

import { useEffect, useState } from 'react'

export function EnvironmentSpecificContent({ environment, children }) {
  const [currentEnvironment, setCurrentEnvironment] = useState('')

  useEffect(() => {
    // Assuming the environment is set in NEXT_PUBLIC_ENVIRONMENT
    setCurrentEnvironment(process.env.NEXT_PUBLIC_ENVIRONMENT || '')
  }, [])

  if (currentEnvironment === environment) {
    return <>{children}</>
  }

  return null
}