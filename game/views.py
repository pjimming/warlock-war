from django.http import HttpResponse

def index(request):
    line1 = '<h1 style="text-align:center">PJM LOVE CXY</h1>'
    image1 = '<img src="https://git.acwing.com/Payxtl/acapp/-/raw/master/game/photo.jpg" width=1800>'
    return HttpResponse(line1 + image1)
