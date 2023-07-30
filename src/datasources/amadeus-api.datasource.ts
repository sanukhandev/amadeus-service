import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import axios from 'axios';

interface AuthConfig {
  [key: string]: {
    clientId: string;
    clientSecret: string;
  };
}
  interface RequestPayload{
  method: string;
  url: string;
  data?: never;
  headers?: never;
  authCode?: string;
}




const COMMON_HEADERS = {
  'accept': 'application/vnd.amadeus+json',
  'Content-Type': 'application/vnd.amadeus+json',
};




const AuthConfig: AuthConfig = {
  EU: {
    clientId : 'uGpEYjEylytHnKXeAXDc099Fqjulg2z1',
    clientSecret:'qmRyNLBUZdqWYS7a'
  }
}

const config = {
  name: 'amadeusApi',
  connector: 'rest',
  baseURL: 'https://test.api.amadeus.com',
  options: {
    headers: {
      'Content-Type': 'application/vnd.amadeus+json',
    },
  },
  crud: false,
};

@lifeCycleObserver('datasource')
export class AmadeusApiDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'amadeusApi';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.amadeusApi', {optional: true})
      dsConfig: object = config,
  ) {
    super(dsConfig);
  }

  execute(request: any): Promise<any> {
    if(request.authCode === undefined) return this.sendRequest(request);
    return this.authenticate(request.authCode).then((accessToken: string) => {
      request.headers = COMMON_HEADERS;
      request.headers.Authorization = `Bearer ${accessToken}`;
      return this.sendRequest(request);
    });
  }

  authenticate(authCode: string): Promise<string> {
    if (!AuthConfig[authCode]) throw new Error('Invalid Country Code');
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('client_id', AuthConfig[authCode].clientId);
    data.append('client_secret', AuthConfig[authCode].clientSecret);
    return axios
      .post(config.baseURL+'/v1/security/oauth2/token', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response: any) => {
        console.log('Authenticated!');
        return response.data.access_token;
      });
  }

  sendRequest({method, url, headers, data}:RequestPayload ): Promise<any> {
    url = config.baseURL + url;
    return axios({
      method,
      url,
      headers,
      data,
    })
      .then((response: any) => {
        console.log('Response: ', response.data);
        return response.data;
      })
      .catch((error: any) => {
        console.error('Error executing request:', error);
        throw error;
      });
  }
}
