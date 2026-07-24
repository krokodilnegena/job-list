import './HomePage.css'
import img1 from '../../assets/images/hero1.png'
import img2 from '../../assets/images/hero2.png'
import imgSameWay from '../../assets/images/1.png'

import DefaultBtn from '../../shared/DefaultBtn/DefaultBtn'
import JobCategories from './ui/JobCategories/JobCategories'
import HomePageSlider from './ui/HomePageSlider/HomePageSlider'
import OurAdvantages from './ui/OurAdvantages/OurAdvantages'
import AboutUs from './ui/AboutUs/AboutUs'
import SameWay from './ui/SameWay/SameWay'

import { useEffect, useState } from 'react'

import { useLanguage } from '../../context/LenguageContext'
import { translations } from '../../translations/translations'

const images = [img1, img2]


const HomePage = () => {
    const { lang } = useLanguage()
    const t = translations[lang]

    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        if (images.length <= 1) return

        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                (prevIndex + 1) % images.length
            )
        }, 10000)

        return () => clearInterval(interval)
    }, [])
    return (
        <section className="home-page">

            <div className="home-page-hero">
                
                <div className="home-page-hero-left">
                    <h1 className='h1-hero-font-size'>SearchWork - {t.text1}</h1>
                    <p className='p-hero-font-size'>{t.text2} <br /> {t.text3}</p>
                    <div className="home-page-hero-left-links">
                        <DefaultBtn text={t.text4} isOpenModal={true} />
                        <DefaultBtn text={t.text5} link={'/vacancies'} />
                    </div>
                </div>

                <div className="home-page-hero-right">

                    <div className="home-page-hero-right-slider-container">

                        <div className="home-page-hero-right-slider-container-bg">
                            
                            {/*
                                {images.map((image, index) => (
                                <img src={image} key={index} className={index === activeIndex ? 'active-hero-image' : ''} alt="" />
                            ))}

                            */}
                            <img src={img1} alt="" className='active-hero-image'/>

                        </div>

                    </div>

                </div>

            </div>

            <JobCategories />
            
            <HomePageSlider />

            <OurAdvantages />

            <AboutUs />

            <SameWay text={t.text23} image={imgSameWay} mg={true} openModal={true} />
        </section>
    )
}

export default HomePage