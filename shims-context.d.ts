import { IServices } from '~/plugins/services.plugin'

declare module '@nuxt/types' {
  interface Context {
    $services: IServices,
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $services: IServices,
  }
}

export {}
