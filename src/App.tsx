import React from 'react';

import Header from './components/Header';
import CurrencyView from './components/CurrencyView';
import Footer from './components/Footer';

import './App.css';

const App = () => {
  const currencies = ['usd', 'eur'];

  return (
    <div className="App">
      <Header />
      <CurrencyView currencies={currencies} />
      <Footer />
    </div>
  );
};

export default App;
