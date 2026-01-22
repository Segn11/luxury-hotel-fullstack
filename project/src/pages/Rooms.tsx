import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Wifi, Coffee, Tv, Bath, Users, Bed } from 'lucide-react';
import { useRooms } from '../hooks/useRooms';
import { formatCurrency } from '../utils/formatCurrency';

const Rooms = () => {
  const { rooms, loading, error } = useRooms();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Rooms & Suites
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Experience comfort and luxury in our thoughtfully designed accommodations, each offering stunning views and premium amenities.
          </motion.p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {error && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-sm text-yellow-600 font-semibold"
              >
                {error}
              </motion.p>
            )}
            {loading && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-sm text-gray-500"
              >
                Loading the latest rooms...
              </motion.p>
            )}
            {rooms.map((room, index) => {
              const highlightFeatures = [
                { icon: Bed, text: room.bed_type },
                { icon: Users, text: `Accommodates up to ${room.occupancy} guests` },
                { icon: Wifi, text: 'Complimentary WiFi' },
                { icon: Coffee, text: 'Premium Mini Bar' },
                { icon: Tv, text: 'Smart Entertainment' },
                { icon: Bath, text: 'Spa-inspired Bath' },
              ];

              return (
                <motion.div
                  key={room.id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div
                      className="h-96 bg-cover bg-center rounded-lg shadow-xl"
                      style={{ backgroundImage: `url(${room.image_url})` }}
                    />
                  </div>
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                      <h3 className="text-3xl font-bold text-green-800 mb-4">{room.name}</h3>
                      <p className="text-4xl font-bold text-yellow-600 mb-6">
                        {formatCurrency(room.price_per_night)}<span className="text-lg text-gray-600">/night</span>
                      </p>
                      <p className="text-gray-600 mb-6 text-lg">{room.description}</p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {highlightFeatures.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-gray-700 text-sm">
                            <feature.icon className="h-5 w-5 text-yellow-500 mr-2" />
                            <span>{feature.text}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-green-800 mb-3">Room Amenities</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {room.amenities.map((amenity, idx) => (
                            <div key={idx} className="flex items-center text-gray-600">
                              <Star className="h-4 w-4 text-yellow-500 mr-2" />
                              <span className="text-sm">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link
                        to="/booking"
                        className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white text-center py-3 px-6 rounded-lg font-semibold transition-colors"
                      >
                        Book This Room
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ready to Book Your Stay?
          </motion.h2>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Choose your perfect room and start planning your unforgettable stay at Ethiopian Skylight Hotel.
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/booking"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
            >
              Book Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-green-800 px-8 py-4 rounded-full font-semibold text-lg transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Rooms;