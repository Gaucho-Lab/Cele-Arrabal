import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  neon?: boolean
  hover?: boolean
  onClick?: () => void
}

const Card = ({
  children,
  className = '',
  neon = false,
  hover = true,
  onClick
}: CardProps) => {
  const cardClasses = `card ${neon ? 'neon-border' : ''} ${className}`
  
  return (
    <motion.div
      className={cardClasses}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          damping: 15,
          stiffness: 200,
          delay: 0.1
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={hover ? { 
        y: -5, 
        boxShadow: neon 
          ? '0 10px 20px -5px rgba(255, 6, 183, 0.3)' 
          : '0 10px 20px -5px rgba(0, 0, 0, 0.3)'
      } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

export default Card