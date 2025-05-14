import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Footer: React.FC = () => {
  // State for image loading and errors
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({
    logo: true,
    twitter: true,
    facebook: true,
    instagram: true,
    linkedin: true,
    appStore: true,
    googlePlay: true,
  });

  // Handle image load success
  const handleImageLoad = (key: string) => {
    setImageLoading((prev) => ({ ...prev, [key]: false }));
  };

  // Handle image load error
  const handleImageError = (key: string) => {
    console.error(`Failed to load image: ${key}`);
    setImageErrors((prev) => ({ ...prev, [key]: true }));
    setImageLoading((prev) => ({ ...prev, [key]: false }));
  };

  // Fallback image for social icons and logo
  const FALLBACK_IMAGE = 'https://img.icons8.com/ios-filled/24/000000/image.png';

  return (
    <footer className="bg-gray-100 py-8 sm:py-12 font-['Inter']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Company Logo */}
          <div className="flex items-center">
            <div className="relative">
              {imageLoading['logo'] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 w-32 sm:w-40 lg:w-48 h-12 sm:h-16 lg:h-20">
                  <span className="text-xs text-gray-500">...</span>
                </div>
              )}
              <img
                src={imageErrors['logo'] ? FALLBACK_IMAGE : logo}
                alt="SmartServe Logo"
                className={`w-32 sm:w-40 lg:w-48 h-auto ${imageLoading['logo'] ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
                onLoad={() => handleImageLoad('logo')}
                onError={() => handleImageError('logo')}
              />
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Company</h4>
            <ul className="list-none space-y-2">
              {[
                { name: 'About us', to: '/about' },
                { name: 'Investor Relations', to: '/investors' },
                { name: 'Terms & conditions', to: '/terms' },
                { name: 'Privacy policy', to: '/privacy' },
                { name: 'Anti-discrimination policy', to: '/anti-discrimination' },
                { name: 'ESG Impact', to: '/esg' },
                { name: 'Careers', to: '/careers' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="text-gray-600 hover:text-teal-500 text-sm sm:text-base transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Customers */}
          <div>
            <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4">For Customers</h4>
            <ul className="list-none space-y-2">
              {[
                { name: 'SmartServe reviews', to: '/reviews' },
                { name: 'Categories near you', to: '/categories' },
                { name: 'Contact us', to: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="text-gray-600 hover:text-teal-500 text-sm sm:text-base transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4">For Professionals</h4>
            <ul className="list-none space-y-2">
              <li>
                <Link
                  to="/register-professional"
                  className="text-gray-600 hover:text-teal-500 text-sm sm:text-base transition-colors duration-200"
                >
                  Register as a professional
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links and App Downloads */}
          <div>
            <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Social Links</h4>
            <div className="flex gap-3 mb-6">
              {[
                { name: 'Twitter', url: 'https://img.icons8.com/ios-filled/24/000000/twitter.png', to: '/twitter' },
                { name: 'Facebook', url: 'https://img.icons8.com/ios-filled/24/000000/facebook.png', to: '/facebook' },
                { name: 'Instagram', url: 'https://img.icons8.com/ios-filled/24/000000/instagram-new.png', to: '/instagram' },
                { name: 'LinkedIn', url: 'https://img.icons8.com/ios-filled/24/000000/linkedin.png', to: '/linkedin' },
              ].map((social) => (
                <Link key={social.name} to={social.to} className="relative inline-block">
                  {imageLoading[social.name.toLowerCase()] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 w-6 h-6">
                      <span className="text-xs text-gray-500">...</span>
                    </div>
                  )}
                  <img
                    src={imageErrors[social.name.toLowerCase()] ? FALLBACK_IMAGE : social.url}
                    alt={`${social.name} icon`}
                    className={`w-6 h-6 ${imageLoading[social.name.toLowerCase()] ? 'opacity-0' : 'opacity-100'} hover:opacity-80 transition-opacity duration-200`}
                    onLoad={() => handleImageLoad(social.name.toLowerCase())}
                    onError={() => handleImageError(social.name.toLowerCase())}
                  />
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                <img
                  src={
                    imageErrors['appStore']
                      ? FALLBACK_IMAGE
                      : 'https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg'
                  }
                  alt="Download on the App Store"
                  className={`w-28 sm:w-32 ${imageLoading['appStore'] ? 'opacity-0' : 'opacity-100'} hover:opacity-80 transition-opacity duration-200`}
                  onLoad={() => handleImageLoad('appStore')}
                  onError={() => handleImageError('appStore')}
                />
              </a>
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <img
                  src={
                    imageErrors['googlePlay']
                      ? FALLBACK_IMAGE
                      : 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'
                  }
                  alt="Get it on Google Play"
                  className={`w-32 sm:w-36 ${imageLoading['googlePlay'] ? 'opacity-0' : 'opacity-100'} hover:opacity-80 transition-opacity duration-200`}
                  onLoad={() => handleImageLoad('googlePlay')}
                  onError={() => handleImageError('googlePlay')}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600 text-xs sm:text-sm">
          <p>* As on December 31, 2024</p>
          <p>
            © Copyright 2025 SmartServe Ltd. All rights reserved. | CIN: U71440DL2014PTC2714413
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;