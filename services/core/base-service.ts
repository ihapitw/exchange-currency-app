import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosInstance, AxiosRequestConfig } from 'axios'

export class BaseService {
  constructor (protected httpClient: NuxtAxiosInstance | AxiosInstance) {
  }

  get<T = unknown> (path: string, params = {}, requestConfig = {}) {
    return this.request<T>({
      method: 'GET',
      url: path,
      params,
      ...requestConfig,
    })
  }

  post<T = unknown> (path: string, data = {}, requestConfig = {}) {
    return this.request<T>({
      method: 'POST',
      url: path,
      data,
      ...requestConfig,
    })
  }

  async request<T = unknown> (options: AxiosRequestConfig) {
    const config = {
      ...options,
      responseType: options.responseType || 'json',
    }
    const response = await this.httpClient.request<T>(config)
    return response?.data
  }
}
