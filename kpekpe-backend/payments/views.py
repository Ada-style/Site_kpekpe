from rest_framework import status, views, permissions
from rest_framework.response import Response
from .models import Payment
from .serializers import PaymentSerializer

class InitiatePaymentView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            payment = serializer.save(user=request.user)
            # Simuler l'initialisation Mobile Money (Toogo)
            # Ici on renverrait normalement l'URL de paiement ou le statut
            return Response({
                "message": "Paiement initié avec succès",
                "payment_id": payment.id,
                "amount": payment.amount,
                "operator": payment.operator,
                "commission_kpekpe": payment.commission
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PaymentWebhookView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        # Simulation Webhook de confirmation (Moov/Mixx)
        transaction_id = request.data.get('transaction_id')
        payment_id = request.data.get('payment_id')
        status_update = request.data.get('status') # 'success' or 'failed'

        try:
            payment = Payment.objects.get(id=payment_id)
            payment.transaction_id = transaction_id
            payment.status = status_update
            payment.save()
            
            if status_update == 'success':
                # Ici : Logique de redistribution au formateur
                # redistribution = payment.amount - payment.commission
                pass
                
            return Response({"status": "Webhook reçu et traité"}, status=status.HTTP_200_OK)
        except Payment.DoesNotExist:
            return Response({"error": "Paiement non trouvé"}, status=status.HTTP_404_NOT_FOUND)
