from django.urls import path
from my_blog.views.article.article_list import article_list
from my_blog.views.article.article_detail import article_detail

urlpatterns = [
    path("", article_list, name="article_article_list"),
    path("detail/<int:id>/", article_detail, name="article_article_detail")
]
