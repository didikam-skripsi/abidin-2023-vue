<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<template>
  <FrontLayout>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h4>DATA PRODUCT</h4>
              <hr />
              <router-link
                :to="{ name: 'product.create' }"
                class="btn btn-md btn-success"
                >ADD PRODUCT</router-link
              >
              <div class="table-responsive mt-3">
                <div class="row">
                  <div class="col-md-2">
                    <select
                      v-model="params.per_page"
                      @change="fetchData"
                      class="form-control"
                    >
                      <option selected value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                  <div class="col-md-10">
                    <div class="input-group">
                      <input
                        @keyup.enter="search"
                        v-model="params.search"
                        style="max-width: 20rem"
                        type="text"
                        placeholder="Search and Enter"
                        class="form-control ms-auto"
                      />
                      <button
                        @click="search"
                        class="input-group-text bg-success text-white"
                        id="basic-addon2"
                      >
                        <i class="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <table class="table table-striped table-bordered mt-3">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">NO</th>
                      <th scope="col">NAME</th>
                      <th scope="col">DESCRIPTION</th>
                      <th scope="col">OPTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="datas.loading">
                      <td colspan="4" class="text-center">
                        <i class="fas fa-circle-notch fa-spin"></i> Loading...
                      </td>
                    </tr>
                    <tr v-else v-for="(data, index) in datas.data" :key="index">
                      <td>
                        {{ index + 1 + (params.page - 1) * datas.per_page }}
                      </td>
                      <td>{{ data.name }}</td>
                      <td>{{ data.description }}</td>
                      <td class="text-center">
                        <router-link
                          :to="{
                            name: 'product.edit',
                            params: { uuid: data.uuid },
                          }"
                          class="btn btn-sm btn-primary me-1"
                          >EDIT</router-link
                        >
                        <button
                          @click.prevent="postDelete(data.uuid)"
                          class="btn btn-sm btn-danger ms-1"
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Pagination :datas="datas" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FrontLayout>
</template>

<script setup>
import { onMounted, ref, watch, reactive } from "vue";
import { alertSuccess, alertError } from "@/utils/utils";
import FrontLayout from "@/layouts/FrontLayout";
import Pagination from "@/components/Pagination.vue";
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

function search() {
  params.page = 1;
  router.push({ query: { ...route.query, page: 1 } });
  fetchData();
}

function fetchData() {
  datas.value.loading = true;
  authAxios()
    .get("/admin/product", {
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
  authAxios()
    .delete(`/admin/product/${uuid}`)
    .then((res) => {
      if (res.status != 200) throw new Error(res.data.message);
      alertSuccess(res.data.message);
      fetchData();
    })
    .catch((error) => {
      alertError(error.response.message);
    });
}
</script>

<style>
body {
  background: lightgray;
}
</style>
