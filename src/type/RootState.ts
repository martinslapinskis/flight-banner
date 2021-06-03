import {FlightFullDetails} from './Flight';
import {BannerRequestData} from './Banner';

export interface RootState {
  banner: BannerReducer;
}

export interface BannerReducer {
  flightData: FlightFullDetails | null;
  bannerInputData: BannerRequestData | null;
  isLoading: boolean;
  errorMessage: string | null;
}
