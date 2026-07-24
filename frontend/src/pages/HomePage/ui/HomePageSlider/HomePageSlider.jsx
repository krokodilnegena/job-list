import './HomePageSlider.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay} from 'swiper/modules'

import 'swiper/css';
import 'swiper/css/pagination';

import { useLanguage } from '../../../../context/LenguageContext';
import { translations } from '../../../../translations/translations';


const HomePageSlider = () => {
    const {lang} = useLanguage()
    const t = translations[lang]

    return (
        <section className="home-page-slider">

            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                navigation
                pagination={{ clickable: true }}
            >
                <SwiperSlide className='home-page-slider-item'>
                    <div className="home-page-slider-item-content">
                        <h1 className='font-size-1-2'>{t.text57}</h1>
                        <p className='font-size-0-7 font-weight-bold'>{t.text58}
                                                                    <br />{t.text59}
                                                                    <br />{t.text60}</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='home-page-slider-item'>
                    <div className="home-page-slider-item-content">
                        <h1 className='font-size-1-2'>{t.text63}</h1>
                        <p className='font-size-0-7 font-weight-bold'>
                            {t.text62} - {t.text61} 35000₴ до 78000₴ <br />
                            {t.text69} <br />
                            {t.text60}
                        </p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='home-page-slider-item'>
                    <div className="home-page-slider-item-content">
                        <h1 className='font-size-1-2'>{t.text64}</h1>
                        <p className='font-size-0-7 font-weight-bold'>
                            {t.text62} - {t.text61} 30000₴ до 80000₴ <br />
                            {t.text70} <br />
                            {t.text60}
                        </p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='home-page-slider-item'>
                    <div className="home-page-slider-item-content">
                        <h1 className='font-size-1-2'>{t.text65}</h1>
                        <p className='font-size-0-7 font-weight-bold'>
                            {t.text62} - {t.text61} 20000₴ до 60000₴ <br />
                            {t.text71} <br />
                            {t.text60}
                        </p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='home-page-slider-item'>
                    <div className="home-page-slider-item-content">
                        <h1 className='font-size-1-2'>{t.text66}</h1>
                        <p className='font-size-0-7 font-weight-bold'>
                            {t.text62} - {t.text61} 38000₴ до 76000₴ <br />
                            {t.text69} <br />
                            {t.text60}
                        </p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='home-page-slider-item'>
                    <div className="home-page-slider-item-content">
                        <h1 className='font-size-1-2'>{t.text67}</h1>
                        <p className='font-size-0-7 font-weight-bold'>
                            {t.text62} - {t.text61} 25000₴ до 55000₴ <br />
                            {t.text70} <br />
                            {t.text60}
                        </p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className='home-page-slider-item'>
                    <div className="home-page-slider-item-content">
                        <h1 className='font-size-1-2'>{t.text68}</h1>
                        <p className='font-size-0-7 font-weight-bold'>
                            {t.text62} - {t.text61} 20000₴ до 45000₴ <br />
                            {t.text69} <br />
                            {t.text60}
                        </p>
                    </div>
                </SwiperSlide>
            </Swiper>

        </section>
    )
}


export default HomePageSlider