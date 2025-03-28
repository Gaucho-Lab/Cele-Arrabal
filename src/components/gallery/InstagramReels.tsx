import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface InstagramReelsGalleryProps {
  username: string;
  count?: number;
  title?: string;
  subtitle?: string;
}

interface InstagramPost {
  id: string;
  permalink: string;
  thumbnail_url?: string;
  media_url?: string;
  caption?: string;
}

const InstagramReelsGallery: React.FC<InstagramReelsGalleryProps> = ({ 
  username, 
  count = 3, 
  title, 
  subtitle 
}) => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  // This would typically use the Instagram Graph API with an access token
  // For demo purposes, we'll simulate the API response
  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, you'd use the Instagram Graph API:
        // const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${accessToken}`);
        // const data = await response.json();
        
        // For demo purposes, we'll use placeholder data
        // In production, you'd filter for only REELS in the media_type
        setTimeout(() => {
          const mockPosts: InstagramPost[] = [
            {
              id: 'post1',
              permalink: `https://www.instagram.com/reel/${Math.random().toString(36).substring(2, 10)}/`,
              thumbnail_url: '/api/placeholder/540/960',
              caption: 'Check out our latest product demo #trending'
            },
            {
              id: 'post2',
              permalink: `https://www.instagram.com/reel/${Math.random().toString(36).substring(2, 10)}/`,
              thumbnail_url: '/api/placeholder/540/960',
              caption: 'Behind the scenes at our studio #behindthescenes'
            },
            {
              id: 'post3',
              permalink: `https://www.instagram.com/reel/${Math.random().toString(36).substring(2, 10)}/`,
              thumbnail_url: '/api/placeholder/540/960',
              caption: 'New release coming soon! #newrelease'
            },
            {
              id: 'post4',
              permalink: `https://www.instagram.com/reel/${Math.random().toString(36).substring(2, 10)}/`,
              thumbnail_url: '/api/placeholder/540/960',
              caption: 'Tips and tricks for better results #tips'
            }
          ];
          
          setPosts(mockPosts.slice(0, count));
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching Instagram posts:', err);
        setError('Failed to load Instagram Reels. Please try again later.');
        setLoading(false);
      }
    };

    fetchInstagramPosts();
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

        {/* Instagram Handle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center mb-8"
        >
          <a 
            href={`https://www.instagram.com/${username}/`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-white hover:text-primary transition-colors"
          >
            <svg 
              className="w-6 h-6 mr-2" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" 
                clipRule="evenodd" 
              />
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
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark rounded-xl overflow-hidden shadow-lg"
              >
                {/* Instagram Reel Embed */}
                <div className="relative aspect-[9/16] w-full">
                  {/* Two approaches: */}
                  
                  {/* Option 1: Use Instagram's oEmbed (requires JS) */}
                  <div className="absolute inset-0 bg-gray-900">
                    <iframe
                      src={`${post.permalink}embed`}
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                      scrolling="no"
                      title={`Instagram Reel by @${username}`}
                    ></iframe>
                  </div>
                  
                  {/* Option 2: Link to Instagram with thumbnail (fallback) */}
                  {!post.permalink.includes('embed') && (
                    <a 
                      href={post.permalink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex flex-col items-center justify-center group"
                    >
                      {post.thumbnail_url ? (
                        <img
                          src={post.thumbnail_url}
                          alt={post.caption || `Instagram Reel by @${username}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                          <svg 
                            className="w-16 h-16 text-white" 
                            fill="currentColor" 
                            viewBox="0 0 24 24" 
                            aria-hidden="true"
                          >
                            <path 
                              fillRule="evenodd" 
                              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" 
                              clipRule="evenodd" 
                            />
                          </svg>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <span className="text-white font-medium">View on Instagram</span>
                      </div>
                    </a>
                  )}
                </div>
                
                {/* Caption */}
                <div className="p-4">
                  <p className="text-white/70 text-sm">
                    {post.caption ? (
                      <>
                        {post.caption.length > 100
                          ? `${post.caption.substring(0, 97)}...`
                          : post.caption}
                      </>
                    ) : (
                      `Reel by @${username}`
                    )}
                  </p>
                  <a 
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-primary text-sm hover:underline"
                  >
                    View on Instagram
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

export default InstagramReelsGallery;