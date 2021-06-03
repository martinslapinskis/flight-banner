import {all, fork} from 'redux-saga/effects';
import bannerSagas from '@redux/sagas/BannerSagas';

export default function* rootSaga() {
  yield all([fork(bannerSagas)]);
}
