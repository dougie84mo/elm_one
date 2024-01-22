<script>
import { ref } from 'vue';
// eslint-disable-next-line no-undef,no-unused-vars
const isActive = ref(false)
//
export default {
  props: {
    name: {required: true},
    isActive: {required: false}
  }
}
</script>

<template lang="html">
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<style scoped>

</style>