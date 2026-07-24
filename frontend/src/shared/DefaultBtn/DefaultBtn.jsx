import './DefaultBtn.css'

import { useOpen } from '../../context/OpenContext'
import { Link } from 'react-router-dom'


const DefaultBtn = ({text, second, onclick, isOpenModal, link }) => {

    const { openModal } = useOpen()

    const handleClick = (e) => {
        e.preventDefault()

        if (onclick) {
            onclick(e)
        }

        if (isOpenModal) {
            openModal()
        }
    }

    return (
        <>
            {!link 
                ?
                    <a 
                        onClick={handleClick} 
                        className={`default-btn tex-font-size font-weight-bold ${second ? 'second-variant-default-btn' : ''}`} 
                        href='#'
                    >
                        {text}
                    </a>        
                :
                    <Link
                        className={`default-btn tex-font-size font-weight-bold ${second ? 'second-variant-default-btn' : ''}`}
                        to={link}
                    >
                        {text}
                    </Link>
            }
        </>
    )
}

export default DefaultBtn