<script setup>
import ScraperProfileRow from "@/Pages/PageComponents/ScraperProfileRow.vue";
import {ref} from "vue";
import {FileHandler} from "@/api/FileTools";
import TaskTypeActionForm from "@/Components/Forms/Modals/TaskTypeActionForm.vue";
import TaskRunActionForm from "@/Components/Forms/Modals/TaskRunActionForm.vue";
import {DEFAULT_ITEMS} from "@/api/ObjTools";
// import {BasicFileHandler} from "@/api/AsyncTools";
let currentTaskActionList =  [], sortedActionList = [];
let currentId = ref("0");
const sortActionTypes = ref({...DEFAULT_ITEMS.taskType, ...{"All": -1}});
const actionTypeSort = ref(-1);
const searchTerm = ref("");
const setFullTaskActions = function () {
  currentTaskActionList = FileHandler.getTaskActionsFileJson();
}
setFullTaskActions();

const sortFullTaskActions = function () {
  sortedActionList = [];
  for (const i in currentTaskActionList) {
    let l = currentTaskActionList[i];
    // console.log(i, l);
    if (searchTerm.value === "") {
      let matchesTypes = false;
      // eslint-disable-next-line no-prototype-builtins
      if (l.hasOwnProperty("action")) {
        if (actionTypeSort.value === -1 || l.action === actionTypeSort.value) {
          matchesTypes = true;
        }
      }

      if (matchesTypes) {
        sortedActionList.push(l);
      }
    }
  }
}
sortFullTaskActions();



const possibleModals = ref(["add_task_action", "run_task_action_group", "run_web_scraper"]);

//TODO: web api minus api self function

const modalOpen = ref(possibleModals.value[0]);
const handleSelect = ref((item, current = "0") => {
  if (typeof item === "string") modalOpen.value = item;
  currentId.value = current;
});

// TODO : Add Runs View Modal, Add Current Run Data View

</script>

<template>
  <div class="row" id="scrapers-tab">
    <div class="col-md-7"><h2>Data Scrapers</h2></div>
    <div class="col-md-5">
      <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#taskUpdateModal" @click="handleSelect(possibleModals[0])">Add Action</button>
    </div>
    <div class="col-6">
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="basic-addon1">Search</span>
        <input type="text" class="form-control form-control-sm" v-model="searchTerm" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
      </div>
    </div>
    <div class="col-6">
      <div class="input-group input-group-sm">
        <label class="input-group-text" for="sort-by-task-type">Task Type</label>
        <select class="form-select-sm form-select" v-model="actionTypeSort">
          <option v-for="(index, title) in sortActionTypes" :key="index" :value="index">{{ title }}</option>
        </select>
      </div>
    </div>
  </div>

  <table class="table table-hover">
    <thead>
      <tr><th scope="col">Action Name</th><th scope="col">Type</th><th scope="col">Options</th></tr>
    </thead>
    <tbody>
    <ScraperProfileRow v-for="(scraper, index) in sortedActionList"
             :key="index"
             :name="scraper.name"
             :scraper="scraper"
             @handle-edit-select="handleSelect">
    </ScraperProfileRow>
    </tbody>
  </table>
  <div class="modal fade" id="taskUpdateModal" tabindex="-1" aria-labelledby="scraperForm" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-fullscreen-lg-down">
      <div id="scraperModalContent">

        <div class="modal-content" v-if="modalOpen === possibleModals[0]">
          <Suspense>
            <TaskTypeActionForm :task-action-id="currentId"></TaskTypeActionForm>
          </Suspense>
        </div>
        <div class="modal-content" v-else-if="modalOpen === possibleModals[1]">
          <Suspense>
            <TaskRunActionForm :sid="currentId"></TaskRunActionForm>
          </Suspense>
        </div>

      </div>
    </div>
  </div>

</template>