import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TikTokGalleryProps {
  username: string;
  count?: number;
  title?: string;
  subtitle?: string;
}

interface TikTokVideo {
  id: string;
  embedCode: string;
  thumbnail?: string;
  description?: string;
}

const TikTokGallery: React.FC<TikTokGalleryProps> = ({ 
  username, 
  count = 3, 
  title, 
  subtitle 
}) => {
  const [videos, setVideos] = useState<TikTokVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  // In a real implementation, you'd fetch TikTok videos via a backend API
  // TikTok doesn't provide a direct frontend API, so this is simulated
  useEffect(() => {
    const fetchTikTokVideos = async () => {
      try {
        setLoading(true);
        
        // Simulating API call delay
        setTimeout(() => {
          // Mock TikTok video data
          const mockVideos: TikTokVideo[] = [
            {
              id: 'video1',
              embedCode: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@${username}/video/${Math.random().toString().substring(2, 18)}" data-video-id="${Math.random().toString().substring(2, 18)}">
                <section></section>
              </blockquote>`,
              thumbnail: '/api/placeholder/540/960',
              description: 'Check out our latest product demo #trending'
            },
            {
              id: 'video2',
              embedCode: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@${username}/video/${Math.random().toString().substring(2, 18)}" data-video-id="${Math.random().toString().substring(2, 18)}">
                <section></section>
              </blockquote>`,
              thumbnail: '/api/placeholder/540/960',
              description: 'Behind the scenes #behindthescenes'
            },
            {
              id: 'video3',
              embedCode: `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@${username}/video/${Math.random().toString().substring(2, 18)}" data-video-id="${Math.random().toString().substring(2, 18)}">
                <section></section>
              </blockquote>`,
              thumbnail: '/api/placeholder/540/960',
              description: 'New release coming soon! #newrelease'
            }
          ];
          
          setVideos(mockVideos.slice(0, count));
          setLoading(false);
          
          // In a real implementation, we would load the TikTok embed script here
          // This is how you'd typically load the TikTok embed script:
          const script = document.createElement('script');
          script.src = 'https://www.tiktok.com/embed.js';
          script.async = true;
          document.body.appendChild(script);
          
          return () => {
            document.body.removeChild(script);
          };
        }, 1000);
      } catch (err) {
        console.error('Error fetching TikTok videos:', err);
        setError('Failed to load TikTok videos. Please try again later.');
        setLoading(false);
      }
    };

    fetchTikTokVideos();
  }, [username, count]);

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

        {/* TikTok Username */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center mb-8"
        >
          <a 
            href={`https://www.tiktok.com/@${username}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-white hover:text-primary transition-colors"
          >
            <svg 
              className="w-6 h-6 mr-2" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 015.17-1.75V12.1a6.32 6.32 0 005-6.07h-1.5a4.82 4.82 0 01-4.89 4.44V2h-1.3v16.2a4.83 4.83 0 002.6 10h.11a4.82 4.82 0 004.81-4.81V11.2a8.16 8.16 0 004.34 1.26V10a4.85 4.85 0 01-2.04-.31z"/>
            </svg>
            <span className="font-medium">@{username}</span>
          </a>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark rounded-xl overflow-hidden shadow-lg"
              >
                {/* Since we can't actually embed TikTok videos easily without their script,
                    we'll use a combination of approaches */}
                <div className="relative aspect-[9/16] w-full">
                  {/* Option 1: Direct TikTok embed (requires their embed.js) */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-gray-900"
                    dangerouslySetInnerHTML={{ __html: video.embedCode }}
                  />
                  
                  {/* Option 2: Fallback to a link with thumbnail */}
                  <a 
                    href={`https://www.tiktok.com/@${username}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex flex-col items-center justify-center group"
                  >
                    {video.thumbnail && (
                      <img
                        src={video.thumbnail}
                        alt={video.description || `TikTok by @${username}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <div className="flex flex-col items-center">
                        <svg 
                          className="w-12 h-12 text-white mb-2" 
                          viewBox="0 0 24 24" 
                          fill="currentColor"
                        >
                          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 015.17-1.75V12.1a6.32 6.32 0 005-6.07h-1.5a4.82 4.82 0 01-4.89 4.44V2h-1.3v16.2a4.83 4.83 0 002.6 10h.11a4.82 4.82 0 004.81-4.81V11.2a8.16 8.16 0 004.34 1.26V10a4.85 4.85 0 01-2.04-.31z"/>
                        </svg>
                        <span className="text-white font-medium">Watch on TikTok</span>
                      </div>
                    </div>
                  </a>
                </div>
                
                {/* Description */}
                <div className="p-4">
                  <p className="text-white/70 text-sm">
                    {video.description ? (
                      <>
                        {video.description.length > 100
                          ? `${video.description.substring(0, 97)}...`
                          : video.description}
                      </>
                    ) : (
                      `TikTok by @${username}`
                    )}
                  </p>
                  <a 
                    href={`https://www.tiktok.com/@${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-primary text-sm hover:underline"
                  >
                    Watch on TikTok
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TikTokGallery;