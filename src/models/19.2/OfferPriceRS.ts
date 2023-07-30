export interface IATA_OfferPriceRS {
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
  Offer: {
    OfferID: string;
    TotalPrice: {
      Value: number;
      CurrencyCode: string;
    };
    Travelers: {
      Traveler: {
        Id: string;
        AnonymousTraveler: {
          Age: number;
        };
      }[];
    };
    Itineraries: {
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
      Segments: {
        Departure: {
          AirportCode: string;
          Date: string;
          Time?: string;
        };
        Arrival: {
          AirportCode: string;
          Date: string;
          Time?: string;
        };
        Airline: {
          Code: string;
          Name: string;
        };
        FlightNumber: string;
        Aircraft: {
          Code: string;
          Name: string;
        };
        Cabin: {
          Code: string;
          Name: string;
        };
        Duration: string;
      }[];
    }[];
    FareBreakdown: {
      PassengerType: string;
      TotalFare: {
        Value: number;
        CurrencyCode: string;
      };
      Taxes: {
        Type: string;
        Amount: {
          Value: number;
          CurrencyCode: string;
        };
      }[];
    }[];
    FareRules: {
      CurrencyCode: string;
      FareRuleDetail: string;
    };
    AncillaryServices?: any[]; // Placeholder, actual structure may vary based on version
  }[];
}
