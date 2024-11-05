
import React from 'react'

export default function CircleNumber({ number, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: '#ff79aa',
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        {number}
      </div>
      <span style={{ fontSize: '16px', fontWeight: '600' }}>
        {text}
      </span>
    </div>
  )
}
