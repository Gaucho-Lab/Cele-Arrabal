import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SpotifyPlaylistProps {
  playlistId: string;
  title?: string;
  subtitle?: string;
  theme?: 'dark' | 'light';
  height?: number;
  showCoverArt?: boolean;
  compact?: boolean;
  showTracklist?: boolean;
}

const SpotifyPlaylist: React.FC<SpotifyPlaylistProps> = ({
  playlistId,
  title,
  subtitle,
  theme = 'dark',
  height = 380,
  showCoverArt = true,
  compact = false,
  showTracklist = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Create the correct Spotify embed URL with parameters
  const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=${theme}${showCoverArt ? '' : '&hideCover=true'}${compact ? '&compact=true' : ''}${showTracklist ? '' : '&hideTracklist=true'}`;

  return (
    <section ref={ref} className="py-16 bg-dark-light">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold mb-4 gradient-text"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/70 max-w-3xl mx-auto"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}

        {/* Spotify Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="flex items-center text-white">
            <svg 
              className="w-8 h-8 mr-2 text-green-500" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span className="font-medium">Spotify Playlist</span>
          </div>
        </motion.div>

        {/* Playlist Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="relative rounded-xl overflow-hidden shadow-2xl bg-dark mx-auto"
          style={{ maxWidth: '700px', position: 'relative' }}
        >
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-dark z-10">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-white/70">Loading Spotify playlist...</p>
              </div>
            </div>
          )}
          
          {/* Stylish Border Effect - placed behind the iframe */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500 z-0"></div>
          
          {/* Iframe placed on top with full pointer-events */}
          <div className={`relative ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 z-20`}>
            <iframe
              src={embedUrl}
              width="100%"
              height={height}
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify playlist"
              onLoad={() => setIsLoaded(true)}
              className="rounded-xl relative"
              style={{ pointerEvents: 'auto' }}
            ></iframe>
          </div>
        </motion.div>
        
        {/* Open in Spotify Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-6"
        >
          <a
            href={`https://open.spotify.com/playlist/${playlistId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors duration-300"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Open in Spotify
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SpotifyPlaylist;