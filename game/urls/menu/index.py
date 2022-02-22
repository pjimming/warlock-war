from django.urls import path
from game.views.menu.replace_photo import replace_photo

urlpatterns = [
    path("replace_photo/", replace_photo, name="menu_replace_photo"),
]
