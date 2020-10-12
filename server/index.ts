import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import {ApolloServer} from 'apollo-server-express';

import log from './log';
import typeDefs from './schemas/schema';
import resolvers from './resolvers';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = new ApolloServer({typeDefs, resolvers});
server.applyMiddleware({app});

interface ICurrencyRateData {
  amount: number;
  base: string;
  date?: string;
  rates: any;
}

const transform = (data: ICurrencyRateData) => {
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
const mergeArrays = (array: any[], keys: string[]): object | undefined => {
  const data = array.shift();
  // reduce?
  data && array.forEach((elem, i) => {
    const key = keys[i + 1].toLowerCase();
    Object.keys(data).forEach(date => data[date][key] = elem[date][key]);
  },
  );

  return data;
};

app.post('/', function(request: any, response: any) {
  log.info(`Request ${request.url} with body ${JSON.stringify(request.body)}`);

  const {currencies, periodFrom, periodTo} = request.body;

  if (currencies.length == 0) {
    response.status(404).send({error: 'a collection of currencies is not set'});
  } else {
    let range = 'latest';
    if (periodFrom) {
      range = `${periodFrom}..`;
    }

    if (periodTo) {
      range += periodTo;
    }

    const url = `https://api.frankfurter.app/${range}?to=RUB`;
    const requests = currencies.map((currency: any) =>
      fetch(url + `&from=${currency}`, {
        method: 'GET',
      }),
    );

    Promise.all(requests)
        .then(responses =>
          Promise.all(responses.map((response: any) => response.json()))
              .then(data => response.send(mergeArrays(data.map(transform), currencies))));
  }
});

const port = process.env.PROXY_PORT;
if (port) {
  app.listen(port, () => log.info(`proxy server has started at localhost:${port}`));
} else {
  log.error('Undefined proxy port number');
}
