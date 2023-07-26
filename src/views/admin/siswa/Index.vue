<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<template>
  <AdminLayout>
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Siswa</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <router-link :to="{ name: 'admin.dashboard' }"
                    >Home</router-link
                  >
                </li>
                <li class="breadcrumb-item active">Siswa</li>
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
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-10">
                      <div class="input-group">
                        <input
                          @keyup.enter="fetchAction"
                          v-model="params.search"
                          style="max-width: 20rem"
                          type="text"
                          placeholder="Search and Enter"
                          class="form-control"
                        />
                        <button
                          @click="fetchAction"
                          class="input-group-text bg-success text-white"
                          id="basic-addon2"
                        >
                          <i class="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <router-link
                        :to="{ name: 'admin.siswa.create' }"
                        class="btn btn-md btn-success btn-block"
                        ><i class="fas fa-plus"></i> Tambah</router-link
                      >
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-striped table-bordered mt-3">
                      <thead class="">
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Nama</th>
                          <th scope="col">Nisn</th>
                          <th scope="col">Kelas</th>
                          <th class="text-center" scope="col">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="datas.loading">
                          <td colspan="4" class="text-center">
                            <i class="fas fa-circle-notch fa-spin"></i>
                            Loading...
                          </td>
                        </tr>
                        <tr
                          v-else
                          v-for="(data, index) in datas.data"
                          :key="index"
                        >
                          <td>{{ (index +1)+((datas.current_page-1)*params.per_page) }}</td>
                          <td>{{ data.name }}</td>
                          <td>{{ data.nisn }}</td>
                          <td>{{ data.kelas?.name }}</td>
                          <td class="text-center">
                            <router-link
                              :to="{
                                name: 'admin.siswa.edit',
                                params: { uuid: data.uuid },
                              }"
                              class="btn btn-sm btn-primary mr-1"
                              ><i class="fas fa-edit"></i> Edit</router-link
                            >
                            <button
                              @click.prevent="postDelete(data.uuid)"
                              class="btn btn-sm btn-danger ml-1"
                            >
                              <i class="fas fa-trash"></i> Hapus
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <Pagination
                      :datas="datas"
                      :routerName="'admin.siswa.index'"
                    />
                  </div>
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
import Pagination from "@/components/Pagination.vue";
import { onMounted, ref, watch, reactive } from "vue";
import { alertSuccess, alertError } from "@/utils/utils";
import { authAxios } from "@/utils/axios";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

let datas = ref({
  loading: true,
  data: [],
  total: 0,
  current_page: 1,
});
let params = reactive({
  per_page: 10,
  page: route.query.page || 1,
  search: "",
});
watch(route, () => {
  params.page = route.query.page;
  fetchData();
});

onMounted(() => {
  fetchData();
});

function fetchAction() {
  params.page = 1;
  router.push({ query: { ...route.query, page: 1 } });
  fetchData();
}

function fetchData() {
  datas.value.loading = true;
  authAxios()
    .get("/admin/siswa", {
      params,
    })
    .then((response) => {
      datas.value = response.data;
      datas.value.loading = false;
    })
    .catch((error) => {
      alertError(error.response?.data || "Terjadi Kesalahan");
    });
}
//method delete
function postDelete(uuid) {
  Swal.fire({
    title: "Yakin hapus data ini?",
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Tidak",
    icon: "warning",
  }).then((result) => {
    if (result.value) {
      authAxios()
        .delete(`/admin/siswa/${uuid}`)
        .then((res) => {
          if (res.status != 200) throw new Error(res.data.message);
          alertSuccess(res.data.message);
          fetchData();
        })
        .catch((error) => {
          alertError(error.response.message);
        });
    }
  });
}
</script>
