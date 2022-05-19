from django.urls import path
from chat.views import ChatAPI, ChatCreateAPI

urlpatterns = [
    path('', ChatAPI.as_view(), name="chat_api"),
]
