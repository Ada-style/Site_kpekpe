from rest_framework import views, permissions
from rest_framework.response import Response
from courses.models import Course, Enrollment
from users.models import User
from payments.models import Payment

class StudentDashboardView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        enrollments = Enrollment.objects.filter(student=request.user)
        # Stats simplifiées
        data = {
            "total_courses": enrollments.count(),
            "completed_courses": enrollments.filter(is_completed=True).count(),
            "courses": [
                {"id": e.course.id, "title": e.course.title, "progress": e.progress}
                for e in enrollments
            ]
        }
        return Response(data)

class InstructorDashboardView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role != 'formateur':
            return Response({"error": "Accès réservé aux formateurs"}, status=403)
        
        courses = Course.objects.filter(instructor=request.user)
        total_students = Enrollment.objects.filter(course__in=courses).count()
        total_revenue = sum(p.amount - p.commission for p in Payment.objects.filter(course__in=courses, status='success'))

        data = {
            "total_courses": courses.count(),
            "total_students": total_students,
            "total_revenue": total_revenue,
            "courses": [{"id": c.id, "title": c.title} for c in courses]
        }
        return Response(data)

class AdminDashboardView(views.APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        data = {
            "total_users": User.objects.count(),
            "total_courses": Course.objects.count(),
            "total_payments": Payment.objects.filter(status='success').count(),
            "total_commission": sum(p.commission for p in Payment.objects.filter(status='success'))
        }
        return Response(data)
