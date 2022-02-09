from django.urls import path
from game.consumers.multiplayer.index import MultiPlayer

# 类似于urls
websocket_urlpatterns = [
    path("wss/multiplayer/", MultiPlayer.as_asgi(), name="wss_multiplayer"),
]
