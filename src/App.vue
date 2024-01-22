<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <div class="container-fluid m-2">
  <ApplicationTabs>
      <ApplicationTab title="Scrapers">
        <ScrapersPage></ScrapersPage>
      </ApplicationTab>
      <ApplicationTab title="Raffles">
        <div class="row">
          <div class="col-md-7"><h2>Raffles</h2></div>
          <div class="col-md-5">
            <div class="btn-group">
              <button class="btn btn-success">Add</button>
              <button class="btn btn-secondary">Edit</button>
            </div>
          </div>
        </div>
        <table>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </table>
      </ApplicationTab>
      <ApplicationTab title="Proxies">
        <div class="row">
          <div class="col-md-7"><h2>Proxy Groups</h2></div>
          <div class="col-md-5">
            <div class="btn-group">
              <button class="btn btn-success">Add</button>
              <button class="btn btn-secondary">Edit</button>
            </div>
          </div>
        </div>
        <table>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </table>
      </ApplicationTab>
      <ApplicationTab title="Settings">
        <SettingsPage></SettingsPage>
      </ApplicationTab>
    </ApplicationTabs>
  </div>
</template>

<script>
import ApplicationTab from "@/components/ApplicationTab.vue";
import ApplicationTabs from "@/components/ApplicationTabs.vue";
import SettingsPage from "@/components/Pages/SettingsPage.vue";
import ScrapersPage from "@/components/Pages/ScrapersPage.vue";

// const ActiveTabs = [true, false, false];
export default {
  components: {ScrapersPage, SettingsPage, ApplicationTab, ApplicationTabs}
}
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
