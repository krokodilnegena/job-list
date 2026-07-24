import api from "./api";


export async function getJobsList(filters = {}, page = 1) {
    const response = await api.get('jobs/', {
        params: {
            ...filters,
            page: page,
        },
        paramsSerializer: {
            indexes: null,
        },
    });

    return response.data;
}

export async function getJobsFilters() {
    const response = await api.get('job-filters/')
    return response.data
}

export async function getJobDetail(slug) {
    const response = await api.get(`jobs/${slug}/`)
    return response.data
}

export async function getJobFiltersMainPage() {
    const response = await api.get('filters-main-page/')
    return response.data
}

export async function getFAQ() {
    const response = await api.get('faq/')
    return response.data
}