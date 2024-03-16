<script setup>

// eslint-disable-next-line no-undef
const emit = defineEmits(['submitForm', 'stopRun', 'saveAndRun']);
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  "submitTitle": {type: String, default: "Submit"},
  "closeTitle": {type: String, default: "Close"},
  "isRunning": {type: Boolean, default: false},
  "hasSaveAndRun": {type: Boolean, default: false}
});

const submitFormModal = function () {emit('submitForm');};

const saveAndRun = function () {emit('submitForm');};
const stopRun = function () {emit('stopRun');};

</script>

<template>
  <div class="modal-footer">
    <button type="submit" class="btn btn-success" @click="stopRun" v-if="hasSaveAndRun && isRunning">{{ submitTitle }}</button>
    <button type="submit" class="btn btn-success" @click="saveAndRun" v-if="!isRunning && hasSaveAndRun">{{ submitTitle }}</button>
    <button type="submit" class="btn btn-info" @click="submitFormModal">Save And Run</button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ closeTitle }}</button>
  </div>
</template>