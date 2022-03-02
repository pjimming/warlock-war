from django.shortcuts import render
from django.contrib.auth.models import User
from my_blog.models.article.article import ArticlePost
import markdown

def article_detail(request, id):
    article = ArticlePost.objects.get(id=id)
    # 将markdown语法渲染成html样式
    article.body = markdown.markdown(article.body,
        extensions=[
        # 包含 缩写、表格等常用扩展
        'markdown.extensions.extra',
        # 语法高亮扩展
        'markdown.extensions.codehilite',
        ])
    context = {'article': article}
    return render(request, "article/detail.html", context)