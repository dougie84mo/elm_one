<script setup>
import {ref} from "vue";
import BasicUrlScraperRow from "@/Components/Forms/Rows/BasicUrlScraperRow.vue";
import ModalHeader from "@/Components/Reusables/ModalHeader.vue";
import ModalFooter from "@/Components/Reusables/ModalFooter.vue";
import {BasicFileHandler} from "@/api/AsyncTools";

import TagUrlRow from "@/Components/Forms/Rows/TagUrlRow.vue";
import {nanoid} from "nanoid/non-secure";
import {FileHandler} from "@/api/FileTools";
import {DEFAULT_ITEMS, DEFAULT_OBJS, SCRAPER_TAG_TABLE, TABLE_RULE} from "@/api/ObjTools";

const msgr = DEFAULT_ITEMS.message();
let saveWebScraper, scraperId, webScraper;

const setDefaultScraper = () => {
  scraperId = nanoid();
  webScraper = ref(DEFAULT_OBJS.WebScraper);
};

//TODO: Add a login feature for dashboard and dealer portals

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  sid: {type: [String,Number], default: ""}
});
if (props.sid > 0 && props.sid !== "") {
  webScraper = ref(FileHandler.getScraperJson(props.sid));
  console.log("Going to look for this api")
} else {
  setDefaultScraper();
}

(async () => {
  saveWebScraper = ref(async function () {
    await BasicFileHandler.addToScraperFile(scraperId, webScraper.value);
    msgr.msg = "Successfully added scraper "+webScraper.value.name;
    msgr.tone = 1;
    console.log(webScraper.value);
    setDefaultScraper();
  });
})();

const saveAndRunScraper = await ref(function () {
  saveWebScraper.value();
});


</script>

<template>

  <ModalHeader title="Add Web Scraper" :message="msgr"></ModalHeader>
  <div class="modal-body">
    <div class="row">
      <div class="col-12 mb-3" v-if="sid !== 0">
        <label for="scraper-id-value" class="form-label">Scraper Id</label>
        <input type="text" class="form-control" id="scraper-id-value" :value="sid" disabled>
      </div>
      <div class="col-12 mb-3">
        <label for="scraper-name-form" class="form-label">Scraper Name</label>
        <input type="text" class="form-control" id="scraper-name-form" v-model="webScraper.name">
      </div>
      <div class="col-6 mb-3">
        <label for="scraper-baseurl-form" class="form-label">Base Url</label>
        <input type="text" class="form-control" id="scraper-baseurl-form" v-model="webScraper.baseUrl">
      </div>
      <div class="col-6 mb-3">
        <label for="scraper-baseurl-form" class="form-label">Website Name</label>
        <input type="text" class="form-control" id="scraper-baseurl-form" v-model="webScraper.websiteName">
      </div>
      <div class="col-12 mb-3">
        <label for="scraper-container" class="form-label">Scraper Container (The CSS this scraper will look for on the page)</label>
        <input type="text" class="form-control" id="scraper-container" v-model="webScraper.scrapeContainer">
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
        <h4>Urls to Scrape</h4>
        <table class="table table-striped table-bordered">
          <thead><tr><th>Urls [Can Be Comma Separated]</th><th>Tags</th><th>Options</th></tr></thead>
          <tbody>
          <BasicUrlScraperRow
              v-for="(item, index) in webScraper.scraperUrls"
              v-model:urls="item.urls"
              v-model:tags="item.tags"
              :key="index"
              @add-row="TABLE_RULE(webScraper).add"
              @remove-row="TABLE_RULE(webScraper).remove"
              @duplicate-row="TABLE_RULE(webScraper).duplicate"
          ></BasicUrlScraperRow>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <ModalFooter
      @submit-form="saveWebScraper"
      :has-save-and-run="true"
      @save-and-run="saveAndRunScraper"
  ></ModalFooter>


</template>

