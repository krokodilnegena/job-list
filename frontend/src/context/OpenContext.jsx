import { createContext, useContext, useState, useEffect } from "react";

const OpenContext = createContext(null)

export function OpenProvider({ children }) {
    const [open, setOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const [mobileOpen, setMobileOpen] = useState(false)


    const openMobile = () => {
        setMobileOpen(true)
    }

    const closeMobile = () => {
        setMobileOpen(false)
    }


    const toggleOpen = () => {
        setOpen(prev => !prev)
    }

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (!modalMessage) return

        const timer = setTimeout(() => {
            setModalMessage('')
        }, 5000)

        return () => {
            clearTimeout(timer)
        }
    }, [modalMessage])

    return (
        <OpenContext.Provider value={{ open, setOpen, toggleOpen, openModal, closeModal, setModalMessage, modalMessage, openMobile, closeMobile, mobileOpen }}>
            {children}
        </OpenContext.Provider>
    )
}

export function useOpen() {
    return useContext(OpenContext)
}