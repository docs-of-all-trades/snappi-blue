'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Button } from "@/components/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog"

export default function CookiePolicyDialog() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    console.log('CookiePolicyDialog mounted')
    const cookieAccepted = Cookies.get('cookiePolicyAccepted')
    console.log('Cookie accepted:', cookieAccepted)
    if (!cookieAccepted || process.env.NODE_ENV === 'development') {
      console.log('Setting isOpen to true')
      setIsOpen(true)
    }
  }, [])

  const handleAccept = () => {
    console.log('Accept button clicked')
    Cookies.set('cookiePolicyAccepted', 'true', { expires: 365 })
    setIsOpen(false)
  }

  const labelStyle = { color: 'rgb(255,121,170)' }

  console.log('Rendering CookiePolicyDialog, isOpen:', isOpen)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold" style={labelStyle}>Cookie Policy</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            This website uses cookies to enhance your browsing experience and provide personalized content.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600">
            By using this site, you agree to our use of cookies. We use cookies to improve your experience,
            analyze site traffic, and for marketing purposes. You can manage your cookie preferences at any time.
          </p>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleAccept}
            className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}