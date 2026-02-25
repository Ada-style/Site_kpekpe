from rest_framework import generics, permissions
from .models import Message
from .serializers import MessageSerializer
from django.db.models import Q

class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        other_user_id = self.request.query_params.get('user_id')
        if other_user_id:
            return Message.objects.filter(
                (Q(sender=self.request.user) & Q(receiver_id=other_user_id)) |
                (Q(sender_id=other_user_id) & Q(receiver=self.request.user))
            )
        return Message.objects.filter(Q(sender=self.request.user) | Q(receiver=self.request.user))

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
