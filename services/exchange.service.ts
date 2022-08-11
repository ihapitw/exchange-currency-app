import { BaseService } from '~/services/core/base-service'
import { Currency, CurrencyPair, ExchangeRate } from '~/types/exchange.types'

export class ExchangeService extends BaseService {
  getCurrencies (): Promise<Currency[]> {
    return this.get('/currencies')
  }

  getCurrencyPairs (): Promise<CurrencyPair[]> {
    return this.get('/pairs')
  }

  async getRates (): Promise<ExchangeRate[]> {
    const mock: () => ExchangeRate[] = await this.get('/rates')
    return mock()
  }
}
