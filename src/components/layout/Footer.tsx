import { motion } from 'framer-motion'

const Footer = () => {
  const year = new Date().getFullYear()
  
  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/djbrand', icon: 'instagram' },
    { name: 'Spotify', url: 'https://open.spotify.com', icon: 'spotify' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'youtube' },
    { name: 'SoundCloud', url: 'https://soundcloud.com', icon: 'soundcloud' },
  ]

  const footerLinks = [
    { name: 'Bookings', url: '/about#booking' },
    { name: 'Press Kit', url: '#' },
    { name: 'Contact', url: '#' },
    { name: 'Privacy Policy', url: '#' },
  ]

  return (
    <footer className="bg-dark-light py-12 mt-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Section */}
          <div className="col-span-1">
            <h3 className="text-2xl font-display font-bold gradient-text mb-4">Cele Arrabal</h3>
            <p className="text-white/70 mb-6">
              International DJ and producer with over 550k followers. Bringing high-energy sets to clubs and festivals around the world.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-lighter flex items-center justify-center text-white/70 hover:text-white hover:bg-primary/20 transition-colors duration-300"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  <SocialIcon type={social.icon} />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Links Section */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.url}
                    className="text-white/70 hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter Section */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-4">Stay Updated</h4>
            <p className="text-white/70 mb-4">
              Subscribe to get updates on new releases, tour dates, and exclusive content.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-dark rounded-lg border border-dark-lighter focus:border-primary focus:outline-none flex-grow"
              />
              <motion.button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg font-medium whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-dark-lighter text-center text-white/50 text-sm">
          <p>© {year} DJ Brand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Helper component for social icons
const SocialIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'instagram':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'spotify':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
      );
    case 'soundcloud':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-6.417 14.583c-.354-.318-.583-.79-.583-1.323 0-.532.229-1.003.583-1.323v2.646zm1.167.417c-.212 0-.323-.103-.323-.316v-3.438c0-.213.111-.316.323-.316s.327.103.327.316v3.438c0 .213-.115.316-.327.316zm1.167 0c-.212 0-.327-.103-.327-.316v-4.047c0-.213.115-.317.327-.317s.323.104.323.317v4.047c0 .213-.111.316-.323.316zm1.167 0c-.212 0-.323-.103-.323-.316v-5.833c0-.213.111-.417.323-.417s.327.104.327.417v5.833c0 .213-.115.316-.327.316zm1.166 0c-.212 0-.327-.103-.327-.316v-6.667c0-.213.115-.417.327-.417s.323.104.323.417v6.667c0 .213-.111.316-.323.316zm5.833.417c-1.318 0-2.392-1.045-2.5-2.371.016-1.344 1.111-2.428 2.459-2.428 1.332 0 2.42 1.063 2.458 2.391-.009 1.36-1.117 2.408-2.417 2.408z" />
        </svg>
      );
    default:
      return null;
  }
}

export default Footer