<script setup>
import {ref} from "vue";
import ModalHeader from "@/Components/Reusables/ModalHeader.vue";
import ModalFooter from "@/Components/Reusables/ModalFooter.vue";
import {DEFAULT_OBJS, SCRAPER_TAG_TABLE, DEFAULT_FIELDS, BasicFileHandler} from "@/api/AsyncTools";
import TagUrlRow from "@/Components/Forms/Rows/TagUrlRow.vue";
import {nanoid} from "nanoid/non-secure";

const msgr = DEFAULT_FIELDS.message();
let saveWebScraper;
(async () => {
  saveWebScraper = ref(async function () {
    let newId = nanoid();
    await BasicFileHandler.addToScraperFile(newId, webScraper.value)
    console.log(webScraper.value);
  });
})();

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  id: {type: String, default: ""},
  isRunning: {type: Boolean, default: false},
  scraperProfiles: {type: Object, default: function() {return [];}}
})
const isRunning = ref(false);
const webScraper = ref(DEFAULT_OBJS.WebScraper);

if (props.id.length > 10) {
  // get the web api file.
  console.log("Going to look for this api")
}


// console.log(webScraper);


const saveAndRunScraper = await ref(function () {
  saveWebScraper.value();


  isRunning.value = true;
});

const stopRun = ref(() => {
  //actually stop the process
  isRunning.value = false;
})

</script>

<template>

  <ModalHeader title="Add Web Scraper" :message="msgr"></ModalHeader>
  <div class="modal-body">
    <div class="row">
      <div class="col-12 mb-3">
        <label for="scraper-name-form" class="form-label">Scraper Name</label>
        <input type="text" class="form-control" id="scraper-name-form" v-model="webScraper.name">
      </div>
      <div class="col-12 mb-3">
        <label for="scraper-name-form" class="form-label">Scraper Container (The CSS this scraper will look for on the page)</label>
        <input type="text" class="form-control" id="scraper-name-form" v-model="webScraper.scrapeContainer">
      </div>
      <div class="col-12">
        <h4>Urls to Scrape</h4>
        <table class="table table-striped table-bordered">
          <thead><tr><th>Tag Type</th><th>Tag Name</th><th>Tag Value</th><th>Options</th></tr></thead>
          <tbody>
            <TagUrlRow
                v-for="(item, index) in webScraper.scraperTags"
                v-model:tag-type="item.tagType"
                v-model:tag-name="item.tagName"
                v-model:tag-value-css="item.tagValueCss"
                :key="index"
                @add-row="SCRAPER_TAG_TABLE(webScraper).add"
                @remove-row="SCRAPER_TAG_TABLE(webScraper).remove"
                @duplicate-row="SCRAPER_TAG_TABLE(webScraper).duplicate"
            ></TagUrlRow>
          </tbody>
        </table>

      </div>
      <div class="col-12">
        <hr>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="scraper-has-first-scrape" v-model="webScraper.secondaryScrape.isSecondaryScraper">
          <label class="form-check-label" for="scraper-has-first-scrape">Does this scraper have an initial scrape that it looks to run from.</label>
        </div>
      </div>

      <div v-else>
        <div class="col-12">
          <select id="scraper-first-scraper-id" v-model="webScraper.secondaryScrape.scraperId">
            <option v-for="sp in scraperProfiles" :value="sp.id" :key="sp.id">{{ sp.name }}</option>
          </select>
          <label for="scraper-first-scraper-id" class="form-label">Choose the scraper you want to run first</label>
        </div>
        <div class="col-12">
          <label for="scraper-name-form" class="form-label">What URL Value are you using?</label>
          <input type="text" class="form-control" id="scraper-name-form" v-model="webScraper.secondaryScrape.scraperUrlValue">
        </div>

      </div>
    </div>
  </div>

  <ModalFooter
      @submit-form="saveWebScraper"
      :has-save-and-run="true"
      @save-and-run="saveAndRunScraper"
      :is-running="isRunning"
      @stop-run="stopRun"
  ></ModalFooter>


</template>

