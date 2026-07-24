import { useContext, createContext, useState } from "react";


const LanguageContext = createContext(null)

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('ru')

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => useContext(LanguageContext)