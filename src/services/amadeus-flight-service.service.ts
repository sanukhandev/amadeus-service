import {inject} from '@loopback/core';
import {AmadeusApiDataSource} from '../datasources';
import {OfferPriceRequest} from '../interfaces/OfferPriceRequest.interface';
import {OfferPriceResponse} from '../interfaces/OfferPriceResponse.interface';
import {FlightOfferRequest} from '../interfaces/FlightOfferRequest.interface';
import {FlightOfferResponse} from '../interfaces/FlightOfferResponse.interface';
import {OrderCreateRequest} from '../interfaces/OrderCreateRequest.interface';
import {OrderViewResponse} from '../interfaces/OrderViewResponse.interface';


export class AmadeusFlightServiceProvider  {
  constructor(
    @inject('datasources.amadeusApi')
    protected dataSource: AmadeusApiDataSource,
  ) {}

  async getFlightOffers(flightOfferRequest: FlightOfferRequest, pricingCountry:string): Promise<FlightOfferResponse> {
    return this.dataSource.execute({
      authCode: pricingCountry,
      method: 'POST',
      url: '/v2/shopping/flight-offers',
      data: flightOfferRequest,
    });

  }

  async getFlightOffersPricing(flightOfferPricingRequest: OfferPriceRequest, pricingCountry:string): Promise<OfferPriceResponse> {
    return this.dataSource.execute({
      authCode: pricingCountry,
      method: 'POST',
      url: '/v1/shopping/flight-offers/pricing?forceClass=false',
      data: flightOfferPricingRequest,
    });
  }

  async createOrder(orderCreateRequest: OrderCreateRequest, pricingCountry:string): Promise<OrderViewResponse> {
    return this.dataSource.execute({
      authCode: pricingCountry,
      method: 'POST',
      url: '/v1/booking/flight-orders',
      data: orderCreateRequest,
    });
  }
}
