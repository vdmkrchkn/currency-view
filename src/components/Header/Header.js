import React from 'react';

import logo from 'logo.svg';

import './header.css'

const Header = ({children}) => (
    <header>
        <img src={logo} className="header-logo" alt="CurrencyView logo" />
        <div className="header-title">Currencies view</div>
        {children}
    </header>
);

export default Header;