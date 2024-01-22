<template>
  <div class="btn-group">

    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="{{ id }}" data-bs-toggle="dropdown" aria-expanded="false">
        {{ title }}
      </button>
      <ul class="dropdown-menu" aria-labelledby="{{ id }}" :class="{show: enabled}">
        <li v-for="(item, index) in items" :key="index">
          <a class="dropdown-item" href="#" @click="selectItem(item)">{{ item.label }}</a>
        </li>
      </ul>
    </div>
    </div>
</template>

<script setup>
import {defineProps, emit, ref} from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  title: {type: String, default: 'Dropdown'},
  items: {type: Array, default: () => []},
  id: {type: String, default: "someDropdownId"}
});

const enabled = ref(false);
// const enableDrop = ref(function () {
//   if (enabled.value === false) {
//     enabled.value = true;
//   } else {
//     enabled.value = false;
//   }
// })
const selectItem = (item) => {
  emit('select', item);
};
</script>

