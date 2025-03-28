import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedHeading from '@/components/ui/AnimatedHeading'
import Button from '@/components/ui/Button'
import useAnimations from '@/hooks/useAnimations'

const Biography = () => {
  const { slideInLeft, slideInRight, fadeIn } = useAnimations()
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Photo/Image side */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={slideInLeft}
            className="relative"
          >
            <div className="relative z-10 rounded-lg overflow-hidden h-[600px]">
              <div 
                className="aspect-[3/4] bg-cover bg-center"
                style={{ backgroundImage: "url('./src/assets/images/dj-portrait.jpg')" }}
              />
              
              {/* Stats overlay */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark to-transparent p-6"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold gradient-text">585K+</div>
                    <div className="text-sm text-white/70">Followers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold gradient-text">14</div>
                    <div className="text-sm text-white/70">Countries</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold gradient-text">150+</div>
                    <div className="text-sm text-white/70">Shows</div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -bottom-5 -left-5 w-40 h-40 rounded-full bg-primary/20 blur-2xl"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.8 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            <motion.div 
              className="absolute -top-5 -right-5 w-40 h-40 rounded-full bg-secondary/20 blur-2xl"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.8 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </motion.div>
          
          {/* Biography content side */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={slideInRight}
          >
            <span className="text-primary font-medium uppercase tracking-wider mb-2 inline-block">
              About the Artist
            </span>
            
            <AnimatedHeading level={2} className="text-4xl md:text-5xl mb-6" gradient>
              Meet the Beat Maker
            </AnimatedHeading>
            
            <motion.div 
              className="space-y-4 mb-8 text-white/80"
              variants={fadeIn}
            >
              <p>
                Born and raised in Miami, Florida, DJ Brand discovered her passion for music at an early age. Growing up surrounded by diverse musical influences, from Latin rhythms to electronic beats, she developed a unique style that blends multiple genres into an electrifying experience.
              </p>
              
              <p>
                After graduating from music production school in 2015, she quickly made a name for herself in the local club scene before catching the attention of industry veterans. Her breakthrough came in 2018 with the release of her debut single "Electric Dreams," which topped dance charts worldwide.
              </p>
              
              <p>
                Today, with over 585,000 followers across social platforms and performances in more than 14 countries, DJ Brand continues to push boundaries with her signature sound and high-energy sets. Her mission is to unite people on dance floors around the world, creating unforgettable moments through the universal language of music.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button href="https://instagram.com/djbrand">
                Follow on Instagram
              </Button>
              <Button href="https://soundcloud.com" variant="outline">
                Listen to Mixes
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Biography