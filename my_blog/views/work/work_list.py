from django.shortcuts import render

def work_list(request):
    return render(request, "work/warlock.html")