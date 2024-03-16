<script setup>

// eslint-disable-next-line no-undef,no-unused-vars
import {ref} from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  textValue: {required: true},
  label: {type: String, required: true}
});

const text = ref(props.textValue);

</script>

<template>
  <label for="scraper-name-form" class="form-label">{{ label }}</label>
  <input type="text" class="form-control" id="scraper-name-form" v-model="text">
</template>