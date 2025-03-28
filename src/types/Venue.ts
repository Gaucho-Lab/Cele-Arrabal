export interface Venue {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  description?: string;
  imageUrl?: string;
  website?: string;
  capacity?: number;
  events?: string[]; // Array of event IDs
  featured?: boolean;
  ratings?: number; // Average rating out of 5
}