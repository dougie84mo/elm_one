<template>
<tr>
  <td>
    <input type="text" class="form-control form-control-sm" :value="urls" @input="$emit('update:urls', $event.target.value)">
  </td>
  <td><input type="text" class="form-control form-control-sm" :value="tags" @input="$emit('update:tags', $event.target.value)"></td>
  <td>
    <div class="btn-group">
    <button class="btn btn-success" @click="addRow(myKey)"><i class="fa fa-plus"></i></button>
    <button class="btn btn-danger" @click="removeRow(myKey)"><i class="fa fa-minus"></i></button>
    <button class="btn btn-secondary" @click="duplicateRow(myKey, {urls, tags})"><i class="fa fa-copy"></i></button>
    </div>
  </td>
</tr>
</template>

<script setup>
// import {getCurrentInstance, inject, ref, watchEffect} from "vue";
import {getCurrentInstance, ref} from "vue";

// const currentArrayRow =
const component = getCurrentInstance();
// eslint-disable-next-line no-undef
const emit = defineEmits(['addRow', 'removeRow', 'duplicateRow', 'update:urls', 'update:tags']);
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  urls: {type: String, default: 'https://'},
  tags: {type: String, default: ''}
});

const myKey = component.vnode.key;
const addRow = ref(function (index) {emit('addRow', index);});
const removeRow = ref(function (index) {emit('removeRow', index);});
const duplicateRow = ref(function (index, fields) {
  emit('duplicateRow', index, fields);
});
</script>