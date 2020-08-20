import React, {useReducer, useEffect} from 'react';
import Table from 'components/Table';
import Chart from 'components/Chart';

import getCurrencyRates from 'api';

import {actionTypes} from './currencyView.constants';
import reducer from './currencyView.reducer';
import './currencyView.css';

interface IProps {
  currencies: string[];
}

const initialState = {
  data: {},
  isLoading: false,
  error: '',
};

export default ({currencies}: IProps) => {
  const [{data}, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // request historical rates 4 testing
    if (process.env.NODE_ENV !== 'production') {
      const period = {
        periodFrom: process.env.REACT_APP_FETCH_FROM,
      };

      dispatch({type: actionTypes.SET_LOADING, payload: true});

      getCurrencyRates(currencies, period)
          .then(data => {
            dispatch({type: actionTypes.UPDATE_HISTORICAL_DATA, payload: data});
            dispatch({type: actionTypes.SET_LOADING, payload: false});
          })
          .catch(error => {
            dispatch({type: actionTypes.SET_ERROR, payload: error.message});
            dispatch({type: actionTypes.SET_LOADING, payload: false});
          });
    }

    const {REACT_APP_FETCH_INTERVAL} = process.env;
    const timerID = setInterval(
        () => {
          getCurrencyRates(currencies)
              .then(rates => {
                if (!(Object.keys(rates)[0] in data)) {
                  dispatch({type: actionTypes.UPDATE_DATA, payload: rates});
                }
              })
              .catch(error => dispatch({type: actionTypes.SET_ERROR, payload: error.message}));
        },
        REACT_APP_FETCH_INTERVAL ? parseInt(REACT_APP_FETCH_INTERVAL) : 10000,
    );

    return () => clearInterval(timerID);
  }, [currencies]);

  const dates = Object.keys(data);

  if (dates.length > 0) {
    const fields = ['date', ...currencies];

    const renderData = dates.map(key => {
      return {
        [fields[0]]: key,
        ...data[key],
      };
    });

    return (
      <div id="container">
        <Table fields={fields} data={[...renderData].reverse()} maxRows={5} />
        <Chart xAxisDataKey={fields[0]} data={renderData} />
      </div>
    );
  } else {
    return (<div>No data. Please wait for updates...</div>);
  }
};
