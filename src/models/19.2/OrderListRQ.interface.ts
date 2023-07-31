export interface IATA_OrderListRQ {
  Message: {
    Party: {
      Sender: {
        TravelAgencySender: {
          Name: string;
          IATA_Number: string;
        };
      };
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
    Parameters?: {
      Page: {
        PageNumber: number;
        PageSize: number;
      };
    };
  };
}
