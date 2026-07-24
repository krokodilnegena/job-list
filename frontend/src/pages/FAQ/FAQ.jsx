import './FAQ.css'

import { getFAQ } from '../../api/job'

import { useState, useEffect } from 'react'

import { useLanguage } from '../../context/LenguageContext'
import { translations } from '../../translations/translations'


const FAQ = () => {
    const { lang } = useLanguage()
    const t = translations[lang]

    const [faq, setFaq] = useState([])
    const [error, setError] = useState('')

    const [openId, setOpenId] = useState(null)

    const handleClick = (id) => {
        setOpenId(prev => prev === id ? null : id)
    } 

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getFAQ()
                setFaq(data)
            } catch (e) {
                setError(e.message)
            }
        }

        loadData()
    }, [])

    return(
        <section className="faq-page">
            <h1 className='h1-hero-font-size main-title-for-section'>{t.text51}</h1>

            <div className="faq-page-container">
                {faq?.map((f) => (
                    <div 
                        className={openId === f.id ? "faq-page-container-item faq-page-container-item-active" : "faq-page-container-item"} 
                        key={f.id}
                    >
                        <div
                        onClick={() => handleClick(f.id)}
                        className="faq-page-container-item-title"
                        >
                        <h2 className="font-size-0-8">{ lang === 'ru' ? f.name : f.ukr_name}</h2>
                        <span>
                            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                            <path
                                fill="currentColor"
                                d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                            />
                            </svg>
                        </span>
                        </div>

                        <div
                        className={
                            openId === f.id
                            ? "faq-page-container-item-text question-active"
                            : "faq-page-container-item-text"
                        }
                        >
                        {f?.answer?.map((a) => (
                            <p className="font-size-0-55" key={a.id}>
                            {lang === 'ru' ? a.text : a.ukr_text}
                            </p>
                        ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FAQ