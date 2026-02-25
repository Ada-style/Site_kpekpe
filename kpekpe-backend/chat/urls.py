from django.urls import path
from .views import MessageListCreateView, AIChatView

urlpatterns = [
    path('', MessageListCreateView.as_view(), name='message-list'),
    path('ai/', AIChatView.as_view(), name='ai-chat'),
]
