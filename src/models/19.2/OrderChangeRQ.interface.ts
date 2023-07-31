export interface IATA_OrderChangeRQ {
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
      OrderID: {
        ID: string;
      };
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
      Action: string; // Action can be "change", "cancel", "refund", etc.
      OrderItems: {
        Flight: {
          OrderItemID: {
            ID: string;
          };
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
          ID: string;
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
      OrderStatus: string;
    };
  };
}
