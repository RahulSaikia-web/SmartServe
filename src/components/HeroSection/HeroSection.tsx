import React, { useState, useEffect } from 'react';

const messages: string[] = [
  'SmartServe: Premier Home Services at Your Fingertips',
  'Hire Expert Professionals feel like family',
  'Transform Your Home with Trusted Care',
  'Quality and Convenience, Delivered',
];

const HeroSection: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000); // Change message every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {/* Background Image with Low Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          opacity: 0.25,
        }}
      ></div>

      {/* Overlay Content */}
      <div className="relative flex h-full items-center justify-center text-center">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl font-['Inter']">
            SmartServe
          </h1>
          <p
            className="mt-3 text-lg font-extrabold text-teal-800 sm:text-xl md:text-2xl lg:text-3xl animate-textFade font-['Inter']"
            key={currentMessageIndex}
            style={{
              animation: 'textFade 1.5s ease-in-out',
            }}
          >
            {messages[currentMessageIndex]}
          </p>
          <button
            className="mt-6 rounded-full bg-teal-500 px-6 py-2 text-sm font-semibold text-white animate-buttonGlow hover:bg-teal-600 hover:scale-105 transition-all duration-300 sm:text-base md:text-lg lg:text-xl sm:px-8 sm:py-3 font-['Inter']"
            style={{
              animation: 'buttonGlow 2s ease-in-out infinite',
            }}
          >
            Discover Our Services
          </button>
        </div>
      </div>

      {/* Inline CSS for Animations */}
      <style>{`
        @keyframes textFade {
          0% {
            opacity: 0;
            transform: translateY(15px) scale(0.95);
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes buttonGlow {
          0% {
            transform: scale(1);
            box-shadow: 0 0 5px rgba(45, 212, 191, 0.5);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 15px rgba(45, 212, 191, 0.8);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 5px rgba(45, 212, 191, 0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;