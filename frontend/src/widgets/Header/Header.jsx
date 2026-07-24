import './Header.css'
import img from '../../assets/svg/logo.svg'
import logo from '../../assets/images/logo.png'

import { Link } from 'react-router-dom'

import DefaultBtn from '../../shared/DefaultBtn/DefaultBtn'

import { useOpen } from '../../context/OpenContext'
import { useLanguage } from '../../context/LenguageContext'

import { translations } from '../../translations/translations'


const Header = () => {
    const { openModal, openMobile } = useOpen()
    const { lang, setLang } = useLanguage()

    const t = translations[lang]

    return (
        <header className='main-header'>
            
            <div className="main-header-left">
                <Link to={'/'}>
                    <img src={logo} alt="" />          
                </Link>
            </div>

            <div className="main-header-center">
                <Link to={'/vacancies'} className='tex-font-size font-weight-bold'>{t.vacans}</Link>
                <Link to={'/about'} className='tex-font-size font-weight-bold'>{t.text17}</Link>
                <Link to={'/contacts'} className='tex-font-size font-weight-bold'>{t.text52}</Link>
            </div>

            <div className="main-header-change-language">
                <button className={lang === 'ru' ? 'active-change-lng-btn' : ''} onClick={() => setLang('ru')}>RU</button>
                <button className={lang === 'uk' ? 'active-change-lng-btn' : ''} onClick={() => setLang('uk')}>UK</button>
            </div>

            <div className="main-header-right">

                <div className="header-dfl-btn-container">
                    <DefaultBtn onclick={openModal} text={t.text4} />
                </div>
                
                <svg onClick={openMobile} viewBox="0 0 40 23" focusable="false" class="chakra-icon css-1t1o1ce" xmlns="http://www.w3.org/2000/svg" ><path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h37a1.5 1.5 0 0 1 0 3h-37A1.5 1.5 0 0 1 0 1.5ZM0 11.5A1.5 1.5 0 0 1 1.5 10h37a1.5 1.5 0 0 1 0 3h-37A1.5 1.5 0 0 1 0 11.5ZM0 21.5A1.5 1.5 0 0 1 1.5 20h37a1.5 1.5 0 0 1 0 3h-37A1.5 1.5 0 0 1 0 21.5Z" clip-rule="evenodd"></path></svg>
            </div>

        </header>
    )
}

export default Header