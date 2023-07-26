<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <aside class="main-sidebar sidebar-dark-warning elevation-1">
    <!-- Brand Logo -->
    <span class="brand-link">
      <span class="brand-text font-weight-light ps-4">
        <img
          :src="imgLogo"
          class="elevation-2"
          style="width: 77%; border-radius: 22px"
        />
      </span>
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
          <li class="nav-header">Master Data</li>
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
          <li class="nav-item">
            <router-link
              :to="{ name: 'admin.nilai.index' }"
              :class="`nav-link ${
                route.name == 'admin.nilai.index' ? 'active' : ''
              }`"
            >
              <i class="nav-icon fas fa-book"></i>
              <p>Nilai</p>
            </router-link>
          </li>
          <li class="nav-header">Naive Bayes</li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'admin.attribute.index' }"
              :class="`nav-link ${
                route.name == 'admin.attribute.index' ? 'active' : ''
              }`"
            >
              <i class="nav-icon fas fa-book"></i>
              <p>Nilai Attribute</p>
            </router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link
              :to="{ name: 'admin.transformasi.index' }"
              :class="`nav-link ${
                route.name == 'admin.transformasi.index' ? 'active' : ''
              }`"
            >
              <i class="nav-icon fas fa-book"></i>
              <p>Transformasi</p>
            </router-link>
          </li> -->
          <li class="nav-item">
            <router-link
              :to="{ name: 'admin.bayes.index' }"
              :class="`nav-link ${
                route.name == 'admin.bayes.index' ? 'active' : ''
              }`"
            >
              <i class="nav-icon fas fa-book"></i>
              <p>Naive Bayes</p>
            </router-link>
          </li>
          <li class="nav-header">Pengaturan</li>
          <li class="nav-item" v-if="checkRoles(['admin'])">
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
import imgLogo from "@/assets/logo.jpeg";
import { useRoute } from "vue-router";
import { checkRoles, logout } from "@/utils/auth";
const route = useRoute();
</script>
