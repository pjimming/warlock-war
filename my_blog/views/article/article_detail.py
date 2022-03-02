from django.shortcuts import render
from django.contrib.auth.models import User
from my_blog.models.article.article import ArticlePost

def article_detail(request, id):
    article = ArticlePost.objects.get(id=id)
    context = {'article': article}
    return render(request, "article/detail.html", context)