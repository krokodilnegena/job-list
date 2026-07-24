from django.contrib import admin
from .models import (
    Job, Experience, Education, Specification, TypeOfEmployment,
    JobDescription, Offer, Important, WillDo, Advantages, FiltersJobMainPage, FAQ, FAQParagraph, TelegramManager,
    TownWork, WorkApplication
)


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug':('name', )}

@admin.register(TownWork)
class TownWorkAdmin(admin.ModelAdmin):
    search_fields = ['name']

@admin.register(TelegramManager)
class TelegramManagerAdmin(admin.ModelAdmin):
    list_display = ['name', 'telegram_chat_id', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name', 'telegram_chat_id']

@admin.register(WorkApplication)
class WorkApplicationAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'full_name',
        'phone',
        'town_work',
        'manager',
        'telegram_status',
        'created_at',
    ]

    list_filter = [
        'telegram_status',
        'town_work',
        'manager',
        'created_at',
    ]

    search_fields = [
        'full_name',
        'phone',
        'email',
    ]

    readonly_fields = [
        'telegram_status',
        'telegram_error',
        'created_at',
    ]


admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(Specification)
admin.site.register(TypeOfEmployment)

admin.site.register(JobDescription)
admin.site.register(Advantages)
admin.site.register(Offer)
admin.site.register(Important)
admin.site.register(WillDo)

admin.site.register(FiltersJobMainPage)

admin.site.register(FAQ)
admin.site.register(FAQParagraph)
