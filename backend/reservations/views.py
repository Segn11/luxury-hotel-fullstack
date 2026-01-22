from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny
from .models import Booking, ContactMessage, Room
from .serializers import BookingSerializer, ContactMessageSerializer, RoomSerializer


class RoomViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Room.objects.order_by('name')
    serializer_class = RoomSerializer
    http_method_names = ['get', 'head', 'options']


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]
    http_method_names = ['get', 'post', 'head', 'options']


class ContactMessageViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
    http_method_names = ['post', 'head', 'options']
