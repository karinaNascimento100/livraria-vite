import React from 'react'

const base = 'button'
const variants = {
  primary: 'button',
  outline: 'button alt',
  link: 'button small',
}
const sizes = {
  sm: 'small',
  md: '',
  lg: 'large',
}

export default function Button({
  as: Comp = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const variantClass = variants[variant] ?? variants.primary
  const sizeClass = sizes[size] ?? ''
  const classes = [base, variantClass, sizeClass, className].filter(Boolean).join(' ')

  return (
    <Comp className={classes} {...props}>
      {children}
    </Comp>
  )
}
