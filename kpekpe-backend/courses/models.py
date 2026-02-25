from django.db import models
from django.conf import settings

class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='authored_courses')
    domain = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='courses/', blank=True, null=True)

    def __str__(self):
        return self.title

class Enrollment(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    enrolled_at = models.DateTimeField(auto_now_add=True)
    progress = models.IntegerField(default=0) # Pourcentage 0-100
    is_completed = models.BooleanField(default=False)
    certificate_url = models.URLField(blank=True, null=True)

    class Meta:
        unique_together = ('student', 'course')

    def __str__(self):
        return f"{self.student.username} -> {self.course.title}"

class Competition(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateTimeField()
    questions = models.JSONField() # Liste de questions/réponses
    ranking = models.JSONField(default=list) # Top scoreurs

    def __str__(self):
        return self.title

class University(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    domains = models.TextField() # Domaines séparés par des virgules
    fees = models.TextField() # Informations sur les frais
    is_partner = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Tutor(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tutor_profile')
    subjects = models.TextField()
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2)
    availability = models.JSONField() # Planning hebdomadaire

    def __str__(self):
        return f"Tuteur: {self.user.username}"
