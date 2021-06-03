import {apiGet} from '@api/api-service';
import {AirportDetails, FlightPrice, FlightTemp} from '@type/Flight';

// query not added to request so that axios mock would work

export const getAirport = (query: string): Promise<AirportDetails> => {
  return apiGet(`airport`);
};

export const getFlightTemp = (query: string): Promise<FlightTemp> => {
  return apiGet(`airport-temp`);
};

export const getFlightPrice = (query: string): Promise<FlightPrice> => {
  return apiGet(`flight-price`);
};
