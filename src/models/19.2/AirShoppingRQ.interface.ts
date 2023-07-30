export interface IATA_AirShoppingRQ {
  Message: {
    Party: {
      Sender: {
        TravelAgencySender: {
          Name: string;
          IATA_Number: string;
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
      RequestedDate?: {
        Date: string;
      };
      CoreQuery: {
        OriginDestinations: {
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
          };
        }[];
        Travelers: {
          Traveler: {
            Id: string;
            AnonymousTraveler: {
              Age: number;
            };
          };
        }[];
        Cabin?: {
          Type: string;
        };
        IncludedAirlineCodes?: {
          AirlineCode: string;
        }[];
        ExcludedAirlineCodes?: {
          AirlineCode: string;
        }[];
        MaxPrice?: {
          Value: number;
          CurrencyCode: string;
        };
        DirectFlights?: boolean;
        MaxStopsQuantity?: number;
        Currency?: string;
      };
      Preferences?: {
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
      };
    };
  };
}
