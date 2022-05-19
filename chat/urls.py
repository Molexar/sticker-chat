from django.urls import path
from chat.views import ChatAPI, ImageAPI

urlpatterns = [
    path('', ChatAPI.as_view(), name="chat_api"),
    path('img/', ImageAPI.as_view()),
]
