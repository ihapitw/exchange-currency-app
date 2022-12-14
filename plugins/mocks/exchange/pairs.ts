import { COMMISSIONS, CURRENCIES } from '~/plugins/mocks/exchange/static'
import { Commission, PairWithCommission } from '~/types/exchange.types'

const getRandomCommission = (): Commission => {
  return COMMISSIONS[Math.floor(Math.random() * COMMISSIONS.length)] || COMMISSIONS[0] || '1.00'
}

export const mockPairsResponse = (): PairWithCommission[] => {
  const pairs: PairWithCommission[] = []

  CURRENCIES.forEach((baseCurrency) => {
    pairs.push(...CURRENCIES.filter(quoteCurrency => quoteCurrency !== baseCurrency).map(quoteCurrency => (
      {
        baseCurrency,
        quoteCurrency,
        commission: getRandomCommission(),
      }
    )))
  })

  return pairs
}
