from django.urls import path
from my_blog.views.article.article_list import article_list
from my_blog.views.article.article_detail import article_detail
from my_blog.views.article.article_create import article_create

urlpatterns = [
    path("", article_list, name="article_article_list"),
    path("detail/<int:id>/", article_detail, name="article_article_detail"),
    path("article_create/", article_create, name="article_article_create"),
]
