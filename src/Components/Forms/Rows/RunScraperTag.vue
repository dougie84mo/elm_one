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
// import {getCurrentInstance, inject, ref, watchEffect} from "vue";
import {getCurrentInstance, ref} from "vue";

const rowSelected = ref(true);
// const currentArrayRow =
const component = getCurrentInstance();
// eslint-disable-next-line no-undef
const emit = defineEmits(['addRow', 'removeRow', 'update:rowChecked']);
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  urlValue: {type: String, default: 'https://'},
  tagValue: {type: String, default: ''}
});

const myKey = component.vnode.key;

</script>