import { MDXProvider } from '@mdx-js/react'
import { useMemo } from 'react'

export function CustomMDXProvider({ children }) {
  const value = useMemo(() => ({
    NEXT_SNAPPI_DOCS_PUBLIC_API_URL: process.env.NEXT_PUBLIC_SNAPPI_DOCS_PUBLIC_API_URL,
  }), [])

  const components = {
    wrapper: ({ children }) => <div>{children}</div>,
  }

  return (
    <MDXProvider components={components}>
      {typeof children === 'function' ? children(value) : children}
    </MDXProvider>
  )
}