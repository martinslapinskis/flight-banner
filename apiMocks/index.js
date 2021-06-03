import Config from 'react-native-config';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

axios.defaults.baseURL = `${Config.BASE_URL}`;

export const mockFetch = () => {
  var mock = new MockAdapter(axios, {delayResponse: 600});
  mock
    .onGet('/airport')
    .reply(200, airportResponse)
    .onGet('/airport-temp')
    .reply(200, airportTempResponse)
    .onGet('/flight-price')
    .reply(200, airportPriceResponse);
};

const airportResponse = {
  airportCode: 'MAD',
  airportName: 'Madrid Airport',
  cityName: 'Madrid',
  cityCode: '91',
  countryName: 'Spain',
  countryCode: '+34',
};

const airportTempResponse = {
  temp: 19,
  tempScale: 'C°',
};

const airportPriceResponse = {
  price: '340 Eur',
};
