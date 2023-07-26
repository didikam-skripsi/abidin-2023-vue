<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="main-header navbar navbar-expand navbar-success navbar-dark">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a
          @click="collapse"
          class="nav-link"
          data-widget="pushmenu"
          href="#"
          role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <span href="#" class="nav-link">Naive Bayes</span>
      </li>
    </ul>
    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          {{ authUser?.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { onBeforeMount, ref, computed, watch } from "vue";
import { getAuthUser } from "@/utils/auth";
import { useStore } from "vuex";
const store = useStore();
const token = computed(() => store.getters["authStore/getToken"]);
const authUser = ref({});

watch(token, () => {
  authUser.value = getAuthUser();
});

let isCollapse = ref(false);
onBeforeMount(() => {
  collapse();
  authUser.value = getAuthUser();
});

function collapse() {
  if (isCollapse.value) {
    document.body.className = "sidebar-mini layout-fixed sidebar-collapse";
    isCollapse.value = false;
  } else {
    document.body.className = "hold-transition sidebar-mini";
    isCollapse.value = true;
  }
}
</script>
