<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="wrapper">
    <Navbar />
    <Sidebar />
    <!-- Content Wrapper. Contains page content -->
    <slot />
    <!-- Main Footer -->
    <footer class="main-footer">
      <div class="float-right d-none d-sm-inline">Naive Bayes</div>
      <strong>Unugiri &copy; 2023.</strong>
      All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import Navbar from "@/layouts/admin/Navbar";
import Sidebar from "@/layouts/admin/Sidebar";
</script>

<style></style>
