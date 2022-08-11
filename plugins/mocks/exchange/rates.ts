import { CURRENCIES } from '~/plugins/mocks/exchange/static'
import { ExchangeRate } from '~/types/exchange.types'

export const mockRatesResponse = (): ExchangeRate[] => {
  const rates: ExchangeRate[] = []
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
