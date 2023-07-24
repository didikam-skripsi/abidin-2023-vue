<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<template>
  <AuthLayout>
    <div class="card card-outline card-primary">
      <div class="card-header text-center">
        <span class="h1"><b>Naive</b> Bayes</span>
      </div>
      <div class="card-body">
        <p class="login-box-msg">Silahkan Login</p>
        <form @submit.prevent="Login">
          <div class="form-group mb-3">
            <div class="input-group">
              <input
                type="text"
                :class="`form-control ${validation.username ? 'is-invalid' : ''}`"
                v-model="form.username"
                placeholder="Username"
                @input="clearValidation('username')"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div v-show="validation.username" class="mt-2 text-danger">
              {{ validation.username }}
            </div>
          </div>
          <div class="form-group mb-3">
            <div class="input-group">
              <input
                type="password"
                :class="`form-control ${validation.password ? 'is-invalid' : ''}`"
                v-model="form.password"
                placeholder="Password"
                @input="clearValidation('password')"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div v-show="validation.password" class="mt-2 text-danger">
              {{ validation.password }}
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <button type="submit" class="btn btn-primary btn-block">
                Login
              </button>
            </div>
            <!-- /.col -->
          </div>
        </form>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "@/layouts/AuthLayout";
import { reactive } from "vue";
import { alertSuccess, alertError } from "@/utils/utils";
import axios from "axios";
import { useStore } from "vuex";
const store = useStore();
import { useRouter } from "vue-router";
const router = useRouter();

const validation = reactive({});
function clearValidation(field) {
  validation[field] = "";
}

const form = reactive({
  username: "",
  password: "",
});

function Login() {
  axios
    .post(`/login`, form)
    .then(async (res) => {
      if (res.status !== 200) throw new Error(res.data.message);
      alertSuccess(res.data.message);
      await store.dispatch("authStore/setAuth", res.data?.data?.token);
      router.push({
        name: "admin.dashboard",
      });
    })
    .catch((error) => {
      alertError(error?.response?.data?.message || "Terjadi Kesalahan");
      if (error?.response?.status == 422) {
        let faileds = error.response?.data?.data;
        if (faileds.length > 0) {
          faileds.forEach((faileds) => {
            validation[faileds.FailedField.toLowerCase()] = faileds.Tag;
          });
        }
      }
    });
}
</script>
