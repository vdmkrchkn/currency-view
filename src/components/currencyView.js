import React from 'react';

import TableView from "./Table/tableView";
import ChartView from "./Chart/chartView";

const transformApiData = (data) => {
    const { date, rates } = data;
    const base = data.base.toLowerCase();

    if (!date) {
        return Object.keys(rates).reduce(
            (obj, key) => ({ ...obj, [key]: {[base]: rates[key].RUB}}),
            {}
        );
    } else {
        return { [date]: {[base]: rates.RUB}};
    }
};

/**
 * Requests currency rates for up to 90 days. Above that, it starts sampling by week or month based on the
 * breadth of the date range (https://www.frankfurter.app/docs/).
 * TODO: period to Date.
 * @param {string[]} currencies - collection of currencies.
 * @param {string} [periodFrom] - period of start.
 * @param {string} [periodTo] - period of end. If is not provided, it'd request data up to the present.
 * @returns {Promise} promise with data.
*/
const getCurrencyRates = async (currencies, periodFrom, periodTo = '') => {
    if (currencies && currencies.length) {
        let range = 'latest';
        if (periodFrom) {
            range = `${periodFrom}..${periodTo}`;
        }

        const url = `https://api.frankfurter.app/${range}?to=RUB`;
        const requests = currencies.map(currency =>
            fetch(url + `&from=${currency}`, {
                method: "GET",
            })
        );

        const responses = await Promise.all(requests);
        const currencyRates = await Promise.all(responses.map(response => response.json()));
        const currencyRates_1 = currencyRates.map(currencyRate => transformApiData(currencyRate));
        return mergeArrays(currencyRates_1, currencies);
    } else {
        return Promise.reject('currency collection is not defined');
    }
};

/**
 * Merge collection of objects with same props to object by keys.
 * @param {Object[]} array - a collection to merge.
 * @param {string[]} keys - a collection of keys in object values.
 * @returns {Object} merged object.
*/
const mergeArrays = (array, keys) => {
    let data = array.shift();
    // reduce?
    array.forEach((elem, i) => {
        const key = keys[i + 1].toLowerCase();
        Object.keys(data).forEach(date => data[date][key] = elem[date][key])
        }
    );

    return data;
};

class CurrencyView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        }
    }

    componentDidMount() {
        const { currencies, periodFrom, rateInterval } = this.props;
        // request historical rates 4 testing TODO: get cached?
        getCurrencyRates(currencies, periodFrom)
            .then(data => this.setState({data}))
            .catch(error => console.error(error));

        this.timerID = setInterval(
            () => this.tick(currencies),
            rateInterval,
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick(currencies) {
        getCurrencyRates(currencies)
            .then(data => {
                if (!(data.date in this.state.data)) {
                    this.setState((state) => ({data, ...state}));
                }
            })
            .catch(error => console.error(error));
    }

    render() {
        const { currencies } = this.props;
        const fields = ['date', ...currencies];
        
        const { data } = this.state;

        const chartData = Object.keys(data).map(key => {
            return {
                [fields[0]]: key,
                ...data[key],
            }
        });

        return (
            <>
                <TableView fields={fields} data={chartData} />
                <ChartView xAxisDataKey={fields[0]} data={chartData} />
            </>
        );
    }
};

export default CurrencyView;