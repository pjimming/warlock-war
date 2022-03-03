from django.urls import URLPattern, path
from my_blog.views.work.work_list import work_list

urlpatterns = [
    path("", work_list, name="work_work_list"),
]