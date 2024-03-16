<template>
<div class="row">
  <ul class="nav nav-tabs nav-fill mb-md-4 mb-sm-1">
    <li class="nav-item"
        v-for='tab in tabTitles'
        :key='tab'
        @click="selectedTab = tab"
    >
      <a class="nav-link" href="#{{ tab }}" :class="{active: selectedTab === tab}">{{ tab }}</a>
    </li>
  </ul>
  <slot></slot>
</div>
</template>

<script setup>
import {provide, ref, useSlots} from "vue";
// import {SettingsHandler} from "@/api/ConfigurationHandler";
// let defSelectedTab = "Profiles";

// eslint-disable-next-line no-undef
// const props = defineProps({
//
// });

const slots = useSlots();
const tabTitles = ref(slots.default().map((tab) => tab.props.title));
const selectedTab = ref(tabTitles.value[0]);

provide("selectedTab", selectedTab);
</script>
