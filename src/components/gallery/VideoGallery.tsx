import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Define types
interface VideoItem {
  id: string;
  src: string;
  poster?: string;
  title: string;
  description?: string;
  duration?: string;
  featured?: boolean;
}

interface VideoGalleryProps {
  videos: VideoItem[];
  title?: string;
  subtitle?: string;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ videos, title, subtitle }) => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  // Enhanced autoplay setup with better targeting and debuggability
  useEffect(() => {
    // Use a lower threshold to start loading earlier and more reliably trigger
    const observerOptions = {
      root: null,
      rootMargin: '50px', // Start observing when video is 50px away from viewport
      threshold: 0.5, // When 50% of the video is visible
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const container = entry.target as HTMLElement;
        const videoId = container.getAttribute('data-video-id');
        if (!videoId) {
          console.warn('No video ID found on observed element');
          return;
        }
        
        const videoElement = videoRefs.current[videoId];
        if (!videoElement) {
          console.warn(`Video element with ID ${videoId} not found in refs`);
          return;
        }

        if (entry.isIntersecting) {
          console.log(`Video ${videoId} is now visible, attempting to play`);
          
          // Pause any currently playing video
          if (activeVideoId && activeVideoId !== videoId) {
            const currentVideo = videoRefs.current[activeVideoId];
            if (currentVideo) {
              currentVideo.pause();
              console.log(`Paused previously playing video ${activeVideoId}`);
            }
          }
          
          // Ensure video is ready to play
          if (videoElement.readyState >= 2) { // HAVE_CURRENT_DATA or better
            // Play the new video
            videoElement.play()
              .then(() => {
                console.log(`Successfully playing video ${videoId}`);
                setActiveVideoId(videoId);
              })
              .catch(error => {
                console.error(`Autoplay failed for video ${videoId}:`, error);
                // This is often due to browser autoplay restrictions
                // We'll show the play button prominently
              });
          } else {
            // Video isn't loaded enough for playback
            console.log(`Video ${videoId} not ready yet (readyState: ${videoElement.readyState})`);
            
            // Add load event listener to try playing once loaded
            const handleCanPlay = () => {
              if (entry.isIntersecting) { // Double-check it's still visible
                videoElement.play()
                  .then(() => {
                    console.log(`Playing video ${videoId} after it finished loading`);
                    setActiveVideoId(videoId);
                  })
                  .catch(error => console.error(`Playback failed after load for ${videoId}:`, error));
              }
              videoElement.removeEventListener('canplay', handleCanPlay);
            };
            
            videoElement.addEventListener('canplay', handleCanPlay);
          }
        } else {
          videoElement.pause();
          console.log(`Video ${videoId} left viewport, pausing`);
          if (activeVideoId === videoId) {
            setActiveVideoId(null);
          }
        }
      });
    };

    // Create and connect the observer
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Register all video containers with proper data-video-id attributes
    const videoContainers = document.querySelectorAll('[data-video-id]');
    videoContainers.forEach(container => {
      observer.observe(container);
    });

    console.log(`Intersection Observer set up for ${videoContainers.length} videos`);

    return () => {
      observer.disconnect();
      console.log('Intersection Observer disconnected');
    };
  }, [activeVideoId, videos]);

  // Handler for video click - improved to ensure plays and pauses work
  const handleVideoClick = (videoId: string) => {
    console.log(`Video ${videoId} clicked`);
    const videoElement = videoRefs.current[videoId];
    if (!videoElement) {
      console.error(`Video element with ID ${videoId} not found`);
      return;
    }

    try {
      if (videoElement.paused) {
        console.log(`Attempting to play video ${videoId}`);
        // Pause any other playing videos first
        Object.entries(videoRefs.current).forEach(([id, video]) => {
          if (id !== videoId && video && !video.paused) {
            video.pause();
            console.log(`Paused other video ${id}`);
          }
        });

        // Now play this video
        videoElement.play()
          .then(() => {
            console.log(`Successfully playing video ${videoId}`);
            setActiveVideoId(videoId);
          })
          .catch(error => {
            console.error(`Failed to play video ${videoId}:`, error);
            // Try to play muted if it failed (browser autoplay policy workaround)
            if (!videoElement.muted) {
              videoElement.muted = true;
              return videoElement.play();
            }
            return Promise.reject(error);
          })
          .then(() => {
            if (videoElement.muted) {
              console.log(`Playing video ${videoId} with muted workaround`);
            }
          })
          .catch(error => {
            console.error(`All play attempts failed for video ${videoId}:`, error);
          });
      } else {
        console.log(`Pausing video ${videoId}`);
        videoElement.pause();
        setActiveVideoId(null);
      }
    } catch (error) {
      console.error(`Error handling click for video ${videoId}:`, error);
    }
  };

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

        {/* TikTok-style Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark rounded-sm overflow-hidden shadow-lg"
            >
              {/* TikTok-style aspect ratio wrapper */}
              <div 
                className="relative aspect-[9/16] w-full cursor-pointer" 
                data-video-id={video.id}
                onClick={() => handleVideoClick(video.id)}
              >
                <video
                  ref={el => videoRefs.current[video.id] = el}
                  src={video.src}
                  poster={video.poster}
                  className="absolute inset-0 w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  preload="auto"
                  autoPlay={false} // Initial state, will be controlled by IntersectionObserver
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent duplicate clicks
                    handleVideoClick(video.id);
                  }}
                />
                
                {/* Simple overlay for inactive videos */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                    activeVideoId === video.id ? 'opacity-0' : 'opacity-100 bg-black/20'
                  }`}
                />
                
                {/* No duration badge */}
              </div>
              
              {/* Video Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{video.title}</h3>
                {video.description && (
                  <p className="text-white/70 text-sm">{video.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;