import React from 'react';

import Table from 'components/Table';
import Chart from 'components/Chart';

import {getCurrencyRates} from 'api';

import './currencyView.css';

/**
 * Component for rendering currency rates data.
 */
class CurrencyView extends React.Component {
  /**
   * @constructor
   * @param {any} props - component's props.
   */
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    const {currencies} = this.props;
    // request historical rates 4 testing
    if (process.env.NODE_ENV !== 'production') {
      getCurrencyRates(currencies, process.env.REACT_APP_FETCH_FROM)
          .then(data => this.setState({data}))
          .catch(error => console.error(error.message));
    }

    this.timerID = setInterval(
        () => this.tick(currencies),
        process.env.REACT_APP_FETCH_INTERVAL,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick(currencies) {
    getCurrencyRates(currencies)
        .then(data => {
          if (!(Object.keys(data)[0] in this.state.data)) {
            this.setState(state => ({...state, data}));
          }
        })
        .catch(error => console.error(error.message));
  }

  render() {
    const {data} = this.state;
    const dates = Object.keys(data);

    if (dates.length > 0) {
      const {currencies} = this.props;
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
  }
}

export default CurrencyView;
