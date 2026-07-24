import './JobSearch.css'

import { useLanguage } from '../../../../context/LenguageContext'
import { translations } from '../../../../translations/translations'


const JobSearch = ({ value, onChange }) => {
    const { lang } = useLanguage()
    const t = translations[lang]

    return (
        <div className="job-search">
            <input
                className='font-size-0-6'
                type="text"
                placeholder={t.text27}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default JobSearch