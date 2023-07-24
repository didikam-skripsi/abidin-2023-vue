<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<template>
  <AdminLayout>
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Edit Profil</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <router-link :to="{ name: 'admin.dashboard' }"
                    >Home</router-link
                  >
                </li>
                <li class="breadcrumb-item active">Profil</li>
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
                      <label for="name" class="font-weight-bold">Name</label>
                      <input
                        type="text"
                        :class="`form-control ${
                          validation.name ? 'is-invalid' : ''
                        }`"
                        v-model="form.name"
                        placeholder="Name"
                        @input="clearValidation('name')"
                      />
                      <div v-show="validation.name" class="mt-2 text-danger">
                        {{ validation.name }}
                      </div>
                    </div>
                    <div class="form-group mb-3">
                      <label for="username" class="font-weight-bold"
                        >Username</label
                      >
                      <input
                        type="text"
                        :class="`form-control ${
                          validation.username ? 'is-invalid' : ''
                        }`"
                        v-model="form.username"
                        placeholder="Username"
                        @input="clearValidation('username')"
                      />
                      <div
                        v-show="validation.username"
                        class="mt-2 text-danger"
                      >
                        {{ validation.username }}
                      </div>
                    </div>
                    <div class="form-group mb-3">
                      <label for="Password" class="font-weight-bold"
                        >Password</label
                      >
                      <input
                        type="password"
                        :class="`form-control ${
                          validation.password ? 'is-invalid' : ''
                        }`"
                        v-model="form.password"
                        placeholder="Password"
                        @input="clearValidation('password')"
                      />
                      <div
                        v-show="validation.password"
                        class="mt-2 text-danger"
                      >
                        {{ validation.password }}
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
import { getAuthUser } from "@/utils/auth";
const authUser = getAuthUser();
import { useStore } from "vuex";
const store = useStore();
import { useRouter } from "vue-router";
const router = useRouter();
const validation = reactive({});
function clearValidation(field) {
  validation[field] = "";
}
const form = reactive({
  name: authUser?.name,
  username: authUser?.username,
});
//mounted
onMounted(() => {});

//method submit
function submit() {
  authAxios()
    .put(`/auth/profile`, form)
    .then(async(res) => {
      if (res.status != 200) throw new Error(res.data?.message);
      alertSuccess(res.data?.message);
      await store.dispatch("authStore/setAuth", res.data?.data?.token);
      router.push({
        name: "admin.profile.index",
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
