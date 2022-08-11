<template lang="pug">
  exchange-layout.exchange-success
    .exchange-success__title Обмен прошел успешно!
    .exchange-success__details
      ='Вы обменяли '
      span {{exchangeData.base.amount}} {{exchangeData.base.currency}}
      =' на '
      span {{exchangeData.quote.amount}} {{exchangeData.quote.currency}}
    .exchange-success__action
      el-button(type="primary" @click="onReset") Обменять еще раз
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'
import type { ExchangeData } from '~/types/exchange.types'
import ExchangeLayout from '~/components/exchange/exchange-layout.vue'

@Component({
  components: { ExchangeLayout },
})
export default class ExchangeSuccess extends Vue {
  @Prop({ required: true, type: Object })
  readonly exchangeData: ExchangeData

  @Emit()
  onReset () {
    return undefined
  }
}
</script>

<style scoped lang="scss">
.exchange-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    text-align: center;
    font-weight: 500;
    font-size: 22px;
  }

  &__details {
    margin-top: 1.5rem;
    font-size: 14px;

    span {
      background-color: cornflowerblue;
      color: #fff;
      padding: 2px 4px;
      border-radius: 4px;
    }
  }

  &__action {
    margin-top: 2rem;
  }
}
</style>
