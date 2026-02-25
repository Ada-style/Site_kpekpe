from django.db import models
from django.conf import settings
from courses.models import Course

class Payment(models.Model):
    OPERATOR_CHOICES = (
        ('moov', 'Moov Money'),
        ('mixx', 'Mixx by Yas'),
    )
    STATUS_CHOICES = (
        ('pending', 'En attente'),
        ('success', 'Réussi'),
        ('failed', 'Échoué'),
    )
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    commission = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    operator = models.CharField(max_length=20, choices=OPERATOR_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    transaction_id = models.CharField(max_length=100, unique=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def calculate_commission(self):
        # Formation < 15 000 FCFA → 5%
        # 15 000 - 50 000 FCFA → 10%
        # > 50 000 FCFA → 30%
        if self.amount < 15000:
            return self.amount * 0.05
        elif self.amount <= 50000:
            return self.amount * 0.10
        else:
            return self.amount * 0.30

    def save(self, *args, **kwargs):
        if not self.commission:
            self.commission = self.calculate_commission()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Payment {self.id} - {self.status}"
