import {
  GET_BANNER_DATA,
  GET_BANNER_DATA_SUCCESS,
  GET_BANNER_DATA_FAILURE,
} from '@redux/actions/types';
import {BannerReducer} from '@type/RootState';

const INITIAL_STATE: BannerReducer = {
  flightData: null,
  bannerInputData: null,
  isLoading: false,
  errorMessage: null,
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case GET_BANNER_DATA:
      return {...state, isLoading: true, errorMessag: null, bannerInputData: action.payload};
    case GET_BANNER_DATA_SUCCESS:
      return {...state, flightData: action.payload, isLoading: false};
    case GET_BANNER_DATA_FAILURE:
      return {...state, errorMessage: action.payload, isLoading: false};
    default:
      return state;
  }
};
