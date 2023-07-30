import {inject} from '@loopback/core';
import {param, post, requestBody, Response, RestBindings} from '@loopback/rest';
import {AmadeusFlightServiceProvider} from '../services';
import {FlightOfferPricing} from '../interfaces/offer-price.interface';
import { IATA_AirShoppingRQ} from '../models/19.2/AirShoppingRQ.interface';
import {convertFlightOfferResponseToAirShoppingRS, convertToFlightOfferRequest} from '../Utils/BoilerPlate';
import {IATA_AirShoppingRS} from '../models/19.2/AirShoppingRS.interface';

export class AmadeusFlightController {
  constructor(
    @inject('services.AmadeusFlightServiceProvider')
    private flightServiceProvider: AmadeusFlightServiceProvider,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
  ) {}

  @post('/flight-offers/{priceIngCountry}', {
    responses: {
      '200': {
        description: 'Flight Offer',
        content: {'application/json': {schema: {type: 'object'}}},
      },
    },
  })
  async getFlightOffers(
    @requestBody() flightOfferRequest: IATA_AirShoppingRQ,
    @param.path.string('priceIngCountry') priceIngCountry: string,
  ): Promise<IATA_AirShoppingRS> {
    const response : any = await this.flightServiceProvider.getFlightOffers(convertToFlightOfferRequest(flightOfferRequest), priceIngCountry);
    return convertFlightOfferResponseToAirShoppingRS(response)
  }


@post('/flight-offers-pricing/{priceIngCountry}', {
  responses: {
    '200': {
      description: 'Flight Offer pricing',
      content: {'application/json': {schema: {type: 'object'}}},
    },
  },
})
async getFlightOffersPricing(
  @requestBody() flightOfferPricingRequest: FlightOfferPricing,
  @param.path.string('priceIngCountry') priceIngCountry: string, )
  : Promise<any> {
  return this.flightServiceProvider.getFlightOffersPricing(flightOfferPricingRequest, priceIngCountry);
  }
}