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

interface FlightOffer {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  paymentCardRequired: boolean;
  lastTicketingDate: string;
  itineraries: Itinerary[];
  price: {
    currency: string;
    total: string;
    base: string;
    fees: {
      amount: string;
      type: string;
    }[];
    grandTotal: string;
    billingCurrency: string;
  };
  pricingOptions: {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
  };
  validatingAirlineCodes: string[];
  travelerPricings: {
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: {
      currency: string;
      total: string;
      base: string;
      taxes: {
        amount: string;
        code: string;
      }[];
    };
    fareDetailsBySegment: {
      segmentId: string;
      cabin: string;
      fareBasis: string;
      brandedFare: string;
      class: string;
      includedCheckedBags: {
        quantity: number;
      };
    }[];
  }[];
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

interface AddresseeName {
  firstName: string;
  lastName: string;
}

interface Address {
  lines: string[];
  postalCode: string;
  cityName: string;
  countryCode: string;
}

interface Contact {
  addresseeName: AddresseeName;
  companyName: string;
  purpose: string;
  phones: Phone[];
  emailAddress: string;
  address: Address;
}

export interface OrderCreateRequest {
  data: {
    type: string;
    flightOffers: FlightOffer[];
    travelers: Traveler[];
    remarks: Remarks;
    ticketingAgreement: TicketingAgreement;
    contacts: Contact[];
  };
}
