import { useEffect, useState } from 'react';
import { fetchRooms, Room } from '../services/api';

const fallbackRooms: Room[] = [
  {
    id: 1,
    slug: 'standard-room',
    name: 'Standard Room',
    description: 'Comfortable room with a captivating city view and modern amenities.',
    price_per_night: 120,
    room_type: 'standard',
    image_url: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['King Size Bed', 'City View', 'Complimentary WiFi', 'Mini Bar', 'Room Service'],
    occupancy: 2,
    bed_type: 'King Size Bed',
  },
  {
    id: 2,
    slug: 'executive-suite',
    name: 'Executive Suite',
    description: 'Spacious suite with a separate living area, ideal for work and relaxation.',
    price_per_night: 250,
    room_type: 'executive',
    image_url: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['Separate Living Area', 'Mountain View', 'Complimentary Breakfast', 'Executive Lounge Access'],
    occupancy: 4,
    bed_type: 'King Size Bed',
  },
  {
    id: 3,
    slug: 'presidential-suite',
    name: 'Presidential Suite',
    description: 'The most luxurious accommodation with butler service and panoramic views.',
    price_per_night: 500,
    room_type: 'presidential',
    image_url: 'https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=800',
    amenities: ['Luxury Furnishings', 'Panoramic Views', 'Butler Service', 'Private Balcony', 'Premium Bar'],
    occupancy: 6,
    bed_type: 'King Size Bed',
  },
];

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>(fallbackRooms);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRooms()
      .then((data) => setRooms(data))
      .catch(() => setError('Unable to load rooms — showing curated selections.'))
      .finally(() => setLoading(false));
  }, []);

  return { rooms, loading, error };
};
