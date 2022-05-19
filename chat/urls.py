from django.urls import path
from chat.views import ChatAPI, ChatCreateAPI

urlpatterns = [
    path('', ChatCreateAPI.as_view(), name="chat_create_api"),
    path('<int:pk>/', ChatAPI.as_view(), name="chat_api"),
]
