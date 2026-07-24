import './AboutUsPage.css'
import img from '../../assets/images/4.jpg'

import SameWay from '../HomePage/ui/SameWay/SameWay'
import imgSameWay from '../../assets/images/sm-2.jpg'

import { useLanguage } from '../../context/LenguageContext'
import { translations } from '../../translations/translations'


const AboutUsPage = () => {
    const { lang } = useLanguage()
    const t = translations[lang]

    return (
        <section className="about-us">

            <div className="about-us-hero">

                <h1 className='h1-hero-font-size main-title-for-section'>{t.text56}</h1>

                <div className="about-us-hero-container">

                    <div className="about-us-hero-container-item">
                        <h1 className='font-size-1-9 main-title-for-section'>>2 {t.text19}</h1>
                        <p className='font-size-0-7 main-title-for-section'>{t.text20}</p>
                    </div>

                    <div className="about-us-hero-container-item">
                        <h1 className='font-size-1-9 main-title-for-section'>>200</h1>
                        <p className='font-size-0-7 main-title-for-section'>{t.text21}</p>
                    </div>

                    <div className="about-us-hero-container-item">
                        <h1 className='font-size-1-9 main-title-for-section'>>65 000 ₴</h1>
                        <p className='font-size-0-7 main-title-for-section'>{t.text22}</p>
                    </div>

                </div>

            </div>

            <div className="about-us-description">

                <div className="about-us-description-left">
                    <p className='font-size-0-55'>Search Work — {t.text38}</p>
                    <p className='font-size-0-55'>{t.text39}</p>
                    <p className='font-size-0-55'>{t.text40}</p>
                    <p className='font-size-0-55'>{t.text41}</p>
                </div>

                <div className="about-us-description-right">
                    <img src={img} alt="" />
                </div>

            </div>

            <SameWay text={t.text23} image={imgSameWay} mg={true} openModal={true} />

        </section>
    )
}

export default AboutUsPage