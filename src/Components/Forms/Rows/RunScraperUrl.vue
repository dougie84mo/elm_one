<template>
<tr>
  <td>
    <input type="text" class="form-control form-control-sm" :value="isChecked" @checked="$emit('update:checked', $event.target.value)">
  </td>
  <td>{{urls}}</td>
  <td>{{tags}}</td>
</tr>
</template>

<script setup>
// import {getCurrentInstance, inject, ref, watchEffect} from "vue";
import {getCurrentInstance, ref} from "vue";

// const currentArrayRow =
const component = getCurrentInstance();
// eslint-disable-next-line no-undef
const emit = defineEmits(['checking-row', 'unchecking-row', 'update:checked']);
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  urls: {type: String, default: 'https://'},
  tags: {type: String, default: ''}
});

const myKey = component.vnode.key;
const addRow = ref(function (index) {emit('checking-row', index);});
const removeRow = ref(function (index) {emit('unchecking-row', index);});
</script>