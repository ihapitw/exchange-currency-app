export type Currency = string
export type Commission = '1.00' | '2.00' | '3.00' | '4.00' | '5.00'

export type CurrencyPair = {
  baseCurrency: Currency,
  quoteCurrency: Currency,
  commission: Commission,
}

export type ExchangeRate = {
  currencyPair: string,
  rate: number
}
