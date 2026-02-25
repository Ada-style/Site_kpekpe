from django.urls import path
from .views import StudentDashboardView, InstructorDashboardView, AdminDashboardView

urlpatterns = [
    path('apprenant/', StudentDashboardView.as_view(), name='dashboard_student'),
    path('formateur/', InstructorDashboardView.as_view(), name='dashboard_instructor'),
    path('admin/', AdminDashboardView.as_view(), name='dashboard_admin'),
]
