import requests
from django.utils.translation.trans_real import translation

from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser

from django.db import transaction
from .services.telegram import send_application_to_telegram
from functools import partial

from server.wsgi import application
from .filters import JobFilter
from .models import (
    Job, Specification, Experience, Education, TypeOfEmployment, FiltersJobMainPage, FAQ, TelegramManager,
    TownWork, WorkApplication
)
from .serializers import (
    JobSerializer, SpecificationSerializer,
    EducationSerializer, ExperienceSerializer,
    TypeOfEmploymentSerializer, FiltersJobMainPageSerializer, FAQSerializer, TownWorkSerializer,
    TelegramManagerSerializer, WorkApplicationCreateSerializer, JobApplicationSerializer
)

from .pagination import JobPagination

TOKEN = '8609421969:AAEsDg9AAdoeLWCB5P3nH2tDyjv8nLYbEuY'
CHAT_ID = 8746990046


class JobApplicationListAPIView(ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobApplicationSerializer
    permission_classes = [AllowAny]


class TownWorkListAPIView(ListAPIView):
    queryset = TownWork.objects.all()
    serializer_class = TownWorkSerializer
    permission_classes = [AllowAny]


class TelegramManagerListAPIView(ListAPIView):
    queryset = TelegramManager.objects.filter(is_active=True)
    serializer_class = TelegramManagerSerializer
    permission_classes = [AllowAny]


class WorkApplicationCreateAPIView(CreateAPIView):
    serializer_class = (
        WorkApplicationCreateSerializer
    )

    permission_classes = [AllowAny]

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    def perform_create(self, serializer):
        application = serializer.save()

        transaction.on_commit(
            partial(
                send_application_to_telegram,
                application.pk,
            )
        )


class JobViewSet(ModelViewSet):
    serializer_class = JobSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = JobFilter
    pagination_class = JobPagination

    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'

    def get_queryset(self):
        return (
            Job.objects.all()
        )


class JobFiltersAPIView(APIView):
    def get(self, request):
        specifications = Specification.objects.all()
        educations = Education.objects.all()
        experiences = Experience.objects.all()
        types_of_employment = TypeOfEmployment.objects.all()

        return Response({
            'specifications': SpecificationSerializer(specifications, many=True).data,
            'educations': EducationSerializer(educations, many=True).data,
            'experiences': ExperienceSerializer(experiences, many=True).data,
            'types_of_employment': TypeOfEmploymentSerializer(types_of_employment, many=True).data,
        })


class SendTelegramApplicationApiView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        name = request.data.get('name')
        date = request.data.get('date')
        mail = request.data.get('mail')
        phone = request.data.get('phone')
        dolj = request.data.get('dolj')
        file = request.FILES.get("file")

        bot_token = TOKEN
        chat_id = CHAT_ID

        text = f'Имя: {name}\nДата рождени: {date}\nПочта: {mail}\nТелефон: {phone}\nЖелаемая должность: {dolj}'

        if file:
            url = f'https://api.telegram.org/bot{bot_token}/sendDocument'

            response = requests.post(
                url=url,
                data={
                    'chat_id': chat_id,
                    'caption': text
                },
                files={
                    "document": (file.name, file, file.content_type)
                }
            )
        else:
            url = f'https://api.telegram.org/bot{bot_token}/sendMessage'

            response = requests.post(
                url,
                data={
                    "chat_id": chat_id,
                    "text": text
                }
            )

        if not response.ok:
            return Response(
                {
                    "success": False,
                    "error": "Ошибка отправки в Telegram",
                    "details": response.json()
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        print("DATA:", request.data)
        print("FILES:", request.FILES)
        print("BOT_TOKEN:", bot_token)
        print("CHAT_ID:", chat_id)
        print("TG RESPONSE:", response.status_code, response.text)

        return Response({"success": True})


class FiltersJobMainPageAPIView(APIView):
    def get(self, request):
        qr = FiltersJobMainPage.objects.all()
        serializer = FiltersJobMainPageSerializer(qr, many=True, context={'request': request})
        return Response(serializer.data)


class FAQAPIView(APIView):
    def get(self, request):
        qr = FAQ.objects.all()
        serializer = FAQSerializer(qr, many=True)
        return Response(serializer.data)