from django.shortcuts import render
from django.contrib.auth.models import User
from my_blog.models.article.article import ArticlePost

def article_list(request):
    articles = ArticlePost.objects.all()    # 取出所有博客文章
    context = {'articles': articles}        # 需要传递给模板（templates）的对象
    return render(request, "article/list.html", context)
