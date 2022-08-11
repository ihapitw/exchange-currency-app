import { BaseService } from '~/services/core/base-service'
import type { Currency, PairWithCommission, InlinePairWithRate } from '~/types/exchange.types'

export class ExchangeService extends BaseService {
  getCurrencies (): Promise<Currency[]> {
    return this.get('/currencies')
  }

  getCurrencyPairs (): Promise<PairWithCommission[]> {
    return this.get('/pairs')
  }

  async getRates (): Promise<InlinePairWithRate[]> {
    const mock: () => InlinePairWithRate[] = await this.get('/rates')
    return mock()
  }
}
