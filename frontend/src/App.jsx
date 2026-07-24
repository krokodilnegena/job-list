import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useOpen } from './context/OpenContext'

import HomePage from './pages/HomePage/HomePage'
import JobListPage from './pages/JobListPage/JobListPage'
import DetailJobPage from './pages/DetailJobPage/DetailJobPage'
import FAQ from './pages/FAQ/FAQ'
import ContactPage from './pages/ContactPage/ContactPage'
import AboutUsPage from './pages/AboutUsPage/AboutUsPage'
import ApplicationPage from './pages/ApplicationPage/ApplicationPage'

import Header from './widgets/Header/Header'
import Footer from './widgets/Footer/Footer'
import ModalForm from './widgets/ModalForm/ModalForm'
import MobileMenu from './widgets/MobileMenu/MobileMenu'


function App() {

  const { open, modalMessage } = useOpen()

  return (
    <section className='wrapper'>
      <section className="content">

        {modalMessage
        ?
          <div className="modal-success-message">
            <p>
              {modalMessage}
            </p>
          </div>
        :
          null
        }

        {open ? <ModalForm /> : null}

        <MobileMenu />
        
        <Header />

        <Routes>
          <Route path='/' element={ <HomePage/> } />
          <Route path='/vacancies' element={ <JobListPage/> } />
          <Route path='/vacancies/:slug' element={ <DetailJobPage/> } />

          <Route path='/application' element={ <ApplicationPage/> } />

          <Route path='/faq' element={ <FAQ /> } />
          <Route path='/contacts' element={ <ContactPage /> } />
          <Route path='/about' element={ <AboutUsPage /> } />
        </Routes>

        <Footer />
      </section>
    </section>
  )

}

export default App
