import React from 'react';
import logoBig from '../images/logo142-33.svg'
import logoSmall from '../images/logo103-24.svg'

function Header() {
   return (
      <header className="header">
         <picture>
            <source media="(max-width: 1023px)" srcSet={logoSmall} />
            <img src={logoBig} className="header__logo" alt="Логотип 'Место-Россия'" />
         </picture>
      </header>
   );
}

export default Header;


