<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<template>
  <AdminLayout>
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Edit Attribute</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <router-link :to="{ name: 'admin.dashboard' }"
                    >Home</router-link
                  >
                </li>
                <li class="breadcrumb-item">
                  <router-link :to="{ name: 'admin.attribute.index' }"
                    >Attribute</router-link
                  >
                </li>
                <li class="breadcrumb-item active">Edit</li>
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
                  <form @submit.prevent="submit">
                    <div class="form-group mb-3">
                      <label for="name" class="font-weight-bold">Nama</label>
                      <input
                        type="text"
                        :class="`form-control ${
                          validation.name ? 'is-invalid' : ''
                        }`"
                        v-model="form.name"
                        placeholder="Nama"
                        @input="clearValidation('name')"
                      />
                      <div v-show="validation.name" class="mt-2 text-danger">
                        {{ validation.name }}
                      </div>
                    </div>
                    <div class="form-group mb-3" v-if="form.type=='value'">
                      <label for="value" class="font-weight-bold">Nilai</label>
                      <input
                        type="text"
                        :class="`form-control ${
                          validation.value ? 'is-invalid' : ''
                        }`"
                        v-model="form.value"
                        placeholder="value"
                        @input="clearValidation('value')"
                      />
                      <div v-show="validation.value" class="mt-2 text-danger">
                        {{ validation.value }}
                      </div>
                    </div>
                    <div class="form-group mb-3" v-if="form.type=='range'">
                      <label for="range_start" class="font-weight-bold">Range Dari</label>
                      <input
                        type="number"
                        :class="`form-control ${
                          validation.range_start ? 'is-invalid' : ''
                        }`"
                        v-model="form.range_start"
                        placeholder="range_start"
                        @input="clearValidation('range_start')"
                      />
                      <div v-show="validation.range_start" class="mt-2 text-danger">
                        {{ validation.range_start }}
                      </div>
                    </div>
                    <div class="form-group mb-3" v-if="form.type=='range'">
                      <label for="range_end" class="font-weight-bold">Range Sampai</label>
                      <input
                        type="number"
                        :class="`form-control ${
                          validation.range_end ? 'is-invalid' : ''
                        }`"
                        v-model="form.range_end"
                        placeholder="range_end"
                        @input="clearValidation('range_end')"
                      />
                      <div v-show="validation.range_end" class="mt-2 text-danger">
                        {{ validation.range_end }}
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">
                      <i class="fas fa-save"></i> Simpan
                    </button>
                  </form>
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
import { reactive, onMounted } from "vue";
import { authAxios } from "@/utils/axios";
import { alertSuccess, alertError } from "@/utils/utils";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const validation = reactive({});
function clearValidation(field) {
  validation[field] = "";
}
const form = reactive({
  type: "",
  scope_name: "",
  name: "",
  value: "",
  range_start: 0,
  range_end: 0,
});

//mounted
onMounted(() => {
  authAxios()
    .get(`/admin/attribute/${route.params.uuid}`)
    .then((response) => {
      let res_data = response.data?.data;
      form.type = res_data?.type;
      form.scope_name = res_data?.scope_name;
      form.name = res_data?.name;
      form.value = res_data?.value;
      form.range_start = res_data?.range_start;
      form.range_end = res_data?.range_end;
    })
    .catch((error) => {
      alertError(error.response?.data || "Terjadi Kesalahan Ambil Data");
    });
});

//method submit
function submit() {
  authAxios()
    .put(`/admin/attribute/${route.params.uuid}`, form)
    .then((res) => {
      if (res.status != 200) throw new Error(res.data?.message);
      alertSuccess(res.data?.message);
      router.push({
        name: "admin.attribute.index",
      });
    })
    .catch((error) => {
      alertError(error.response?.data?.message || "Terjadi kesalahan");
      if (error.response?.status == 422) {
        let faileds = error.response.data?.data;
        if (faileds.length > 0) {
          faileds.forEach((faileds) => {
            validation[faileds.FailedField.toLowerCase()] = faileds.Tag;
          });
        }
      }
    });
}
</script>
