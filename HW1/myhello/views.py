from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.serializers.json import DjangoJSONEncoder
import json
import logging

from .models import Course_table

logger = logging.getLogger('django')


@api_view(['GET'])
def add_course(request):
    department = request.GET.get('Department', '')
    course_title = request.GET.get('CourseTitle', '')
    instructor = request.GET.get('Instructor', '')

    new_course = Course_table()
    new_course.Department = department
    new_course.CourseTitle = course_title
    new_course.Instructor = instructor
    new_course.save()

    logger.debug('************** add_course: ' + course_title)

    if course_title:
        return Response(
            {"data": course_title + " insert!"},
            status=status.HTTP_200_OK
        )
    else:
        return Response(
            {"res": "parameter: CourseTitle is None"},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET'])
def list_course(request):
    courses = Course_table.objects.all().values()
    return Response(
        {"data": list(courses)},
        status=status.HTTP_200_OK
    )