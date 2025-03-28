export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    venue: {
      name: string;
      city: string;
      country: string;
      coordinates?: [number, number]; // [longitude, latitude]
    };
    price?: string;
    ticketUrl?: string;
    soldOut?: boolean;
    upcoming?: boolean;
    description?: string;
    imageUrl?: string; 
  }