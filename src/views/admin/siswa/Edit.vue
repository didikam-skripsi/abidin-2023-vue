<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<template>
  <AdminLayout>
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Edit Siswa</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <router-link :to="{ name: 'admin.dashboard' }"
                    >Home</router-link
                  >
                </li>
                <li class="breadcrumb-item">
                  <router-link :to="{ name: 'admin.siswa.index' }"
                    >Siswa</router-link
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
                    <div class="form-group mb-3">
                      <label for="nisn" class="font-weight-bold">NISN</label>
                      <input
                        type="text"
                        :class="`form-control ${
                          validation.nisn ? 'is-invalid' : ''
                        }`"
                        v-model="form.nisn"
                        placeholder="Nisn"
                        @input="clearValidation('nisn')"
                      />
                      <div v-show="validation.nisn" class="mt-2 text-danger">
                        {{ validation.nisn }}
                      </div>
                    </div>
                    <div class="form-group mb-3">
                      <label for="kelas_uuid" class="font-weight-bold"
                        >Kelas</label
                      >
                      <select
                        v-model="form.kelas_uuid"
                        id="kelas_uuid"
                        :class="`form-control ${
                          validation.kelas_uuid ? 'is-invalid' : ''
                        }`"
                        placeholder="Kelas"
                        @change="clearValidation('kelasuuid')"
                      >
                        <option value="">Pilih Kelas</option>
                        <option
                          v-for="item in kelas"
                          :key="item.uuid"
                          :value="item.uuid"
                        >
                          Kelas {{ item.name }}
                        </option>
                      </select>
                      <div
                        v-show="validation.kelasuuid"
                        class="mt-2 text-danger"
                      >
                        {{ validation.kelasuuid }}
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
import { reactive, onMounted, ref } from "vue";
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
  name: "",
  nisn: "",
  kelas_uuid: "",
});
const kelas = ref({
  name: "",
});

//mounted
onMounted(() => {
  authAxios()
    .get(`/admin/kelas`)
    .then((response) => {
      kelas.value = response.data?.datas;
    })
    .catch((error) => {
      alertError(error.response?.data || "Terjadi Kesalahan Ambil Kelas");
    });
  authAxios()
    .get(`/admin/siswa/${route.params.uuid}`)
    .then((response) => {
      form.name = response.data?.data?.name;
      form.nisn = response.data?.data?.nisn;
      form.kelas_uuid = response.data?.data?.kelas?.uuid;
    })
    .catch((error) => {
      alertError(error.response?.data || "Terjadi Kesalahan Ambil Data");
    });
});

//method submit
function submit() {
  authAxios()
    .put(`/admin/siswa/${route.params.uuid}`, form)
    .then((res) => {
      if (res.status != 200) throw new Error(res.data?.message);
      alertSuccess(res.data?.message);
      router.push({
        name: "admin.siswa.index",
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
