from django.shortcuts import redirect
from django.core.cache import cache
import requests
from urllib.parse import quote
from django.contrib.auth.models import User
from game.models.player.player import Player
from django.contrib.auth import login
from random import randint

def receive_code(request):
    data = request.GET
    code = data.get('code')
    state = data.get('state')

    if not cache.has_key(state):
        return redirect("index")

    cache.delete(state)

    apply_access_token_url = "https://graph.qq.com/oauth2.0/token"
    params = {
            'grant_type' : "authorization_code",
            'client_id' : "101998264",
            'client_secret' : "930340dc415b245964c9bce20812d05c",
            'code' : code,
            'redirect_uri' : "https://pjmcode.top/warlockwar/settings/qq/receive_code",
            'fmt' : "json"
    }

    access_token_res = requests.get(apply_access_token_url,params=params).json()
    access_token = access_token_res['access_token']

    get_user_openid_url = "https://graph.qq.com/oauth2.0/me"
    params = {
            'access_token' : access_token,
            'fmt' : "json"
    }

    openid_res = requests.get(get_user_openid_url,params=params).json()
    openid = openid_res['openid']

    players = Player.objects.filter(openid=openid)
    if players.exists():
        login(request,players[0].user)
        return redirect("index")

    get_userinfo_url = "https://graph.qq.com/user/get_user_info"

    params = {
            'access_token':access_token,
            'oauth_consumer_key':"101998264",
            'openid':openid,
            'fmt' : "json"
    }

    userinfo_res = requests.get(get_userinfo_url,params=params).json()

    username = userinfo_res['nickname']
    photo = userinfo_res['figureurl_qq_1']

    while User.objects.filter(username=username).exists():
        username += str(randint(0,9))

    user = User.objects.create(username=username)
    player = Player.objects.create(user=user,photo=photo,openid=openid)


    login(request,user)

    return redirect("index")

