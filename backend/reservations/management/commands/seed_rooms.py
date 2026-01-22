import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from reservations.models import Room


class Command(BaseCommand):
    help = 'Seed the database with the default room catalog'

    def handle(self, *args, **options):
        rooms = [
            {
                'name': 'Standard Room',
                'description': 'Comfortable and elegantly designed standard rooms perfect for business and leisure travelers.',
                'price_per_night': 120.00,
                'room_type': 'standard',
                'image_url': 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1200',
                'amenities': ['King Size Bed', 'City View', 'Complimentary WiFi', 'Mini Bar', 'Room Service'],
                'occupancy': 2,
                'bed_type': 'King Size Bed',
            },
            {
                'name': 'Executive Suite',
                'description': 'Spacious suites with separate living areas and premium amenities for the discerning traveler.',
                'price_per_night': 250.00,
                'room_type': 'executive',
                'image_url': 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1200',
                'amenities': ['Separate Living Area', 'Mountain View', 'Complimentary Breakfast', 'Executive Lounge Access'],
                'occupancy': 4,
                'bed_type': 'King Size Bed',
            },
            {
                'name': 'Presidential Suite',
                'description': 'The ultimate in luxury accommodation with panoramic views and personalized service.',
                'price_per_night': 500.00,
                'room_type': 'presidential',
                'image_url': 'https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=1200',
                'amenities': ['Luxury Furnishings', 'Panoramic Views', 'Butler Service', 'Private Balcony', 'Premium Bar'],
                'occupancy': 6,
                'bed_type': 'King Size Bed',
            },
        ]

        for room_data in rooms:
            Room.objects.update_or_create(name=room_data['name'], defaults=room_data)

        self.stdout.write(self.style.SUCCESS('Seeded room catalog successfully.'))
        self._ensure_admin_user()

    def _ensure_admin_user(self):
        User = get_user_model()
        username = os.getenv('ADMIN_USERNAME', 'admin')
        email = os.getenv('ADMIN_EMAIL', 'admin@example.com')
        password = os.getenv('ADMIN_PASSWORD', 'HotelAdmin2026!')

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING(f'Superuser "{username}" already exists.'))
            return

        User.objects.create_superuser(username=username, email=email, password=password)
        self.stdout.write(self.style.SUCCESS(f'Created superuser "{username}" with the provided credentials.'))
