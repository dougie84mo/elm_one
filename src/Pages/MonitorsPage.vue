<script setup>
import {ref} from "vue";
import DropdownButton from "@/Components/Reusables/DropdownButton.vue";

//
const possibleModals = ref(["add_web_monitor", "add_api_monitor"]);
const dropdownItems = ref([
  {label: 'Web Monitor', value: "add_web_monitor", loc: "#monitorModal", tog: "modal"},
  {label: 'API Monitor', value: "add_api_monitor", loc: "#monitorModal", tog: "modal"},
]);

//TODO: web api minus api self function

const modalOpen = ref(possibleModals.value[0]);
const handleSelect = (item) => {
  if ("value" in item) {
    modalOpen.value = item.value;
    // console.log(modalOpen.value);
  }
};

</script>

<template>
  <div class="row" id="monitors-tab">
    <div class="col-md-7"><h2>Monitors Page</h2></div>
    <div class="col-md-5"><DropdownButton id="addNewMonitor" title="Add" :items="dropdownItems" @selectMe="handleSelect"></DropdownButton></div>
  </div>
  <table class="table table-hover">
    <thead>
      <tr><th scope="col">Monitor Name</th><th scope="col">Type</th><th scope="col">Status</th><th scope="col">Options</th></tr>
    </thead>
    <tbody>
    </tbody>
  </table>
  <div class="modal fade" id="monitorModal" tabindex="-1" aria-labelledby="monitorForm" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-fullscreen-lg-down">
      <div id="monitorModalContent">


      </div>
    </div>
  </div>

</template>