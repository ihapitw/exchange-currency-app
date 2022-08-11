<template lang="pug">
  .exchange-page
    exchange-base(:pairs="pairs" :rates="rates" :currencies="currencies" @on-exchange="onExchange")
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import type { Currency, PairWithCommission, InlinePairWithRate, ExchangePayload } from '~/types/exchange.types'
import type { OnBeforeDestroy, OnMounted, WithFetch } from '~/types/vue.types'
import ExchangeBase from '~/components/exchange/exchange-base.vue'

@Component({
  components: { ExchangeBase },
})
export default class IndexPage extends Vue implements OnBeforeDestroy, OnMounted, WithFetch {
  private pairs: PairWithCommission[] = []
  private rates: InlinePairWithRate[] = []
  private currencies: Currency[] = []

  private updateRatesInterval!: ReturnType<typeof setTimeout>

  async fetch () {
    this.pairs = await this.$services.exchange.getCurrencyPairs()
    this.currencies = await this.$services.exchange.getCurrencies()
    await this.fetchRates()
  }

  async fetchRates () {
    this.rates = await this.$services.exchange.getRates()
  }

  onExchange (payload: ExchangePayload) {
    console.info(payload)
  }

  mounted () {
    this.updateRatesInterval = setInterval(this.fetchRates, 30 * 1000)
  }

  beforeDestroy () {
    clearInterval(this.updateRatesInterval)
  }
}
</script>

<style lang="scss">
.exchange-page {
  flex-grow: 1;
  display: flex;
  background-color: cornflowerblue;
}
</style>
