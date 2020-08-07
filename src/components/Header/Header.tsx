import React from 'react';

import logo from 'logo.svg';

import './header.scss';

const Header: React.FunctionComponent = ({children}) => (
  <header className="header">
    <img src={logo} className="header__logo" alt="CurrencyView logo" />
    <div className="header__title">Currencies view</div>
    {children}
  </header>
);

export default Header;
