<script setup>
import {ref} from "vue";
import DropdownButton from "@/Components/Reusables/DropdownButton.vue";

import WebScraperForm from "@/Components/Forms/Modals/WebScraperForm.vue";
import AddAPIScraper from "@/Components/Forms/Modals/AddAPIScraper.vue";


//
const possibleModals = ref(["add_web_scraper", "add_api_scraper"]);
const dropdownItems = ref([
  {label: 'Web Scraper', value: "add_web_scraper", loc: "#scraperModal", tog: "modal"},
  {label: 'API Scraper', value: "add_api_scraper", loc: "#scraperModal", tog: "modal"},
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
  <div class="row" id="scrapers-tab">
    <div class="col-md-7"><h2>Data Scrapers</h2></div>
    <div class="col-md-5"><DropdownButton id="addNewScraperDropdownButton" title="Add" :items="dropdownItems" @selectMe="handleSelect"></DropdownButton></div>
  </div>
  <table class="table table-hover">
    <thead>
      <tr><th scope="col">Raffle Name</th><th scope="col">Type</th><th scope="col">Status</th><th scope="col">Options</th></tr>
    </thead>
    <tbody>

    </tbody>
  </table>
  <div class="modal fade" id="scraperModal" tabindex="-1" aria-labelledby="scraperForm" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-fullscreen-lg-down">
      <div id="scraperModalContent">

        <div class="modal-content" v-if="modalOpen === possibleModals[0]">
          <Suspense>
            <WebScraperForm :scraper-profiles="scraper_profiles"></WebScraperForm>
          </Suspense>
        </div>

        <div class="modal-content" v-else-if="modalOpen === possibleModals[1]">
          <AddAPIScraper></AddAPIScraper>
        </div>
      </div>
    </div>
  </div>

</template>