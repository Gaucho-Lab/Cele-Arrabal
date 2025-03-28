import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Define types
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category?: string;
  featured?: boolean;
}

interface GalleryProps {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, title, subtitle }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Get unique categories
  const categories = ['All', ...new Set(images.map(img => img.category || 'Other'))];

  // Filter images by category
  const filteredImages = category && category !== 'All'
    ? images.filter(img => img.category === category)
    : images;

  // Handle image click to show lightbox
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  return (
    <section ref={ref} className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Gallery Header */}
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

        {/* Category Filter */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat === 'All' ? null : cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  (cat === 'All' && !category) || cat === category
                    ? 'bg-primary text-white'
                    : 'bg-dark-lighter text-white/70 hover:bg-dark-light hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            },
            hidden: {}
          }}
        >
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 }
              }}
              transition={{ duration: 0.5 }}
              className={`${image.featured ? 'sm:col-span-2 sm:row-span-2' : ''} 
                overflow-hidden rounded-lg bg-dark-light cursor-pointer group`}
              onClick={() => openLightbox(image)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm">{image.caption}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 15 }}
                className="max-w-4xl max-h-[90vh] relative"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[80vh] object-contain"
                />
                
                {selectedImage.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60">
                    <p className="text-white text-center">{selectedImage.caption}</p>
                  </div>
                )}
                
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark flex items-center justify-center text-white hover:bg-primary transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;