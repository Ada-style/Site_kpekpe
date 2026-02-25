from rest_framework import serializers
from .models import Course, Enrollment, Competition, University, Tutor

class CourseSerializer(serializers.ModelSerializer):
    instructor_name = serializers.ReadOnlyField(source='instructor.username')

    class Meta:
        model = Course
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    student_name = serializers.ReadOnlyField(source='student.username')
    course_name = serializers.ReadOnlyField(source='course.title')

    class Meta:
        model = Enrollment
        fields = '__all__'

class CompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competition
        fields = '__all__'

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = '__all__'

class TutorSerializer(serializers.ModelSerializer):
    tutor_name = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Tutor
        fields = '__all__'
