from django.db import models


class Specification(models.Model):
    name = models.CharField(verbose_name='Спецификация (категория)', max_length=255)
    name_ukr = models.CharField(verbose_name='Спецификация (категория) на укр', max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Спецификация'
        verbose_name_plural = 'Спецификации'


class Experience(models.Model):
    name = models.CharField(verbose_name='Срок опыта работы', max_length=255)
    name_ukr = models.CharField(verbose_name='Срок опыта работы укр', max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Опыт работы'
        verbose_name_plural = 'Опыт работы'


class Education(models.Model):
    name = models.CharField(verbose_name='Образование', max_length=255)
    name_ukr = models.CharField(verbose_name='Образование укр', max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Образование'
        verbose_name_plural = 'Образования'


class TypeOfEmployment(models.Model):
    name = models.CharField(verbose_name='Тип занятости', max_length=255)
    name_ukr = models.CharField(verbose_name='Тип занятости укр', max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Тип занятости'
        verbose_name_plural = 'Тип занятости'


class Advantages(models.Model):
    image = models.FileField(verbose_name='Фото', upload_to='advantages/', blank=True, null=True)
    name = models.CharField(verbose_name='Название приемущества', max_length=255, blank=True, null=True)
    ukr_name = models.CharField(verbose_name='Название преимуществ UA', max_length=255, blank=True, null=True)
    description = models.CharField(verbose_name='Описание преимущиства', max_length=255, blank=True, null=True)
    ukr_description = models.CharField(verbose_name='Описание преимущиства на UA', max_length=255, blank=True, null=True)
    dop_text = models.CharField(verbose_name='Дополнительный текст', max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Преимущество'
        verbose_name_plural = 'Преимущества'


class Offer(models.Model):
    text = models.TextField(verbose_name='Текст пункта')
    ukr_text = models.TextField(verbose_name='Текст пункта на UA', blank=True, null=True)

    def __str__(self):
        return self.text


class Important(models.Model):
    text = models.TextField(verbose_name='Текст пункта')
    ukr_text = models.TextField(verbose_name='Текст пункта на UA', blank=True, null=True)

    def __str__(self):
        return self.text


class WillDo(models.Model):
    text = models.TextField(verbose_name='Текст пункта')
    ukr_text = models.TextField(verbose_name='Текст пункта на UA', blank=True, null=True)

    def __str__(self):
        return self.text


class JobDescription(models.Model):
    name = models.CharField(verbose_name='Название работы для описания', max_length=255)
    offer = models.ManyToManyField(Offer, verbose_name='Что мы предлагаем', blank=True, null=True)
    important = models.ManyToManyField(Important, verbose_name='Что мы предлагаем', blank=True, null=True)
    will_do = models.ManyToManyField(WillDo, verbose_name='Что мы предлагаем', blank=True, null=True)

    def __str__(self):
        return f'Описание для {self.name}'

    class Meta:
        verbose_name = 'Описание'
        verbose_name_plural = 'Описания'


class Job(models.Model):
    name = models.CharField(max_length=200, verbose_name='Название работы')
    ukr_name = models.CharField(max_length=200, verbose_name='Название работы на укр', blank=True, null=True)
    image = models.ImageField(verbose_name='Фото', upload_to='jobs/', blank=True, null=True)

    specification = models.ForeignKey(Specification, on_delete=models.CASCADE, verbose_name='Спецификация', blank=True, null=True)
    experience = models.ForeignKey(Experience, on_delete=models.CASCADE, verbose_name='Опыт работы', blank=True, null=True)
    education = models.ForeignKey(Education, on_delete=models.CASCADE, verbose_name='Образование', blank=True, null=True)
    type_of_employment = models.ForeignKey(TypeOfEmployment, on_delete=models.CASCADE, verbose_name='Тип занятости', blank=True, null=True)
    advantages = models.ManyToManyField(Advantages, verbose_name='Преимущества', blank=True, null=True)
    job_description = models.ForeignKey(JobDescription, verbose_name='Описание для работы', on_delete=models.CASCADE, blank=True, null=True)

    slug = models.SlugField(verbose_name='URL', unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Работа'
        verbose_name_plural = 'Работы'


class FiltersJobMainPage(models.Model):
    name = models.CharField(verbose_name='Название направлени', max_length=255)
    ukr_name = models.CharField(verbose_name='Нарвание на UA', max_length=255, blank=True, null=True)
    image = models.ImageField(verbose_name='Фото дл направления', upload_to='job-filters-main-page/')
    link = models.CharField(verbose_name='Ссылка на каталог', max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Ссылка на каталог'
        verbose_name_plural = 'Ссылки на каталог'


class FAQParagraph(models.Model):
    text = models.TextField(verbose_name='Текст параграфа')
    ukr_text = models.TextField(verbose_name='Текст параграфа на UA', blank=True, null=True)

    def __str__(self):
        return self.text


class FAQ(models.Model):
    name = models.CharField(verbose_name='Вопрос', max_length=255)
    ukr_name = models.CharField(verbose_name='Вопрос на UA', max_length=255, blank=True, null=True)
    answer = models.ManyToManyField(FAQParagraph, verbose_name='Параграфы ответа')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Вопрос'
        verbose_name_plural = 'Вопросы'










class TownWork(models.Model):
    name = models.CharField(verbose_name='Город работы', max_length=255, unique=True)
    ukr_name = models.CharField(verbose_name='Город работы на UA', max_length=255, unique=True, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Город работы'
        verbose_name_plural = 'Города работы'


class TelegramManager(models.Model):
    name = models.CharField(verbose_name='Имя менеджера', max_length=255)
    full_name = models.CharField(verbose_name='Полное имя (можно с инициалами)', max_length=255, blank=True, null=True)
    telegram_chat_id = models.BigIntegerField(verbose_name='Telegram ID', unique=True)
    is_active = models.BooleanField(verbose_name='Активный', default=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Менеджер'
        verbose_name_plural = 'Менеджера'


class WorkApplication(models.Model):
    class TelegramStatus(models.TextChoices):
        PENDING = 'pending', 'Ожидает отправки'
        SENT = 'sent', 'Отправленно'
        ERROR = 'error', 'Ошибка отправки'

    full_name = models.CharField(verbose_name='ФИО', max_length=255)
    phone = models.CharField(verbose_name='Телефон', max_length=30)
    telegram_nickname = models.CharField(verbose_name='Ник в телеграме', max_length=255, blank=True, null=True)
    birth_date = models.DateField(verbose_name='Дата рождения', blank=True, null=True)
    passport_number = models.CharField(max_length=50, verbose_name='Серия и номер паспорта или номер ID-карты', blank=True, null=True)
    tax_number = models.CharField(max_length=30, verbose_name='РНОКПП', blank=True, null=True)
    registered_address = models.TextField(verbose_name='Прописка', blank=True, null=True)
    actual_address = models.TextField(verbose_name='Фактическое место проживания', blank=True, default='')
    passport_main_photo = models.ImageField(upload_to='applications/passport/main/%Y/%m/%d/', verbose_name='Основной разворот паспорта или ID-карта', blank=True, null=True)
    registration_document_photo = models.ImageField(upload_to='applications/passport/registration/%Y/%m/%d/', verbose_name='Фото прописки или документа о регистрации', blank=True, null=True)
    salary_details = models.TextField(verbose_name='Реквизиты для зарплаты', blank=True, null=True)
    desired_position = models.ForeignKey(Job, on_delete=models.PROTECT, related_name='applications', verbose_name='Желаемая должность', blank=True, null=True)
    manager = models.ForeignKey(TelegramManager, on_delete=models.PROTECT, related_name='applications', verbose_name='Прикреплённый менеджер')
    town_work = models.ForeignKey(TownWork, on_delete=models.PROTECT, related_name='applications', verbose_name='Город работы')
    source_info = models.CharField(max_length=255, verbose_name='Откуда о нас узнали', blank=True, null=True)
    payment_receipt = models.ImageField(upload_to='applications/payment_receipts/%Y/%m/%d/', verbose_name='Фото оплаты или чек', blank=True, null=True)
    consent_personal_data = models.BooleanField(default=False, verbose_name='Согласие на обработку персональных данных')
    telegram_status = models.CharField(max_length=20, choices=TelegramStatus.choices, default=TelegramStatus.PENDING, verbose_name='Статус отправки в Telegram')
    telegram_error = models.TextField(blank=True, verbose_name='Ошибка Telegram')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'

    def __str__(self):
        return f'Заявка №{self.pk} — {self.full_name}'