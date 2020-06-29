const transform = (data) => {
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
 * @param {string[]} currencies - collection of currencies.
 * @param {string} [periodFrom] - period of start.
 * @param {string} [periodTo] - period of end. If is not provided, it'd request data up to the present.
 * @returns {Promise} promise with data.
*/
export const getCurrencyRates = async (currencies, periodFrom, periodTo = '') => {
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
        const data = await Promise.all(responses.map(response => response.json()));
        return mergeArrays(data.map(transform), currencies);
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