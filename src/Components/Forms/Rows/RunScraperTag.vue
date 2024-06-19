<template>

<tr>
  <td>
    <input type="text" class="form-control form-control-sm" :value="rowSelected" @input="$emit('update:rowChecked', $event.change.value)">
  </td>
  <td>{{urlValue}}</td>
  <td>{{tagValue}}</td>
</tr>
</template>

<script setup>
/* eslint-disable no-undef,no-unused-vars */
// import {getCurrentInstance, inject, ref, watchEffect} from "vue";
import {ref} from "vue";

const rowSelected = ref(true);
const emit = defineEmits(['addRow', 'removeRow', 'update:rowChecked']);
const props = defineProps({
  urlValue: {type: String, default: 'https://'},
  tagValue: {type: String, default: ''}
});


</script>