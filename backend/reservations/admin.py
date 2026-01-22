from django.contrib import admin
from .models import Booking, ContactMessage, Room


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('name', 'room_type', 'price_per_night', 'occupancy')
    list_filter = ('room_type', 'occupancy')
    search_fields = ('name',)


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('guest_name', 'room', 'check_in', 'check_out', 'guests', 'created_at')
    list_filter = ('room__room_type', 'check_in')
    search_fields = ('guest_name', 'email', 'phone')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('subject', 'full_name', 'email', 'created_at')
    list_filter = ('subject',)
    search_fields = ('full_name', 'email', 'subject')
