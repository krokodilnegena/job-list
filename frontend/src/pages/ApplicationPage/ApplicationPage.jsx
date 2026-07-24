import './ApplicationPage.css'

import { useEffect, useState } from 'react'

import api from '../../api/api'

import { useLanguage } from '../../context/LenguageContext'
import { translations } from '../../translations/translations'


const initialForm = {
    full_name: '',
    phone: '+380',
    birth_date: '',
    passport_number: '',
    tax_number: '',
    registered_address: '',
    actual_address: '',
    passport_main_photo: null,
    registration_document_photo: null,
    salary_details: '',
    desired_position: '',
    manager: '',
    town_work: '',
    source_info: '',
    payment_receipt: null,
    consent_personal_data: false,
}


const initialFileInputKeys = {
    passport_main_photo: 0,
    registration_document_photo: 0,
    payment_receipt: 0,
}


const photoFields = [
    'passport_main_photo',
    'registration_document_photo',
    'payment_receipt',
]


function normalizeList(data) {
    if (Array.isArray(data)) {
        return data
    }

    if (Array.isArray(data?.results)) {
        return data.results
    }

    return []
}


function formatPhone(value) {
    let digits = value.replace(/\D/g, '')

    /*
     * Удаляем код Украины, потому что
     * +380 добавляется автоматически.
     */
    if (digits.startsWith('380')) {
        digits = digits.slice(3)
    } else if (digits.startsWith('80')) {
        digits = digits.slice(2)
    } else if (digits.startsWith('0')) {
        digits = digits.slice(1)
    }

    /*
     * После +380 должно быть 9 цифр.
     */
    digits = digits.slice(0, 9)

    let result = '+380'

    if (digits.length > 0) {
        result += ` (${digits.slice(0, 2)}`
    }

    if (digits.length >= 2) {
        result += ')'
    }

    if (digits.length > 2) {
        result += ` ${digits.slice(2, 5)}`
    }

    if (digits.length > 5) {
        result += `-${digits.slice(5, 7)}`
    }

    if (digits.length > 7) {
        result += `-${digits.slice(7, 9)}`
    }

    return result
}


function formatBirthDate(value) {
    const digits = value
        .replace(/\D/g, '')
        .slice(0, 8)

    if (digits.length <= 2) {
        return digits
    }

    if (digits.length <= 4) {
        return (
            `${digits.slice(0, 2)}.` +
            `${digits.slice(2)}`
        )
    }

    return (
        `${digits.slice(0, 2)}.` +
        `${digits.slice(2, 4)}.` +
        `${digits.slice(4, 8)}`
    )
}


function convertBirthDateToIso(value) {
    const match = value.match(
        /^(\d{2})\.(\d{2})\.(\d{4})$/,
    )

    if (!match) {
        return null
    }

    const day = Number(match[1])
    const month = Number(match[2])
    const year = Number(match[3])

    if (year < 1900) {
        return null
    }

    const date = new Date(
        Date.UTC(
            year,
            month - 1,
            day,
        ),
    )

    /*
     * Проверяем, что дата существует.
     * Например, 31.02.2000 не пройдёт.
     */
    const isRealDate = (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day
    )

    if (!isRealDate) {
        return null
    }

    const now = new Date()

    const today = new Date(
        Date.UTC(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
        ),
    )

    /*
     * Дата рождения не может быть
     * сегодняшней или будущей.
     */
    if (date >= today) {
        return null
    }

    const formattedMonth = String(month).padStart(
        2,
        '0',
    )

    const formattedDay = String(day).padStart(
        2,
        '0',
    )

    return `${year}-${formattedMonth}-${formattedDay}`
}


function getFirstError(value) {
    if (typeof value === 'string') {
        return value
    }

    if (Array.isArray(value)) {
        for (const item of value) {
            const error = getFirstError(item)

            if (error) {
                return error
            }
        }
    }

    if (
        value &&
        typeof value === 'object'
    ) {
        for (const item of Object.values(value)) {
            const error = getFirstError(item)

            if (error) {
                return error
            }
        }
    }

    return null
}


function ApplicationPage() {
    const { lang } = useLanguage()
    const t = translations[lang]

    const [form, setForm] = useState(initialForm)

    const [towns, setTowns] = useState([])
    const [managers, setManagers] = useState([])
    const [positions, setPositions] = useState([])

    const [photoPreviews, setPhotoPreviews] = useState({})

    const [
        fileInputKeys,
        setFileInputKeys,
    ] = useState(initialFileInputKeys)

    const [fieldErrors, setFieldErrors] = useState({
        phone: '',
        birth_date: '',
        tax_number: '',
    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        const loadFormData = async () => {
            try {
                const [
                    townsResponse,
                    managersResponse,
                    positionsResponse,
                ] = await Promise.all([
                    api.get('towns/'),
                    api.get('managers/'),
                    api.get('desired-positions/'),
                ])

                setTowns(
                    normalizeList(townsResponse.data),
                )

                setManagers(
                    normalizeList(managersResponse.data),
                )

                setPositions(
                    normalizeList(positionsResponse.data),
                )
            } catch (error) {
                console.error(
                    t.text83,
                    error.response?.data || error,
                )

                setMessage(
                    t.text84,
                )
            }
        }

        loadFormData()
    }, [])

    useEffect(() => {
        const previews = {}

        photoFields.forEach((fieldName) => {
            const file = form[fieldName]

            if (file) {
                previews[fieldName] =
                    URL.createObjectURL(file)
            }
        })

        setPhotoPreviews(previews)

        return () => {
            Object.values(previews).forEach(
                (previewUrl) => {
                    URL.revokeObjectURL(previewUrl)
                },
            )
        }
    }, [
        form.passport_main_photo,
        form.registration_document_photo,
        form.payment_receipt,
    ])

    const handleChange = (event) => {
        const {
            name,
            value,
            type,
            checked,
        } = event.target

        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox'
                ? checked
                : value,
        }))
    }

    const handlePhoneChange = (event) => {
        const formattedPhone = formatPhone(
            event.target.value,
        )

        const phoneDigits = formattedPhone.replace(
            /\D/g,
            '',
        )

        setForm((prev) => ({
            ...prev,
            phone: formattedPhone,
        }))

        if (
            phoneDigits.length === 12 &&
            phoneDigits.startsWith('380')
        ) {
            setFieldErrors((prev) => ({
                ...prev,
                phone: '',
            }))
        }
    }

    const handlePhoneBlur = () => {
        const phoneDigits = form.phone.replace(
            /\D/g,
            '',
        )

        const isValid = (
            phoneDigits.length === 12 &&
            phoneDigits.startsWith('380')
        )

        setFieldErrors((prev) => ({
            ...prev,
            phone: isValid
                ? ''
                : (
                    t.text85 +
                    '+380 (XX) XXX-XX-XX.'
                ),
        }))
    }

    const handleBirthDateChange = (event) => {
        const formattedDate = formatBirthDate(
            event.target.value,
        )

        setForm((prev) => ({
            ...prev,
            birth_date: formattedDate,
        }))

        if (formattedDate.length === 10) {
            const isoDate = convertBirthDateToIso(
                formattedDate,
            )

            setFieldErrors((prev) => ({
                ...prev,
                birth_date: isoDate
                    ? ''
                    : t.text86,
            }))
        } else {
            setFieldErrors((prev) => ({
                ...prev,
                birth_date: '',
            }))
        }
    }

    const handleBirthDateBlur = () => {
        const isoDate = convertBirthDateToIso(
            form.birth_date,
        )

        setFieldErrors((prev) => ({
            ...prev,
            birth_date: isoDate
                ? ''
                : (
                    t.text87 +
                    t.text88
                ),
        }))
    }

    const handleTaxNumberChange = (event) => {
        const value = event.target.value
            .replace(/\D/g, '')
            .slice(0, 10)

        setForm((prev) => ({
            ...prev,
            tax_number: value,
        }))

        if (value.length === 10) {
            setFieldErrors((prev) => ({
                ...prev,
                tax_number: '',
            }))
        }
    }

    const handleTaxNumberBlur = () => {
        setFieldErrors((prev) => ({
            ...prev,
            tax_number: form.tax_number.length === 10
                ? ''
                : t.text89,
        }))
    }

    const handlePhotoChange = (event) => {
        const {
            name,
            files,
        } = event.target

        const file = files?.[0] || null

        setMessage('')

        if (!file) {
            setForm((prev) => ({
                ...prev,
                [name]: null,
            }))

            return
        }

        if (!file.type.startsWith('image/')) {
            setMessage(
                t.text90,
            )

            event.target.value = ''
            return
        }

        const maxSize = 10 * 1024 * 1024

        if (file.size > maxSize) {
            setMessage(
                t.text91,
            )

            event.target.value = ''
            return
        }

        setForm((prev) => ({
            ...prev,
            [name]: file,
        }))
    }

    const handlePhotoRemove = (fieldName) => {
        setForm((prev) => ({
            ...prev,
            [fieldName]: null,
        }))

        /*
         * Полностью очищает конкретный
         * input[type="file"].
         */
        setFileInputKeys((prev) => ({
            ...prev,
            [fieldName]: prev[fieldName] + 1,
        }))
    }

    const resetFileInputs = () => {
        setFileInputKeys((prev) => ({
            passport_main_photo:
                prev.passport_main_photo + 1,

            registration_document_photo:
                prev.registration_document_photo + 1,

            payment_receipt:
                prev.payment_receipt + 1,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        setMessage('')

        const phoneDigits = form.phone.replace(
            /\D/g,
            '',
        )

        const birthDateIso = convertBirthDateToIso(
            form.birth_date,
        )

        const newErrors = {
            phone: '',
            birth_date: '',
            tax_number: '',
        }

        if (
            phoneDigits.length !== 12 ||
            !phoneDigits.startsWith('380')
        ) {
            newErrors.phone =
                t.text92
        }

        if (!birthDateIso) {
            newErrors.birth_date =
                t.text93
        }

        if (form.tax_number.length !== 10) {
            newErrors.tax_number =
                t.text89
        }

        setFieldErrors(newErrors)

        if (
            newErrors.phone ||
            newErrors.birth_date ||
            newErrors.tax_number
        ) {
            setMessage(
                t.text94,
            )

            return
        }

        if (
            !form.passport_main_photo ||
            !form.registration_document_photo ||
            !form.payment_receipt
        ) {
            setMessage(
                t.text95,
            )

            return
        }

        if (!form.consent_personal_data) {
            setMessage(
                t.text96,
            )

            return
        }

        setLoading(true)

        try {
            const formData = new FormData()

            formData.append(
                'full_name',
                form.full_name.trim(),
            )

            /*
             * Пользователь видит:
             * +380 (99) 123-45-67
             *
             * Backend получает:
             * +380991234567
             */
            formData.append(
                'phone',
                `+${phoneDigits}`,
            )

            /*
             * Пользователь видит:
             * 12.01.1988
             *
             * Django получает:
             * 1988-01-12
             */
            formData.append(
                'birth_date',
                birthDateIso,
            )

            formData.append(
                'passport_number',
                form.passport_number.trim(),
            )

            formData.append(
                'tax_number',
                form.tax_number,
            )

            formData.append(
                'registered_address',
                form.registered_address.trim(),
            )

            formData.append(
                'actual_address',
                form.actual_address.trim(),
            )

            formData.append(
                'salary_details',
                form.salary_details.trim(),
            )

            formData.append(
                'desired_position',
                form.desired_position,
            )

            formData.append(
                'manager',
                form.manager,
            )

            formData.append(
                'town_work',
                form.town_work,
            )

            formData.append(
                'source_info',
                form.source_info.trim(),
            )

            formData.append(
                'consent_personal_data',
                String(
                    form.consent_personal_data,
                ),
            )

            formData.append(
                'passport_main_photo',
                form.passport_main_photo,
            )

            formData.append(
                'registration_document_photo',
                form.registration_document_photo,
            )

            formData.append(
                'payment_receipt',
                form.payment_receipt,
            )

            await api.post(
                'applications/',
                formData,
            )

            setMessage(
                t.text97,
            )

            setForm(initialForm)

            setFieldErrors({
                phone: '',
                birth_date: '',
                tax_number: '',
            })

            resetFileInputs()
        } catch (error) {
            console.error(
                t.text98,
                error.response?.data || error,
            )

            const serverError = getFirstError(
                error.response?.data,
            )

            if (error.response?.status === 400) {
                setMessage(
                    serverError ||
                    t.text94,
                )
            } else {
                setMessage(
                    t.text99,
                )
            }
        } finally {
            setLoading(false)
        }
    }

    const selectedTown = towns.find(
        (town) => (
            String(town.id) ===
            String(form.town_work)
        ),
    )

    const selectedManager = managers.find(
        (manager) => (
            String(manager.id) ===
            String(form.manager)
        ),
    )

    const selectedPosition = positions.find(
        (position) => (
            String(position.id) ===
            String(form.desired_position)
        ),
    )

    return (
        <main className="application-page">
            <h1
                className={
                    'h1-hero-font-size ' +
                    'main-title-for-section'
                }
            >
                {t.text100}
            </h1>

            <form
                className="application-form"
                onSubmit={handleSubmit}
            >
                <div className="application-form-item">
                    <label>
                        <span className="font-size-0-55">
                            {t.text101}<i>*</i>
                        </span>

                        <input
                            className="font-size-0-6"
                            type="text"
                            name="full_name"
                            value={form.full_name}
                            onChange={handleChange}
                            autoComplete="name"
                            required
                            placeholder=""
                        />
                    </label>

                    <p className="font-size-0-5">
                        {t.text102}
                    </p>
                </div>

                <div className="application-form-item">
                    <label>
                        <span className="font-size-0-55">
                            Телефон<i>*</i>
                        </span>

                        <input
                            className="font-size-0-6"
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handlePhoneChange}
                            onBlur={handlePhoneBlur}
                            inputMode="tel"
                            autoComplete="tel"
                            maxLength={19}
                            required
                            placeholder="+380 (XX) XXX-XX-XX"
                        />
                    </label>

                    {fieldErrors.phone && (
                        <p className="font-size-0-5 application-field-error">
                            {fieldErrors.phone}
                        </p>
                    )}
                </div>

                <div className="application-form-item">
                    <label>
                        <span className="font-size-0-55">
                            {t.text103}<i>*</i>
                        </span>

                        <input
                            className="font-size-0-6"
                            type="text"
                            name="birth_date"
                            value={form.birth_date}
                            onChange={handleBirthDateChange}
                            onBlur={handleBirthDateBlur}
                            inputMode="numeric"
                            autoComplete="off"
                            maxLength={10}
                            required
                            placeholder=""
                        />
                    </label>

                    {fieldErrors.birth_date ? (
                        <p className="font-size-0-5 application-field-error">
                            {fieldErrors.birth_date}
                        </p>
                    ) : (
                        <p className="font-size-0-5">
                            {t.text104}: 12.01.1988
                        </p>
                    )}
                </div>

                <div className="application-form-item">
                    <label>
                        <span className="font-size-0-55">
                            {t.text105}<i>*</i>
                        </span>

                        <input
                            className="font-size-0-6"
                            type="text"
                            name="passport_number"
                            value={form.passport_number}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                            placeholder=""
                        />
                    </label>
                </div>

                <div className="application-form-item">
                    <label>
                        <span className="font-size-0-55">
                            РНОКПП<i>*</i>
                        </span>

                        <input
                            className="font-size-0-6"
                            type="text"
                            name="tax_number"
                            value={form.tax_number}
                            onChange={handleTaxNumberChange}
                            onBlur={handleTaxNumberBlur}
                            inputMode="numeric"
                            autoComplete="off"
                            maxLength={10}
                            required
                            placeholder=""
                        />
                    </label>

                    {fieldErrors.tax_number ? (
                        <p className="font-size-0-5 application-field-error">
                            {fieldErrors.tax_number}
                        </p>
                    ) : (
                        <p className="font-size-0-5">
                            10 цифр
                        </p>
                    )}
                </div>

                <div className="application-form-item application-form-item-textarea">
                    <label>
                        <span className="font-size-0-55">
                            Прописка<i>*</i>
                        </span>

                        <textarea
                            className="font-size-0-6"
                            name="registered_address"
                            value={form.registered_address}
                            onChange={handleChange}
                            rows={4}
                            required
                            placeholder=''
                        />
                    </label>
                </div>

                <div className="application-form-item application-form-item-textarea">
                    <label>
                        <span className="font-size-0-55">
                            {t.text106}
                            <i>*</i>
                        </span>

                        <textarea
                            className="font-size-0-6"
                            name="actual_address"
                            value={form.actual_address}
                            onChange={handleChange}
                            rows={4}
                            required
                            placeholder=''
                        />
                    </label>
                </div>

                <div
                    className={
                        'application-form-item ' +
                        'application-form-item-photo'
                    }
                >
                    <div className="application-photo">
                        {!photoPreviews.passport_main_photo && (
                            <>
                                <label
                                    className={
                                        'font-size-0-55 ' +
                                        'application-photo-button'
                                    }
                                    htmlFor="passport-main-photo"
                                >
                                    {t.text107}
                                </label>

                                <input
                                    key={
                                        fileInputKeys
                                            .passport_main_photo
                                    }
                                    id="passport-main-photo"
                                    className="application-photo-input"
                                    type="file"
                                    name="passport_main_photo"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    required={
                                        !form.passport_main_photo
                                    }
                                />
                            </>
                        )}

                        {photoPreviews.passport_main_photo && (
                            <button
                                type="button"
                                className="application-photo-preview"
                                onClick={() => {
                                    handlePhotoRemove(
                                        'passport_main_photo',
                                    )
                                }}
                                aria-label={
                                    t.text108 +
                                    t.text109
                                }
                                title={
                                    t.text110 +
                                    t.text111
                                }
                            >
                                <img
                                    src={
                                        photoPreviews
                                            .passport_main_photo
                                    }
                                    alt={
                                        t.text112 +
                                        t.text113
                                    }
                                />

                                <span>{t.text114}</span>
                            </button>
                        )}

                        <p className="font-size-0-5">
                            {t.text115}<i>*</i>
                        </p>
                    </div>
                </div>

                <div
                    className={
                        'application-form-item ' +
                        'application-form-item-photo'
                    }
                >
                    <div className="application-photo">
                        {!photoPreviews
                            .registration_document_photo && (
                            <>
                                <label
                                    className={
                                        'font-size-0-55 ' +
                                        'application-photo-button'
                                    }
                                    htmlFor="registration-document-photo"
                                >
                                    {t.text107}
                                </label>

                                <input
                                    key={
                                        fileInputKeys
                                            .registration_document_photo
                                    }
                                    id="registration-document-photo"
                                    className="application-photo-input"
                                    type="file"
                                    name={
                                        'registration_document_photo'
                                    }
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    required={
                                        !form
                                            .registration_document_photo
                                    }
                                />
                            </>
                        )}

                        {photoPreviews
                            .registration_document_photo && (
                            <button
                                type="button"
                                className="application-photo-preview"
                                onClick={() => {
                                    handlePhotoRemove(
                                        'registration_document_photo',
                                    )
                                }}
                                aria-label={
                                    t.text116
                                }
                                title={
                                    t.text110 +
                                    t.text111
                                }
                            >
                                <img
                                    src={
                                        photoPreviews
                                            .registration_document_photo
                                    }
                                    alt={
                                        t.text117 +
                                        t.text118
                                    }
                                />

                                <span>{t.text114}</span>
                            </button>
                        )}

                        <p className="font-size-0-5">
                            {t.text119}<i>*</i>
                        </p>
                    </div>
                </div>

                <div className="application-form-item application-form-item-textarea">
                    <label>
                        <span className="font-size-0-55">
                            {t.text120}<i>*</i>
                        </span>

                        <textarea
                            className="font-size-0-6"
                            name="salary_details"
                            value={form.salary_details}
                            onChange={handleChange}
                            rows={4}
                            required
                            placeholder=""
                        />
                    </label>

                    <p className="font-size-0-5">
                        {t.text121}
                    </p>
                </div>

                <div
                    className={
                        `application-form-item ` +
                        `application-form-item-option ${
                            selectedPosition
                                ? 'option-selected-form'
                                : ''
                        }`
                    }
                >
                    <span className="font-size-0-55">
                        {t.text122}<i>*</i>
                    </span>

                    <label>
                        <p>
                            {selectedPosition
                            ? lang === 'ru'
                                ? selectedPosition.name
                                : selectedPosition.ukr_name
                            : ''}
                        </p>

                        <select
                            className="font-size-0-55"
                            name="desired_position"
                            value={form.desired_position}
                            onChange={handleChange}
                            required
                        >
                            <option
                                className="font-size-0-55"
                                value=""
                            >
                                {t.text123}
                            </option>

                            {positions.map((position) => (
                                <option
                                    key={position.id}
                                    value={position.id}
                                >
                                    {lang === 'ru' ? position.name : position.ukr_name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div
                    className={
                        `application-form-item ` +
                        `application-form-item-option ${
                            selectedManager
                                ? 'option-selected-form'
                                : ''
                        }`
                    }
                >
                    <span className="font-size-0-55">
                        {t.text124}<i>*</i>
                    </span>

                    <label>
                        <p>
                            {selectedManager
                                ? selectedManager.full_name
                                : ''}
                        </p>

                        <select
                            className="font-size-0-55"
                            name="manager"
                            value={form.manager}
                            onChange={handleChange}
                            required
                        >
                            <option
                                className="font-size-0-55"
                                value=""
                            >
                                {t.text125}
                            </option>

                            {managers.map((manager) => (
                                <option
                                    key={manager.id}
                                    value={manager.id}
                                >
                                    {manager.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div
                    className={
                        `application-form-item ` +
                        `application-form-item-option ${
                            selectedTown
                                ? 'option-selected-form'
                                : ''
                        }`
                    }
                >
                    <span className="font-size-0-55">
                        {t.text126}<i>*</i>
                    </span>

                    <label>
                        <p>
                            {selectedTown
                                ? lang === 'ru' 
                                    ? selectedTown.name 
                                    : selectedTown.ukr_name
                                : ''}
                        </p>

                        <select
                            className="font-size-0-55"
                            name="town_work"
                            value={form.town_work}
                            onChange={handleChange}
                            required
                        >
                            <option
                                className="font-size-0-55"
                                value=""
                            >
                                {t.text127}
                            </option>

                            {towns.map((town) => (
                                <option
                                    key={town.id}
                                    value={town.id}
                                >
                                    {lang === 'ru' ? town.name : town.ukr_name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="application-form-item">
                    <label>
                        <span className="font-size-0-55">
                            {t.text128}<i>*</i>
                        </span>

                        <input
                            className="font-size-0-6"
                            type="text"
                            name="source_info"
                            value={form.source_info}
                            onChange={handleChange}
                            required
                            placeholder=""
                        />
                    </label>

                    <p className="font-size-0-5">
                        {t.text129}
                    </p>
                </div>

                <div
                    className={
                        'application-form-item ' +
                        'application-form-item-photo'
                    }
                >
                    <div className="application-photo">
                        {!photoPreviews.payment_receipt && (
                            <>
                                <label
                                    className={
                                        'font-size-0-55 ' +
                                        'application-photo-button'
                                    }
                                    htmlFor="payment-receipt"
                                >
                                    {t.text107}
                                </label>

                                <input
                                    key={
                                        fileInputKeys
                                            .payment_receipt
                                    }
                                    id="payment-receipt"
                                    className="application-photo-input"
                                    type="file"
                                    name="payment_receipt"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    required={
                                        !form.payment_receipt
                                    }
                                />
                            </>
                        )}

                        {photoPreviews.payment_receipt && (
                            <button
                                type="button"
                                className="application-photo-preview"
                                onClick={() => {
                                    handlePhotoRemove(
                                        'payment_receipt',
                                    )
                                }}
                                aria-label={
                                    t.text130
                                }
                                title={
                                    t.text110 +
                                    t.text111
                                }
                            >
                                <img
                                    src={
                                        photoPreviews
                                            .payment_receipt
                                    }
                                    alt={
                                        t.text131 +
                                        t.text132
                                    }
                                />

                                <span>{t.text114}</span>
                            </button>
                        )}

                        <p className="font-size-0-5">
                            {t.text133}<i>*</i>
                        </p>
                    </div>
                </div>

                <div
                    className={
                        'application-form-item-consent ' +
                        'application-consent'
                    }
                >
                    <label>
                        <input
                            type="checkbox"
                            name="consent_personal_data"
                            checked={
                                form.consent_personal_data
                            }
                            onChange={handleChange}
                            required
                        />

                        <span className="font-size-0-5">
                            {t.text134}<i>*</i>
                        </span>
                    </label>
                </div>

                {message && (
                    <p className="application-message font-size-0-55">
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={
                        loading ||
                        !form.consent_personal_data
                    }
                    className={
                        'font-size-0-55 ' +
                        'application-form-btn'
                    }
                >
                    {loading
                        ? t.text135
                        : t.text136}
                </button>
            </form>
        </main>
    )
}

export default ApplicationPage