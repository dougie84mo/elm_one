<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <div class="container-fluid m-2">
  <ApplicationTabs>
      <ApplicationTab title="Scrapers">
        <Suspense>
          <ScrapersPage></ScrapersPage>
        </Suspense>
      </ApplicationTab>

      <ApplicationTab title="Monitors">
        <MonitorsPage></MonitorsPage>
      </ApplicationTab>
      <ApplicationTab title="Raffles">
        <RafflesPage></RafflesPage>
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
import ApplicationTab from "@/Components/ApplicationTab.vue";
import ApplicationTabs from "@/Components/ApplicationTabs.vue";
import SettingsPage from "@/Pages/SettingsPage.vue";
import ScrapersPage from "@/Pages/ScrapersPage.vue";
import RafflesPage from "@/Pages/RafflesPage.vue";
import MonitorsPage from "@/Pages/MonitorsPage.vue";

// const ActiveTabs = [true, false, false];
export default {
  components: {MonitorsPage, RafflesPage, ScrapersPage, SettingsPage, ApplicationTab, ApplicationTabs}
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
