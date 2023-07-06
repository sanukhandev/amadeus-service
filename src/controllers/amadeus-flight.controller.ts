import {inject} from '@loopback/core';
import {FlightOfferRequest} from '../interfaces/amadeus-flight.interface';
import {param, post, requestBody, Response, RestBindings} from '@loopback/rest';
import {AmadeusFlightServiceProvider} from '../services';

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
  ): Promise<any> {
    const response = await this.flightServiceProvider.getFlightOffers(flightOfferRequest, priceIngCountry);
    console.log('Response: ', response);
    return response;
  }
}