import './JobCategories.css'
import img1 from '../../../../assets/images/job-list1.jpg'

import { getJobFiltersMainPage } from '../../../../api/job'

import { useState, useEffect } from 'react'

import { useLanguage } from '../../../../context/LenguageContext'
import { translations } from '../../../../translations/translations'


const JobCategories = () => {
    const { lang } = useLanguage()
    const t = translations[lang]

    const [jobFilters, setJobFilters] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getJobFiltersMainPage()
                setJobFilters(data)
            } catch (e) {
                setError(e.message)
            }
        }

        loadData()
    }, [])
    return (
        <section className="job-categories top-margin-2">
            <h1 className='font-size-1-2'>{t.text6}</h1>

            <div className="job-categories-list">

                {jobFilters?.map((item) => (
                    <div key={item.id} className="job-categories-list-item">
                        <img src={item.image} alt="" />
                        <a href={`/vacancies?${item.link}`} className="job-categories-list-item-text">
                            <p className='p-job-list-font-size font-weight-bold'>{lang === 'ru' ? item.name : item.ukr_name}</p>
                        </a>
                    </div>
                ))}

            </div>

        </section>
    )
}

export default JobCategories