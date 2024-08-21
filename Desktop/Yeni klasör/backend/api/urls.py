from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('', views.getRoutes),

    # Todo URLS
    path("todo/<user_id>/", views.TodoListView.as_view()),
    path("todo-detail/<user_id>/<todo_id>/", views.TodoDetailView.as_view()),
    path("todo-mark-as-completed/<user_id>/<todo_id>/", views.TodoMarkAsCompleted.as_view()),

    # Chat Message
    path("my-messages/<user_id>/",views.MyInbox.as_view()),
    path("get-messages/<sender_id>/<reciever_id>/",views.GetMessages.as_view()),
    path("send-messages/",views.SendMessage.as_view()),
    
    # Get/Filter Data
    path("profile/<int:pk>/",views.ProfileDetail.as_view()),
    path("search/<str:username>/",views.SearchUser.as_view()),

]