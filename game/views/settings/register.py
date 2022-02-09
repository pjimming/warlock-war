from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from game.models.player.player import Player



def register(request):
    data = request.GET
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()
    password_confirm = data.get("password_confirm", "").strip()
    if not username or not password:
        return JsonResponse({
            'result': "用户名和密码不能为空"
        })
    if password != password_confirm:
        return JsonResponse({
            'result': "两个密码不一致",
        })
    if User.objects.filter(username=username).exists():
        return JsonResponse({
            'result': "用户名已存在"
        })
    user = User(username=username)
    user.set_password(password) # 存储密码的哈希值，保护性
    user.save() # 保存用户
    Player.objects.create(user=user, photo="https://tse1-mm.cn.bing.net/th/id/R-C.6957fedb4e990365803a79f41e76529b?rik=E8xCgZmKXcOCzg&riu=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190909%2F8c24879180514bd1a6d9f37aaf6ee367.JPG&ehk=VBVSGq4fbVD7Ku29avu3Tbg3oxf8lDzsvKvO4aIhaZ0%3D&risl=&pid=")
    login(request, user)
    return JsonResponse({
        'result': "success",
    })

