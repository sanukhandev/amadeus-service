interface Departure {
  iataCode: string;
  terminal?: string;
  at: string;
}

interface Arrival {
  iataCode: string;
  terminal?: string;
  at: string;
}

interface Segment {
  departure: Departure;
  arrival: Arrival;
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  operating: {
    carrierCode: string;
  };
  duration: string;
  id: string;
  numberOfStops: number;
}

interface Itinerary {
  segments: Segment[];
}

interface PriceDetail {
  amount: string;
  type: string;
}

interface Price {
  currency: string;
  total: string;
  base: string;
  fees: PriceDetail[];
  grandTotal: string;
  billingCurrency: string;
}

interface PricingOptions {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
}

interface FareDetail {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  brandedFare: string;
  class: string;
  includedCheckedBags: {
    quantity: number;
  };
}

interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: Price;
  fareDetailsBySegment: FareDetail[];
}

interface FlightOffer {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  paymentCardRequired: boolean;
  lastTicketingDate: string;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions: PricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
}

interface Name {
  firstName: string;
  lastName: string;
}

interface Phone {
  deviceType: string;
  countryCallingCode: string;
  number: string;
}

interface Document {
  documentType: string;
  birthPlace: string;
  issuanceLocation: string;
  issuanceDate: string;
  number: string;
  expiryDate: string;
  issuanceCountry: string;
  validityCountry: string;
  nationality: string;
  holder: boolean;
}

interface Traveler {
  id: string;
  dateOfBirth: string;
  name: Name;
  gender: string;
  contact: {
    emailAddress: string;
    phones: Phone[];
  };
  documents?: Document[];
}

interface GeneralRemark {
  subType: string;
  text: string;
}

interface Remarks {
  general: GeneralRemark[];
}

interface TicketingAgreement {
  option: string;
  delay: string;
}

interface Address {
  lines: string[];
  postalCode: string;
  cityName: string;
  countryCode: string;
}

interface Contact {
  addresseeName: Name;
  companyName: string;
  purpose: string;
  phones: Phone[];
  emailAddress: string;
  address: Address;
}

export interface OrderViewResponse {
  data: {
    type: string;
    flightOffers: FlightOffer[];
    travelers: Traveler[];
    remarks: Remarks;
    ticketingAgreement: TicketingAgreement;
    contacts: Contact[];
  };
}
