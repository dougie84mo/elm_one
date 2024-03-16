<script setup>
// import crypto from "crypto";
// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  "title": {type: String, default: "Add"},
  "modalId": {type: String, default: "random"},
  "message": {type: Object, default: function () {return {tone: 1, msg: false}}}
});



</script>

<template>
  <div class="modal-header" >
    <h5 class="modal-title" :id="modalId">{{ title }}</h5>
    <h3 class="modal-title" v-if="message.tone > -2" :class="{'text-success': message.tone === 1}">{{message.msg}}</h3>
    <button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
  </div>
</template>