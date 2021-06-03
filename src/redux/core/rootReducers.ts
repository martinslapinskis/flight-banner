import {combineReducers} from 'redux';
import BannerReducer from '../reducers/BannerReducer';

export default combineReducers({
  banner: BannerReducer,
});
