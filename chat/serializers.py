from rest_framework import serializers
from .models import Chat, Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('image', 'uploaded')


class ChatSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('id', 'token', 'images')
