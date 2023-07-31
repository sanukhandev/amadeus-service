export interface IATA_OfferPriceRQ {
  Document: {
    Name: string;
    ReferenceVersion: string;
  };
  Party: {
    Sender: {
      TravelAgencySender: {
        Name: string;
        IATA_Number: string;
      };
    };
    Participants?: {
      Participant: {
        Name: string;
        Code: string;
        Type: string;
      }[];
    };
  };
  Query: {
    OriginDestination: {
      Departure: {
        AirportCode: string;
        Date: string;
        Time?: string;
      };
      Arrival: {
        AirportCode: string;
        Date?: string;
        Time?: string;
      };
    }[];
    Travelers?: {
      Traveler: {
        Id: string;
        AnonymousTraveler: {
          Age: number;
        };
      }[];
    };
    Cabin?: {
      Type: string;
    };
    AirlinePreferences?: {
      Airline: {
        AirlineID: string;
      };
      FarePreferences?: {
        FareCode: string;
        FareBasisCode?: string;
      }[];
    }[];
    FarePreferences?: {
      FareCode: string;
      FareBasisCode?: string;
    }[];
    OtherPreferences?: {
      Preference: {
        Key: string;
        Value: string;
      };
    }[];
    MaxPrice?: {
      Value: number;
      CurrencyCode: string;
    };
    DirectFlights?: boolean;
    MaxStopsQuantity?: number;
    Currency?: string;
  };
}
