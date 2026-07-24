import './DetailJobPage.css'
import img from '../../assets/images/processing.png'
import img2 from '../../assets/images/detail_mobile.png'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { getJobDetail } from '../../api/job'
import DefaultBtn from '../../shared/DefaultBtn/DefaultBtn'

import { useOpen } from '../../context/OpenContext'

import { useLanguage } from '../../context/LenguageContext'
import { translations } from '../../translations/translations'


const DetailJobPage = () => {
    const { lang } = useLanguage()
    const t = translations[lang]

    const { openModal } = useOpen()
    const { slug } = useParams()

    const [job, setJob] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadJob = async () => {
            try {
                const data = await getJobDetail(slug)
                setJob(data)
            } catch (error) {
                setError('Что то пошло не так')
            } 
        }

        loadJob()
    }, [])

    return (
        <>
            <section className="job-detail">

                <div className="job-detail-hero">
                    <h1 className='h1-hero-font-size main-title-for-section'>{lang === 'ru' ? job.name : job.ukr_name }</h1>
                    <div className="job-detail-hero-grid-container">
                        <div className="job-detail-hero-left">
                            <div className="job-detail-hero-left-img">
                                <img src={job.image} alt="" />
                            </div>
                        </div>
                        <div className="job-detail-hero-right">
                            <DefaultBtn onclick={openModal} text={t.text32} />
                            <DefaultBtn text={t.text33} />
                        </div>
                    </div>
                </div>

                <div className="job-detail-advantages">
                    <h1 className='font-size-1-2'>{t.text34}</h1>

                    <div className="job-detail-advantages-con">
                        {job?.advantages?.map((ad) => (
                            <div key={ad.id} className="job-detail-advantages-con-item">
                                <div className="job-detail-advantages-con-item-image">
                                    <img src={ad.image} alt="" />
                                </div>
                                <h2 className='font-size-0-7'>{ lang === 'ru' ? ad.name : ad.ukr_name }</h2>
                                <p className='font-size-0-5'>{ lang === 'ru' ? ad.description : ad.ukr_description }</p>

                                {ad.dop_text ? <span className='font-size-0-5'>{ad.dop_text}</span> : null}
                            </div>
                        ))}
                    </div>

                </div>

                <div className="job-detail-processing">
                    <h1 className='font-size-0-8'>{t.text35}</h1>
                    <img className='desctop-detail-roadmap' src={img} alt="" />
                    <img className='mobile-detail-roadmap' src={img2} alt="" />
                </div>

                <div className="job-detail-description">
                    <div className="job-detail-description-item">
                        <p className='font-size-0-7'>{t.text36}</p>
                        <ul>
                            {job?.job_description?.offer?.map((off) => (
                                <li className='font-size-0-5'>{ lang === 'ru' ? off.text : off.ukr_text }</li>
                            ))}
                        </ul>
                    </div>

                    <div className="job-detail-description-item">
                        <p className='font-size-0-7'>Что для нас важно:</p>
                        <ul>
                            {job?.job_description?.important?.map((off) => (
                                <li className='font-size-0-5'>{ lang === 'ru' ? off.text : off.ukr_text }</li>
                            ))}
                        </ul>
                    </div>

                    <div className="job-detail-description-item">
                        <p className='font-size-0-7'>ЧЕМ ВЫ БУДЕТЕ ЗАНИМАТЬСЯ:</p>
                        <ul>
                            {job?.job_description?.will_do?.map((off) => (
                                <li className='font-size-0-5'>{ lang === 'ru' ? off.text : off.ukr_text }</li>
                            ))}
                        </ul>
                    </div>

                    <p className='font-size-0-6'>{t.text37}</p>

                    <DefaultBtn onclick={openModal} text={t.text32} />
                </div>
            </section>
        </>
    )
}

export default DetailJobPage