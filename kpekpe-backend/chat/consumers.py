import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.utils import timezone

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        if self.user.is_anonymous:
            await self.close()
        else:
            self.room_group_name = f'chat_{self.user.id}'
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()

    async def disconnect(self, close_code):
        if not self.user.is_anonymous:
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        receiver_id = data['receiver_id']

        # Envoi au destinataire
        await self.channel_layer.group_send(
            f'chat_{receiver_id}',
            {
                'type': 'chat_message',
                'message': message,
                'sender_id': self.user.id,
                'timestamp': str(timezone.now())
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event))
