<script setup>
import {ref} from "vue";

const scraperTypes = {
  "html": [], "text": [], "attr": [], "para": [], "img": [], "file": [],
};

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  scraperType: {type: String, default: "html", validator(value) {
      // eslint-disable-next-line vue/valid-define-props
      return Object.keys(scraperTypes).includes(value);
  }},
  currentRowNum: {type: Number, default: 1}
})



const name = ref("Some name");
// const scraperType = ref("text");

</script>

<template>
<tr>
  <td>
    <!--  Column Name   -->
    <input type="text" class="form-control" v-model="name">
  </td>
  <td>
    <!--  Scraping Type {HTML, Text, Image, File}   -->
    <select class="form-control" v-model="scraperType">
      <option value="html">HTML (Inner HTML)</option>
      <option value="text">Text (Inner Text)</option>
      <option value="attr">Attributes (Get HTML Attribute)</option>
      <option value="para">Parameter Manipulation</option>
      <option value="img">Image (Image Lists)</option>
      <option value="file">Files (File/FileName Lists)</option>
    </select>
  </td>
  <td>
    <!-- SCRAPER OPTION   -->
    <!--  If HTML or Text  -->
    <!--  Is this is selected / we need to check if it is an ID  -->
  </td>
  <td>
    <button class="btn btn-primary" @click="addRow(currentRowNum)"><i class="fa fa-plus"></i></button>
    <button class="btn btn-primary" @click="copyRow(currentRowNum)"><i class="fa fa-copy"></i></button>
    <button class="btn btn-danger" @click="removeRow(currentRowNum)"><i class="fa-fa-minus"></i></button>
  </td>
</tr>
</template>