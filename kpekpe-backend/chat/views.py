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
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
from groq import Groq
from django.conf import settings

class AIChatView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        message = request.data.get('message')
        history = request.data.get('history', [])
        
        if not message:
            return Response({"error": "Message est requis"}, status=status.HTTP_400_BAD_REQUEST)

        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            return Response({"error": "Clé API Groq non configurée"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            client = Groq(api_key=api_key)
            
            messages = [
                {"role": "system", "content": "Tu es Kpékpé Learnia, un tuteur intelligent pour les élèves et étudiants au Togo. Tu réponds de manière pédagogique, encourageante et précise. Utilise le français."}
            ]
            
            for h in history:
                messages.append({"role": "user", "content": h['user']})
                messages.append({"role": "assistant", "content": h['ai']})
                
            messages.append({"role": "user", "content": message})

            chat_completion = client.chat.completions.create(
                messages=messages,
                model="llama3-8b-8192",
            )
            
            reply = chat_completion.choices[0].message.content
            return Response({"reply": reply})
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
