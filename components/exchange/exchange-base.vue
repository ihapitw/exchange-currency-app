<template lang="pug">
  .exchange-base
    exchange-input(
      :target.sync="baseValue"
      :currency.sync="baseCurrency"
      :currencies="currencies"
      :cross-currency="quoteCurrency"
      @update:target="calculateQuoteCurrency"
      @update:currency="calculateQuoteCurrency"
    )
    exchange-input(
      :target.sync="quoteValue"
      :currency.sync="quoteCurrency"
      :currencies="currencies"
      :cross-currency="baseCurrency"
      @update:target="calculateBaseCurrency"
      @update:currency="calculateQuoteCurrency"
    )

    .exchange-base__meta Курс: 1 {{baseCurrency}} = {{rateWithCommission}} {{quoteCurrency}}
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import type { Currency, PairWithCommission, InlinePairWithRate } from '~/types/exchange.types'
import {
  ExchangeDir,
  applyRateToExchangeValue,
  getRateWithCommission,
  findRateByPair,
  findCommissionByPair,
} from '~/core/exchange.core'
import ExchangeInput from '~/components/exchange/exchange-input.vue'

@Component({
  components: { ExchangeInput },
})
export default class ExchangeBase extends Vue {
  @Prop({ required: true, type: Array })
  readonly pairs!: PairWithCommission[]

  @Prop({ required: true, type: Array })
  readonly rates!: InlinePairWithRate[]

  @Prop({ required: true, type: Array })
  private currencies!: Currency[]

  private baseValue = ''
  private quoteValue = ''

  private baseCurrency: Currency = 'USD'
  private quoteCurrency: Currency = 'EUR'

  get rateWithCommission (): number {
    try {
      const commission = findCommissionByPair(this.pairs, this.baseCurrency, this.quoteCurrency)
      const rate = findRateByPair(this.rates, this.baseCurrency, this.quoteCurrency)

      return getRateWithCommission(rate, commission)
    } catch (e) {
      console.warn(e)
      return 1
    }
  }

  calculateQuoteCurrency () {
    this.quoteValue = applyRateToExchangeValue(
      this.baseValue,
      this.rateWithCommission,
      ExchangeDir.BASE,
    ).toString()
  }

  calculateBaseCurrency () {
    this.baseValue = applyRateToExchangeValue(
      this.quoteValue,
      this.rateWithCommission,
      ExchangeDir.QUOTE,
    ).toString()
  }

  @Watch('rates')
  onRatesChange () {
    this.calculateQuoteCurrency()
  }
}
</script>

<style scoped lang="scss">
.exchange-base {
  width: 450px;
  max-width: 100%;
  display: grid;
  gap: 1rem;
  margin: auto;
  padding: 1rem;
  border-radius: 4px;
  background-color: #fff;

  &__meta {
    font-size: .75em;
    color: dimgray;
  }
}
</style>
