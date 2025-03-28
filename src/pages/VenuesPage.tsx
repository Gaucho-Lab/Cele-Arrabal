import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedHeading from '@/components/ui/AnimatedHeading'
import VenueMap from '@/components/venues/VenueMap'
import VenueCard from '@/components/venues/VenueCard'
import type { Venue } from '@/types/Venue'
import React from 'react'

const VenuesPage = (): React.ReactElement => {

  // Mock venue data
  const venuesData: Venue[] = [
    {
      id: '1',
      name: 'Club Nebula',
      city: 'New York',
      country: 'USA',
      coordinates: [-73.9857, 40.7484],
      description: "One of New York's premier nightclubs featuring state-of-the-art sound systems and lighting.",
      capacity: 1200,
      events: ['1'],
      featured: true,
      ratings: 4.8,
      imageUrl: 'src/assets/images/release1.jpg'
    },
    {
      id: '2',
      name: 'Bayfront Park',
      city: 'Miami',
      country: 'USA',
      coordinates: [-80.1867, 25.7742],
      description: 'Outdoor venue hosting some of the biggest electronic music festivals in the United States.',
      capacity: 25000,
      events: ['2'],
      ratings: 4.5,
      imageUrl: 'src/assets/images/release1.jpg'
    },
    {
      id: '3',
      name: 'Watergate',
      city: 'Berlin',
      country: 'Germany',
      coordinates: [13.4105, 52.5244],
      description: 'Iconic Berlin nightclub with panoramic windows overlooking the Spree River.',
      capacity: 800,
      events: ['3'],
      website: 'https://water-gate.de/',
      ratings: 4.7,
      imageUrl: 'src/assets/images/release1.jpg'
    },
    {
      id: '4',
      name: 'Amnesia',
      city: 'Ibiza',
      country: 'Spain',
      coordinates: [1.4068, 38.9181],
      description: 'Legendary Ibiza superclub known for its foam parties and world-class DJ lineups.',
      capacity: 5000,
      events: ['4'],
      website: 'https://www.amnesia.es/',
      featured: true,
      ratings: 4.9,
      imageUrl: 'src/assets/images/release1.jpg'
    },
    {
      id: '5',
      name: 'WOMB',
      city: 'Tokyo',
      country: 'Japan',
      coordinates: [139.6917, 35.6895],
      description: 'Multi-level Tokyo club with cutting-edge sound system and regular international DJ appearances.',
      capacity: 1000,
      events: ['5'],
      website: 'http://www.womb.co.jp/',
      ratings: 4.6,
      imageUrl: 'src/assets/images/release1.jpg'
    },
    {
      id: '6',
      name: 'Melkweg',
      city: 'Amsterdam',
      country: 'Netherlands',
      coordinates: [4.8828, 52.3667],
      description: 'Cultural center and music venue in the heart of Amsterdam, hosting a variety of artists and events.',
      capacity: 1500,
      events: ['6'],
      website: 'https://www.melkweg.nl/',
      ratings: 4.4,
      imageUrl: 'src/assets/images/release1.jpg'
    }
  ]
  
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null)

  const handleVenueSelect = (venue: Venue | null) => {
    setSelectedVenue(venue)
    
    // Only scroll if we have a selected venue
    if (venue && window.innerWidth < 768) {
      document.getElementById('venue-details')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
                Explore Venues
              </span>
              <AnimatedHeading level={1} className="text-4xl md:text-6xl mb-6" gradient>
                Global Tour Map
              </AnimatedHeading>
              <p className="text-white/70 text-lg mb-6">
                From intimate clubs to massive festival stages, explore the iconic venues where I've performed around the world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map and Venues Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Map Column */}
            <div className="lg:col-span-2">
              <AnimatedHeading level={2} className="text-2xl md:text-3xl mb-6">
                Mapa Interactivo de Presentaciones
              </AnimatedHeading>
              <VenueMap 
                venues={venuesData} 
                onVenueSelect={handleVenueSelect} 
                selectedVenue={selectedVenue} // Pass selected venue to map 
              />
            </div>
            
            {/* Venue Details Column */}
            <div id="venue-details">
              <AnimatedHeading level={2} className="text-2xl md:text-3xl mb-6">
                Venue Spotlight
              </AnimatedHeading>
              
              {selectedVenue ? (
                <motion.div
                  key={selectedVenue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <VenueCard venue={selectedVenue} selected />
                </motion.div>
              ) : (
                <div className="text-white/70 p-6 bg-dark-light rounded-lg">
                  <p>Select a venue from the map to see details.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* All Venues Grid */}
      <section className="py-16 bg-dark-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <AnimatedHeading level={2} className="text-3xl md:text-4xl mb-6">
              Featured Venues
            </AnimatedHeading>
            <p className="text-white/70 max-w-2xl mx-auto">
              Here are some of the incredible venues that have hosted my performances. Click on a venue to see more details.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venuesData.map(venue => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: venuesData.indexOf(venue) * 0.1 }}
              >
                <VenueCard 
                  venue={venue} 
                  selected={selectedVenue?.id === venue.id}
                  onClick={() => handleVenueSelect(venue)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default VenuesPage