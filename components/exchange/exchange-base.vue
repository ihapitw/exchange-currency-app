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

    .exchange-base__footer
      .exchange-base__meta
        template(v-if="isExchangePossible") Курс: 1 {{baseCurrency}} = {{rateWithCommission}} {{quoteCurrency}}
      el-button(type="primary" @click="onExchange" :disabled="!isExchangePossible") Обменять
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'nuxt-property-decorator'
import type { Currency, PairWithCommission, InlinePairWithRate, ExchangePayload } from '~/types/exchange.types'
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

  private baseCurrency: Currency = ''
  private quoteCurrency: Currency = ''

  get isCurrenciesSelected () {
    return this.baseCurrency && this.quoteCurrency
  }

  get isHasValues () {
    return this.baseValue && this.quoteValue
  }

  get isExchangePossible () {
    return this.isCurrenciesSelected && this.isHasValues
  }

  get rateWithCommission (): number {
    if (!this.isCurrenciesSelected) {
      return 1
    }

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

  @Emit()
  onExchange (): ExchangePayload {
    return {
      base: {
        currency: this.baseCurrency,
        amount: Number(this.baseValue),
      },
      quote: {
        currency: this.quoteCurrency,
        amount: Number(this.quoteValue),
      },
    }
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

  &__footer {
    display: grid;
    align-items: center;
    gap: 1rem;
    grid-template-columns: 1fr 120px;
  }

  &__meta {
    font-size: .75em;
    color: dimgray;
  }
}
</style>
