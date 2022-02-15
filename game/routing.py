from django.urls import path
from game.consumers.multiplayer.index import MultiPlayer
from game.consumers.warlockchat.index import WarlockChat

# 类似于urls
websocket_urlpatterns = [
    path("wss/multiplayer/", MultiPlayer.as_asgi(), name="wss_multiplayer"),
    path("wss/warlockchat/", WarlockChat.as_asgi(), name="wss_warlockchat"),
]
