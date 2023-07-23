<!-- eslint-disable vue/multi-word-component-names -->
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

              <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">NAME</th>
                    <th scope="col">DESCRIPTION</th>
                    <th scope="col">OPTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(data, index) in datas" :key="index">
                    <td>{{ data.name }}</td>
                    <td>{{ data.description }}</td>
                    <td class="text-center">
                      <router-link
                        :to="{
                          name: 'product.edit',
                          params: { uuid: data.uuid },
                        }"
                        class="btn btn-sm btn-primary mr-1"
                        >EDIT</router-link
                      >
                      <button
                        @click.prevent="postDelete(data.uuid)"
                        class="btn btn-sm btn-danger ml-1"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FrontLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { alertSuccess, alertError } from "@/utils/utils";
import FrontLayout from "@/layouts/FrontLayout";
import { authAxios } from "@/utils/axios";

let datas = ref([]);
onMounted(() => {
  fetchData();
});
function fetchData() {
  authAxios()
    .get(
      "/admin/product",
      {
        params: { per_page: 10 },
      }
    )
    .then((response) => {
      datas.value = response.data.data;
    })
    .catch((error) => {
      console.log(error.response.data);
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
