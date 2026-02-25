from rest_framework import viewsets, permissions
from .models import Course, Enrollment, Competition, University, Tutor
from .serializers import (
    CourseSerializer, EnrollmentSerializer, CompetitionSerializer,
    UniversitySerializer, TutorSerializer
)

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        return Enrollment.objects.filter(student=self.request.user)

class CompetitionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer

class UniversityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer

class TutorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer
