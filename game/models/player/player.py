from django.db import models    # 从django的数据库中引入models
from django.contrib.auth.models import User # 从django中引入基本的User类

class Player(models.Model):    # 从models.Model这个类中来继承
    # 将user表(django自带的)和palyer表关联起来，on_delete=models.CASCADE只当user删除，player也跟着删除
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.URLField(max_length=256, blank=True) # blank=True表示可以为空
    openid = models.CharField(default="", max_length=50, blank=True, null=True)

    def __str__(self):
        # 意思就是django后台管理是图形化的，那么打开player表用什么来展示每一项呢，就是这个函数的作用
        return str(self.user)
