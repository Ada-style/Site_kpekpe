from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CourseViewSet, EnrollmentViewSet, CompetitionViewSet,
    UniversityViewSet, TutorViewSet
)

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'enrollments', EnrollmentViewSet)
router.register(r'competitions', CompetitionViewSet)
router.register(r'universities', UniversityViewSet)
router.register(r'tutors', TutorViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
