export interface IATA_OrderCreateRQ {
  Message: {
    Party: {
      Sender: {
        TravelAgencySender: {
          Name: string;
          IATA_Number: string;
        };
      };
    };
    Order: {
      POS: {
        Source: {
          RequestorID: {
            ID: string;
            Type: string;
          };
        };
      };
      UniqueID: {
        ID: string;
      };
      OrderItems: {
        Flight: {
          FlightSegment: {
            Departure: {
              AirportCode: string;
              Date: string;
              Time: string;
            };
            Arrival: {
              AirportCode: string;
              Date: string;
              Time: string;
            };
            MarketingCarrier: {
              AirlineID: string;
            };
            OperatingCarrier: {
              AirlineID: string;
            };
            FlightNumber: string;
            OperatingFlightNumber: string;
            Equipment: {
              AircraftCode: string;
            };
            ClassOfService: {
              Code: string;
            };
            DepartureTimeZone: string;
            ArrivalTimeZone: string;
          };
        };
      }[];
      Travelers: {
        Traveler: {
          AnonymousTraveler: {
            Age: number;
          };
        }[];
      };
      Payments?: {
        Payment: {
          Method: {
            Code: string;
          };
          Amount: {
            Value: number;
            CurrencyCode: string;
          };
          Payer: {
            Name: string;
            Email?: string;
          };
        }[];
      };
      Action: string;
    };
  };
}
