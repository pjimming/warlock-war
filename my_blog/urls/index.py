from django.urls import path, include
from my_blog.views.index import index

urlpatterns = [
    path("", index, name="index"),
]
