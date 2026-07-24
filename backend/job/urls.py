from django.urls import path
from rest_framework.routers import DefaultRouter
from job.views import (
    JobViewSet, JobFiltersAPIView, SendTelegramApplicationApiView,
    FiltersJobMainPageAPIView, FAQAPIView, TelegramManagerListAPIView, TownWorkListAPIView,
    WorkApplicationCreateAPIView, JobApplicationListAPIView
)

router = DefaultRouter()

router.register('jobs', JobViewSet, basename='job')

urlpatterns = [
    path('job-filters/', JobFiltersAPIView.as_view(), name='job_filters'),
    path('send-telegram-application/', SendTelegramApplicationApiView.as_view(), name='send_telegram_application'),
    path('filters-main-page/', FiltersJobMainPageAPIView.as_view(), name='filters_main_page'),
    path('faq/', FAQAPIView.as_view(), name='faq'),
    path('towns/', TownWorkListAPIView.as_view(), name='town-list'),
    path('managers/', TelegramManagerListAPIView.as_view(), name='manager-list'),
    path('desired-positions/', JobApplicationListAPIView.as_view(), name='desired_positions'),
    path('applications/', WorkApplicationCreateAPIView.as_view(), name='application-create'),
]

urlpatterns += router.urls