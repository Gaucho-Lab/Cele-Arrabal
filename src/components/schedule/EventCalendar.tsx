import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Event } from '@/types/Events'
import { format, parseISO } from 'date-fns'

interface EventCalendarProps {
  events: Event[]
}

const EventCalendar = ({ events }: EventCalendarProps) => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  
  // Get unique months from events
  const months = Array.from(
    new Set(
      events.map(event => format(parseISO(event.date), 'MMM yyyy'))
    )
  ).sort((a, b) => {
    return parseISO(a).getTime() - parseISO(b).getTime()
  })
  
  // Filter events by selected month
  const filteredEvents = selectedMonth 
    ? events.filter(event => {
        const eventMonth = format(parseISO(event.date), 'MMM yyyy')
        return eventMonth === selectedMonth
      })
    : events
  
  return (
    <div className="w-full">
      {/* Month selector */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex space-x-3">
          <Button 
            variant={selectedMonth === null ? 'primary' : 'ghost'}
            onClick={() => setSelectedMonth(null)}
          >
            All
          </Button>
          
          {months.map(month => (
            <Button
              key={month}
              variant={selectedMonth === month ? 'primary' : 'ghost'} 
              onClick={() => setSelectedMonth(month)}
            >
              {month}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Events list */}
      <motion.div 
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-white/70">No events scheduled for this month</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

// Event card component
const EventCard = ({ event }: { event: Event }) => {
  const eventDate = parseISO(event.date)
  
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: {
            type: "spring",
            damping: 15,
            stiffness: 200
          }
        }
      }}
    >
      <Card 
        className="flex flex-col md:flex-row items-center md:items-stretch"
        neon={event.upcoming}
      >
        {/* Date column */}
        <div className="w-full md:w-36 flex-shrink-0 flex flex-col items-center justify-center p-4 md:border-r border-dark-lighter">
          <span className="text-3xl font-bold">{format(eventDate, 'd')}</span>
          <span className="text-lg">{format(eventDate, 'MMM')}</span>
          <span className="text-sm text-white/60">{format(eventDate, 'yyyy')}</span>
        </div>
        
        {/* Event details */}
        <div className="flex-grow p-4 flex flex-col">
          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
          <div className="flex items-center text-white/70 mb-2">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.venue.name}, {event.venue.city}, {event.venue.country}</span>
          </div>
          <div className="flex items-center text-white/70 mb-4">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{event.time}</span>
          </div>
          
          {event.description && (
            <p className="text-white/70 mb-4">{event.description}</p>
          )}
          
          <div className="mt-auto flex flex-col sm:flex-row gap-3 justify-end">
            {event.soldOut ? (
              <Button variant="ghost" disabled>Sold Out</Button>
            ) : (
              <Button 
                variant="primary" 
                href={event.ticketUrl || '#'}
                disabled={!event.ticketUrl}
              >
                Get Tickets
                {event.price && ` • ${event.price}`}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default EventCalendar