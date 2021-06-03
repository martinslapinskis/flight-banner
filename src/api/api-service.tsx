import Config from 'react-native-config';
import axios from 'axios';
import {APIError} from '@type/APIError';

const BASE_URL = Config.BASE_URL;

export const apiGet = (path: string): any => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/${path}`)
      .then((res) => resolve(res.data))
      .catch((error) => reject(parseError(error)));
  });
};

function parseError(error: any): APIError {
  return {errorMessage: error?.response?.data?.message || 'Server Error'};
}
