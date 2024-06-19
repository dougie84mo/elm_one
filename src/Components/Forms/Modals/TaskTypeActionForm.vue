<script setup>
import {ref} from "vue";
import BasicUrlScraperRow from "@/Components/Forms/Rows/BasicUrlScraperRow.vue";
import ModalHeader from "@/Components/Reusables/ModalHeader.vue";
import ModalFooter from "@/Components/Reusables/ModalFooter.vue";
import TagUrlRow from "@/Components/Forms/Rows/TagUrlRow.vue";
import {nanoid} from "nanoid/non-secure";
import {FileHandler} from "@/api/FileTools";
import {DEFAULT_ITEMS, DEFAULT_OBJS, TABLE_RULE} from "@/api/ObjTools";
// import {task} from "@vue/cli-plugin-eslint/ui/taskDescriptor";
const msgr = DEFAULT_ITEMS.message();
const defaultTaskTypes = ref(DEFAULT_ITEMS.taskType);
const taskAction = ref(DEFAULT_OBJS.TaskTypeAction()), hasBaseSet = ref(false);
let ATN;
let taskActionData = {};

//TODO: Add a login feature for dashboard and dealer portals
//TODO: Add TaskActionData as a seperate object

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  taskActionId: {type: [String,Number], default: "0"}
});

const setDefaultTaskAction = () => {
  taskAction.value = DEFAULT_OBJS.TaskTypeAction();
  hasBaseSet.value = false;

};
// console.log(props.taskActionId);
if (props.taskActionId !== "0") {
  let currentTask = FileHandler.getScraperJson(props.taskActionId);
  if (typeof currentTask === "object") {
    hasBaseSet.value = true;
    taskAction.value = currentTask;
  }
  console.log("Going to look for this api");
} else setDefaultTaskAction();

const can = (i) => DEFAULT_ITEMS.actionNames[i];

// console.log(taskAction.value);
const saveWebScraper = function () {
  ATN = can(taskAction.value.action);
  // TODO: Check for validation, Check if taskActionId does not exist
  msgr.tone = 1;
    msgr.msg = "Successfully added scraper "+ATN;
  if (taskAction.value.id === "0") {
    taskAction.value.id = nanoid();
  }
  FileHandler.addToTaskActionFile(taskAction.value);
  // console.log(taskAction.value);
  setDefaultTaskAction();
};

let temporaryObj;
const showTaskTypePrompt = ref(function () {
  hasBaseSet.value = true;
  temporaryObj = DEFAULT_OBJS.TaskTypeAction(taskAction.value.action);
  // console.log(temporaryObj);
  taskAction.value = temporaryObj;
  console.log(taskAction.value);
});


const resetTaskAction = ref(function () {
  if (taskAction.value.id === "0") {
    hasBaseSet.value = false;
    taskAction.value = DEFAULT_OBJS.TaskTypeAction(taskAction.value.action);
    console.log(taskAction.value);
  }
});

// const TABLE = ref(TABLE_RULE(taskAction));

// TODO: Website Name, instead maybe a tagging system for sorting.


</script>

<template>
  <ModalHeader title="Add Web Scraper" :message="msgr"></ModalHeader>
  <div class="modal-body">
    <div class="row" id="task-action-type-container" v-if="!hasBaseSet">
      <div class="col-8">
        <div class="input-group input-group-sm">
          <label class="input-group-text" for="sort-by-task-type">Task Type</label>
          <select class="form-select-sm form-select" v-model="taskAction.action">
            <option v-for="(index, title) in DEFAULT_ITEMS.taskType" :key="index" :value="index">{{ title }}</option>
          </select>
        </div>
      </div>
      <div class="col-4">
        <button class="btn btn-primary" @click="showTaskTypePrompt()">Create Task Type</button>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-12 mb-3" v-if="taskActionId !== '0'">
        <label for="scraper-id-value" class="form-label">Id</label>
        <input type="text" class="form-control" id="scraper-id-value" :value="taskActionId" disabled>
      </div>
      <div class="col-12 mb-3" v-else>
        <span>Once you choose an action and a task type you cannot change it. </span>
        <button class="btn btn-warning" @click="resetTaskAction()">Reset Task</button>
      </div>
      <div class="col-6-md mb-3">
        <label for="scraper-name-form" class="form-label">Action Name</label>
        <input type="text" class="form-control" id="scraper-name-form" v-model="taskAction.actionName">
      </div>
      <div class="col-6-md mb-3">
        <label for="scraper-baseurl-form" class="form-label">Task Action Tags</label>
        <input type="text" class="form-control" id="scraper-baseurl-form" v-model="taskAction.actionTags">
      </div>
      <div class="col-12" v-if="taskAction.action === defaultTaskTypes.Initialization">
        <h4>Urls to Scrape</h4>
        <table class="table table-striped table-bordered">
          <thead><tr><th>Urls [Can Be Comma Separated]</th><th>Tags</th><th>Options</th></tr></thead>
          <tbody>
            <BasicUrlScraperRow
              v-for="(item, index) in taskAction.taskActionData"
              v-model:urls="item.urls"
              v-model:tags="item.tags"
              :key="index"
              @add-row="TABLE_RULE(taskActionData).addUrlTag"
              @remove-row="TABLE_RULE(taskActionData).remove"
              @duplicate-row="TABLE_RULE(taskActionData).duplicate"
            ></BasicUrlScraperRow>
          </tbody>
        </table>
      </div>
      <div class="col-12" v-else-if="taskAction.action === defaultTaskTypes.Scraper">
        <h4>Scraper Params</h4>
        <table class="table table-striped table-bordered">
          <thead><tr><th>Tag Type</th><th>Tag Name</th><th>Tag Value</th><th>Options</th></tr></thead>
          <tbody>
            <TagUrlRow
                v-for="(item, index) in taskAction.taskActionData"
                v-model:tag-type="item.tagType"
                v-model:tag-name="item.tagName"
                v-model:tag-value-css="item.tagValueCss"
                :key="index"
                @add-row="TABLE_RULE(taskActionData).add"
                @remove-row="TABLE_RULE(taskActionData).remove"
                @duplicate-row="TABLE_RULE(taskActionData).duplicate"
            ></TagUrlRow>
          </tbody>
        </table>

      </div>
    </div>
  </div>

  <ModalFooter
      @submit-form="saveWebScraper"
      :has-save-and-run="true"
  ></ModalFooter>


</template>

