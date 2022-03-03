from django.urls import path
from my_blog.views.aboutme.aboutme import aboutme

urlpatterns = [
    path("", aboutme, name="aboutme_aboutme"),
]