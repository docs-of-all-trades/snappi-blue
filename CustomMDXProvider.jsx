import { MDXProvider } from '@mdx-js/react'
import { useMemo } from 'react'

export function CustomMDXProvider({ children }) {
  const value = useMemo(() => ({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  }), [])

  return (
    <MDXProvider components={{
      wrapper: ({ children }) => children(value),
    }}>
      {children}
    </MDXProvider>
  )
}