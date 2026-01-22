# Luxury Hotel Experience (Full Stack)

A modern hospitality site built with a **React + Vite front end** and a **Django REST backend**. The client delivers immersive content (rooms, dining, amenities, gallery, booking, contact) while the Django API handles the catalog, reservations, and contact submissions via `/api/` endpoints.

## Project Overview

- **Frontend (project/)**
	- Routes for Home, Rooms, Dining, Events, Gallery, Amenities, Booking, and Contact.
	- TailwindCSS + Framer Motion for polished visuals and animated sections.
	- Centralized API service that points to the environment variable `VITE_API_BASE_URL` (default `http://localhost:8000/api`).
- **Backend (backend/)**
	- Django 5.2 + DRF app `reservations` with `Room`, `Booking`, and `ContactMessage` models.
	- Viewsets expose `/api/rooms/` (GET), `/api/bookings/` (POST/GET), and `/api/contact-messages/` (POST).
	- `seed_rooms` management command populates suites and creates a superuser (configurable via `ADMIN_*` env variables).

## Frontend Features

1. **Hero & Highlights** – Multi-section hero with call-to-actions, gallery previews, and stat counters.
2. **Room Catalog** – Dynamic cards pulled from the API include amenities, bed type, pricing, occupancy, and imagery.
3. **Booking Flow** – Multi-field form posts directly to `/api/bookings/` and validates required guest details.
4. **Contact Form** – Sends inquiries to `/api/contact-messages/` and surfaces the success state with animations.
5. **Routing + Layout** – Shared `Navbar`, `Footer`, and Framer Motion transitions keep the experience consistent.

## Backend Features

- **Models & Serializers** – Rooms, bookings, and contact messages are modeled with admin-friendly fields (amenities list, guest info, timestamps).
- **Admin Interface** – Registered models in Django admin allow staff to review, edit, or confirm reservations and customer messages.
- **Seed Command** – Run `python manage.py seed_rooms` after migrations to populate rooms and ensure an admin user exists (`admin` / `HotelAdmin2026!` by default).

## Development Setup

### Backend
1. `cd backend`
2. `python -m venv .venv`
3. `\.venv\Scripts\activate` (Windows) or `source .venv/bin/activate`
4. `pip install -r requirements.txt`
5. `python manage.py makemigrations reservations`
6. `python manage.py migrate`
7. Optionally set `ADMIN_USERNAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` if you want custom admin credentials before seeding:
	 ```
	 set ADMIN_USERNAME=ops
	 set ADMIN_EMAIL=ops@hotel.local
	 set ADMIN_PASSWORD=Secret123!
	 ```
8. `python manage.py seed_rooms` (creates rooms + superuser)
9. `python manage.py runserver`

The API is live at `http://localhost:8000/api/` with `/rooms/`, `/bookings/`, `/contact-messages/` endpoints.

### Frontend
1. `cd project`
2. `npm install`
3. `set VITE_API_BASE_URL=http://localhost:8000/api && npm run dev`

Open `http://localhost:5173/` (or whichever port Vite chooses) to explore the UI. Forms automatically hit the Django API when both servers run concurrently.

## Admin Access

After running `seed_rooms`, log into `http://localhost:8000/admin/` with username `admin` and password `HotelAdmin2026!`. Update those credentials before deployment by setting the `ADMIN_*` variables before rerunning the seed command.

## Bonus Tips

- Use the Django admin to reconcile bookings with guest data or respond to contact messages.
- Re-run `python manage.py seed_rooms` to refresh the catalog while keeping existing bookings (it updates rooms by name).
- Point `VITE_API_BASE_URL` to a remote API host if you ever deploy the backend elsewhere.


A modern, responsive hotel website built with **React**, **TailwindCSS**, and a Django REST backend. The experience pages showcase suites, dining, events, a booking wizard, and a contact flow backed by a flexible reservations API.



