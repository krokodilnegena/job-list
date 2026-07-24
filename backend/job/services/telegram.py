import logging
import mimetypes
from pathlib import Path

import requests

from job.models import WorkApplication


logger = logging.getLogger(__name__)

TELEGRAM_API_URL = 'https://api.telegram.org'

TELEGRAM_BOT_TOKEN = '8609421969:AAEsDg9AAdoeLWCB5P3nH2tDyjv8nLYbEuY'


def build_application_text(
    application: WorkApplication,
) -> str:
    """
    Формирует текст заявки для Telegram.
    """

    lines = [
        f'🆕 Новая заявка №{application.pk}',
        '',
        f'👤 ФИО: {application.full_name}',
        f'📞 Телефон: {application.phone}',
        f'🏙 Город работы: {application.town_work.name}',
        f'👨‍💼 Менеджер: {application.manager.name}',
    ]

    if application.birth_date:
        lines.append(
            '🎂 Дата рождения: '
            f'{application.birth_date:%d.%m.%Y}'
        )

    if application.desired_position:
        lines.append(
            '💼 Желаемая должность: '
            f'{application.desired_position.name}'
        )

    if application.telegram_nickname:
        lines.append(
            f'✈️ Telegram: {application.telegram_nickname}'
        )

    if application.passport_number:
        lines.append(
            '🪪 Серия и номер паспорта '
            'или номер ID-карты: '
            f'{application.passport_number}'
        )

    if application.tax_number:
        lines.append(
            f'🔢 РНОКПП: {application.tax_number}'
        )

    if application.registered_address:
        lines.append(
            '🏠 Прописка: '
            f'{application.registered_address}'
        )

    if application.actual_address:
        lines.append(
            '📍 Фактическое место проживания: '
            f'{application.actual_address}'
        )

    if application.salary_details:
        lines.append(
            '💳 Реквизиты для зарплаты: '
            f'{application.salary_details}'
        )

    if application.source_info:
        lines.append(
            '📢 Откуда узнали: '
            f'{application.source_info}'
        )

    lines.extend([
        '',
        (
            '🕒 Дата заявки: '
            f'{application.created_at:%d.%m.%Y %H:%M}'
        ),
    ])

    return '\n'.join(lines)


def split_message(
    message: str,
    limit: int = 4000,
) -> list[str]:
    """
    Разбивает длинный текст на несколько сообщений.
    """

    return [
        message[start:start + limit]
        for start in range(0, len(message), limit)
    ]


def update_telegram_status(
    application: WorkApplication,
    status: str,
    error: str = '',
) -> None:
    """
    Сохраняет результат отправки в Telegram.
    """

    application.telegram_status = status
    application.telegram_error = error[:2000]

    application.save(
        update_fields=[
            'telegram_status',
            'telegram_error',
        ],
    )


def send_text_message(
    chat_id: int,
    message: str,
) -> None:
    """
    Отправляет текст заявки.
    """

    url = (
        f'{TELEGRAM_API_URL}/'
        f'bot{TELEGRAM_BOT_TOKEN}/sendMessage'
    )

    for message_part in split_message(message):
        response = requests.post(
            url,
            data={
                'chat_id': chat_id,
                'text': message_part,
                'protect_content': 'true',
            },
            timeout=20,
        )

        if not response.ok:
            logger.error(
                'Ошибка Telegram sendMessage: %s',
                response.text,
            )

        response.raise_for_status()


def send_photo_field(
    image,
    chat_id: int,
    caption: str,
) -> None:
    """
    Универсальная отправка одного ImageField.
    """

    if not image or not image.name:
        return

    url = (
        f'{TELEGRAM_API_URL}/'
        f'bot{TELEGRAM_BOT_TOKEN}/sendPhoto'
    )

    filename = Path(image.name).name

    content_type = (
        mimetypes.guess_type(filename)[0]
        or 'application/octet-stream'
    )

    image.open('rb')

    try:
        response = requests.post(
            url,
            data={
                'chat_id': chat_id,
                'caption': caption,
                'protect_content': 'true',
            },
            files={
                'photo': (
                    filename,
                    image.file,
                    content_type,
                ),
            },
            timeout=30,
        )

        if not response.ok:
            logger.error(
                'Ошибка Telegram sendPhoto: %s',
                response.text,
            )

        response.raise_for_status()

    finally:
        image.close()


def send_application_photos(
    application: WorkApplication,
    chat_id: int,
) -> None:
    """
    Отправляет все фотографии заявки.
    """

    send_photo_field(
        image=application.passport_main_photo,
        chat_id=chat_id,
        caption=(
            f'🪪 Основной разворот паспорта '
            f'или ID-карта\n'
            f'Заявка №{application.pk}'
        ),
    )

    send_photo_field(
        image=application.registration_document_photo,
        chat_id=chat_id,
        caption=(
            f'🏠 Фото страницы с пропиской '
            f'или документа о регистрации\n'
            f'Заявка №{application.pk}'
        ),
    )

    send_photo_field(
        image=application.payment_receipt,
        chat_id=chat_id,
        caption=(
            f'🧾 Фото оплаты или чек\n'
            f'Заявка №{application.pk}'
        ),
    )


def send_application_to_telegram(
    application_id: int,
) -> None:
    """
    Отправляет текст и фотографии заявки
    выбранному менеджеру.
    """

    application = None

    try:
        application = (
            WorkApplication.objects
            .select_related(
                'town_work',
                'manager',
                'desired_position',
            )
            .get(pk=application_id)
        )

        if (
            not TELEGRAM_BOT_TOKEN
            or TELEGRAM_BOT_TOKEN
            == 'ВСТАВЬ_СЮДА_НОВЫЙ_ТОКЕН'
        ):
            raise RuntimeError(
                'В telegram.py не указан токен бота.'
            )

        chat_id = application.manager.telegram_chat_id

        if not chat_id:
            raise RuntimeError(
                'У выбранного менеджера '
                'не указан Telegram Chat ID.'
            )

        message = build_application_text(
            application,
        )

        # Сначала отправляем текст.
        send_text_message(
            chat_id=chat_id,
            message=message,
        )

        # Затем три фотографии.
        send_application_photos(
            application=application,
            chat_id=chat_id,
        )

        update_telegram_status(
            application=application,
            status=WorkApplication.TelegramStatus.SENT,
            error='',
        )

    except WorkApplication.DoesNotExist:
        logger.error(
            'Заявка с ID %s не найдена.',
            application_id,
        )

    except Exception as error:
        logger.exception(
            'Ошибка отправки заявки №%s в Telegram.',
            application_id,
        )

        if application is not None:
            update_telegram_status(
                application=application,
                status=WorkApplication.TelegramStatus.ERROR,
                error=str(error),
            )