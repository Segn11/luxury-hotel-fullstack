from django.db import models
from django.utils.text import slugify


class Room(models.Model):
    ROOM_TYPES = [
        ('standard', 'Standard Room'),
        ('executive', 'Executive Suite'),
        ('presidential', 'Presidential Suite'),
    ]

    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True)
    description = models.TextField()
    price_per_night = models.DecimalField(max_digits=8, decimal_places=2)
    room_type = models.CharField(max_length=20, choices=ROOM_TYPES)
    image_url = models.URLField()
    amenities = models.JSONField(default=list)
    occupancy = models.PositiveSmallIntegerField(default=2)
    bed_type = models.CharField(max_length=80, default='King Size Bed')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            count = 1
            while Room.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{count}"
                count += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Booking(models.Model):
    room = models.ForeignKey(Room, on_delete=models.PROTECT, related_name='bookings')
    guest_name = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=40)
    check_in = models.DateField()
    check_out = models.DateField()
    guests = models.PositiveIntegerField(default=1)
    special_requests = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Booking for {self.guest_name} ({self.room.name})"


class ContactMessage(models.Model):
    full_name = models.CharField(max_length=160)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    subject = models.CharField(max_length=120)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.subject} from {self.full_name}"
