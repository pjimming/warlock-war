from django.http import JsonResponse
from django.contrib.auth.models import User
from game.models.player.player import Player

def replace_photo(request):
    data = request.GET
    username = data.get('username')
    photo = data.get("photo", "").strip()
    if not photo.startswith("https://tse", 0, 11):
        return JsonResponse({
            'result': "图片链接格式错误",
        })
    if not photo.startswith("-mm.cn.bing.net/th/id/", 12, 34):
        return JsonResponse({
            'result': "图片链接格式错误",
        })

    player = Player.objects.get(user__username=username)
    player.photo = photo
    player.save()

    return JsonResponse({
        'result': "success",
    })
