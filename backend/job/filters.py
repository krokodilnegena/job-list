import django_filters
from .models import Job, Specification, Experience, Education, TypeOfEmployment


class JobFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(field_name='name', lookup_expr='icontains')
    specifications = django_filters.ModelMultipleChoiceFilter(field_name='specification', queryset=Specification.objects.all())
    experiences = django_filters.ModelMultipleChoiceFilter(field_name='experience', queryset=Experience.objects.all())
    educations = django_filters.ModelMultipleChoiceFilter(field_name='education', queryset=Education.objects.all())
    types_of_employment = django_filters.ModelMultipleChoiceFilter(field_name='type_of_employment', queryset=TypeOfEmployment.objects.all())

    class Meta:
        model = Job
        fields = ['search', 'specifications', 'experiences', 'educations', 'type_of_employment']