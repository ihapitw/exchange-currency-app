import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import { ExchangeService } from '~/services/exchange.service'

export interface IServices {
  exchange: ExchangeService
}

export default function ({ $axios }: Context, inject: Inject) {
  const services = {
    exchange: new ExchangeService($axios),
  }

  inject('services', services)
}
