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
from .knowledge import UNIVERSITIES_TOGO, METIERS_PORTEURS_TOGO, PERSONALITY_QUESTIONS

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
                "Tu es Kpékpé Learnia, l'intelligence artificielle experte en orientation et tutorat pour la jeunesse togolaise. "
                "Ton slogan est 'Light on your way'. Tu es le cerveau qui connaît parfaitement le Togo.\n\n"
                
                "CONNAISSANCES EXPERTES :\n"
                f"- UNIVERSITÉS ET ÉCOLES (97+) : Tu connais notamment : {', '.join(UNIVERSITIES_TOGO[:20])} et bien d'autres.\n"
                f"- MÉTIERS PORTEURS (50+) : Tu recommandes des métiers dans les secteurs : {', '.join(METIERS_PORTEURS_TOGO.keys())}.\n"
                "- RÉALITÉS LOCALES : Tu parles de l'ANPE, des quartiers de Lomé, des salaires en FCFA, et des concours nationaux.\n\n"
                
                "VOTRE MISSION (LOGIQUE IKIGAI) :\n"
                "1. Si l'utilisateur veut un test d'orientation, tu dois poser 5 questions de personnalité avec 4 options (A, B, C, D) chacune, "
                "puis 3 questions Ikigai (Passions, Talents, Impact souhaité).\n"
                "2. Après le test, fournis un TOP 3 des métiers avec : Nom, Pourquoi (Ikigai), Écoles conseillées (parmi les 97), et Salaire estimé au Togo.\n"
                "3. En tant que tuteur, aide aussi sur les cours numériques (IA, Google Workspace).\n\n"
                
                "STYLE : Bienveillant, pédagogue, utilisant des expressions locales polies. Réponds en français."
            )
            
            # Détection et injection du questionnaire si nécessaire
            if "test" in history[-1]['content'].lower() or "orientation" in history[-1]['content'].lower():
                system_prompt += "\n\nINSTRUCTION ACTUELLE : L'utilisateur semble vouloir commencer le test. Présente-toi et pose la PREMIÈRE QUESTION du test de personnalité (Question 1/5)."
            
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
