<script setup>
import {ref, defineEmits} from "vue";
const emit = defineEmits(['addAttrRow', 'removeAttrRow']);
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  currentRowNum: {type: Number, default: 1}
});

const theScraperField = ref({name: '', cssSelector: "div", attributeName: "href"});

const addRow = ref(function () {
  emit('addAttrRow');
});
const removeRow = ref(function () {
  emit('removeAttrRow');
});
</script>

<template>
<tr>
  <td>
    <input type="text" class="form-control" v-model="theScraperField.name">
  </td>
  <td>
    <input type="text" class="form-control" v-model="theScraperField.cssSelector">
  </td>
  <td>
    <input type="text" class="form-control" v-model="theScraperField.attributeName">
  </td>
  <td>
    <button class="btn btn-primary" @click="addRow"><i class="fa fa-plus"></i></button>
    <button class="btn btn-danger" @click="removeRow"><i class="fa-fa-minus"></i></button>
  </td>
</tr>
</template>