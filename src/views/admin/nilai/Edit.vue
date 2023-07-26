<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<template>
  <AdminLayout>
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Edit Nilai</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <router-link :to="{ name: 'admin.dashboard' }"
                    >Home</router-link
                  >
                </li>
                <li class="breadcrumb-item">
                  <router-link :to="{ name: 'admin.nilai.index' }"
                    >Nilai</router-link
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
                      <label for="kelas_uuid" class="font-weight-bold"
                        >Kelas</label
                      >
                      <input
                        type="text"
                        disabled
                        :value="siswa.kelas"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group mb-3">
                      <label for="name" class="font-weight-bold">Nama</label>
                      <input
                        type="text"
                        disabled
                        :value="siswa.name"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group mb-3">
                      <label for="uts" class="font-weight-bold">UTS</label>
                      <input
                        type="number"
                        :class="`form-control ${
                          validation.uts ? 'is-invalid' : ''
                        }`"
                        v-model="form.uts"
                        placeholder="uts"
                        @input="clearValidation('uts')"
                      />
                      <div v-show="validation.uts" class="mt-2 text-danger">
                        {{ validation.uts }}
                      </div>
                    </div>
                    <div class="form-group mb-3">
                      <label for="uas" class="font-weight-bold">UAS</label>
                      <input
                        type="number"
                        :class="`form-control ${
                          validation.uas ? 'is-invalid' : ''
                        }`"
                        v-model="form.uas"
                        placeholder="uas"
                        @input="clearValidation('uas')"
                      />
                      <div v-show="validation.uas" class="mt-2 text-danger">
                        {{ validation.uas }}
                      </div>
                    </div>
                    <div class="form-group mb-3">
                      <label for="tugas" class="font-weight-bold">Tugas</label>
                      <input
                        type="number"
                        :class="`form-control ${
                          validation.tugas ? 'is-invalid' : ''
                        }`"
                        v-model="form.tugas"
                        placeholder="tugas"
                        @input="clearValidation('tugas')"
                      />
                      <div v-show="validation.tugas" class="mt-2 text-danger">
                        {{ validation.tugas }}
                      </div>
                    </div>
                    <div class="form-group mb-3">
                      <label for="absen" class="font-weight-bold">Absen</label>
                      <input
                        type="number"
                        :class="`form-control ${
                          validation.absen ? 'is-invalid' : ''
                        }`"
                        v-model="form.absen"
                        placeholder="absen"
                        @input="clearValidation('absen')"
                      />
                      <div v-show="validation.absen" class="mt-2 text-danger">
                        {{ validation.absen }}
                      </div>
                    </div>
                    <div class="form-group mb-3">
                      <label for="sikap" class="font-weight-bold">Sikap</label>
                      <select
                        v-model="form.sikap"
                        class="form-control"
                        @change="clearValidation('sikap')"
                      >
                        <option value="">Pilih Sikap</option>
                        <option value="A">Sangat Baik</option>
                        <option value="B">Baik</option>
                        <option value="C">Buruk</option>
                      </select>
                      <div v-show="validation.sikap" class="mt-2 text-danger">
                        {{ validation.sikap }}
                      </div>
                    </div>
                    <div class="form-group mb-3">
                      <label for="class" class="font-weight-bold">Class</label>
                      <select
                        v-model="form.class"
                        class="form-control"
                        @change="clearValidation('class')"
                      >
                        <option value="">Pilih Class</option>
                        <option value="Ya">Ya</option>
                        <option value="Tidak">Tidak</option>
                      </select>
                      <div v-show="validation.class" class="mt-2 text-danger">
                        {{ validation.class }}
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
const siswa = reactive({
  name: "",
  kelas: "",
});
const form = reactive({
  siswa_uuid: route.params.uuid,
  uts: 0,
  uas: 0,
  tugas: 0,
  absen: 0,
  sikap: "",
  class: "",
});
//mounted
onMounted(() => {
  authAxios()
    .get(`/admin/nilai/${route.params.uuid}`)
    .then((response) => {
      let res_data = response.data?.data;
      siswa.name = res_data?.name;
      siswa.kelas = res_data?.kelas?.name;
      if (res_data?.nilai) {
        form.siswa_uuid = res_data?.nilai?.siswa_uuid;
        form.uts = res_data?.nilai?.uts;
        form.uas = res_data?.nilai?.uas;
        form.tugas = res_data?.nilai?.tugas;
        form.absen = res_data?.nilai?.absen;
        form.sikap = res_data?.nilai?.sikap;
        form.class = res_data?.nilai?.class;
      }
    })
    .catch((error) => {
      alertError(error.response?.data || "Terjadi Kesalahan Ambil Data");
    });
});

//method submit
function submit() {
  authAxios()
    .post(`/admin/nilai`, form)
    .then((res) => {
      if (res.status != 200) throw new Error(res.data?.message);
      alertSuccess(res.data?.message);
      router.push({
        name: "admin.nilai.index",
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
