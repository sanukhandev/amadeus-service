import {inject} from '@loopback/core';
import {AmadeusApiDataSource} from '../datasources';
import {FlightOfferRequest} from '../interfaces/amadeus-flight.interface';
import {AnyObject} from '@loopback/repository';



export class AmadeusFlightServiceProvider  {
  constructor(
    @inject('datasources.amadeusApi')
    protected dataSource: AmadeusApiDataSource,
  ) {}

  async getFlightOffers(flightOfferRequest: FlightOfferRequest, pricingCountry:string): Promise<AnyObject> {
    const response = await this.dataSource.execute({
      authCode: pricingCountry,
      method: 'POST',
      url: '/v2/shopping/flight-offers',
      headers: {
        'accept': 'application/vnd.amadeus+json',
        'Content-Type': 'application/vnd.amadeus+json',
      },
      data: flightOfferRequest,
    });
    console.log('Response: ', response);
    return response;

  }


}
