interface IPeriod {
  periodFrom?: string,
  periodTo?: string,
}

const getCurrencyRates = (currencies: string[], period?: IPeriod): Promise<any> => {
  const params = {
    currencies,
    ...period,
  };

  return fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Сервер вернул ошибку со статусом ${response.status}`);
    }
  });
};

export default getCurrencyRates;
