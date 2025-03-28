import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedHeadingProps {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  gradient?: boolean
  delay?: number
}

const AnimatedHeading = ({
  children,
  level = 2,
  className = '',
  gradient = false,
  delay = 0
}: AnimatedHeadingProps) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  
  const textClasses = gradient 
    ? 'gradient-text' 
    : ''
  
  const variantParent = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay
      }
    }
  }
  
  const variantLetter = {
    hidden: { 
      y: 50, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        damping: 12, 
        stiffness: 200 
      }
    }
  }
  
  // For simple, single-word headings
  if (typeof children === 'string' && !children.includes(' ')) {
    return (
      <HeadingTag className={`${textClasses} ${className}`}>
        <motion.span
          initial="hidden"
          animate="visible"
          variants={variantParent}
        >
          {Array.from(children).map((letter, index) => (
            <motion.span
              key={index}
              variants={variantLetter}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </HeadingTag>
    )
  }
  
  // For more complex content
  return (
    <HeadingTag className={`${textClasses} ${className}`}>
      <motion.span
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          damping: 12,
          stiffness: 200,
          delay
        }}
      >
        {children}
      </motion.span>
    </HeadingTag>
  )
}

export default AnimatedHeading