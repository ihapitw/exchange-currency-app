import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import { ExchangeService } from '~/services/exchange.service'

export interface IServices {
  exchange: ExchangeService
}

// prevent memory leak on SSR
// eslint-disable-next-line import/no-mutable-exports
let services: IServices

export default function ({ $axios }: Context, inject: Inject) {
  services = {
    exchange: new ExchangeService($axios),
  }

  inject('services', services)
}

export { services }
