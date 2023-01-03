import React from 'react'
import './Footer.css'
import Insta from '@iconscout/react-unicons/icons/uil-instagram'
import Facebook from '@iconscout/react-unicons/icons/uil-facebook'
import Github from '@iconscout/react-unicons/icons/uil-github'

const Footer = () => {
  return (
    <div className='f-conatiner' >
      
             <hr />
      <div className="f-content">
        <span>mohdaqib921@gmail.com</span>
      </div>
      <div className="f-icons">
        <Insta/>
        <Github/>
        <Facebook/>
      </div>
        </div>
       
    
  )
}

export default Footer
