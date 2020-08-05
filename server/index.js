const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const log = require('./log');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transform = data => {
  const {date, rates} = data;
  const base = data.base.toLowerCase();

  if (!date) {
    return Object.keys(rates).reduce(
        (obj, key) => ({...obj, [key]: {[base]: rates[key].RUB}}),
        {},
    );
  } else {
    return {[date]: {[base]: rates.RUB}};
  }
};

/**
 * Merge collection of objects with same props to object by keys.
 * @param {Object[]} array - a collection to merge.
 * @param {string[]} keys - a collection of keys in object values.
 * @return {Object | undefined} merged object.
*/
const mergeArrays = (array, keys) => {
  const data = array.shift();
  // reduce?
  data && array.forEach((elem, i) => {
    const key = keys[i + 1].toLowerCase();
    Object.keys(data).forEach(date => data[date][key] = elem[date][key]);
  },
  );

  return data;
};

app.post('/', function(request, response) {
  log.info(`Request ${request.url} with body ${JSON.stringify(request.body)}`);

  const {currencies, periodFrom, periodTo} = request.body;

  let range = 'latest';
  if (periodFrom) {
    range = `${periodFrom}..${periodTo}`;
  }

  const url = `https://api.frankfurter.app/${range}?to=RUB`;
  const requests = currencies.map(currency =>
    fetch(url + `&from=${currency}`, {
      method: 'GET',
    }),
  );

  Promise.all(requests)
      .then(responses =>
        Promise.all(responses.map(response => response.json()))
            .then(data => response.send(mergeArrays(data.map(transform), currencies))));
});

const port = 3001; // FIXME: to config
if (port) {
  app.listen(port, () => log.info(`proxy server has started at localhost:${port}`));
} else {
  log.error('Undefined proxy port number');
}
