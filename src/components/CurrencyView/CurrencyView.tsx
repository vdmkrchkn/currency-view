import React from 'react';

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

/**
 * Component for rendering currency rates data.
 */
class CurrencyView extends React.Component<IProps, IState> {
  timerID!: NodeJS.Timeout;
  /**
   * @constructor
   * @param {any} props - component's props.
   */
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: {},
    };
  }

  // eslint-disable-next-line require-jsdoc
  componentDidMount() {
    const {currencies} = this.props;
    // request historical rates 4 testing
    if (process.env.NODE_ENV !== 'production') {
      getCurrencyRates(currencies, process.env.REACT_APP_FETCH_FROM)
          .then(data => this.setState({data}))
          .catch(error => console.error(error.message));
    }

    this.timerID = setInterval(
        () => {
          getCurrencyRates(currencies)
              .then(data => {
                if (!(Object.keys(data)[0] in this.state.data)) {
                  this.setState(state => ({...state, data}));
                }
              })
              .catch(error => console.error(error.message));
        },
        process.env.REACT_APP_FETCH_INTERVAL ? parseInt(process.env.REACT_APP_FETCH_INTERVAL) : 10000,
    );
  }

  // eslint-disable-next-line require-jsdoc
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // eslint-disable-next-line require-jsdoc
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
