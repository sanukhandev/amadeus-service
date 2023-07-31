
export interface FlightOfferRequestInterface {
  currencyCode: string;
  originDestinations: Array<{
    id: string;
    originLocationCode: string;
    destinationLocationCode: string;
    departureDateTimeRange: {
      date: string;
      time: string;
    }
  }>;
  travelers: Array<{
    id: string;
    travelerType: string;
  }>;
  sources: string[];
  searchCriteria: {
    maxFlightOffers: number;
    flightFilters: {
      cabinRestrictions: Array<{
        cabin: string;
        coverage: string;
        originDestinationIds: string[];
      }>
    }
  };
}
