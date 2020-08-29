import {actionTypes} from './currencyView.constants';

interface IState {
  currencies: string[],
  data: any;
  isLoading: boolean;
}

interface IAction {
  type: string;
  payload: any;
}

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case actionTypes.UPDATE_HISTORICAL_DATA: {
      return {...state, data: action.payload};
    }
    case actionTypes.UPDATE_DATA: {
      const {data, ...rest} = state;

      return {'data': {...data, ...action.payload}, ...rest};
    }
    case actionTypes.SET_LOADING: {
      return {...state, isLoading: action.payload};
    }
    default:
      return state;
  }
};

export default reducer;
