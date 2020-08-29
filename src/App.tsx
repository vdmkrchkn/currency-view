import React, {useState} from 'react';

import Header from './components/Header';
import Toast from './components/Toast';
import CurrencyView from './components/CurrencyView';
import Footer from './components/Footer';

import './App.css';

const App = () => {
  const [error, setError] = useState('');

  const handleError = (error: string) => setError(error);
  const clearError = () => handleError('');

  return (
    <div className="App">
      <Header />
      <Toast isOpen={!!error} type="error" title="Error" onClose={clearError} message={error} />
      <CurrencyView onError={handleError} />
      <Footer />
    </div>
  );
};

export default App;
