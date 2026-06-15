"use client";

import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-obsidian text-cream border-t border-gold/10 pt-16 pb-8 px-6 md:px-12 lg:px-20 font-jost">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
        
        {/* Col 1: Brand & Manifesto */}
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col">
            <span className="font-cormorant text-3xl tracking-wide">Divyotsav</span>
            <span className="text-xs uppercase tracking-[0.25em] text-gold">Divine Celebrations</span>
          </div>
          <p className="text-warm-gray text-sm font-light tracking-wide max-w-[280px] leading-relaxed">
            Divyotsav is born of a sacred vision where ancient geometry and timeless cultural rituals meet modern design excellence. We craft celebrations that live forever.
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-gold uppercase text-xs tracking-[0.2em] font-medium border-b border-gold/10 pb-3">
            Quick Links
          </h4>
          <ul className="flex flex-col space-y-3 text-sm font-light tracking-wider">
            <li>
              <Link href="/" className="hover:text-gold transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gold transition-colors duration-300">
                Our Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold transition-colors duration-300">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Services */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-gold uppercase text-xs tracking-[0.2em] font-medium border-b border-gold/10 pb-3">
            Our Offerings
          </h4>
          <ul className="flex flex-col space-y-3 text-sm font-light tracking-wider">
            <li className="flex items-center space-x-2">
              <span className="font-devanagari text-gold text-xs">विवाह</span>
              <Link href="/services/weddings" className="hover:text-gold transition-colors duration-300">
                Weddings
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="font-devanagari text-gold text-xs">आयोजन</span>
              <Link href="/services/corporate-events" className="hover:text-gold transition-colors duration-300">
                Corporate Events
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="font-devanagari text-gold text-xs">उत्सव</span>
              <Link href="/services/social-functions" className="hover:text-gold transition-colors duration-300">
                Social Functions
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="font-devanagari text-gold text-xs">उपहार</span>
              <Link href="/services/luxury-gifting" className="hover:text-gold transition-colors duration-300">
                Luxury Gifting
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & Socials */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-gold uppercase text-xs tracking-[0.2em] font-medium border-b border-gold/10 pb-3">
            Inquiries
          </h4>
          <div className="flex flex-col space-y-4 text-sm font-light tracking-wider text-warm-gray">
            <p className="leading-relaxed">
              108, Sanskriti Heights, Luxury Avenue, Colaba, Mumbai – 400005, Maharashtra, India
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+919876543210" className="text-cream hover:text-gold transition-colors">
                +91 98765 43210
              </a>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:hello@divyotsav.com" className="text-cream hover:text-gold transition-colors">
                hello@divyotsav.com
              </a>
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://instagram.com/divyotsav"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream hover:text-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/divyotsav"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream hover:text-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream hover:text-gold transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.817 1.451 5.46 0 9.902-4.43 9.904-9.877.001-2.639-1.02-5.12-2.877-6.98-1.856-1.86-4.331-2.884-6.974-2.885-5.463 0-9.904 4.431-9.907 9.879-.001 1.738.455 3.434 1.321 4.938l-.988 3.606 3.692-.969zm10.74-5.326c-.27-.134-1.597-.788-1.845-.878-.247-.09-.427-.134-.607.134-.18.27-.697.878-.854 1.058-.158.18-.315.202-.585.068-.27-.135-1.139-.42-2.17-1.34-.802-.715-1.343-1.6-1.5-1.87-.158-.27-.017-.417.118-.552.122-.121.27-.315.405-.472.135-.157.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.607-1.462-.832-2.002-.22-.53-.443-.458-.607-.466-.158-.008-.338-.01-.518-.01-.18 0-.472.067-.72.337-.247.27-.945.922-.945 2.247 0 1.325.962 2.607 1.097 2.787.135.18 1.895 2.89 4.593 4.06 1.096.475 1.864.67 2.502.775.642.106 1.225.077 1.684.009.513-.076 1.598-.652 1.822-1.282.225-.63.225-1.17.158-1.282-.068-.113-.248-.18-.518-.314z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer & Scroll to Top */}
      <div className="max-w-[1440px] mx-auto border-t border-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-warm-gray tracking-widest font-light">
        <p className="mb-4 md:mb-0 text-center md:text-left">
          © {new Date().getFullYear()} DIVYOTSAV. ALL RIGHTS RESERVED.
        </p>
        <p className="text-center md:text-right uppercase">
          Indian Luxury Craftsmanship • Aesthetic Excellence
        </p>
        
        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to Top"
          className="mt-6 md:mt-0 flex items-center space-x-2 text-gold hover:text-cream transition-colors duration-300"
        >
          <span>UPWARD</span>
          <svg className="w-3 h-3 fill-none stroke-current" viewBox="0 0 12 12" strokeWidth="1.5">
            <path d="M2 8l4-4 4 4" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
