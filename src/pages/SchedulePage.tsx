import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedHeading from '@/components/ui/AnimatedHeading'
import EventCalendar from '@/components/schedule/EventCalendar'
import Button from '@/components/ui/Button'
import type { Event } from '@/types/Events'
import React from 'react'

const SchedulePage = (): React.ReactElement => {
  // Mock events data
  const eventsData: Event[] = [
    {
      id: '1',
      title: 'Club Nebula',
      date: '2023-12-15',
      time: '10:00 PM - 2:00 AM',
      venue: {
        name: 'Club Nebula',
        city: 'New York',
        country: 'USA',
        coordinates: [-73.9857, 40.7484]
      },
      price: '$30',
      ticketUrl: 'https://example.com/tickets',
      upcoming: false
    },
    {
      id: '2',
      title: 'Electric Festival',
      date: '2023-12-28',
      time: '8:00 PM - 4:00 AM',
      venue: {
        name: 'Bayfront Park',
        city: 'Miami',
        country: 'USA',
        coordinates: [-80.1867, 25.7742]
      },
      price: '$75',
      ticketUrl: 'https://example.com/tickets',
      upcoming: false
    },
    {
      id: '3',
      title: 'Techno Warehouse',
      date: '2024-06-05',
      time: '11:00 PM - 6:00 AM',
      venue: {
        name: 'Watergate',
        city: 'Berlin',
        country: 'Germany',
        coordinates: [13.4105, 52.5244]
      },
      price: '€25',
      ticketUrl: 'https://example.com/tickets',
      upcoming: true
    },
    {
      id: '4',
      title: 'Ibiza Closing Party',
      date: '2023-09-30',
      time: '11:00 PM - 7:00 AM',
      venue: {
        name: 'Amnesia',
        city: 'Ibiza',
        country: 'Spain',
        coordinates: [1.4068, 38.9181]
      },
      price: '€40',
      ticketUrl: 'https://example.com/tickets',
      upcoming: false
    },
    {
      id: '5',
      title: 'Tokyo Underground',
      date: '2023-08-12',
      time: '10:00 PM - 5:00 AM',
      venue: {
        name: 'WOMB',
        city: 'Tokyo',
        country: 'Japan',
        coordinates: [139.6917, 35.6895]
      },
      price: '¥3500',
      ticketUrl: 'https://example.com/tickets',
      upcoming: false
    },
    {
      id: '6',
      title: 'Amsterdam Dance Event',
      date: '2023-10-18',
      time: '9:00 PM - 6:00 AM',
      venue: {
        name: 'Melkweg',
        city: 'Amsterdam',
        country: 'Netherlands',
        coordinates: [4.8828, 52.3667]
      },
      price: '€35',
      ticketUrl: 'https://example.com/tickets',
      upcoming: false
    }
  ]

  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')
  
  // Filter events based on selected filter
  const filteredEvents = filter === 'all' 
    ? eventsData 
    : filter === 'upcoming' 
      ? eventsData.filter(event => event.upcoming) 
      : eventsData.filter(event => !event.upcoming)

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
                Where To Find Me
              </span>
              <AnimatedHeading level={1} className="text-4xl md:text-6xl mb-6" gradient>
                Tour Schedule
              </AnimatedHeading>
              <p className="text-white/70 text-lg mb-6">
                Check out where I'll be dropping beats around the globe. Grab your tickets and join the party!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events Calendar Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10">
            <div className="flex justify-center space-x-4 mb-8">
              <Button 
                variant={filter === 'all' ? 'primary' : 'ghost'}
                onClick={() => setFilter('all')}
              >
                All Events
              </Button>
              <Button 
                variant={filter === 'upcoming' ? 'primary' : 'ghost'}
                onClick={() => setFilter('upcoming')}
              >
                Upcoming
              </Button>
              <Button 
                variant={filter === 'past' ? 'primary' : 'ghost'}
                onClick={() => setFilter('past')}
              >
                Past Events
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <EventCalendar events={filteredEvents} />
          </motion.div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-16 bg-dark-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedHeading level={2} className="text-3xl md:text-4xl mb-6">
              Want to Book Me for Your Event?
            </AnimatedHeading>
            <p className="text-white/70 mb-8">
              I'm available for club nights, festivals, private events, and more. Get in touch with my booking team to discuss availability and rates.
            </p>
            <Button size="lg" href="#" variant="primary">
              Contact for Booking
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SchedulePage