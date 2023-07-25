<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <aside class="main-sidebar sidebar-light-navy elevation-1">
    <!-- Brand Logo -->
    <span class="brand-link">
      <img
        :src="imgLogo"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-2"
        style="opacity: 0.8"
      />
      <span class="brand-text font-weight-light">App</span>
    </span>

    <div class="sidebar">
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-item">
            <router-link
              :to="{ name: 'admin.dashboard' }"
              :class="`nav-link ${
                route.name == 'admin.dashboard' ? 'active' : ''
              }`"
            >
              <i class="nav-icon fas fa-home"></i>
              <p>Dashboard</p>
            </router-link>
          </li>
          <li class="nav-header">Menu</li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'admin.siswa.index' }"
              :class="`nav-link ${
                route.name == 'admin.siswa.index' ? 'active' : ''
              }`"
            >
              <i class="nav-icon fas fa-book"></i>
              <p>Siswa</p>
            </router-link>
          </li>
          <li class="nav-header">Pengaturan</li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'admin.user.index' }"
              :class="`nav-link ${
                route.name == 'admin.user.index' ? 'active' : ''
              }`"
            >
              <i class="nav-icon fas fa-users"></i>
              <p>Pengguna</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'admin.profile.index' }"
              :class="`nav-link ${
                route.name == 'admin.profile.index' ? 'active' : ''
              }`"
            >
              <i class="nav-icon fas fa-user"></i>
              <p>Profil</p>
            </router-link>
          </li>
          <li class="nav-item">
            <a @click.prevent="logout" href="#" class="nav-link">
              <i class="nav-icon fas fa-sign-out-alt"></i>
              <p>Logout</p>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import imgLogo from "@/assets/logo.png";
import { logout } from "@/utils/auth";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
