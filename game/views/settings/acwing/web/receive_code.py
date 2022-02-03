from django.shortcuts import redirect
from django.core.cache import cache
import requests
from django.contrib.auth.models import User
from game.models.player.player import Player
from django.contrib.auth import login
from random import randint

def receive_code(request):
    # 接收授权码
    data = request.GET
    code = data.get('code') # 重定向返回的code参数
    state = data.get('state')   # 返回state参数

    if not cache.has_key(state):    # 用于判断请求和回调的一致性（安全）
        return redirect("index")
    cache.delete(state) # 用完就删

    apply_access_token_url = "https://www.acwing.com/third_party/api/oauth2/access_token/"
    params = {
        'appid': "1356",    # 应用的唯一id
        'secret': "a7f2e72568d7431a868dee72c6279277",   # 应用密钥
        'code': code    # 获取得到的授权码
    }

    access_token_res = requests.get(apply_access_token_url, params=params).json()   # 发送授权码，appid，secret给acwing

    access_token = access_token_res['access_token'] # 授权令牌，有效期2小时
    openid = access_token_res['openid'] # 用户的id，用于唯一识别

    players = Player.objects.filter(openid=openid)
    if players.exists():    # 用户已存在，直接登录
        login(request, players[0].user)
        return redirect("index")

    # 接收用户username和photo信息
    get_userinfo_url = "https://www.acwing.com/third_party/api/meta/identity/getinfo/"
    params = {
        "access_token": access_token,
        "openid": openid
    }
    userinfo_res = requests.get(get_userinfo_url, params=params).json()
    username = userinfo_res['username']
    photo = userinfo_res['photo']

    while User.objects.filter(username=username).exists():
        username += str(randint(0, 9))

    user = User.objects.create(username=username)
    player = Player.objects.create(user=user, photo=photo, openid=openid)

    login(request, user)

    return redirect("index")


