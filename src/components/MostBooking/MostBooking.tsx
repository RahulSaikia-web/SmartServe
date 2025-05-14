import React, { useState } from 'react';

interface Service {
  id: number;
  name: string;
  price: string;
  image: string;
}

// Fallback image URL (a generic placeholder from Unsplash)
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1490730141103-6a0088b7ebb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';

const services: Service[] = [
  {
    id: 1,
    name: 'Deep House Cleaning',
    price: '$99',
    image: 'https://images.unsplash.com/photo-1581578735769-4a7d09d9b31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    name: 'Plumbing Repair',
    price: '$75',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    name: 'Electrical Services',
    price: '$89',
    image: 'https://images.unsplash.com/photo-1618220923183-8c6ef4d490a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    name: 'Lawn Mowing',
    price: '$49',
    image: 'https://images.unsplash.com/photo-1590779033106-b1c3a4a0457d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
];

const MostBooking: React.FC = () => {
  // State to track image loading status
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
  const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>(
    services.reduce((acc, service) => ({ ...acc, [service.id]: true }), {})
  );

  // Handle image load success
  const handleImageLoad = (id: number) => {
    setImageLoading((prev) => ({ ...prev, [id]: false }));
  };

  // Handle image load error
  const handleImageError = (id: number) => {
    console.error(`Failed to load image for service ID: ${id}`);
    setImageErrors((prev) => ({ ...prev, [id]: true }));
    setImageLoading((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <section className="py-12 sm:py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-8 sm:mb-12 font-['Inter']">
          Most Booked Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative w-full h-48">
                {imageLoading[service.id] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500">Loading...</span>
                  </div>
                )}
                <img
                  src={imageErrors[service.id] ? FALLBACK_IMAGE : service.image}
                  alt={service.name}
                  className={`w-full h-48 object-cover ${imageLoading[service.id] ? 'opacity-0' : 'opacity-100'}`}
                  onLoad={() => handleImageLoad(service.id)}
                  onError={() => handleImageError(service.id)}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 font-['Inter']">
                  {service.name}
                </h3>
                <p className="mt-2 text-teal-600 font-bold text-lg font-['Inter']">
                  {service.price}
                </p>
                <button className="mt-4 w-full rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 transition-colors duration-200 font-['Inter']">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostBooking;