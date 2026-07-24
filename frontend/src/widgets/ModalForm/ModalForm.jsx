import './ModalForm.css'

import { useOpen } from '../../context/OpenContext'

import { useState, useEffect } from 'react'
import axios from 'axios'

import { useLanguage } from '../../context/LenguageContext'
import { translations } from '../../translations/translations'


const ModalForm = () => {
    const { lang } = useLanguage()
    const t = translations[lang]

    const { closeModal, setModalMessage } = useOpen()

    const [form, setForm] = useState({
        name: "",
        date: "",
        phone: "",
        mail: "",
        dolj: "",
        file: null
    })

    const [confirm, setConfirm] = useState(false)
    const [fileError, setFileError] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        if (file.size === 0) {
            setFileError("Файл пустой");
            return;
        }

        setFileError("");

        setForm((prev) => ({
            ...prev,
            file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('name', form.name)
        formData.append('date', form.date)
        formData.append('phone', form.phone)
        formData.append('mail', form.mail)
        formData.append('dolj', form.dolj)

        if (form.file) {
            formData.append("file", form.file);
        }

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/send-telegram-application/',
                formData
            )

            console.log(response.data)
        } catch (error) {
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
        } finally {
            closeModal()
            setModalMessage('Заявка успешно оставлена!')
        }
    }

    const checkBoxConfirm = (e) => {
        setConfirm(e.target.checked);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <section className="model-form-wrapper">
            <div className="model-form-content">
                <div onClick={closeModal} className="model-form-content-close-btn">
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.707 0.707031L0.707031 21.707" stroke="black" stroke-width="2"/>
                    <path d="M0.707031 0.707031L21.707 21.707" stroke="black" stroke-width="2"/>
                    </svg>
                </div>
                <h1 className='font-size-0-8'>{t.text72}</h1>
                <form onSubmit={handleSubmit} className='model-form-content-form'>

                    <div className="model-form-content-form-main-inputs">
                        <input 
                            name="name"
                            type="text" 
                            placeholder={t.text73}
                            value={form.name}
                            onChange={handleChange}
                            className='font-size-0-5'
                            />
                        <input 
                            name="date"
                            type="text" 
                            placeholder={t.text74}
                            value={form.date}
                            onChange={handleChange}
                            className='font-size-0-5'
                            />
                        <input 
                            name="phone"
                            type="number" 
                            placeholder='Телефон*'
                            value={form.phone}
                            onChange={handleChange}
                            className='font-size-0-5'
                            />
                        <input 
                            name="mail"
                            type="text" 
                            placeholder={t.text75}
                            value={form.mail}
                            onChange={handleChange}
                            className='font-size-0-5'
                            />
                        <input 
                            name="dolj"
                            type="text" 
                            placeholder={t.text76}
                            value={form.dolj}
                            onChange={handleChange}
                            className='font-size-0-5'
                            />
                    </div>
                    
                    <div className="model-form-content-form-file-input">
                        <input
                            id="file-input"
                            type="file"
                            accept='.pdf,.doc,.docx'
                            onChange={handleFileChange}
                        />
                        <label className='tex-font-size' htmlFor="file-input">{t.text77}</label>
                    </div>
                    {form.file && (
                        <span>{form.file.name}</span>
                    )}
                    {fileError && <p>{fileError}</p>}

                    <div className="model-form-content-form-bottom-links">
                        <input onClick={checkBoxConfirm} type="checkbox" id='checkbox-input-form' checked={confirm} />
                        <label className='font-size-0-5' htmlFor="checkbox-input-form">
                            {t.text79} {/* <a href="#"> */}{t.text80}{/* </a> */}, {t.text81} {/* <a href="#"> */}{t.text82}.{/* </a> */}
                        </label>
                    </div>
                    <button className='tex-font-size' disabled={!form.name || !form.phone || !form.mail || !confirm} type='submit'>{t.text78}</button>
                </form>
            </div>
        </section>
    )
}

export default ModalForm