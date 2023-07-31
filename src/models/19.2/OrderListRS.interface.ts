export interface IATA_OrderListRS {
  Message: {
    Party: {
      Sender: {
        TravelAgencySender: {
          Name: string;
          IATA_Number: string;
        };
      };
      Recipient: {
        TravelAgencyRecipient: {
          Name: string;
          IATA_Number: string;
        };
      };
    };
    Success: boolean;
    Errors?: {
      Error: {
        Code: string;
        ShortText: string;
      }[];
    };
    Query: {
      Filters: {
        TravelAgency: {
          AgencyID: string;
        };
      };
      Sorting: {
        Sort: {
          OrderBy: {
            Attribute: string;
            Descending: boolean;
          };
        };
      };
    };
    Orders?: {
      Order: {
        OrderID: string;
        BookingReferences?: {
          BookingReference: {
            ID: string;
            Type: string;
          };
        }[];
        TotalAmount?: {
          Amount: {
            Value: number;
            CurrencyCode: string;
          };
        };
        OrderItems?: {
          OrderItem: {
            OfferItemID: string;
            PassengerReference: string[];
            TotalPrice?: {
              Amount: {
                Value: number;
                CurrencyCode: string;
              };
            };
            AssociatedServices?: {
              ServiceID: string;
              Name: string;
            }[];
          };
        }[];
      };
    }[];
  };
}
