from django.http import JsonResponse
from urllib.parse import quote
from random import randint
from django.core.cache import cache

def get_state():
    res = ""
    for i in range(8):
        res += str(randint(0, 9))
    return res

def apply_code(request):
    appid = "1356"  # 应用的唯一id
    redirect_uri = quote("https://pjmcode.top/settings/acwing/web/receive_code/")   # 接收授权码的地址，需要用urllib.parse.quote对链接进行转义处理
    scope = "userinfo"  # 申请授权的范围
    state = get_state() # 防止被攻击

    cache.set(state, True, 7200)    # 有效期 2 hours

    apply_code_url = "https://www.acwing.com/third_party/api/oauth2/web/authorize/"
    return JsonResponse({
        'result': "success",
        'apply_code_url': apply_code_url + "?appid=%s&redirect_uri=%s&scope=%s&state=%s" % (appid, redirect_uri, scope, state)
    })  # 返回给前端重定向的网址


