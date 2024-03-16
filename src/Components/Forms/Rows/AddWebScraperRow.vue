<script setup>
import {ref, defineEmits} from "vue";

const emit = defineEmits(['addRow', 'removeRow']);
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  rowNum: {type: Number, default: 1}
});

const field = ref({
  name: '',
  isInnerHtml: false,
  cssSelector: "div",
});

const addRow = ref(function () {
  emit('addRow');
});
const removeRow = ref(function () {
  emit('removeRow');
});
// const scraperType = ref("text");

</script>

<template>
<tr>
  <td>
    <!--  Column Name   -->
    <input type="text" class="form-control" v-model="field.name">
  </td>
  <td>
    <input type="checkbox" id="checkbox" v-model="field.isInnerHtml">
  </td>
  <td>
    <input type="text" class="form-control" v-model="field.cssSelector">
  </td>
  <td>
    <button class="btn btn-primary" @click="addRow"><i class="fa fa-plus"></i></button>
    <button class="btn btn-danger" @click="removeRow"><i class="fa-fa-minus"></i></button>
  </td>
</tr>
</template>