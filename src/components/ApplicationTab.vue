<template lang="html">
  <div class="tab-show" v-show="title === selectedTab">
    <slot></slot>
  </div>
</template>

<script>
import {inject} from "vue";
export default {
  props: {
    title: {type: String, default: 'Tab'}
  },
  setup() {
    const selectedTab = inject('selectedTab');

    return {
      selectedTab
    };

  }
  // data () {
  //   return {isActive: true}
  // }
}
</script>

