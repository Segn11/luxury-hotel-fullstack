import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Bed, User, Mail, Phone, Check } from 'lucide-react';
import { useRooms } from '../hooks/useRooms';
import { createBooking } from '../services/api';
import { formatCurrency } from '../utils/formatCurrency';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomId: '',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [confirmationRef, setConfirmationRef] = useState('');

  const { rooms } = useRooms();

  useEffect(() => {
    if (!formData.roomId && rooms.length) {
      setFormData((prev) => ({ ...prev, roomId: rooms[0].id.toString() }));
    }
  }, [rooms, formData.roomId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.name === 'guests' ? Number(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const selectedRoom = rooms.find((room) => room.id === Number(formData.roomId));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (!selectedRoom) {
      setSubmissionError('Please select a room before confirming your reservation.');
      return;
    }

    setSubmissionError('');
    setIsSubmitting(true);

    try {
      await createBooking({
        room: selectedRoom.id,
        guest_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        check_in: formData.checkIn,
        check_out: formData.checkOut,
        guests: Number(formData.guests),
        special_requests: formData.specialRequests,
      });
      setConfirmationRef(`ESH-${Date.now().toString().slice(-6)}`);
      setStep(4);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to complete your booking at this time.';
      setSubmissionError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const roomPrice = selectedRoom ? Number(selectedRoom.price_per_night) : 0;
    return nights * roomPrice;
  };

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
            Book Your Stay
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Reserve your perfect room at Ethiopian Skylight Hotel and experience luxury hospitality.
          </motion.p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {[
              { number: 1, title: 'Select Room' },
              { number: 2, title: 'Guest Details' },
              { number: 3, title: 'Confirmation' },
              { number: 4, title: 'Complete' },
            ].map((stepItem) => (
              <div key={stepItem.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepItem.number
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > stepItem.number ? <Check size={20} /> : stepItem.number}
                </div>
                <span className={`ml-2 hidden sm:block ${
                  step >= stepItem.number ? 'text-green-800' : 'text-gray-500'
                }`}>
                  {stepItem.title}
                </span>
                {stepItem.number < 4 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    step > stepItem.number ? 'bg-yellow-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-lg shadow-xl p-8"
          >
            <form onSubmit={handleSubmit}>
              {submissionError && (
                <div className="text-sm text-red-600 mb-6">
                  {submissionError}
                </div>
              )}
              {step === 1 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-green-800 mb-6">Select Your Room</h2>
                  
                  {/* Date and Guest Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">
                        Check-in Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          id="checkIn"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-2">
                        Check-out Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          id="checkOut"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Guests *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <select
                          id="guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        >
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Room Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-4">Choose Your Room</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {rooms.map((room) => (
                        <div
                          key={room.id}
                          className={`border rounded-lg p-6 cursor-pointer transition-all ${
                            Number(formData.roomId) === room.id
                              ? 'border-yellow-500 bg-yellow-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setFormData({ ...formData, roomId: room.id.toString() })}
                        >
                          <img
                            src={room.image_url}
                            alt={room.name}
                            className="w-full h-40 object-cover rounded-md mb-4"
                          />
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-green-800">{room.name}</h4>
                            <span className="text-yellow-600 font-bold">
                              {formatCurrency(room.price_per_night)}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                          <div className="flex items-center text-gray-600 text-sm">
                            <Bed className="h-4 w-4 mr-1" />
                            {room.bed_type}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm mt-2">
                            <Users className="h-4 w-4 mr-1" />
                            Up to {room.occupancy} guests
                          </div>
                          <div className="mt-4 text-xs text-gray-500 space-y-1">
                            {room.amenities.slice(0, 3).map((amenity, idx) => (
                              <p key={idx}>{amenity}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-green-800 mb-6">Guest Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="+251 11 123 4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Any special requests or preferences..."
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-green-800 mb-6">Booking Summary</h2>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-green-800 mb-4">Booking Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Check-in:</span>
                            <span className="font-medium">{formData.checkIn}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Check-out:</span>
                            <span className="font-medium">{formData.checkOut}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Nights:</span>
                            <span className="font-medium">{calculateNights()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Guests:</span>
                            <span className="font-medium">{formData.guests}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Room:</span>
                            <span className="font-medium">{selectedRoom?.name}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-green-800 mb-4">Guest Information</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-medium">{formData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium">{formData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-medium">{formData.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 mt-6 pt-6">
                        <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total Amount:</span>
                        <span className="text-2xl text-yellow-600">{formatCurrency(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-green-800 mb-4">Booking Confirmed!</h2>
                  <p className="text-xl text-gray-600 mb-4">
                    Thank you, {formData.name}. Your request for {selectedRoom?.name} has been received.
                  </p>
                  <p className="text-md text-gray-600 mb-8">
                    A confirmation email will be sent to {formData.email} shortly with your details.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6 inline-block">
                    <p className="text-lg font-semibold text-green-800">
                      Booking Reference: <span className="text-yellow-600">{confirmationRef || 'ESH-PENDING'}</span>
                    </p>
                  </div>
                </div>
              )}

              {step < 4 && (
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(Math.max(1, step - 1))}
                    className={`px-6 py-3 rounded-md font-medium transition-colors ${
                      step === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    disabled={step === 1}
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    {step === 3 ? 'Confirm Booking' : 'Next'}
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Booking;