import {IATA_AirShoppingRQ} from '../models/19.2/AirShoppingRQ.interface';
import {FlightOfferRequestInterface} from '../interfaces/FlightOfferRequest.interface';
import {IATA_AirShoppingRS} from '../models/19.2/AirShoppingRS.interface';
import {FlightOfferResponseInterface} from '../interfaces/FlightOfferResponse.interface';

export function convertToFlightOfferRequest(airShoppingRQ: IATA_AirShoppingRQ): FlightOfferRequestInterface {
  return <FlightOfferRequestInterface>{
    currencyCode: 'USD',
    originDestinations: airShoppingRQ.Message.AirShopping.CoreQuery.OriginDestinations.map((originDestination, index) => {
      const {OriginDestination} = originDestination;
      return {
        id: (index + 1).toString(),
        originLocationCode: OriginDestination.Departure.AirportCode,
        destinationLocationCode: OriginDestination.Arrival.AirportCode,
        departureDateTimeRange: {
          date: OriginDestination.Departure.Date,
          time: OriginDestination.Departure.Time,
        },
      };
    }),
    travelers: airShoppingRQ.Message.AirShopping.CoreQuery.Travelers.map((traveler) => {
      const {Traveler} = traveler;
      return {
        id: Traveler.Id,
        travelerType: Traveler.AnonymousTraveler.Age >= 12 ? "ADULT" : "CHILD",
      };
    }),
    sources: ["GDS"],
    searchCriteria: {
      maxFlightOffers: airShoppingRQ.Message.AirShopping.ShoppingResponseIDs?.length ?? 9,
      flightFilters: {
        cabinRestrictions: airShoppingRQ.Message.AirShopping.CoreQuery.Cabin?.Type
          ? [
            {
              cabin: airShoppingRQ.Message.AirShopping.CoreQuery.Cabin.Type,
              coverage: "MOST_SEGMENTS",
              originDestinationIds: airShoppingRQ.Message.AirShopping.CoreQuery.OriginDestinations.map((originDestination, index) => (index + 1).toString()),
            },
          ]
          : [],
      },
    },
  };
}

export function convertFlightOfferResponseToAirShoppingRS(flightOfferResponse: FlightOfferResponseInterface): IATA_AirShoppingRS {
  return {
    Message: {
      Party: {
        Sender: {
          TravelAgencySender: {
            Name: "Travel Globe LLC",
            IATA_Number: "12345678",
          },
        },
        Recipient: {
          AirlineRecipient: {
            Name: flightOfferResponse.dictionaries.carriers[flightOfferResponse.data[0].validatingAirlineCodes[0]],
            Code: flightOfferResponse.data[0].validatingAirlineCodes[0],
          },
        },
      },
      AirShopping: {
        Travelers: {
          Traveler: [
            {
              AnonymousTraveler: {
                Age: 30,
              },
            },
          ],
        },
        ShoppingResponseIDs: flightOfferResponse.data.map((flightOffer) => {
          return {
            ResponseID: flightOffer.id,
          };
        }),
        ResponseTime: new Date().toISOString(), // You can set the actual response time here
        Offers: flightOfferResponse.data.map((flightOffer) => {
          return {
            OfferID: flightOffer.id,
            TotalPrice: {
              Value: parseFloat(flightOffer.price.total),
              CurrencyCode: flightOffer.price.currency,
            },
            Itineraries: [
              {
                Segments: flightOffer.itineraries[0].segments.map((segment) => {
                  return {
                    Departure: {
                      AirportCode: segment.departure.iataCode,
                      Date: segment.departure.at.split("T")[0],
                      Time: segment.departure.at.split("T")[1],
                    },
                    Arrival: {
                      AirportCode: segment.arrival.iataCode,
                      Date: segment.arrival.at.split("T")[0],
                      Time: segment.arrival.at.split("T")[1],
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
                      Code: "ECONOMY", // Assuming economy class for all offers
                      Name: "Economy Class", // You can set the actual cabin name here
                    },
                    Duration: segment.duration,
                  };
                }),
              },
            ],
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
              FareRuleDetail: "", // Not available in the provided data
            },
            AncillaryServices: [], // Not available in the provided data
          };
        }),
      },
    },
  };
}
