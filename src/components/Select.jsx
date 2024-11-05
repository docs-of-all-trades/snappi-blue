import React from 'react'

export function Select({ 
  id,
  name,
  options = [
    { value: 'it', label: 'IT' }
  ],
  value,
  onChange,
  required,
  className = '',
  ...props 
}) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={className}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
