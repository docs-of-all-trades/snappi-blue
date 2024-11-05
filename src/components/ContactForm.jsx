import React, { useState, useRef } from 'react'
import { Button } from './Button'
import { Input } from './Input'
import { Label } from './Label'
import Select from './Select'
import { Textarea } from './Textarea'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    category: 'it',
    message: '',
  })
  const [status, setStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isHuman, setIsHuman] = useState(false)
  const sliderRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSliderChange = (e) => {
    if (e.target.value === '100') {
      setIsHuman(true)
    } else {
      setIsHuman(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!isHuman) {
      setErrorMessage('Please verify that you are human by sliding the bar to the right.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/create-jira-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          category: 'it',
          message: '',
        })
        setIsHuman(false)
        if (sliderRef.current) sliderRef.current.value = 0
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'An error occurred. Please try again later.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
      setErrorMessage('An error occurred. Please try again later.')
    }
  }

  const labelStyle = { color: 'rgb(255,121,170)' }

  return (
    <div className="flex w-full justify-start">
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="block text-sm font-medium leading-6" style={labelStyle}>
                First name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="block text-sm font-medium leading-6" style={labelStyle}>
                Last name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="block text-sm font-medium leading-6" style={labelStyle}>
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category" className="block text-sm font-medium leading-6" style={labelStyle}>
              Issuing a request
            </Label>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={(e) => handleChange({ target: { name: 'category', value: e.target.value } })}
              required
            >
              <option value="it">IT</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="block text-sm font-medium leading-6" style={labelStyle}>
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              required
              className="block min-h-[100px] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="human-verify" className="block text-sm font-medium leading-6" style={labelStyle}>
              Verify you are human
            </Label>
            <div className="flex flex-col space-y-2">
              <div className="relative w-full">
                <input
                  ref={sliderRef}
                  type="range"
                  id="human-verify"
                  name="human-verify"
                  min="0"
                  max="100"
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="absolute left-0 top-4 text-xs text-gray-500">Slide right to verify</span>
              </div>
              <span className={`text-sm ${isHuman ? 'text-green-600' : 'text-gray-500'}`}>
                {isHuman ? 'Verified' : ''}
              </span>
            </div>
          </div>
          <Button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit'}
          </Button>
          {status === 'success' && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="mr-2" />
              <span>Your request has been submitted successfully!</span>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center text-red-600">
              <AlertCircle className="mr-2" />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}