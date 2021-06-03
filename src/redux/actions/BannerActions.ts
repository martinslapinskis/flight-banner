import {GET_BANNER_DATA} from './types';
import {BannerRequestData} from '@type/Banner';

export const getBannerData = (data: BannerRequestData) => {
  return {
    type: GET_BANNER_DATA,
    payload: data,
  };
};
