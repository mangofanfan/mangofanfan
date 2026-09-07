<script lang="ts" setup>
import 'assets/css/sakura.css'
</script>

<template>
  <div id="ALL">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <div class="sakura-bg">
    <div class="sakura">
      <div class="petal"></div>
      <div class="petal"></div>
      <div class="petal"></div>
      <div class="petal"></div>
      <div class="petal"></div>
    </div>
  </div>
</template>

<style scoped>
#ALL {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: min(100dvw, 1200px);
}

div.sakura-bg {
  z-index: -5;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
