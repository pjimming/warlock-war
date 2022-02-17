from django.http import JsonResponse
from game.models.player.player import Player

def getinfo_acapp(request): # 从acapp上登录
    player = Player.objects.all()[0]
    return JsonResponse({
        'result': "success",
        'username': player.user.username,
        'photo': player.photo,
    })



def getinfo_web(request):   # 从web上登录
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({
            'result': "未登录"
        })
    else:
        player = Player.objects.get(user=user)
        print(player.user.username)
        return JsonResponse({
            'result': "success",
            'username': player.user.username,
            'photo': player.photo,
        })



def getinfo(request):
    platform = request.GET.get('platform')
    if platform == "ACAPP":
        return getinfo_acapp(request)
    elif platform == "WEB":
        return getinfo_web(request)
