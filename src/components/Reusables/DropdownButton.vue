<script setup>
// import {defineProps, defineEmits} from 'vue';
import {defineProps, defineEmits} from 'vue';

const emit = defineEmits(['selectItem']);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  title: {type: String, default: 'Dropdown'},
  items: {type: Array, default: () => []},
  id: {type: String, default: "someDropdownId"}
});

const selectItem = (item) => {
  console.log("Emit is set");
  emit('select', item);
};

</script>

<template>
  <div class="btn-group">

    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" :id="id" data-bs-toggle="dropdown" aria-expanded="false">
        {{ title }}
      </button>
      <ul class="dropdown-menu" :aria-labelledby="id">
        <li v-for="(item, index) in items" :key="index">
          <a class="dropdown-item" :href="item.loc" v-bind:data-bs-toggle="item.tog" @click="selectItem(item)">{{ item.label }}</a>
<!--          <a class="dropdown-item" href="#" @click="selectItem(item)">{{ item.label }}</a>-->
        </li>
      </ul>
    </div>
    </div>
</template>

