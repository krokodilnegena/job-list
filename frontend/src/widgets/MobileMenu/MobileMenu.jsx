import './MobileMenu.css'

import img from '../../assets/svg/x.svg'
import telegram from '../../assets/svg/telegram.svg'
import viber from '../../assets/svg/viber.svg'

import { Link } from 'react-router-dom'

import { useOpen } from '../../context/OpenContext'
import { useLanguage } from '../../context/LenguageContext'
import { translations } from '../../translations/translations'

import DefaultBtn from '../../shared/DefaultBtn/DefaultBtn'


const MobileMenu = () => {
    const { mobileOpen, closeMobile, openModal } = useOpen()
    const { lang, setLang } = useLanguage()
    const t = translations[lang]
    
    return (
        <section className={!mobileOpen ? "mobile-menu" : "mobile-menu mobile-menu-open"}>
            <div className={!mobileOpen ? "mobile-menu-content" : "mobile-menu-content mobile-menu-content-open"}>
                
                <div onClick={closeMobile} className="mobile-menu-content-close">
                    <img src={img} alt="" />
                </div>

                <ul>
                    <li onClick={closeMobile}><Link className='font-size-1-8' to='/'>{t.text53}</Link></li>
                    <li onClick={closeMobile}><Link className='font-size-1-8' to='/vacancies'>{t.vacans}</Link></li>
                    <li onClick={closeMobile}><Link className='font-size-1-8' to='/about'>{t.text17}</Link></li>
                    <li onClick={closeMobile}><Link className='font-size-1-8' to='/faq'>{t.text54}</Link></li>
                    <li onClick={closeMobile}><Link className='font-size-1-8'to='/contacts'>{t.text52}</Link></li>
                </ul>

                <DefaultBtn text={t.text4} onclick={openModal}/>

                <div className="mobile-menu-content-social">
                    <a href='#' className="mobile-menu-content-social-item">
                        <img src={telegram} alt="" />
                    </a>

                    <a href='#' className="mobile-menu-content-social-item">
                        <img src={viber} alt="" />
                    </a>

                    <div className="mobile-menu-content-language">
                        <button className={lang === 'ru' ? 'active-change-lng-btn' : ''} onClick={() => setLang('ru')}>RU</button>
                        <button className={lang === 'uk' ? 'active-change-lng-btn' : ''} onClick={() => setLang('uk')}>UK</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MobileMenu