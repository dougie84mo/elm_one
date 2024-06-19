<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <div class="container-fluid m-2">
  <ApplicationTabs>
      <ApplicationTab title="Task Actions">
        <Suspense>
          <TaskActionPage></TaskActionPage>
        </Suspense>
      </ApplicationTab>
      <ApplicationTab title="Runs">
        Tasks
      </ApplicationTab>
      <ApplicationTab title="Tasks">
        Tasks
      </ApplicationTab>
      <ApplicationTab title="Profiling">
        Add Profile Groups and Auto generate profiles
<!--        <ProfilingPage> </ProfilingPage>-->
      </ApplicationTab>
      <ApplicationTab title="Settings">
        <SettingsPage></SettingsPage>
      </ApplicationTab>
    </ApplicationTabs>
  </div>
</template>

<script setup>
import ApplicationTab from "@/Components/ApplicationTab.vue";
import ApplicationTabs from "@/Components/ApplicationTabs.vue";
import SettingsPage from "@/Pages/SettingsPage.vue";
// import ProfilingPage from "@/Pages/ProfilingPage.vue";
import TaskActionPage from "@/Pages/TaskActionPage.vue";
// import RunsPage from "@/Pages/RunsPage.vue";

// const ActiveTabs = [true, false, false];
//
// export default {
//   components: {MonitorsPage, RafflesPage, ScrapersPage, SettingsPage, ApplicationTab, ApplicationTabs}
// }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
