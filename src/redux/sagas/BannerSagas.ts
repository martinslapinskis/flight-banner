import {all, call, put, takeLatest} from 'redux-saga/effects';
import {
  GET_BANNER_DATA,
  GET_BANNER_DATA_SUCCESS,
  GET_BANNER_DATA_FAILURE,
} from '../actions/types';
import {AirportDetails, FlightPrice, FlightTemp} from '@type/Flight';
import {BannerRequestData} from '@type/Banner';
import {getAirport, getFlightTemp, getFlightPrice} from '@api/methods';

// TODO: use currentTS to optimize request calls by checking if request data are the same
// and for example if last request was made less than 1 h ago

function* getBannerData({fromCode, toCode, lang, ts}: BannerRequestData) {
  try {
    const airportDetails: AirportDetails = yield call(
      getAirport,
      `?fromCode=${fromCode}&lang=${lang}`,
    );
    const flightTemp: FlightTemp = yield call(
      getFlightTemp,
      `?toCode=${toCode}&ts=${ts}`,
    );
    const flightPrice: FlightPrice = yield call(
      getFlightPrice,
      `?fromCode=${fromCode}&toCode=${toCode}&ts=${ts}`,
    );
    const currentTS = new Date().getTime();

    yield put({
      type: GET_BANNER_DATA_SUCCESS,
      payload: {
        ...airportDetails,
        ...flightTemp,
        ...flightPrice,
        lastUpdateTS: currentTS,
      },
    });
  } catch (error) {
    yield put({
      type: GET_BANNER_DATA_FAILURE,
      payload: error?.errorMessage,
    });
  }
}

export default function* bannerSagas() {
  yield all([takeLatest(GET_BANNER_DATA, getBannerData)]);
}
