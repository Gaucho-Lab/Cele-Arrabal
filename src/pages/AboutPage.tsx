import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedHeading from '@/components/ui/AnimatedHeading'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Biography from '@/components/about/Biography'
import useAnimations from '@/hooks/useAnimations'
import React from 'react'

const AboutPage = (): React.ReactElement => {
  return (
    <div className="pt-24">
      {/* Header Section */}
      <section className="py-12 bg-dark-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-medium uppercase tracking-wider mb-2 inline-block">
                The Artist
              </span>
              <AnimatedHeading level={1} className="text-4xl md:text-6xl mb-6" gradient>
                About Cele
              </AnimatedHeading>
              <p className="text-white/70 text-lg mb-6">
                International DJ and producer with a passion for creating unforgettable experiences through music.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <Biography />

      {/* Brand Story */}
      {/* <BrandStorySection /> */}
      
      {/* Music Philosophy */}
      {/* <MusicPhilosophySection /> */}
      
      {/* Skills & Equipment */}
      {/* <SkillsSection /> */}
      
      {/* Contact CTA */}
      <ContactSection />
    </div>
  )
}

// Brand Story Section Component
const BrandStorySection = () => {
  const { fadeIn } = useAnimations()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  return (
    <section ref={ref} className="py-20 bg-dark-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <AnimatedHeading level={2} className="text-3xl md:text-4xl mb-4">
              The Brand Story
            </AnimatedHeading>
            <p className="text-white/70">How a passion project became a global phenomenon</p>
          </div>
          
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1">
                <div className="aspect-square bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-6xl font-bold gradient-text">1</span>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-3">The Early Days</h3>
                <p className="text-white/70">
                  What began as bedroom DJ sets shared on SoundCloud quickly gained attention for their unique blend of genres and seamless transitions. By 2015, I was recording mixtapes that would circulate across college campuses and underground music communities.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1 md:order-last">
                <div className="aspect-square bg-secondary/20 rounded-full flex items-center justify-center">
                  <span className="text-6xl font-bold gradient-text">2</span>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-3">Breaking Through</h3>
                <p className="text-white/70">
                  The release of "Electric Dreams" in 2018 marked a turning point, receiving support from established industry names and radio play across multiple countries. This led to my first international bookings and the opportunity to perform at several major festivals.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1">
                <div className="aspect-square bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-6xl font-bold gradient-text">3</span>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-3">Global Phenomenon</h3>
                <p className="text-white/70">
                  Today, with a dedicated following of over half a million fans and performances on five continents, the DJ Brand has evolved into a global movement that celebrates diversity, creativity, and the unifying power of electronic music.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Music Philosophy Section Component
const MusicPhilosophySection = () => {
  const { slideInRight } = useAnimations()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background graphics */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,6,183,0.15),transparent_40%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(6,240,255,0.15),transparent_40%)]" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative aspect-video rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-dark-light flex items-center justify-center">
                {/* Video placeholder - in production, replace with actual video */}
                <div className="text-center">
                  <svg className="w-20 h-20 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="block mt-4 text-white/70">Watch Artist Statement</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-1/2">
            <span className="text-primary font-medium uppercase tracking-wider mb-2 inline-block">
              My Approach
            </span>
            <AnimatedHeading level={2} className="text-3xl md:text-4xl mb-6">
              Music Philosophy
            </AnimatedHeading>
            
            <motion.div 
              className="space-y-4 text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p>
                I believe that music is the most universal language we have. It transcends borders, cultures, and backgrounds, connecting people on a fundamental level.
              </p>
              
              <p>
                My sets are designed to take listeners on a journey, building energy and emotion through carefully crafted progressions and unexpected combinations of sounds. I'm not bound by genre labels—instead, I focus on the emotional impact and dance floor energy.
              </p>
              
              <p>
                What sets my performances apart is the ability to read a crowd and adapt in real-time. Whether it's an intimate club setting or a massive festival stage, I create a unique experience tailored to that specific moment and audience.
              </p>
              
              <div className="mt-8">
                <Button href="https://soundcloud.com" variant="outline">
                  Listen to Latest Mix
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Skills & Equipment Section Component
const SkillsSection = () => {
  const { staggerContainer, listItem } = useAnimations()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  const skills = [
    {
      id: '1',
      name: 'Music Production',
      description: 'Proficient in Ableton Live and Logic Pro X with extensive knowledge of sound design and mixing techniques.',
      icon: '🎛️'
    },
    {
      id: '2',
      name: 'DJ Performance',
      description: 'Experienced with Pioneer CDJ systems, Traktor, and vinyl, specializing in seamless multi-genre mixing.',
      icon: '🎧'
    },
    {
      id: '3',
      name: 'Live Remixing',
      description: 'On-the-fly remixing and mashup creation using Ableton Push and other controllers.',
      icon: '🔄'
    },
    {
      id: '4',
      name: 'Visual Programming',
      description: 'Collaborative work with VJs to create synchronized audio-visual experiences.',
      icon: '📺'
    }
  ]
  
  const equipment = [
    'Pioneer DJ CDJ-3000',
    'Pioneer DJ DJM-900NXS2',
    'Ableton Push 2',
    'Native Instruments Traktor Kontrol S8',
    'Custom Modular Synth Setup',
    'Roland TR-8S Rhythm Performer'
  ]
  
  return (
    <section ref={ref} className="py-20 bg-dark-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <AnimatedHeading level={2} className="text-3xl md:text-4xl mb-4">
            Skills & Equipment
          </AnimatedHeading>
          <p className="text-white/70 max-w-2xl mx-auto">
            The tools and techniques that shape my sound
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map(skill => (
                <motion.div key={skill.id} variants={listItem}>
                  <Card className="flex items-start gap-4">
                    <div className="text-4xl">{skill.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{skill.name}</h4>
                      <p className="text-white/70">{skill.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Equipment */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Preferred Equipment</h3>
            <motion.div variants={listItem}>
              <Card className="h-full">
                <ul className="space-y-4 p-2">
                  {equipment.map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center gap-3 text-white/80"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                    >
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
            
            {/* Technical Rider */}
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Button variant="ghost" fullWidth>
                Download Technical Rider
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Contact CTA Section Component
const ContactSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="neon-border p-10 rounded-xl bg-dark-light">
            <AnimatedHeading level={2} className="text-3xl md:text-4xl mb-6" gradient>
              Get in Touch
            </AnimatedHeading>
            <p className="text-white/70 mb-8">
              For bookings, press inquiries, or collaboration opportunities, reach out to my team. We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="mailto:bookings@djbrand.com" size="lg">
                Booking Inquiries
              </Button>
              <Button href="mailto:press@celearrabal.com" variant="outline" size="lg">
                Press Contact
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutPage