import axios, { AxiosRequestConfig, AxiosStatic } from 'axios';
import { APP_KEYS } from '../common/consts';
import { IUrlAndDataFromConfig } from '../common/types/student.types';

export default class HttpSerivce {
  baseUrl: string;

  fetchingService: AxiosStatic;

  apiVersion: string;

  constructor(
    baseUrl = APP_KEYS.BACKEND_KEYS.BASE_TODOS,
    fetchingService = axios,
    apiVersion = 'api'
  ) {
    this.baseUrl = baseUrl;
    this.fetchingService = fetchingService;
    this.apiVersion = apiVersion;
  }

  private getFullApiUrl(url: string) {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private getToken() {
    return localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN);
  }

  private setAuthorizationHeader() {
    this.fetchingService.defaults.headers.common.Authorization = `Bearer ${this.getToken()}`;
  }

  private extractUrlAndDataFromConfig({
    data,
    url,
    ...configWithoutDataAndUrl
  }: IUrlAndDataFromConfig): AxiosRequestConfig {
    return configWithoutDataAndUrl;
  }

  get(config: IUrlAndDataFromConfig, withAuth = true) {
    if (withAuth) {
      this.setAuthorizationHeader();
    }
    return this.fetchingService.get(this.getFullApiUrl(config.url), config.data);
  }

  delete(config: IUrlAndDataFromConfig, withAuth = true) {
    if (withAuth) {
      this.setAuthorizationHeader();
    }
    return this.fetchingService.delete(this.getFullApiUrl(config.url), config.data);
  }

  put(config: IUrlAndDataFromConfig, withAuth = true) {
    if (withAuth) {
      this.setAuthorizationHeader();
    }
    return this.fetchingService.put(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  post(config: IUrlAndDataFromConfig, withAuth = true) {
    if (withAuth) {
      this.setAuthorizationHeader();
    }
    return this.fetchingService.post(this.getFullApiUrl(config.url), config.data);
  }
}
