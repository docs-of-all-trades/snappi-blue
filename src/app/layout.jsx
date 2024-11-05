import ClientOnly from './ClientOnly'
import CookiePolicyDialog from './CookiePolicyDialog'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ClientOnly>
          <CookiePolicyDialog />
        </ClientOnly>
      </body>
    </html>
  )
}


'use client'

import { useState, useEffect } from 'react'

export default function TestComponent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <div>Test Component Mounted</div>
}