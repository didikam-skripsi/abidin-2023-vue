<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<template>
  <FrontLayout>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h4>Login</h4>
              <hr />
              <form @submit.prevent="Login">
                <div class="form-group mb-3">
                  <label for="username" class="font-weight-bold"
                    >Username</label
                  >
                  <input
                    type="text"
                    :class="`form-control ${validation.username ? 'is-invalid' : ''}`"
                    v-model="form.username"
                    placeholder="Username"
                    @change="clearValidation('username')"
                  />
                  <div v-show="validation.username" class="mt-2 text-danger">
                    {{ validation.username }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="password" class="font-weight-bold"
                    >Password</label
                  >
                  <input
                    type="password"
                    :class="`form-control ${validation.password ? 'is-invalid' : ''}`"
                    v-model="form.password"
                    placeholder="Password"
                    @change="clearValidation('password')"
                  />
                  <div v-show="validation.password" class="mt-2 text-danger">
                    {{ validation.password }}
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FrontLayout>
</template>

<script setup>
import { reactive } from "vue";
import { alertSuccess, alertError } from "@/utils/utils";
import axios from "axios";
import FrontLayout from "@/layouts/FrontLayout";
import { useStore } from "vuex";
const store = useStore();
import { useRouter } from "vue-router";
const router = useRouter();

const validation = reactive({});
function clearValidation(field){
  validation[field] = "";
}

const form = reactive({
  username: "",
  password: "",
});


//vue router

//method store
function Login() {
  axios
    .post(`/login`, form)
    .then(async (res) => {
      if (res.status !== 200) throw new Error(res.data.message);
      alertSuccess(res.data.message);
      await store.dispatch("authStore/setAuth", res.data?.data?.token);
      router.push({
        name: "product.index",
      });
    })
    .catch((error) => {
      alertError(error?.response?.data?.message || "Terjadi Kesalahan");
      if (error?.response?.status == 422) {
        let faileds = error.response?.data?.data;
        if(faileds.length > 0){
          faileds.forEach((faileds) => {
            validation[faileds.FailedField.toLowerCase()] = faileds.Tag;
          });
        }
      }
    });
}
</script>
