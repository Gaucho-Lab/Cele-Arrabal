import React from 'react';
import { motion } from 'framer-motion';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import Gallery from '@/components/gallery/Gallery';
import VideoGallery from '@/components/gallery/VideoGallery';
// import SpotifyPlaylist from '@/components/spotify/Spotify';
// import InstagramReelsGallery from '@/components/gallery/InstagramReels';
// import TikTokGallery from '@/components/gallery/TikTokGallery';

// Sample gallery data
const galleryImages = [
  {
    id: '1',
    src: '/src/assets/images/release1.jpg', // Replace with actual image paths
    alt: 'DJ performance at Ultra Music Festival',
    caption: 'Ultra Music Festival, Miami 2023',
    category: 'Performances',
    featured: true
  },
  {
    id: '2',
    src: '/src/assets/images/release2.jpg',
    alt: 'Studio session',
    caption: 'Late night studio session in Berlin',
    category: 'Studio'
  },
  {
    id: '3',
    src: '/src/assets/images/gallery/backstage1.jpg',
    alt: 'Backstage with other DJs',
    caption: 'Backstage with friends at Tomorrowland',
    category: 'Backstage'
  },
  {
    id: '4',
    src: '/src/assets/images/gallery/performance2.jpg',
    alt: 'DJ set in Ibiza',
    caption: 'Sunset set at Amnesia, Ibiza',
    category: 'Performances'
  },
  {
    id: '5',
    src: '/src/assets/images/gallery/travel1.jpg',
    alt: 'Traveling to Tokyo',
    caption: 'En route to Tokyo for Womb Club appearance',
    category: 'Travel'
  },
  {
    id: '6',
    src: '/src/assets/images/gallery/backstage2.jpg',
    alt: 'Preparing for a show',
    caption: 'Pre-show preparation in Amsterdam',
    category: 'Backstage'
  },
  {
    id: '7',
    src: '/src/assets/images/gallery/performance3.jpg',
    alt: 'Festival mainstage performance',
    caption: 'EDC Las Vegas mainstage',
    category: 'Performances',
    featured: true
  },
  {
    id: '8',
    src: '/src/assets/images/gallery/studio2.jpg',
    alt: 'Mixing a new track',
    caption: 'Finalizing the mix for "Electric Dreams"',
    category: 'Studio'
  },
  {
    id: '9',
    src: '/src/assets/images/gallery/fans1.jpg',
    alt: 'Meeting with fans',
    caption: 'Fan meetup in New York',
    category: 'Fans'
  },
  {
    id: '10',
    src: '/src/assets/images/gallery/travel2.jpg',
    alt: 'Scenic view from hotel',
    caption: 'View from hotel room in Rio de Janeiro',
    category: 'Travel'
  },
  {
    id: '11',
    src: '/src/assets/images/gallery/performance4.jpg',
    alt: 'Club night in Berlin',
    caption: 'Packed dancefloor at Watergate, Berlin',
    category: 'Performances'
  },
  {
    id: '12',
    src: '/src/assets/images/gallery/fans2.jpg',
    alt: 'Signing autographs',
    caption: 'Album signing event in Los Angeles',
    category: 'Fans'
  }
];

// Sample video data
const videoItems = [
  {
    id: 'video1',
    src: '/src/assets/videos/video2.mp4', // Replace with actual video paths
    poster: '/src/assets/images/gallery/release1.jpg',
    title: 'Ultra Music Festival Highlight',
    description: 'Dropping the beat during my headline set at Ultra Music Festival Miami',
    duration: '0:45',
    featured: true
  },
  {
    id: 'video2',
    src: '/src/assets/videos/video2.mp4',
    poster: '/src/assets/images/gallery/studio1.jpg',
    title: 'Studio Session',
    description: 'Behind the scenes of creating my latest track "Midnight Pulse"',
    duration: '0:30'
  },
  {
    id: 'video3',
    src: '/src/assets/videos/video2.mp4',
    poster: '/src/assets/images/gallery/backstage1.jpg',
    title: 'Backstage Vibes',
    description: 'Pre-show rituals with the crew before taking the stage',
    duration: '0:22'
  }
];

const GalleryPage: React.FC = () => {
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
                Visual Journey
              </span>
              <AnimatedHeading level={1} className="text-4xl md:text-6xl mb-6" gradient>
                Gallery
              </AnimatedHeading>
              <p className="text-white/70 text-lg mb-6">
                Explore behind-the-scenes moments, electrifying performances, and my journey around the globe
              </p>
            </motion.div>
          </div>
        </div>
      </section>

        {/* <SpotifyPlaylist 
        playlistId="37i9dQZF1DZ06evO1NsTS1"
        title="Weekend Vibes" 
        subtitle="Perfect tracks for your weekend relaxation"
        theme="dark"
        height={450}
        showCoverArt={true}
        compact={false}
        showTracklist={true}
        /> */}
      
      {/* <InstagramReelsGallery 
        username="/celearrabal" 
        count={3} 
        title="Latest Instagram Reels" 
        subtitle="Check out our recent video content"
        />

        <TikTokGallery 
        username="celearrabal" 
        count={3} 
        title="Our TikTok Content" 
        subtitle="Check out our latest viral videos"
        /> */}

      {/* Video Gallery Section */}
      <VideoGallery 
        videos={videoItems} 
        title="Video Highlights" 
        subtitle="Check out some of my favorite moments from performances around the world"
      />

      {/* Photo Gallery Section */}
      <Gallery 
        images={galleryImages} 
        title="Photo Gallery" 
        subtitle="Browse through categories and click on images to view in full size"
      />

      {/* Quote Section */}
      <section className="py-16 bg-dark-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <svg className="w-12 h-12 text-primary mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-xl md:text-2xl italic text-white/90 mb-4">
              Every photograph tells a story of a moment shared with incredible fans, fellow artists, and the universal language of music that connects us all.
            </blockquote>
            <cite className="text-white/70 font-medium">— DJ Brand</cite>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;