<script setup>
import ScraperProfileRow from "@/components/Pages/ScraperProfileRow.vue";
import {ref} from "vue";
import DropdownButton from "@/components/Reusables/DropdownButton.vue";
// import AddScraper from "@/components/FormAndModals/AddScraper.vue";
// const openNewScraper = ref(async function() {
//   alert('I am going to open a modal!');
// });

const modalCurrentTitle = ref("Add Scraper");

// const currentModalOpen =
// const mainFormIsShown = ref(false);

const scraper_profiles =  ref([
  {id: 11, name: "Garrett Murphy", isRunning: false},
  {id: 12, name: "Daisy Burns", isRunning: false},
  {id: 13, name: "Lula", isRunning: false},
  {id: 14, name: "Zhang", isRunning: true},
]);
//
const dropdownItems = ref([
  { label: 'Add Scraper', value: '1' },
  { label: 'Option 2', value: '2' },
  // ... other items
]);

const handleSelect = (item) => {
  console.log('Selected item:', item);
};

const modalOpen = ref({addApi: false, addReg: false, edit: false, copy: false, runPre: false})

// const currentOpen = ref([]);

</script>

<template>
  <div class="row" id="scrapers-tab">
    <div class="col-md-7"><h2>Data Scrapers</h2></div>
    <div class="col-md-5">
      <div class="btn-group">
        <DropdownButton id="addNewScraperDropdownButton" title="Add" :items="dropdownItems" @select="handleSelect"></DropdownButton>
      </div>
    </div>
  </div>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Scraper Name</th>
        <th scope="col">Type</th>
        <th scope="col">Status</th>
        <th scope="col">Options</th>
      </tr>
    </thead>
    <tbody>
      <ScraperProfileRow
          v-for="scraper in scraper_profiles"
          :key="scraper.id"
          :name="scraper.name"
          :is-running="scraper.isRunning"
          :scraper="scraper">
      </ScraperProfileRow>
    </tbody>
  </table>
  <div class="modal fade" id="scraperModal" tabindex="-1" aria-labelledby="scraperForm" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-fullscreen-lg-down">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addScraperFormModal">{{ modalCurrentTitle }}</h5>
          <button type="button" class="btn-close" aria-label="Close" data-dismiss="modal"></button>
        </div>
        <div id="scraperModalContent">
        </div>
      </div>
    </div>
  </div>

  <Teleport v-if="modalOpen.addApi[0]" to="#scraperModalContent">
    <div class="modal-header">
      <h5 class="modal-title" id="addScraperFormModal">Add A Scraper Process</h5>
      <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-12">
          <label>Scraper Name</label>
          <input class="form-control-sm form-control" v-model.trim="scraperName">
          <label>Scraper Name</label>
          <label>Scraper Name</label>
          <label>Scraper Name</label>
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="saveScraper()">Save changes</button>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary">Close</button>
    </div>
  </Teleport>
  <div v-else-if="modalOpen.addReg[0]">
    <div class="modal-header">
      <h5 class="modal-title" id="addScraperFormModal">Add A Scraper Process</h5>
      <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-12">
          <label>Scraper Name</label>
          <input class="form-control-sm form-control" v-model.trim="scraperName">
          <label>Scraper Name</label>
          <label>Scraper Name</label>
          <label>Scraper Name</label>
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="saveScraper()">Save changes</button>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary">Close</button>
    </div>
  </div>

<!--  <AddScraper id="addScraper"></AddScraper>-->
</template>