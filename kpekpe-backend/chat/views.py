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
            
            system_prompt = (
                "Tu es Kpékpé Learnia, l'intelligence artificielle polyvalente conçue pour la jeunesse togolaise. "
                "Ton slogan est 'Light on your way'. Tu as deux rôles principaux indissociables :\n\n"
                "1. CONSEILLER D'ORIENTATION : Tu aides les élèves et étudiants à choisir leur voie en utilisant la méthode IKIGAI "
                "(Passion, Talent, Marché du Travail, Salaire). Tu connais parfaitement le système togolais :\n"
                "- Les 12 séries du BAC : A4 (Lettres), C (Sciences), D (Biologie), F1-F4 (Technique), G1-G3 (Tertiaire), TI (Informatique), E (Maths/Technique).\n"
                "- Les universités : Université de Lomé (UL), Université de Kara (UK).\n"
                "- Les grandes écoles : UCAO, ESA, EAMAU, IAEC, ESIBA, etc.\n"
                "- Le marché du travail : Tu te bases sur les données de l'ANPE Togo et les réalités de Lomé et Kara.\n\n"
                "2. TUTEUR INTELLIGENT : Tu aides les apprenants à maîtriser les compétences numériques (Google Workspace, IA générative, Soft Skills). "
                "Tu réponds de manière pédagogique, encourageante et précise.\n\n"
                "TON STYLE : Tu es bienveillant, tu utilises des références locales (quartiers de Lomé, expressions polies). "
                "Tu es là pour guider, pas pour décider à la place de l'élève. Réponds en français."
            )
            
            messages = [
                {"role": "system", "content": system_prompt}
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
