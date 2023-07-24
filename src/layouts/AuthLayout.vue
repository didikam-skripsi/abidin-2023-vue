<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-box">
    <slot />
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";

onBeforeMount(() => {
  document.body.className = "hold-transition login-page";
});
</script>

<style>
body {
  background: lightgray;
}
</style>
