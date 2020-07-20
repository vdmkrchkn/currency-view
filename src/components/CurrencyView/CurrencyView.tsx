import React, {useState, useEffect} from 'react';
import Table from 'components/Table';
import Chart from 'components/Chart';

import {getCurrencyRates} from 'api';

import './currencyView.css';

interface IProps {
  currencies: string[];
}

interface IState {
  data: any;
}

export default ({currencies}: IProps) => {
  const [state, setState] = useState<IState>({
    data: {},
  });

  useEffect(() => {
    // request historical rates 4 testing
    if (process.env.NODE_ENV !== 'production') {
      getCurrencyRates(currencies, process.env.REACT_APP_FETCH_FROM)
          .then(data => setState({data}))
          .catch(error => console.error(error.message));
    }

    const {REACT_APP_FETCH_INTERVAL} = process.env;
    const timerID = setInterval(
        () => {
          getCurrencyRates(currencies)
              .then(rates => {
                if (!(Object.keys(rates)[0] in state.data)) {
                  setState(prevState => {
                    const {data} = prevState;

                    return {'data': {...data, ...rates}};
                  });
                }
              })
              .catch(error => console.error(error.message));
        },
        REACT_APP_FETCH_INTERVAL ? parseInt(REACT_APP_FETCH_INTERVAL) : 10000,
    );

    return () => clearInterval(timerID);
  }, [currencies]);

  const dates = Object.keys(state.data);

  if (dates.length > 0) {
    const fields = ['date', ...currencies];

    const renderData = dates.map(key => {
      return {
        [fields[0]]: key,
        ...state.data[key],
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
