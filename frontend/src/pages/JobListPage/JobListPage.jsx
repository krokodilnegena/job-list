import './JobListPage.css'

import { getJobsList, getJobsFilters } from '../../api/job'

import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import JobSearch from './ui/JobSearch/JobSearch'
import JobFilters from './ui/JobFilters/JobFilters'

import arr1 from '../../assets/svg/filter-arrow.svg'
import arr2 from '../../assets/svg/filter-arrow-2.svg'

import { useLanguage } from '../../context/LenguageContext'
import { translations } from '../../translations/translations'


const JobListPage = () => {
    const { lang } = useLanguage()
    const t = translations[lang]

    const [jobs, setJobs] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(
        Number(searchParams.get('page')) || 1
    );
    const [pagination, setPagination] = useState({
        count: 0,
        totalPages: 0,
        next: null,
        previous: null,
    });

    const changePage = (pageNumber) => {
        setPage(pageNumber);

        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber);

        setSearchParams(params);
    };

    const [filterOptions, setFilterOption] = useState({
        specifications: [],
        educations: [],
        experiences: [],
        types_of_employment: [],
    })

    const [filters, setFilters] = useState({
        search: '',
        specifications: searchParams.getAll('specifications') || [],
        educations: searchParams.getAll('educations') || [],
        experiences: searchParams.getAll('experiences') || [],
        types_of_employment: searchParams.getAll('types_of_employment') || [],
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(filters);
            setPage(1);
        }, 400);

        return () => clearTimeout(timer);
    }, [filters]);


    useEffect(() => {
        const loadFiltersOption = async () => {
            try {
                const data = await getJobsFilters()

                setFilterOption({
                    specifications: data.specifications,
                    educations: data.educations,
                    experiences: data.experiences,
                    types_of_employment: data.types_of_employment,
                })
            } catch (error) {
                console.error(error)
                setError('Не удалось загрузить фильтры')
            }
        }

        loadFiltersOption()
    }, [])

    useEffect(() => {
        const loadJob = async () => {
            try {
                setLoading(true);
                setError('');

                const data = await getJobsList(
                    debouncedFilters,
                    page
                );

                setJobs(data.results);

                setPagination({
                    count: data.count,
                    totalPages: data.total_pages,
                    next: data.next,
                    previous: data.previous,
                });
            } catch (error) {
                console.error(error);
                setError('Не удалось загрузить вакансии');
            } finally {
                setLoading(false);
            }
        };

        loadJob();
    }, [debouncedFilters, page]);

    const handleSearchChange = (event) => {
        setFilters((prev) => ({
            ...prev,
            search: event.target.value,
        }));
    };

    const handleCheckboxChange = (filterName, value) => {
        setFilters((prev) => {
            const currentValues = prev[filterName];
            const valueAsString = String(value);

            const alreadySelected = currentValues.includes(valueAsString);

            return {
                ...prev,
                [filterName]: alreadySelected
                    ? currentValues.filter((item) => item !== valueAsString)
                    : [...currentValues, valueAsString],
            };
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetFilters = () => {
        setFilters({
            search: "",
            specifications: [],
            educations: [],
            experiences: [],
            types_of_employment: [],
        });
    };
    
    return (
        <section className="job-list">
            <h1 className="h1-hero-font-size main-title-for-section">{t.text24}</h1>

            <JobSearch
                value={filters.search}
                onChange={handleSearchChange}
            />

            <div className="job-list-container">
                <div className="job-list-container-left">
                    <h1 className='font-size-1-7'>{t.text25}</h1>
                    <JobFilters
                        filters={filters}
                        filterOptions={filterOptions}
                        onCheckboxChange={handleCheckboxChange}
                        onResetFilters={resetFilters}
                    />
                </div>

                <div className="job-list-container-right">
                    <h1 className='font-size-1-7'>{t.text26}</h1>
                    {jobs.map((job) => (
                        <Link to={`/vacancies/${job.slug}`} key={job.id} className='job-list-container-right-item'>
                            <p className='font-size-0-7'>{lang === 'ru' ? job.name : job.ukr_name }</p>
                        </Link>
                    ))}

                    <div className="job-list-pagination">
                        <button
                            type="button"
                            disabled={!pagination.previous || loading}
                            onClick={() => changePage(page - 1)}
                            className='tex-font-size job-list-next-previous'
                        >
                            <img src={arr1} alt="" />
                        </button>

                        {Array.from(
                            { length: pagination.totalPages },
                            (_, index) => index + 1
                        ).map((pageNumber) => (
                            <button
                                key={pageNumber}
                                type="button"
                                onClick={() => changePage(pageNumber)}
                                disabled={loading}
                                className={
                                    pageNumber === page
                                        ? 'job-list-pagination-active tex-font-size'
                                        : 'tex-font-size'
                                }
                            >
                                {pageNumber}
                            </button>
                        ))}

                        <button
                            type="button"
                            disabled={!pagination.next || loading}
                            onClick={() => changePage(page + 1)}
                            className='tex-font-size job-list-next-previous'
                        >
                            <img src={arr2} alt="" />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}


export default JobListPage