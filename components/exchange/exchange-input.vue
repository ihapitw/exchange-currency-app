<template lang="pug">
  .exchange-input
    el-input(:value="targetValue" @input="onInput")
    el-select(v-model="currencyValue" placeholder="Валюта" )
      el-option(
        v-for="option in currencies"
        :label="option"
        :value="option"
        :key="option"
        :disabled="option === crossCurrency"
      )
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop } from 'nuxt-property-decorator'
import { Currency } from '~/types/exchange.types'

@Component
export default class ExchangeInput extends Vue {
  @PropSync('target', { required: true, type: String })
    targetValue!: string

  @PropSync('currency', { required: true, type: String })
    currencyValue!: Currency

  @Prop({ required: true, type: Array })
  readonly currencies!: Currency[]

  @Prop({ required: true, type: String })
  readonly crossCurrency!: Currency

  onInput (value: string) {
    const [target] = value.match(/(\d+)(\.|,)?(\d+)?/) || []
    if (target) {
      this.targetValue = target.replace(/,/, '.')
    } else {
      this.targetValue = ''
    }
  }
}
</script>

<style scoped lang="scss">
.exchange-input {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 120px;
}
</style>
