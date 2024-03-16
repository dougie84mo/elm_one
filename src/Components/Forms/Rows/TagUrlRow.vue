<template>
<tr>
  <td>
    <select class="form-select form-select-sm" :value="tagType" @change="$emit('update:tagType', parseInt($event.target.value))">
      <option v-for="(sp, index) in tagTypes" :value="index" :key="index" :selected="tagType === index">{{ sp }}</option>
    </select>
  </td>
  <td><input type="text" class="form-control form-control-sm" :value="tagName" @input="$emit('update:tagName', $event.target.value)"></td>
  <td><input type="text" class="form-control form-control-sm" :value="tagValueCss" @input="$emit('update:tagValueCss', $event.target.value)"></td>
  <td>
    <div class="btn-group">
    <button class="btn btn-success" @click="addRow(myKey)"><i class="fa fa-plus"></i></button>
    <button class="btn btn-danger" @click="removeRow(myKey)"><i class="fa fa-minus"></i></button>
    <button class="btn btn-secondary" @click="duplicateRow(myKey, {tagName, tagType, tagValueCss})"><i class="fa fa-copy"></i></button>
    </div>
  </td>
</tr>
</template>

<script setup>
// import {getCurrentInstance, inject, ref, watchEffect} from "vue";
import {getCurrentInstance, ref} from "vue";


const tagTypes = ref(['InnerHTML', 'InnerText', 'Attribute', 'Static Parameter']);

// const currentArrayRow =
const component = getCurrentInstance();
// eslint-disable-next-line no-undef
const emit = defineEmits(['addRow', 'removeRow', 'duplicateRow', 'update:tagValueCss', 'update:tagType', 'update:tagName']);
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  tagType: {type: Number},
  tagValueCss: {type: String, default: ''},
  tagName: {type: String, default: ''}
});

const myKey = component.vnode.key;
const addRow = ref(function (index) {emit('addRow', index);});
const removeRow = ref(function (index) {emit('removeRow', index);});
const duplicateRow = ref(function (index, fields) {
  emit('duplicateRow', index, fields);
});
</script>