export interface AirportDetails {
  airportCode: string;
  airportName: string;
  cityName: string;
  cityCode: string;
  countryName: string;
  CountryCode: string;
}

export interface FlightPrice {
  price: string;
}

export interface DestinationTemperature {
  temperature: string;
}

export type FlightFullDetails = AirportDetails &
  FlightPrice &
  DestinationTemperature;
