const getCurrencyRates = (currencies: string[], periodFrom?: string, periodTo: string = '') => {
  const params = {
    currencies,
    periodFrom,
    periodTo,
  };

  return fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(response => response.json());
};

export default getCurrencyRates;
