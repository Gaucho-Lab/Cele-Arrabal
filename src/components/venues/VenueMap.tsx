import { useState, useEffect } from 'react'
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl'
import { motion } from 'framer-motion'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Venue } from '@/types/Venue'
import Button from '@/components/ui/Button'

interface VenueMapProps {
  venues: Venue[]
  onVenueSelect?: (venue: Venue | null) => void  // Changed to accept null
  selectedVenue?: Venue | null
}

// Note: You'll need to replace this with your actual Mapbox token
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2F1Y2hvbGFiIiwiYSI6ImNtN202MWpoMDBhazQycXEwbHpva25ncGEifQ.3Qee3qYfJdc_0yAi6wkoTg' // In production, use environment variable

const VenueMap = ({ venues, onVenueSelect, selectedVenue: externalSelectedVenue }: VenueMapProps) => {
  
  const [internalSelectedVenue, setInternalSelectedVenue] = useState<Venue | null>(null)
  
  // Use external selection if provided, otherwise use internal
  const selectedVenue = externalSelectedVenue || internalSelectedVenue
  
  // Calculate center of all venues for initial view
  const calculateMapCenter = () => {
    if (venues.length === 0) return [0, 20] // Default to center of world
    
    const totalLong = venues.reduce((sum, venue) => sum + venue.coordinates[0], 0)
    const totalLat = venues.reduce((sum, venue) => sum + venue.coordinates[1], 0)
    
    return [
      totalLong / venues.length,
      totalLat / venues.length
    ] as [number, number]
  }
  
  const [viewState, setViewState] = useState({
    longitude: calculateMapCenter()[0],
    latitude: calculateMapCenter()[1],
    zoom: 3
  })
  
  // Update map view when external selection changes
  useEffect(() => {
    if (externalSelectedVenue) {
      setViewState({
        longitude: externalSelectedVenue.coordinates[0],
        latitude: externalSelectedVenue.coordinates[1],
        zoom: 4
      })
    }
  }, [externalSelectedVenue])
  
  // When a marker on the map is clicked
  const handleMarkerClick = (venue: Venue) => {
    setInternalSelectedVenue(venue)
    if (onVenueSelect) {
      onVenueSelect(venue)
    }
  }
  
  return (
    <motion.div 
      className="w-full h-[500px] rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" />
        
        {venues.map(venue => (
          <Marker
            key={venue.id}
            longitude={venue.coordinates[0]}
            latitude={venue.coordinates[1]}
            onClick={e => {
              // Prevent event from closing popup
              e.originalEvent.stopPropagation()
              handleMarkerClick(venue)
            }}
          >
            <div 
              className={`w-5 h-5 rounded-full bg-primary cursor-pointer ${
                venue.featured ? 'animate-pulse' : ''
              }`}
            />
          </Marker>
        ))}
        
        {selectedVenue && (
          <Popup
            longitude={selectedVenue.coordinates[0]}
            latitude={selectedVenue.coordinates[1]}
            anchor="bottom"
            onClose={() => {
              // Clear the internal selection
              setInternalSelectedVenue(null);
              // Notify the parent component if needed
              if (onVenueSelect) {
                onVenueSelect(null);
              }
            }}
            closeButton={true}
            closeOnClick={false}
            className="venue-popup"
          >
            <div className="p-2 min-w-[200px]">
              <h3 className="font-bold text-dark">{selectedVenue.name}</h3>
              <p className="text-dark/70 text-sm">{selectedVenue.city}, {selectedVenue.country}</p>
              {selectedVenue.website && (
                <Button 
                  href={selectedVenue.website}
                  size="sm"
                  variant="primary"
                  className="mt-2 text-xs"
                >
                  Visit Website
                </Button>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </motion.div>
  )
}

export default VenueMap