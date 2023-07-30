interface Document {
  Name: string;
  ReferenceVersion: string;
}

interface TravelAgencySender {
  Name: string;
  IATA_Number: string;
}

interface AirlineRecipient {
  Name: string;
  Code: string;
}

interface Party {
  Sender: {
    TravelAgencySender: TravelAgencySender;
  };
  Recipient: {
    AirlineRecipient: AirlineRecipient;
  };
}

interface Departure {
  AirportCode: string;
  Date: string;
}

interface Arrival {
  AirportCode: string;
}

interface OriginDestination {
  Departure: Departure;
  Arrival: Arrival;
  id: string;
}

interface CabinPreference {
  CabinType: string;
}

interface Passenger {
  PTC: string;
  Quantity: number;
  id: string;
}

interface MaxPrice {
  Value: number;
  CurrencyCode: string;
}

interface CoreQuery {
  OriginDestinations: OriginDestination[];
  CabinPreferences: CabinPreference[];
  Passengers: Passenger[];
  Preference: {
    MaxPrice: MaxPrice;
  };
}

interface Currencies {
  CurrencyCode: string;
}

interface Preference {
  Currencies: Currencies;
}

 export interface AirShoppingRQ {
  Document: Document;
  Party: Party;
  CoreQuery: CoreQuery;
  Preference: Preference;
}
