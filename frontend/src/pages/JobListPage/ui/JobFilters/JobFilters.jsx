import './JobFilters.css'
import CheckboxFilterGroup from '../CheckboxFilterGroup/CheckboxFilterGroup'

import { useLanguage } from '../../../../context/LenguageContext'
import { translations } from '../../../../translations/translations'


const JobFilters = ({filters, filterOptions, onSearchChange, onCheckboxChange, onResetFilters}) => {
    const { lang } = useLanguage()
    const t = translations[lang]

    return (
        <div className="job-filters">
            <CheckboxFilterGroup
                title={t.text28}
                filterName="specifications"
                options={filterOptions.specifications}
                selectedValues={filters.specifications}
                onChange={onCheckboxChange}
                defaultOpen={true}
            />

            <CheckboxFilterGroup
                title={t.text29}
                filterName="educations"
                options={filterOptions.educations}
                selectedValues={filters.educations}
                onChange={onCheckboxChange}
            />

            <CheckboxFilterGroup
                title={t.text30}
                filterName="experiences"
                options={filterOptions.experiences}
                selectedValues={filters.experiences}
                onChange={onCheckboxChange}
            />

            <CheckboxFilterGroup
                title={t.text31}
                filterName="types_of_employment"
                options={filterOptions.types_of_employment}
                selectedValues={filters.types_of_employment}
                onChange={onCheckboxChange}
            />

            <button className='reset-filters tex-font-size' type="button" onClick={onResetFilters}>
                Сбросить фильтры
            </button>
        </div>
    )
}

export default JobFilters