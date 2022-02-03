# 注册表
from django.contrib import admin
from game.models.player.player import Player

# Register your models here.

admin.site.register(Player) # 注册自己定义的Player数据表
