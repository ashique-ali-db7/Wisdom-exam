import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'btn'

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary', 
    success: 'btn-success',
    outline: 'btn-outline'
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'btn-lg'
  }

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  ].filter(Boolean).join(' ')

  return (
    <button 
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="loading-spinner mr-2"></div>
      )}
      {children}
    </button>
  )
}

export default Button
