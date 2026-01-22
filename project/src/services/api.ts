export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api';

export interface Room {
  id: number;
  slug: string;
  name: string;
  description: string;
  price_per_night: number;
  room_type: string;
  image_url: string;
  amenities: string[];
  occupancy: number;
  bed_type: string;
}

export interface BookingPayload {
  room: number;
  guest_name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  special_requests: string;
}

export interface ContactMessagePayload {
  full_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Unable to reach the reservation service.');
  }
  return response.json();
}

export async function fetchRooms(): Promise<Room[]> {
  const response = await fetch(`${API_BASE_URL}/rooms/`, {
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
}

export async function createBooking(payload: BookingPayload): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/bookings/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  await handleResponse(response);
}

export async function sendContactMessage(payload: ContactMessagePayload): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/contact-messages/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  await handleResponse(response);
}
