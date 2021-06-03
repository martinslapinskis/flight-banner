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

export interface FlightTemp {
  temp: number;
  tempScale: string;
}

export interface LastUpdate {
  lastUpdateTS?: string;
}

export type FlightFullDetails = AirportDetails &
  FlightPrice &
  FlightTemp &
  LastUpdate;
