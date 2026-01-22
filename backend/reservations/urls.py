from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookingViewSet, ContactMessageViewSet, RoomViewSet

router = DefaultRouter()
router.register('rooms', RoomViewSet)
router.register('bookings', BookingViewSet)
router.register('contact-messages', ContactMessageViewSet, basename='contactmessage')

urlpatterns = [
    path('', include(router.urls)),
]
