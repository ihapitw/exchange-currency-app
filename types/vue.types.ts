import Vue from 'vue'

export interface OnMounted extends Vue {
  mounted(): void,
}

export interface OnBeforeDestroy extends Vue {
  beforeDestroy(): void,
}

export interface WithFetch {
  fetch(): Promise<void> | void,
  fetchOnServer?: boolean | (() => boolean),
  fetchDelay?: number,
}
