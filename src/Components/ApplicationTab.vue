<template lang="html">
  <div class="tab-show" v-show="title === selectedTab">
    <slot></slot>
  </div>
</template>

<script setup>
import {inject} from "vue";

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  title: {type: String, default: 'Tab'}
});
const selectedTab = inject('selectedTab');
</script>

