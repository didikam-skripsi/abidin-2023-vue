<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<template>
  <AdminLayout>
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Naive Bayes</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <router-link :to="{ name: 'admin.dashboard' }"
                    >Home</router-link
                  >
                </li>
                <li class="breadcrumb-item active">Naive Bayes</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <!-- Main content -->
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body row">
                  <div class="col-md-3"></div>
                  <div class="col-md-6 d-grid">
                    <button class="btn btn-warning" :disabled="hitungLoading" @click="hitung">
                      <i class="fas fa-sync"></i> Hitung
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12" v-if="bayesShow && !hitungLoading">
              <Bayes />
            </div>
            <div class="col-12" v-else-if="hitungLoading">
              <div class="card">
                <div class="card-body text-center">
                  <h3><i class="fas fa-circle-notch fa-spin"></i> Menghitung...</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "@/layouts/AdminLayout";
import Bayes from "@/views/admin/bayes/Bayes";
import { ref } from "vue";
import { authAxios } from "@/utils/axios";
import { alertSuccess, alertError } from "@/utils/utils";
let bayesShow = ref(false);
let hitungLoading = ref(false);
function hitung() {
  hitungLoading.value = true;
  authAxios()
    .post(`/admin/transformasi/bayes`)
    .then((res) => {
      if (res.status != 200) throw new Error(res.data?.message);
      alertSuccess(res.data?.message);
      bayesShow.value = true;
      hitungLoading.value = false;
    })
    .catch((error) => {
      alertError(error.response?.data?.message || "Terjadi kesalahan");
    });
}
</script>
