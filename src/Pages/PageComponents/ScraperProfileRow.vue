<script setup>
import {getCurrentInstance, ref} from "vue";
const component = getCurrentInstance();
const scraperId = component.vnode.key;
// console.log(scraperId);

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  name: {type: String, required: true},
  isRunning: {type: [Boolean, String], default: false},
  scraper: {type: [Object], required: true}
});

// TODO : swap id for scraper and get scraper for each instance?

// eslint-disable-next-line no-undef,vue/valid-define-emits
const emit = defineEmits(['handleEditSelect', 'copyScraperPrompt']);

const disabledButtons = ref({run: false, stop: false, runs: false, edit: false, copy: false});

const RunningAbility = {
  'running-0': '<i class="fa fa-hourglass text-info"></i>',
  'running-1': '<i class="fa fa-hourglass-start text-info"></i>',
  'running-2': '<i class="fa fa-hourglass-half text-info"></i>',
  'running-3': '<i class="fa fa-hourglass-end text-info"></i>',
  'done': '<i class="fa fa-check text-success"></i>',
  'failed': '<i class="fa fa-circle-xmark text-danger"></i>',
  'waiting': '<i class="fa fa-clock"></i>',
};


const runScraperEvent = ref( function() {
  // TODO: Start the process of running the api
  disabledButtons.value.run = true;
  currentlyRunning.value = true;
  // Should also disable the edit button ???
  let i = 1, failed = false, iters = 0;
  boundHtml.value = RunningAbility['running-0'];
  let someInterval = setInterval(function() {
    boundHtml.value = RunningAbility[`running-${i}`];
    if (currentlyRunning.value === false) {
      boundHtml.value = failed ? RunningAbility['failed'] : RunningAbility['done'];
      //todo: check last run.
      clearTimeout(someInterval);
    } else if (i === 3) {
      i = 0;
      iters++;
      if (iters >= 3) {
        disabledButtons.value.run = false
        currentlyRunning.value = false
      }
    }
    i++;
  }, 1000);
});

const copyScraper = ref(function () {
  alert(`Copy the scraper with id ${scraperId}`)
})

let boundHtml = ref(RunningAbility['waiting']);
const currentlyRunning = ref(props.isRunning);
if (currentlyRunning.value === true) {
  runScraperEvent.value();
}

// const currentCollapseOpen = ref(false);
// const inTransition = ref(false);

// const stopScrapeEvent = ref(async function() {
//   // console.log("Some timeout event");
//   disabledButtons.value.stop = true;
//   currentlyRunning.value = false;
// });

const handleEditSelect = function () {
  let value = props.scraper.type === 0 ? 'add_web_scraper' : "add_api_scraper";
  // console.log(scraperId);
  emit('handleEditSelect', {value}, scraperId)
};

// provide('currentModal', currentModalOpen);

</script>

<template>
<tr>
  <td>{{name}}</td>
  <td>
    <p>Type: {{}}</p>

<!--    <span class="scraper-run-not-running" v-if="currentlyRunning !== true">-->
<!--      <span class="pe-2" v-html="boundHtml"></span>-->
<!--      <button class="btn btn-secondary" @click="runScraperEvent()" :disabled="disabledButtons.run">Run</button>-->
<!--    </span>-->
<!--    <span class="scraper-run-container" v-else>-->
<!--      <span class="pe-2" v-html="boundHtml"></span>-->
<!--      <button class="btn btn-danger" @click="stopScrapeEvent()" :disabled="disabledButtons.stop">Stop</button>-->
<!--    </span>-->

  </td>
  <td>
    <div class="btn-group">
     <button class="btn btn-outline-secondary" data-bs-target="#scraperModal" data-bs-toggle="modal" :disabled="disabledButtons.edit" @click="handleEditSelect()">Edit</button>
     <button class="btn btn-outline-secondary click-to-open-runs" :disabled="disabledButtons.runs">Runs</button>
     <button class="btn btn-outline-info" @click="copyScraper()" :disabled="disabledButtons.copy"><i class="fa fa-copy"></i></button>
    </div>
  </td>
</tr>
<tr>

</tr>
</template>