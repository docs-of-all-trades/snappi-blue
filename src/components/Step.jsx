import React from 'react'
import Image from 'next/image'

export const Step = ({ number, title, children }) => {
  return (
    <div className="flex items-start space-x-4 mb-8">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
        {number}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2 -mt-1">{title}</h3>
        <div className="prose prose-sm">{children}</div>
      </div>
    </div>
  )
}

export const Steps = ({ children }) => {
  return <div className="space-y-8">{children}</div>
}

export const StepImage = ({ src, alt, width, height }) => {
  return (
    <div className="mt-4 rounded-lg overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
      />
    </div>
  )
}

export default function Component() {
  return (
    <Steps>
      <Step number={1} title="Enter the snappiDev portal">
        Use your preferred browser and navigate to https://developers.snappibank.dev/.
        <StepImage src="/placeholder.svg?height=200&width=400" alt="SnappiDev portal" width={400} height={200} />
      </Step>
      
      <Step number={2} title="Create an account">
        Click on the 'Sign Up' button and fill in the required information to create your account.
        <StepImage src="/placeholder.svg?height=200&width=400" alt="Sign Up page" width={400} height={200} />
      </Step>
      
      <Step number={3} title="Verify your email">
        Check your email inbox for a verification link. Click on it to verify your account.
        <StepImage src="/placeholder.svg?height=200&width=400" alt="Email verification" width={400} height={200} />
      </Step>
    </Steps>
  )
}