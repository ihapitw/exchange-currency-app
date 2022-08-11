<template lang="pug">
  .exchange-page
    transition(name="component-switch" mode="out-in")
      exchange-success(
        v-if="lastExchange"
        :exchange-data="lastExchange"
        @on-reset="lastExchange = null"
      )
      exchange-base(
        v-else
        :pairs="pairs"
        :rates="rates"
        :currencies="currencies"
        @on-exchange="onExchange"
      )
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import type { Currency, PairWithCommission, InlinePairWithRate, ExchangeData } from '~/types/exchange.types'
import type { OnBeforeDestroy, OnMounted, WithFetch } from '~/types/vue.types'
import ExchangeBase from '~/components/exchange/exchange-base.vue'
import ExchangeSuccess from '~/components/exchange/exchange-success.vue'

@Component({
  components: { ExchangeSuccess, ExchangeBase },
})
export default class IndexPage extends Vue implements OnBeforeDestroy, OnMounted, WithFetch {
  private pairs: PairWithCommission[] = []
  private rates: InlinePairWithRate[] = []
  private currencies: Currency[] = []

  private lastExchange: ExchangeData | null = null

  private updateRatesInterval!: ReturnType<typeof setTimeout>

  async fetch () {
    this.pairs = await this.$services.exchange.getCurrencyPairs()
    this.currencies = await this.$services.exchange.getCurrencies()
    await this.fetchRates()
  }

  async fetchRates () {
    this.rates = await this.$services.exchange.getRates()
  }

  onExchange (payload: ExchangeData) {
    this.lastExchange = payload
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
