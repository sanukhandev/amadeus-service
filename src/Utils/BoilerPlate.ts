import {AirShoppingRQ} from '../models/19.2/AirShoppingRQ.interface';
import {FlightOfferRequest} from '../interfaces/flightRequest';
import {FlightOfferResponse} from '../interfaces/FlightOfferResponse';
import {AirShoppingRS} from '../models/19.2/AirShoppingRS.interface';

export function convertToFlightOfferRequest(airShoppingRQ: AirShoppingRQ): FlightOfferRequest {
  return {
    currencyCode: airShoppingRQ.Preference.Currencies.CurrencyCode,
    originDestinations: airShoppingRQ.CoreQuery.OriginDestinations.map((originDestination) => {
      return {
        id: '1',
        originLocationCode: originDestination.Departure.AirportCode,
        destinationLocationCode: originDestination.Arrival.AirportCode,
        departureDateTimeRange: {
          date: originDestination.Departure.Date,
          time: "10:00:00", // Replace this with the actual time if available in the AirShoppingRQ
        },
      };
    }),
    travelers: airShoppingRQ.CoreQuery.Passengers.map((passenger) => {
      return {
        id: passenger.id,
        travelerType: passenger.PTC,
      };
    }),
    sources: ["GDS"], // This value is not available in the AirShoppingRQ, assuming it as "GDS"
    searchCriteria: {
      maxFlightOffers: 2, // Replace this with the actual maxFlightOffers from AirShoppingRQ
      flightFilters: {
        cabinRestrictions: airShoppingRQ.CoreQuery.CabinPreferences.map((cabinPreference) => {
          return {
            cabin: cabinPreference.CabinType,
            coverage: "MOST_SEGMENTS", // Assuming this value, as it is not available in the AirShoppingRQ
            originDestinationIds: airShoppingRQ.CoreQuery.OriginDestinations.map((originDestination) => originDestination.id),
          };
        }),
      },
    },
  };
}

export function convertFlightOfferResponseToAirShoppingRS(flightOfferResponse: FlightOfferResponse): AirShoppingRS {
  return {
    FlightOffers: flightOfferResponse.data.map((flightOffer) => {
      return {
        OfferID: flightOffer.id,
        TotalPrice: {
          Value: parseFloat(flightOffer.price.total),
          CurrencyCode: flightOffer.price.currency,
        },
        Itineraries: flightOffer.itineraries.map((itinerary) => {
          return {
            Segments: itinerary.segments.map((segment) => {
              return {
                Departure: {
                  AirportCode: segment.departure.iataCode,
                  Date: segment.departure.at.split('T')[0],
                  Time: segment.departure.at.split('T')[1],
                },
                Arrival: {
                  AirportCode: segment.arrival.iataCode,
                  Date: segment.arrival.at.split('T')[0],
                  Time: segment.arrival.at.split('T')[1],
                },
                Airline: {
                  Code: segment.operating.carrierCode,
                  Name: flightOfferResponse.dictionaries.carriers[segment.operating.carrierCode],
                },
                FlightNumber: segment.number,
                Aircraft: {
                  Code: segment.aircraft.code,
                  Name: flightOfferResponse.dictionaries.aircraft[segment.aircraft.code],
                },
                Cabin: {
                  Code: segment.operating.carrierCode, // Not present in the original interfaces
                  Name: flightOfferResponse.dictionaries.carriers[segment.operating.carrierCode], // Not present in the original interfaces
                },
                Duration: segment.duration,
              };
            }),
          };
        }),
        FareBreakdown: flightOffer.travelerPricings.map((travelerPricing) => {
          return {
            PassengerType: travelerPricing.travelerType,
            TotalFare: {
              Value: parseFloat(travelerPricing.price.total),
              CurrencyCode: travelerPricing.price.currency,
            },
            Taxes: flightOffer.price.fees.map((fee) => {
              return {
                Type: fee.type,
                Amount: {
                  Value: parseFloat(fee.amount),
                  CurrencyCode: travelerPricing.price.currency,
                },
              };
            }),
          };
        }),
        FareRules: {
          CurrencyCode: flightOffer.price.currency,
          FareRuleDetail: '', // Not present in the original interfaces
        },
        AncillaryServices: [], // Not present in the original interfaces
      };
    }),
  };
}
