<script setup>

</script>

<template>
<div class="container">
  <div class="row">
    <div class="col-md-12"><h3>Aesthetics</h3></div>
    <div class="col-auto">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="app-is-dark-mode">
        <label class="form-check-label" for="app-is-dark-mode">
          Is Dark Mode
        </label>
      </div>
    </div>
  </div>
  <hr>
  <div class="row">
    <div class="col-md-12"><h3>API Information</h3></div>
    <div class="col-md-12">
      <div class="input-group">
        <span class="input-group-text" id="elm-api-variable">Elm API Key</span>
        <span class="input-group-text" id="elm-api-variable-confirmed">{{}}</span>
        <input type="text" class="form-control" placeholder="xxxxxxxxxxxxxxxx-xxxx" aria-label="Elm Api Key" aria-describedby="elm-api-variable">
        <button class="btn btn-outline-primary" type="button">Check</button>
      </div>
    </div>
  </div>
</div>

</template>