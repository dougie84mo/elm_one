<script setup>
import {ref} from "vue";
import ModalHeader from "@/Components/Reusables/ModalHeader.vue";
import ModalFooter from "@/Components/Reusables/ModalFooter.vue";
// import {DEFAULT_OBJS} from "@/api/ConfigurationHandler";



// eslint-disable-next-line no-undef,no-unused-vars
// const props = defineProps({
//   api: {type: Object},
//   id: {type: String}
// });

// const scraperName = ref(props.api.value.name)

// const scraperTypes = {
//   web: "Web Scraper",
//   request: "Request Scraper",
//   api: "API"
// }

// const message = ref({message: '', type: 1, class: 'text-success',});

// setInterval(() => {
//   console.log(webScraper.value.scraperUrls);
// }, 10000);


const submitAPIScraper = ref(function () {

})

</script>

<template>

  <ModalHeader title="Add API Scraper"></ModalHeader>
  <div class="modal-body">

  </div>
  <ModalFooter @submit-form="submitAPIScraper"></ModalFooter>

<!--</div>-->
</template>