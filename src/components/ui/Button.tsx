import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface ButtonProps {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fullWidth?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

const Button = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  disabled = false,
  type = 'button',
  ariaLabel
}: ButtonProps) => {
  // Base classes
  const baseClasses = 'rounded-full font-medium transition-all inline-flex items-center justify-center relative overflow-hidden'
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-4 py-1.5',
    md: 'px-6 py-2.5',
    lg: 'text-lg px-8 py-3',
  }
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-secondary hover:bg-secondary-dark text-dark',
    outline: 'bg-transparent border-2 border-primary hover:bg-primary/10 text-white',
    ghost: 'bg-transparent hover:bg-white/10 text-white',
  }
  
  // Width class
  const widthClass = fullWidth ? 'w-full' : ''
  
  // Disabled class
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''
  
  // Icon spacing
  const iconSpacing = icon ? (iconPosition === 'left' ? 'space-x-2' : 'space-x-2 flex-row-reverse') : ''
  
  // Combined classes
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${iconSpacing} ${disabledClass} ${className}`
  
  // Animation variants
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    },
    tap: { 
      scale: 0.98,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    },
    initial: { 
      scale: 1 
    }
  }
  
  // Render as Link if 'to' prop is provided
  if (to) {
    return (
      <motion.div
        initial="initial"
        whileHover={!disabled ? "hover" : undefined}
        whileTap={!disabled ? "tap" : undefined}
        variants={buttonVariants}
      >
        <Link 
          to={to} 
          className={combinedClasses}
          aria-disabled={disabled}
          aria-label={ariaLabel}
        >
          {icon && <span>{icon}</span>}
          <span>{children}</span>
        </Link>
      </motion.div>
    )
  }
  
  // Render as anchor if 'href' prop is provided
  if (href) {
    return (
      <motion.div
        initial="initial"
        whileHover={!disabled ? "hover" : undefined}
        whileTap={!disabled ? "tap" : undefined}
        variants={buttonVariants}
      >
        <a 
          href={href} 
          className={combinedClasses}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={disabled}
          aria-label={ariaLabel}
        >
          {icon && <span>{icon}</span>}
          <span>{children}</span>
        </a>
      </motion.div>
    )
  }
  
  // Render as button by default
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled}
      aria-label={ariaLabel}
      initial="initial"
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      variants={buttonVariants}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </motion.button>
  )
}

export default Button