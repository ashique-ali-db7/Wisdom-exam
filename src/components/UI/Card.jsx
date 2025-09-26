import React from 'react'

const Card = ({ 
  children, 
  className = '', 
  childFriendly = false, 
  ...props 
}) => {
  const baseClasses = childFriendly ? 'card child-friendly' : 'card'
  const classes = `${baseClasses} ${className}`.trim()

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card
