from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from .models import Chat
from .serializers import ChatSerializer
from .utils import is_valid_uuid


class ChatAPI(APIView):
    """
    API endpoint for creating new empty secret chat and getting stickers from the chat
    """
    permission_classes = [AllowAny]

    def get(self, request: Request):
        token = request.query_params.get("token", "")
        if token == "":
            new_chat = Chat.objects.create()
            url = reverse("chat_api", args=[new_chat.id]) + "?token=" + str(new_chat.token)
            return Response(data={'chat': ChatSerializer(new_chat).data,
                                  'url': url}, status=status.HTTP_201_CREATED)

        if is_valid_uuid(token):
            chat = get_object_or_404(Chat, token=token)
            if str(chat.token) == token:
                return Response(data=ChatSerializer(chat).data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class ImageAPI(APIView):
    def post(self, request):
        try:
            image = request.data['image']
        except KeyError:
            return Response(status=status.HTTP_204_NO_CONTENT)

