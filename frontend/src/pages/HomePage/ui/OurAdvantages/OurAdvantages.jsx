import './OurAdvantages.css'
import img1 from '../../../../assets/svg/wallet.svg'
import img2 from '../../../../assets/svg/umbrella.svg'
import img3 from '../../../../assets/svg/rocket.svg'
import img4 from '../../../../assets/svg/care.svg'

import { moreLink } from '../../../../conf'

import { useLanguage } from '../../../../context/LenguageContext'
import { translations } from '../../../../translations/translations'


const OurAdvantages = () => {
    const { lang } = useLanguage()
    const t = translations[lang]

    return (
        <section className="our-advantages top-margin-2">
            <h1 className='font-size-1-2'>{t.text7}</h1>

            <div className="our-advantages-container">

                <div className="our-advantages-container-item">
                    <div className="our-advantages-container-item-blub"></div>

                    <div className="our-advantages-container-item-icon">
                        <img src={img1} alt="" />
                    </div>

                    <h2 className='font-size-0-85'>{t.text8}</h2>
                    <p className='font-size-0-5'>{t.text9}</p>
                    <a className='font-size-0-45' href={moreLink}>{t.text10}</a>
                </div>

                <div className="our-advantages-container-item">
                    <div className="our-advantages-container-item-blub"></div>

                    <div className="our-advantages-container-item-icon">
                        <img src={img2} alt="" />
                    </div>

                    <h2 className='font-size-0-85'>{t.text11}</h2>
                    <p className='font-size-0-5'>{t.text12}</p>
                    <a className='font-size-0-45' href={moreLink}>{t.text10}</a>
                </div>

                <div className="our-advantages-container-item">
                    <div className="our-advantages-container-item-blub"></div>

                    <div className="our-advantages-container-item-icon">
                        <img src={img3} alt="" />
                    </div>

                    <h2 className='font-size-0-85'>{t.text13}</h2>
                    <p className='font-size-0-5'>{t.text14}</p>
                    <a className='font-size-0-45' href={moreLink}>{t.text10}</a>
                </div>

                <div className="our-advantages-container-item">
                    <div className="our-advantages-container-item-blub"></div>

                    <div className="our-advantages-container-item-icon">
                        <img src={img4} alt="" />
                    </div>

                    <h2 className='font-size-0-85'>{t.text15}</h2>
                    <p className='font-size-0-5'>{t.text16}</p>
                    <a className='font-size-0-45' href={moreLink}>{t.text10}</a>
                </div>

            </div>

        </section>
    )
}


export default OurAdvantages