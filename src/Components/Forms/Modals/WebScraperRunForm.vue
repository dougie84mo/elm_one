<script setup>
import {ref} from "vue";
import ModalHeader from "@/Components/Reusables/ModalHeader.vue";
import ModalFooter from "@/Components/Reusables/ModalFooter.vue";
// import {nanoid} from "nanoid/non-secure";
import {FileHandler} from "@/api/FileTools";
import {DEFAULT_FIELDS, DEFAULT_OBJS, SCRAPER_TAG_TABLE} from "@/api/ObjTools";
import RunScraperTag from "@/Components/Forms/Rows/RunScraperTag.vue";
import RunScraperUrl from "@/Components/Forms/Rows/RunScraperUrl.vue";
import {BasicFileHandler} from "@/api/AsyncTools";
import {nanoid} from "nanoid/non-secure";

const msgr = DEFAULT_FIELDS.message();
let runScraper, scraperId, webScraper, webScraperSecondary=null;

// TODO: each scraper gets its own id , directory with all there runs and config file with the name of the file being the id
const setDefaultScraper = () => {
  scraperId = nanoid();
  runScraper = ref(DEFAULT_OBJS.WebScraper);
};

if (props.rScrapeId > 0 && props.rScrapeId !== "") {
  runScraper = FileHandler.get
}

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  rScrapeId: {type: [String,Number], default: ""},
});
saveScraperRun = ref(async function () {
  if (props.rScrapeId > 0 && props.rScrapeId !== "") {
    FileHandler.saveNewScraperRun(scraperId, runScraper.value);
  }
  msgr.msg = "Successfully added scraper "+webScraper.value.name;msgr.tone = 1;
  console.log(webScraper.value);
});
// (async () => {
//
// })();
const isRunning = ref(props.isRunning);

const saveAndRunScraper = await ref(function () {
  runScraper.value();
  // let monthYear = new Date();
  isRunning.value = true;
});

const selectAll = ref((scraper, arrType) => {

})

const deselectAll = ref((scraper, arrType) => {


});

// TODO:: Add the prior data scrape or date scrape
const secondaryOptions = {
  type: ['none', 'otherRun', 'scraperFirst'],
  mappingString: "",

};

</script>

<template>

  <ModalHeader title="Add Web Scraper" :message="msgr"></ModalHeader>
  <div class="modal-body">
    <div class="row">

      <div class="col-12">
        <select id="scraper-first-scraper-id" v-model="runScraper.scraperId">
          <option v-for="sp in scraperProfiles" :value="sp.id" :key="sp.id">{{ sp.name }}</option>
        </select>
        <label for="scraper-first-scraper-id" class="form-label">Choose the scraper you want to run first</label>
      </div>

      <div class="col-12">
        <h4>Urls to Scrape</h4>
        <table class="table table-striped table-bordered">
          <a class="btn btn-secondary" @click="deselectAll(webScraper, 'scraperUrls')">Deselect All</a>
          <thead><tr><th>Run All <input type="checkbox" @click="selectAll(webScraper, 'scraperUrls')"></th><th>Tag Name</th><th>Tag Value</th><th>Options</th></tr></thead>
          <tbody>
            <RunScraperUrl
                v-for="(item, index) in runScraper.scraperTags"
                :key="index"
            ></RunScraperUrl>
          </tbody>
        </table>

      </div>
      <div class="col-12">
        <hr>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="scraper-has-first-scrape" v-model="runScraper.secondaryScrape.isSecondaryScraper">
          <label class="form-check-label" for="scraper-has-first-scrape">Does this scraper have an initial scrape that it looks to run from.</label>
        </div>
      </div>
      <div class="col-12" v-if="!runScraper.isSecondaryScraper">

      </div>
      <div v-else>
        <div class="col-12">

        </div>
        <div class="col-12">
          <label for="scraper-name-form" class="form-label">What URL Value are you using?</label>
          <input type="text" class="form-control" id="scraper-name-form" v-model="runScraper.scraperUrlValue">
        </div>

      </div>
    </div>
  </div>

  <ModalFooter
      @submit-form="runScraper"
      :has-save-and-run="true"
      @save-and-run="saveAndRunScraper"
      :is-running="isRunning"
      @stop-run="stopRun"
  ></ModalFooter>


</template>

