import { Variants } from 'framer-motion'

export const useAnimations = () => {
  // Staggered text animation
  const textVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const letterVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
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

  // Fade in animation
  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  // Slide in from left
  const slideInLeft: Variants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  }

  // Slide in from right
  const slideInRight: Variants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  }

  // Slide in from bottom
  const slideInBottom: Variants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  }

  // Pop in animation
  const popIn: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  }

  // Shimmer/Shine effect
  const shimmer: Variants = {
    hidden: { 
      backgroundPosition: '-200% 0',
      opacity: 0.7
    },
    visible: {
      backgroundPosition: '200% 0',
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 2
      }
    }
  }

  // Staggered container animation
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  // List item animation
  const listItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200
      }
    }
  }

  return {
    textVariants,
    letterVariants,
    fadeIn,
    slideInLeft,
    slideInRight,
    slideInBottom,
    popIn,
    shimmer,
    staggerContainer,
    listItem
  }
}

export default useAnimations