import './SameWay.css'

import DefaultBtn from '../../../../shared/DefaultBtn/DefaultBtn'

import { useLanguage } from '../../../../context/LenguageContext'
import { translations } from '../../../../translations/translations'


const SameWay = ({text, image, mg, openModal}) => {
    const { lang } = useLanguage()
    const t = translations[lang]

    return (
        <section className={mg ? "same-way top-margin-2" : "same-way"}>

            <div className="same-way-left">
                <h1 className='font-size-1-5'>{text}</h1>
                <DefaultBtn second={true} text={t.text4} isOpenModal={openModal} />
            </div>

            <div className="same-way-right">
                <img src={image} alt="" />
            </div>

        </section>
    )
}


export default SameWay