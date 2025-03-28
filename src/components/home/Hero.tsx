import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Button from '@/components/ui/Button'
import AnimatedHeading from '@/components/ui/AnimatedHeading'

const Hero = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('./assets/images/hero-bg.jpg')",
            filter: "brightness(0.5)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/40 to-dark" />
      </div>

      {/* Animated particles/dots effect */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 rounded-full bg-primary"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-2"
        >
          <span className="inline-block text-primary font-medium uppercase tracking-wider">International DJ & Producer</span>
        </motion.div>

        <AnimatedHeading level={1} className="text-5xl md:text-7xl lg:text-8xl mb-6" gradient>
          CELE ARRABAL
        </AnimatedHeading>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10"
        >
          The rhythm that has captivated audiences in clubs and festivals around the world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button to="/schedule" size="lg">
            See Dates
          </Button>
          <Button href="https://open.spotify.com" variant="outline" size="lg">
            Listen in Spotify
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white/50"
            >
              <path 
                d="M12 5L12 19M12 19L19 12M12 19L5 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="transform rotate-90"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero