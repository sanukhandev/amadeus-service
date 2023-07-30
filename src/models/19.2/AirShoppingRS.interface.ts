export interface TotalPrice {
  Value: number;
  CurrencyCode: string;
}

export interface Departure {
  AirportCode: string;
  Date: string;
  Time: string;
}

export interface Arrival {
  AirportCode: string;
  Date: string;
  Time: string;
}

export interface Airline {
  Code: string;
  Name: string;
}

export interface Aircraft {
  Code: string;
  Name: string;
}

export interface Cabin {
  Code: string;
  Name: string;
}

export interface Segment {
  Departure: Departure;
  Arrival: Arrival;
  Airline: Airline;
  FlightNumber: string;
  Aircraft: Aircraft;
  Cabin: Cabin;
  Duration: string;
}

export interface Tax {
  Type: string;
  Amount: TotalPrice;
}

export interface FareBreakdown {
  PassengerType: string;
  TotalFare: TotalPrice;
  Taxes: Tax[];
}

export interface FareRules {
  CurrencyCode: string;
  FareRuleDetail: string;
}

export interface AncillaryService {
  ServiceType: string;
  ServiceDescription: string;
}

export interface FlightOffer {
  OfferID: string;
  TotalPrice: TotalPrice;
  Itineraries: {
    Segments: Segment[];
  }[];
  FareBreakdown: FareBreakdown[];
  FareRules: FareRules;
  AncillaryServices: AncillaryService[];
}

export interface AirShoppingRS {
  FlightOffers: FlightOffer[];
}
