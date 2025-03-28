import { motion } from 'framer-motion'
import { Venue } from '@/types/Venue'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'


interface VenueCardProps {
  venue: Venue
  onClick?: () => void
  selected?: boolean
}

const VenueCard = ({ venue, onClick, selected = false }: VenueCardProps) => {
  return (
    <Card 
      className={`flex flex-col h-full ${selected ? 'neon-border' : ''}`}
      onClick={onClick}
    >
      {/* Venue Image */}
      <div className="h-48 relative overflow-hidden rounded-t-lg">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: venue.imageUrl 
              ? `url(${venue.imageUrl})` 
              : 'linear-gradient(to bottom right, #0F0F10, #28282C)' 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
        
        {venue.featured && (
          <div className="absolute top-3 right-3">
            <motion.div 
              className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Featured
            </motion.div>
          </div>
        )}
      </div>
      
      {/* Venue Details */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-1">{venue.name}</h3>
        <p className="text-white/70 mb-4">{venue.city}, {venue.country}</p>
        
        {/* Venue Info */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          {venue.capacity && (
            <div className="flex items-center text-white/60">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Capacity: {venue.capacity.toLocaleString()}</span>
            </div>
          )}
          
          {venue.events && (
            <div className="flex items-center text-white/60">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Shows: {venue.events.length}</span>
            </div>
          )}
          
          {venue.ratings && (
            <div className="flex items-center text-white/60 col-span-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(venue.ratings!) ? 'text-primary' : 'text-white/30'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1">({venue.ratings.toFixed(1)})</span>
            </div>
          )}
        </div>
        
        {venue.description && (
          <p className="text-white/70 text-sm mb-4 flex-grow">{venue.description}</p>
        )}
        
        <div className="mt-auto">
          {venue.website && (
            <Button 
              href={venue.website}
              variant="outline" 
              fullWidth
            >
              Visit Website
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

export default VenueCard