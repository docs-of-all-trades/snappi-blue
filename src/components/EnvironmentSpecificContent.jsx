'use client'

import { useEffect, useState } from 'react'

export function EnvironmentSpecificContent({ environment, children }) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const currentEnv = process.env.NEXT_PUBLIC_ENVIRONMENT || ''
    const environments = Array.isArray(environment) ? environment : [environment]
    setShouldRender(environments.includes(currentEnv))
  }, [environment])

  if (!shouldRender) {
    return null
  }

  return <>{children}</>
}