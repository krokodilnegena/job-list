import './CheckboxFilterGroup.css'

import { useState } from 'react'

import { useLanguage } from '../../../../context/LenguageContext'

import img from '../../../../assets/svg/filter-arrow.svg'


const CheckboxFilterGroup = ({
        title,
        filterName,
        options,
        selectedValues,
        onChange,
        defaultOpen = false,
    }) => {

    const [isOpen, setIsOpen] = useState(defaultOpen)

    const { lang } = useLanguage()

    return (
        <div className={`job-filters-checkbox-container ${isOpen ? 'filter-checked' : ''}`}>
            <p 
                className="job-filters-checkbox-container-title font-size-0-6"
                onClick={() => setIsOpen(prev => !prev)}
            >
                {title}
                <img src={img} alt="" />
            </p>

            <div className="job-filters-checkbox-container-items">
                {options.map((option) => (
                    <label className='tex-font-size job-filters-checkbox-container-items-label' key={option.id}>
                        <input
                            type="checkbox"
                            checked={selectedValues.includes(String(option.id))}
                            onChange={() => onChange(filterName, option.id)}
                        />
                        {lang === 'ru' ? option.name : option.name_ukr}
                    </label>
                ))}
            </div>
        </div>
    )
}

export default CheckboxFilterGroup