from django.db import models
from django.utils import timezone
from uuid import uuid4


class Chat(models.Model):
    def save(self, *args, **kwargs):
        self.token = uuid4()
        return super(Chat, self).save(*args, **kwargs)
    token = models.UUIDField(verbose_name="tokens", blank=True)


def get_image_path(instance, filename):
    return "chat_images/%d-%s" % (instance.chat.id, filename)


class Image(models.Model):
    def save(self, *args, **kwargs):
        if not self.id:
            self.uploaded = timezone.now()
        return super(Image, self).save(*args, **kwargs)
    chat = models.ForeignKey(to=Chat, on_delete=models.CASCADE, null=False, related_name="images")
    image = models.ImageField(upload_to=get_image_path, verbose_name="images")
    caption = models.CharField(max_length=255, default="")
    uploaded = models.DateTimeField(blank=True)
