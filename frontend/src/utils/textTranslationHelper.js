export const getTranslatedName = (item, lang) => {
    if (!item) return ''

    if (lang === "uk") {
        return item.name_ukr || item.name
    }

    return item.name
}


export const getTranslatedText = (item, lang) => {
    if (!item) return ''

    if(lang === 'uk') {
        return item.ukr_text || item.text
    }

    return item.text
}