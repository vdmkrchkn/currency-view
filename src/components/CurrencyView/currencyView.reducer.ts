import {actionTypes} from './currencyView.constants';

interface IState {
  data: any;
  isLoading: boolean;
  error: string;
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
      const {data, isLoading, error} = state;

      return {'data': {...data, ...action.payload}, isLoading, error};
    }
    case actionTypes.SET_ERROR: {
      return {...state, error: action.payload};
    }
    case actionTypes.SET_LOADING: {
      return {...state, isLoading: action.payload};
    }
    default:
      return state;
  }
};

export default reducer;
