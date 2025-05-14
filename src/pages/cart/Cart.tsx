import React, { useState } from 'react';
import Layout from '../../Layout/Layout';

interface Provider {
  name: string;
  phone: string;
}

interface Service {
  id: number;
  name: string;
  price: string;
  image: string;
  status: 'Pending' | 'Booked' | 'Closed';
  provider?: Provider;
}

// Fallback image URL
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1490730141103-6a0088b7ebb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';

const services: Service[] = [
  {
    id: 1,
    name: 'Deep House Cleaning',
    price: '$99',
    image: 'https://images.unsplash.com/photo-1581578735769-4a7d09d9b31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    status: 'Booked',
    provider: { name: 'John Doe', phone: '+1-555-123-4567' },
  },
  {
    id: 2,
    name: 'Plumbing Repair',
    price: '$75',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Electrical Services',
    price: '$89',
    image: 'https://images.unsplash.com/photo-1618220923183-8c6ef4d490a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    status: 'Closed',
  },
  {
    id: 4,
    name: 'Lawn Mowing',
    price: '$49',
    image: 'https://images.unsplash.com/photo-1590779033106-b1c3a4a0457d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    status: 'Booked',
    provider: { name: 'Jane Smith', phone: '+1-555-987-6543' },
  },
];

const Cart: React.FC = () => {
  // State for selected status filter
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  
  // State for image loading and errors
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

  // Filter services based on status
  const filteredServices = selectedStatus === 'all'
    ? services
    : services.filter((service) => service.status === selectedStatus);

  // Render status badge
  const renderStatusBadge = (status: Service['status']) => {
    const statusStyles: { [key in Service['status']]: string } = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Booked: 'bg-indigo-100 text-indigo-800',
      Closed: 'bg-blue-100 text-blue-800',
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <Layout>
      <section className="py-12 bg-blue-50 min-h-screen mt-16 font-['Inter']">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header and Status Filter */}
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">SmartServe Cart</h2>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-md border border-indigo-500 bg-white text-gray-700 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Booked">Booked</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Cart Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden h-[400px] flex flex-col transition-shadow hover:shadow-lg"
                >
                  <div className="relative w-full h-48">
                    {imageLoading[service.id] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                        <span className="text-gray-500 text-sm">Loading...</span>
                      </div>
                    )}
                    <img
                      src={imageErrors[service.id] ? FALLBACK_IMAGE : service.image}
                      alt={`Professional ${service.name.toLowerCase()} service`}
                      className={`w-full h-full object-cover ${imageLoading[service.id] ? 'opacity-0' : 'opacity-100'}`}
                      onLoad={() => handleImageLoad(service.id)}
                      onError={() => handleImageError(service.id)}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-base font-semibold text-gray-900">{service.name}</h3>
                        {renderStatusBadge(service.status)}
                      </div>
                      <p className="text-indigo-600 font-bold text-sm">{service.price}</p>
                      {service.status === 'Booked' && service.provider && (
                        <div className="mt-2 text-xs text-gray-600">
                          <p><span className="font-medium">Provider:</span> {service.provider.name}</p>
                          <p><span className="font-medium">Phone:</span> {service.provider.phone}</p>
                        </div>
                      )}
                    </div>
                    <button className="mt-3 w-full px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
                      {service.status === 'Booked' ? 'Message Provider' : service.status === 'Closed' ? 'View Details' : 'Manage Booking'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">No services found for the selected status.</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;