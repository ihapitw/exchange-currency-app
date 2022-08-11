<template lang="pug">
  .exchange-page
    exchange-base(:pairs="pairs" :rates="rates" :currencies="currencies")
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ExchangeBase from '~/components/exchange/exchange-base.vue'
import { Currency, CurrencyPair, ExchangeRate } from '~/types/exchange.types'
import { OnBeforeDestroy, OnMounted, WithFetch } from '~/types/vue.types'

@Component({
  components: { ExchangeBase },
})
export default class IndexPage extends Vue implements OnBeforeDestroy, OnMounted, WithFetch {
  private pairs: CurrencyPair[] = []
  private rates: ExchangeRate[] = []
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
