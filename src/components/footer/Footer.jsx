import React from 'react';
import {FooterStyles} from "./FooterStyles";

const Footer = () => {
  return (
    <FooterStyles>
        <div>
            <div className='portfolio'><a target='blank' href='https://nazanajemba.vercel.app/'><p>Visit Our Portfolio</p></a></div>
        <a target='blank' href='https://nazanajemba.vercel.app/'><p className="copy">Copyright Naz-codes {new Date().getFullYear()}</p></a>
        </div>
    </FooterStyles>
  )
}

export default Footer