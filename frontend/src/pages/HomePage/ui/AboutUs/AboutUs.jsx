import './AboutUs.css'
import DefaultBtn from '../../../../shared/DefaultBtn/DefaultBtn'

import { useLanguage } from '../../../../context/LenguageContext'
import { translations } from '../../../../translations/translations'

import { moreLink } from '../../../../conf'


const AboutUs = () => {
    const { lang } = useLanguage()
    const t = translations[lang]

    return (
        <section className="about-us">

            <div className="about-us-title">
                <h1 className='font-size-1-2'>{t.text17}</h1>
                <DefaultBtn text={t.text10} link={moreLink} />
            </div>

            <div className="about-us-description">
                <p className='font-size-0-7'>Serch Work {t.text18}</p>
            </div>

            <div className="about-us-container">

                <div className="about-us-container-item">
                    <h2 className='font-size-1-9'>>2 {t.text19}</h2>
                    <p className='font-size-0-7'>{t.text20}</p>
                </div>

                <div className="about-us-container-item">
                    <h2 className='font-size-1-9'>>200</h2>
                    <p className='font-size-0-7'>{t.text21}</p>
                </div>

                <div className="about-us-container-item">
                    <h2 className='font-size-1-9'>>65 000 ₴</h2>
                    <p className='font-size-0-7'>{t.text22}</p>
                </div>

            </div>

        </section>
    )
}


export default AboutUs