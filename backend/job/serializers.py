from datetime import date
import re
from rest_framework import serializers
from .models import (
    Job, Specification, Experience, Education, TypeOfEmployment, FiltersJobMainPage, FAQ,
    TelegramManager, TownWork, WorkApplication
)


MAX_IMAGE_SIZE = 10 * 1024 * 1024


class TownWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = TownWork
        fields = ['id', 'name', 'ukr_name']


class TelegramManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = TelegramManager
        fields = ['id', 'name', 'full_name']


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'name', 'ukr_name']


class WorkApplicationCreateSerializer(
    serializers.ModelSerializer,
):
    class Meta:
        model = WorkApplication

        fields = [
            'id',
            'full_name',
            'phone',
            'telegram_nickname',
            'birth_date',
            'passport_number',
            'tax_number',
            'registered_address',
            'actual_address',
            'passport_main_photo',
            'registration_document_photo',
            'salary_details',
            'desired_position',
            'manager',
            'town_work',
            'source_info',
            'payment_receipt',
            'consent_personal_data',
            'created_at',
        ]

        read_only_fields = [
            'id',
            'created_at',
        ]

    def validate_phone(self, value):
        digits = re.sub(r'\D', '', value)

        if not re.fullmatch(r'380\d{9}', digits):
            raise serializers.ValidationError(
                'Введите полный номер телефона в формате '
                '+380 (XX) XXX-XX-XX.'
            )

        return f'+{digits}'

    def validate_birth_date(self, value):
        if value >= date.today():
            raise serializers.ValidationError(
                'Дата рождения должна быть раньше текущей даты.'
            )

        return value

    def validate_manager(self, manager):
        if not manager.is_active:
            raise serializers.ValidationError(
                'Выбранный менеджер сейчас недоступен.'
            )

        return manager

    def validate_consent_personal_data(self, value):
        if not value:
            raise serializers.ValidationError(
                'Необходимо дать согласие на обработку '
                'персональных данных.'
            )

        return value

    def validate_image(self, image):
        if image.size > MAX_IMAGE_SIZE:
            raise serializers.ValidationError(
                'Размер изображения не должен превышать 10 МБ.'
            )

        return image

    def validate_passport_main_photo(self, image):
        return self.validate_image(image)

    def validate_registration_document_photo(self, image):
        return self.validate_image(image)

    def validate_payment_receipt(self, image):
        return self.validate_image(image)


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'name', 'ukr_name', 'answer']
        depth = 1


class FiltersJobMainPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FiltersJobMainPage
        fields = ['id', 'name', 'ukr_name', 'image', 'link']


class SpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specification
        fields = ['id', 'name', 'name_ukr']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'name', 'name_ukr']


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'name', 'name_ukr']


class TypeOfEmploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeOfEmployment
        fields = ['id', 'name', 'name_ukr']


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'image', 'id', 'name', 'ukr_name', 'specification',
            'experience', 'education', 'type_of_employment', 'slug',
            'job_description', 'advantages',
        ]
        depth = 2