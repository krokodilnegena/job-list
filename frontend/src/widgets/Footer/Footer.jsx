import './Footer.css'

import DefaultBtn from '../../shared/DefaultBtn/DefaultBtn'

import { Link } from 'react-router-dom'

import { useOpen } from '../../context/OpenContext'
import { useLanguage } from '../../context/LenguageContext'
import { translations } from '../../translations/translations'


const Footer = () => {
    const { lang } = useLanguage()
    const t = translations[lang]

    const { openModal } = useOpen()

    return (

        <footer className='footer'>

            <h3>SearchWork ©2015-2026</h3>

            <div className="footer-container">

                <div className="footer-left">
                    <ul>
                        <li><Link to='/'>{t.text53}</Link></li>
                        <li><Link to='/vacancies'>{t.vacans}</Link></li>
                        <li><Link to='/about'>{t.text17}</Link></li>
                        <li><Link to='/faq'>{t.text54}</Link></li>
                        <li><Link to='/contacts'>{t.text52}</Link></li>
                    </ul>
                </div>

                <div className="footer-right">
                    <DefaultBtn onclick={openModal} text={t.text4} />
                </div>

            </div>

            <p className='footer-bottom-text font-size-0-4'>{t.text55}</p>

        </footer>
    )
}


export default Footer