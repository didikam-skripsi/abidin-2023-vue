<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }"
        >Home</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" :to="{ name: 'about' }"
              >About</router-link
            >
          </li>
          <li class="nav-item" v-if="checkRoles(['admin','operator'])">
            <router-link class="nav-link" :to="{ name: 'product.index' }"
              >Product</router-link
            >
          </li>
          <li class="nav-item" v-if="checkRoles(['admin'])">
            <router-link class="nav-link" :to="{ name: 'user.index' }"
              >User</router-link
            >
          </li>
        </ul>
        <div class="d-flex">
          <div v-if="authUser" class="d-flex">
            <span class="form-control me-3">{{ authUser?.username }} {{ authUser?.role }}</span>
            <button class="btn btn-outline-danger" @click.prevent="logout">Logout</button>
          </div>
          <div v-else>
            <router-link
              class="btn btn-outline-success"
              :to="{ name: 'auth.login' }"
              >Login</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
  <slot />
</template>

<script setup>
import { onBeforeMount } from "vue";
import { isTokenExpired, checkRoles, getAuthUser, logout } from "@/utils/auth";

const authUser = getAuthUser();

onBeforeMount(() => {
  isTokenExpired()
});
</script>

<style>
body {
  background: lightgray;
}
</style>
