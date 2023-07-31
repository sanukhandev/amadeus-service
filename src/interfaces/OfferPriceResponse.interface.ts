export interface OfferPriceResponse {
  warnings: {
    code: number;
    title: string;
    detail: string;
    status: number;
  }[];
  data: {
    type: string;
    flightOffers: {
      type: string;
      id: string;
      source: string;
      instantTicketingRequired: boolean;
      nonHomogeneous: boolean;
      paymentCardRequired: boolean;
      lastTicketingDate: string;
      itineraries: {
        segments: {
          departure: {
            iataCode: string;
            at: string;
          };
          arrival: {
            iataCode: string;
            at: string;
          };
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
          co2Emissions: {
            weight: number;
            weightUnit: string;
            cabin: string;
          }[];
        }[];
      }[];
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
          refundableTaxes: string;
        };
        fareDetailsBySegment: {
          segmentId: string;
          cabin: string;
          fareBasis: string;
          class: string;
          includedCheckedBags: {
            quantity: number;
          };
        }[];
      }[];
    }[];
    bookingRequirements: {
      emailAddressRequired: boolean;
      mobilePhoneNumberRequired: boolean;
      travelerRequirements: {
        travelerId: string;
        documentRequired: boolean;
      }[];
    };
  };
  dictionaries: {
    locations: {
      [iataCode: string]: {
        cityCode: string;
        countryCode: string;
      };
    };
  };
}
