import { Context } from '@nuxt/types'
import MockAdapter from 'axios-mock-adapter'
import { mockPairsResponse } from '~/plugins/mocks/exchange/pairs'
import { mockRatesResponse } from '~/plugins/mocks/exchange/rates'
import { CURRENCIES } from '~/plugins/mocks/exchange/static'

export default function ({ $axios }: Context) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const mocksAdapter = new MockAdapter($axios)

  mocksAdapter.onGet('/pairs').reply(200, mockPairsResponse())
  mocksAdapter.onGet('/rates').reply(200, mockRatesResponse)
  mocksAdapter.onGet('/currencies').reply(200, CURRENCIES)
}
