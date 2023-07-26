<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-md-9">
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
      </div>
      <div class="table-responsive">
        <table class="table table-striped table-bordered mt-3">
          <thead class="">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Kelas</th>
              <th scope="col">Nama</th>
              <th scope="col">UTS</th>
              <th scope="col">UAS</th>
              <th scope="col">Tugas</th>
              <th scope="col">Absen</th>
              <th scope="col">Sikap</th>
              <th scope="col">Class</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="datas.loading">
              <td colspan="4" class="text-center">
                <i class="fas fa-circle-notch fa-spin"></i>
                Loading...
              </td>
            </tr>
            <tr v-else v-for="(data, index) in datas.data" :key="index">
              <td>
                {{ index + 1 + (datas.current_page - 1) * params.per_page }}
              </td>
              <td>{{ data.kelas?.name }}</td>
              <td>{{ data.name }}</td>
              <td>{{ data.transformasi?.uts_name }}</td>
              <td>{{ data.transformasi?.uas_name }}</td>
              <td>{{ data.transformasi?.tugas_name }}</td>
              <td>{{ data.transformasi?.absen_name }}</td>
              <td>{{ data.transformasi?.sikap_name }}</td>
              <td>{{ data.transformasi?.class_name }}</td>
            </tr>
          </tbody>
        </table>
        <Pagination :datas="datas" :routerName="'admin.bayes.index'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Pagination from "@/components/Pagination.vue";
import { onMounted, ref, watch, reactive } from "vue";
import { alertError } from "@/utils/utils";
import { authAxios } from "@/utils/axios";
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
    .get("/admin/transformasi", {
      params,
    })
    .then((response) => {
      datas.value = response.data;
      datas.value.loading = false;
    })
    .catch((error) => {
      console.log("error.response?.data", error.response?.data);
      alertError(error.response?.data || "Terjadi Kesalahan");
    });
}
</script>
