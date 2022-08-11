import { CURRENCIES } from '~/plugins/mocks/exchange/static'
import { InlinePairWithRate } from '~/types/exchange.types'

export const mockRatesResponse = (): InlinePairWithRate[] => {
  const rates: InlinePairWithRate[] = []
  CURRENCIES.forEach((baseCurrency) => {
    rates.push(...CURRENCIES.filter(quoteCurrency => quoteCurrency !== baseCurrency).map(quoteCurrency => (
      {
        currencyPair: `${baseCurrency}/${quoteCurrency}`,
        rate: Math.floor(Math.random() * 100) + 10,
      }
    )))
  })

  return rates
}
