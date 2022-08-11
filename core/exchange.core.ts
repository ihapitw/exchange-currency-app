import { Currency, PairWithCommission, InlinePairWithRate } from '~/types/exchange.types'

export enum ExchangeDir {
  BASE,
  QUOTE,
}

export const applyRateToExchangeValue = (sourceValue: number | string, rate: number, direction: ExchangeDir): number | string => {
  let value = sourceValue
  if (value === '') {
    return ''
  }

  if (typeof value === 'string') {
    value = Number(value)

    if (isNaN(value)) {
      throw new TypeError(`Incorrect value ${sourceValue}`)
    }
  }

  if (direction === ExchangeDir.BASE) {
    return parseFloat((value * rate).toFixed(4))
  }
  if (direction === ExchangeDir.QUOTE) {
    return parseFloat((value / rate).toFixed(4))
  }

  throw new Error(`This direction: ${direction} not supported`)
}

export const getRateWithCommission = (rate: number, commission: number) => {
  return rate - rate * commission
}

export const findRateByPair = (list: InlinePairWithRate[], base: Currency, quote: Currency): number => {
  const currencyRate = list.find(rate => rate.currencyPair === `${base}/${quote}`)
  if (currencyRate) {
    return currencyRate.rate
  } else {
    throw new Error(`Not found pair with ${base} and ${quote} currencies`)
  }
}

export const findCommissionByPair = (list: PairWithCommission[], base: Currency, quote: Currency): number => {
  const currencyRate = list.find(pair => pair.baseCurrency === base && pair.quoteCurrency === quote)
  if (currencyRate) {
    return parseFloat(currencyRate.commission) / 100
  } else {
    throw new Error(`Not found pair with ${base} and ${quote} currencies`)
  }
}
