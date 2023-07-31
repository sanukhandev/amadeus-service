export interface Meta {
  count: number;
}

export interface Departure {
  iataCode: string;
  at: string;
}

export interface Arrival {
  iataCode: string;
  at: string;
}

export interface Aircraft {
  code: string;
}

export interface Segment {
  departure: Departure;
  arrival: Arrival;
  carrierCode: string;
  number: string;
  aircraft: Aircraft;
  operating: {
    carrierCode: string;
  };
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

export interface Tax {
  amount: string;
  type: string;
}

export interface Price {
  currency: string;
  total: string;
  base: string;
  fees: Tax[];
  grandTotal: string;
}

export interface IncludedCheckedBags {
  quantity: number;
}

export interface FareDetailsBySegment {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  class: string;
  includedCheckedBags: IncludedCheckedBags;
}

export interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: Price;
  fareDetailsBySegment: FareDetailsBySegment[];
}

export interface Itinerary {
  duration: string;
  segments: Segment[];
}

export interface FlightOffer {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  lastTicketingDateTime: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions: {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
  };
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
}

export interface Location {
  cityCode: string;
  countryCode: string;
}

export interface AircraftDictionary {
  [code: string]: string;
}

export interface CurrencyDictionary {
  [code: string]: string;
}

export interface CarrierDictionary {
  [code: string]: string;
}

export interface Dictionaries {
  locations: {
    [code: string]: Location;
  };
  aircraft: AircraftDictionary;
  currencies: CurrencyDictionary;
  carriers: CarrierDictionary;
}

export interface FlightOfferResponseInterface {
  meta: Meta;
  data: FlightOffer[];
  dictionaries: Dictionaries;
}
