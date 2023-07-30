export interface IATA_AirShoppingRS {
  Message: {
    Party: {
      Sender: {
        TravelAgencySender: {
          Name: string;
          IATA_Number: string;
        };
      };
      Recipient: {
        AirlineRecipient: {
          Name: string;
          Code: string;
        };
      };
    };
    AirShopping: {
      Travelers: {
        Traveler: {
          AnonymousTraveler: {
            Age: number;
          };
        }[];
      };
      ShoppingResponseIDs?: {
        ResponseID: string;
      }[];
      Metadata?: {
        Key: string;
        Value: string;
      }[];
      ResponseTime: string;
      Offers: {
        OfferID: string;
        TotalPrice: {
          Value: number;
          CurrencyCode: string;
        };
        Itineraries: {
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
        AncillaryServices: any[];
      }[];
    };
  };
}
