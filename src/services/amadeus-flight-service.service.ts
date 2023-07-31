import {inject} from '@loopback/core';
import {AmadeusApiDataSource} from '../datasources';
import {FlightOfferRequestInterface} from '../interfaces/FlightOfferRequest.interface';
import {AnyObject} from '@loopback/repository';
import {FlightOfferPricing} from '../interfaces/offer-price.interface';


export class AmadeusFlightServiceProvider  {
  constructor(
    @inject('datasources.amadeusApi')
    protected dataSource: AmadeusApiDataSource,
  ) {}

  async getFlightOffers(flightOfferRequest: FlightOfferRequestInterface, pricingCountry:string): Promise<AnyObject> {
    console.log('flightOfferRequest', JSON.stringify(flightOfferRequest));
    return this.dataSource.execute({
      authCode: pricingCountry,
      method: 'POST',
      url: '/v2/shopping/flight-offers',
      data: flightOfferRequest,
    });

  }

  async getFlightOffersPricing(flightOfferPricingRequest: FlightOfferPricing, pricingCountry:string): Promise<AnyObject> {
    return this.dataSource.execute({
      authCode: pricingCountry,
      method: 'POST',
      url: '/v1/shopping/flight-offers/pricing?forceClass=false',
      data: flightOfferPricingRequest,
    });
  }


}
