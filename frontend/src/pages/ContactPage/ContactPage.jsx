import './ContactPage.css'
import img from '../../assets/images/3.jpg'

import SameWay from '../HomePage/ui/SameWay/SameWay'

import { useLanguage } from '../../context/LenguageContext'
import { translations } from '../../translations/translations'


const ContactPage = () => {
    const { lang } = useLanguage()
    const t = translations[lang]

    return (
        <section className="contact-page">
            <h1 className='h1-hero-font-size main-title-for-section'>{t.text42}</h1>

            <div className="contact-page-content">
                <p className='contact-marker font-size-0-7'>{t.text43}</p>

                <p className='font-size-0-6'>
                    {t.text44}
                </p>

                <p className="contact-page-number contact-mt">
                    <span className='contact-marker font-size-0-85'>8 495 622-22-22</span>
                    <span className='font-size-0-6'>({t.text45})</span>
                </p>

                <p className="contact-page-number">
                    <span className='contact-marker font-size-0-85'>8 800 220-22-02</span>
                    <span className='font-size-0-6'>({t.text46})</span>
                </p>

                <p className='font-size-0-7 contact-mt'>{t.text47}</p>

                <p className='font-size-0-6'>{t.text48} 08:00‒20:00</p>

                <p className='font-size-0-7 contact-mt'>{t.text49}</p>

                <p className='font-size-0-6'>Пн-пт 09:00‒20:00</p>

                <p className='font-size-0-6'>Сб 09:00‒15:00</p>
            </div>

            <SameWay text={t.text50} image={img} mg={false} openModal={true}/>
        </section>
    )
}

export default ContactPage