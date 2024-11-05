import CookiePolicyDialog from '@/components/CookiePolicyDialog'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookiePolicyDialog />
      </body>
    </html>
  )
}