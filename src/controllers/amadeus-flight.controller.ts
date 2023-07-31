import {inject} from '@loopback/core';
import {param, post, requestBody, Response, RestBindings} from '@loopback/rest';
import {AmadeusFlightServiceProvider} from '../services';
import {FlightOfferRequest} from '../interfaces/FlightOfferRequest.interface';
import {FlightOfferResponse} from '../interfaces/FlightOfferResponse.interface';
import {OfferPriceRequest} from '../interfaces/OfferPriceRequest.interface';
import {OfferPriceResponse} from '../interfaces/OfferPriceResponse.interface';
import {OrderCreateRequest} from '../interfaces/OrderCreateRequest.interface';
import {OrderViewResponse} from '../interfaces/OrderViewResponse.interface';



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
    @requestBody() flightOfferRequest: FlightOfferRequest,
    @param.path.string('priceIngCountry') priceIngCountry: string,
  ): Promise<FlightOfferResponse> {
    return this.flightServiceProvider.getFlightOffers(flightOfferRequest, priceIngCountry);
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
  @requestBody() flightOfferPricingRequest: OfferPriceRequest,
  @param.path.string('priceIngCountry') priceIngCountry: string, )
  : Promise<OfferPriceResponse> {
  return this.flightServiceProvider.getFlightOffersPricing(flightOfferPricingRequest, priceIngCountry);
  }
  @post('/create-order/{priceIngCountry}', {
    responses: {
      '200': {
        description: 'Create Order',
        content: {'application/json': {schema: {type: 'object'}}},
      },
    },
  })
  async createOrder(
    @requestBody() orderCreateRequest: OrderCreateRequest,
    @param.path.string('priceIngCountry') priceIngCountry: string, )
    : Promise<OrderViewResponse> {
    return this.flightServiceProvider.createOrder(orderCreateRequest, priceIngCountry);
  }

}



