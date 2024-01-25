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
  {label: 'Web Scraper', value: '1', loc: "#scraperModal", tog: "modal"},
  {label: 'API Scraper', value: '2', loc: "#scraperModal", tog: "modal"},
  // ... other items
]);

const possibleModals = ref(["add_web_scraper", "add_api_scraper"]);

const modalOpen = ref(possibleModals.value[0]);
const handleSelect = (item) => {
  // if (item.hasOwnProperty("modal_name")) {
  //
  // }
    console.log('Selected item:', item, typeof item);
};


// const currentOpen = ref([]);

</script>

<template>
  <div class="row" id="scrapers-tab">
    <div class="col-md-7"><h2>Data Scrapers</h2></div>
    <div class="col-md-5">
      <DropdownButton
          id="addNewScraperDropdownButton"
          title="Add"
          :items="dropdownItems"
          @select="handleSelect">
      </DropdownButton>
    </div>
  </div>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Scraper Name</th><th scope="col">Type</th><th scope="col">Status</th><th scope="col">Options</th>
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
      <div id="scraperModalContent">
      <div class="modal-content" v-if="modalOpen === possibleModals[0]">
          <div class="modal-header" >
            <h5 class="modal-title" id="scraperFormTitle">Add A Scraper Process</h5>
            <button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
      <!--      <div class="row">-->
      <!--        <div class="col-12">-->
      <!--          <label>Scraper Name</label>-->
      <!--          <input class="form-control-sm form-control" v-model.trim="scraperName">-->
      <!--          <label>URL Groups</label>-->
      <!--          &lt;!&ndash; URLS, Labels (i.e. Categories, Tags, Attributes), &ndash;&gt;-->
      <!--          <label>First Scrape Objects</label>-->
      <!--          <label>Secondary Scrape Objects</label>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <button type="button" class="btn btn-primary" @click="saveScraper()">Save changes</button>-->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary">Close</button>
          </div>




        </div>
      </div>
    </div>
  </div>

  <Teleport to="scraperModal">
  </Teleport>

<!--  <AddScraper id="addScraper"></AddScraper>-->
</template>