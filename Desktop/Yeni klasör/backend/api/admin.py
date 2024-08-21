from django.contrib import admin
from api.models import User, Profile, Todo, ChatMessage

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name', 'verified']
    list_editable = ['verified']  # Ensure 'verified' is a valid field in Profile

class TodoAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'completed', 'date']
    list_editable = ['completed']  # Ensure 'completed' is a valid field in Todo

class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['sender', 'reciever', 'message', 'is_read']
    list_editable = ['is_read']
    # Removed 'completed' from list_editable as it's not a field in ChatMessage

admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Todo, TodoAdmin)
admin.site.register(ChatMessage, ChatMessageAdmin)
