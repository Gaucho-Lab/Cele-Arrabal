import { motion } from 'framer-motion'
import Hero from '@/components/home/Hero'
import AnimatedHeading from '@/components/ui/AnimatedHeading'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import useAnimations from '@/hooks/useAnimations'
import { useInView } from 'react-intersection-observer'
import React from 'react'
import SpotifyPlaylist from '@/components/spotify/Spotify'

const HomePage = (): React.ReactElement => {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Latest Releases Section */}
      <LatestReleases />

      <SpotifyPlaylist 
          playlistId="37i9dQZF1DZ06evO1NsTS1" 
          height={450}
        />
      
      {/* Upcoming Events Preview */}
      <UpcomingEvents />
      
      {/* Testimonials / Press Section */}
      <TestimonialsSection />
    </>
  )
}

// Latest Releases Section Component
const LatestReleases = () => {
  const { staggerContainer, listItem } = useAnimations()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  // Mock release data
  const releases = [
    {
      id: '1',
      title: 'Electric Dreams',
      type: 'Single',
      artwork: '/src/assets/images/release1.jpg',
      releaseDate: '2023-11-15',
      streamUrl: 'https://open.spotify.com'
    },
    {
      id: '2',
      title: 'Midnight Sessions Vol. 3',
      type: 'EP',
      artwork: '/src/assets/images/release2.jpg',
      releaseDate: '2023-09-22',
      streamUrl: 'https://open.spotify.com'
    },
    {
      id: '3',
      title: 'Summer Vibes (feat. Luna Ray)',
      type: 'Single',
      artwork: '/src/assets/images/release3.jpg',
      releaseDate: '2023-07-08',
      streamUrl: 'https://open.spotify.com'
    }
  ]
  
  return (
    <section ref={ref} className="py-20 bg-dark-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-primary font-medium uppercase tracking-wider mb-2 inline-block">
            Lo ultimo
          </span>
          <AnimatedHeading level={2} className="text-4xl md:text-5xl" gradient>
            Nuevos lanzamientos
          </AnimatedHeading>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {releases.map(release => (
            <motion.div key={release.id} variants={listItem}>
              <Card className="h-full flex flex-col" neon>
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img 
                    src={release.artwork} 
                    alt={release.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60" />
                  <Button 
                    className="absolute bottom-14 left-4 right-4"
                    href={release.streamUrl}
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    }
                  >
                    Escuchar
                  </Button>
                </div>
                <div className="p-4 flex-grow">
                  <span className="text-primary text-sm font-medium">{release.type}</span>
                  <h3 className="text-xl font-bold mb-2">{release.title}</h3>
                  <p className="text-white/70 text-sm">
                    Released: {new Date(release.releaseDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <Button href="https://open.spotify.com" variant="outline">
            View todos los lanzamientos
          </Button>
        </div>
      </div>
    </section>
  )
}

// Upcoming Events Preview Component
const UpcomingEvents = () => {
  const { slideInBottom } = useAnimations()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  // Mock upcoming events
  const events = [
    {
      id: '1',
      title: 'Club Nebula',
      date: '2023-12-15',
      location: 'New York, USA'
    },
    {
      id: '2',
      title: 'Electric Festival',
      date: '2023-12-28',
      location: 'Miami, USA'
    },
    {
      id: '3',
      title: 'Techno Warehouse',
      date: '2024-01-05',
      location: 'Berlin, Germany'
    }
  ]
  
  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background graphic element */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,6,183,0.15),transparent_40%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(6,240,255,0.15),transparent_40%)]" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="text-primary font-medium uppercase tracking-wider mb-2 inline-block">
            Fechas
          </span>
          <AnimatedHeading level={2} className="text-4xl md:text-5xl" gradient>
            Futuros Eventos
          </AnimatedHeading>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={slideInBottom}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="space-y-4">
            {events.map(event => (
              <Card 
                key={event.id} 
                className="flex items-center justify-between p-6"
                hover={true}
              >
                <div>
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <p className="text-white/70">{event.location}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-lg font-medium">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <Button size="sm" variant="ghost" to="/schedule">
                    Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button to="/schedule" size="lg">
              Ver todas las fechas
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Testimonials Section Component
const TestimonialsSection = () => {
  const { fadeIn } = useAnimations()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  // Mock testimonials data
  const testimonials = [
    {
      id: '1',
      quote: "DJ Brand delivers one of the most electrifying performances in the electronic music scene today. Her ability to read the crowd is unmatched.",
      author: "Music Today",
      role: "Magazine"
    },
    {
      id: '2',
      quote: "A rising star who continues to push boundaries with her unique sound and energy. Her latest release is a testament to her growing influence.",
      author: "Electronic Beats",
      role: "Blog"
    },
    {
      id: '3',
      quote: "Her set at Ultra Music Festival was nothing short of spectacular, cementing her status as one of the most sought-after DJs this year.",
      author: "Festival Guide",
      role: "Publication"
    }
  ]
  
  return (
    <section ref={ref} className="py-20 bg-dark-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-primary font-medium uppercase tracking-wider mb-2 inline-block">
            Press & Media
          </span>
          <AnimatedHeading level={2} className="text-4xl md:text-5xl" gradient>
            What They're Saying
          </AnimatedHeading>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={fadeIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {testimonials.map(testimonial => (
            <Card key={testimonial.id} className="h-full flex flex-col">
              <div className="p-6 flex flex-col flex-grow">
                <svg className="text-primary w-10 h-10 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-white/80 italic mb-4 flex-grow">{testimonial.quote}</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HomePage