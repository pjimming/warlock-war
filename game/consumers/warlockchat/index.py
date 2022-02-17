from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.core.cache import cache

class WarlockChat(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard('history', self.channel_name);

    def Ord_username(self, username):
        group_name = ""
        for ch in username:
            group_name = group_name + str(ord(ch))
        return group_name

    async def receive(self, text_data):
        data = json.loads(text_data)
        event = data['event']
        username = data['username']

        if not cache.has_key('history'):
            cache.set('history', [], None)

        await self.channel_layer.group_add('history', self.channel_name)
        await self.channel_layer.group_add(self.Ord_username(username), self.channel_name)

        if event == "message":
            await self.message(data)
        elif event == "init":
            await self.init(data)


    async def message(self, data):  # 发送信息
        # 存储
        messages = cache.get('history')
        messages.append({
            'username': data['username'],
            'time': data['time'],
            'text': data['text'],
        })
        cache.set('history', messages, None)
        # 发送
        await self.channel_layer.group_send(
            'history',
            {
                'type': "group_send_event",
                'event': "message",
                'username': data['username'],
                'time': data['time'],
                'text': data['text'],
            }
        )

    async def init(self, data): # 初始化Warlock Chat
        await self.channel_layer.group_send(
            self.Ord_username(data['username']),
            {
                'type': "group_send_event",
                'event': "init",
                'details': cache.get('history'),
            }
        )

    async def group_send_event(self, data):
        await self.send(text_data=json.dumps(data))

