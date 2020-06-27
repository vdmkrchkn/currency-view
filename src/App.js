import React from 'react';

import CurrencyView from "./components/currencyView";

import './App.css';

function App() {
  return (
    <div className="App">
      <header>Currencies view</header>
      <CurrencyView currencies={['usd', 'eur']} periodFrom='2020-06-22' rateInterval={60 * 1000} />
      <footer className="App-footer">
        <a
          className="App-link"
          href="https://github.com/vdmkrchkn"
          target="_blank"
          rel="noopener noreferrer"
        >
          See my repos at github
        </a>
      </footer>
    </div>
  );
}

export default App;
