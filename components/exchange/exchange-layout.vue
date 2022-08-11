<template lang="pug">
  .exchange-layout
    slot
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class ExchangeLayout extends Vue {
}
</script>

<style scoped lang="scss">
.exchange-layout {
  width: 450px;
  max-width: 100%;
  margin: auto;
  padding: 1rem;
  border-radius: 4px;
  background-color: #fff;
}
</style>
