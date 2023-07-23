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
                    class="form-control"
                    v-model="form.username"
                    placeholder="Username"
                    @input="clearValidationError('Username')"
                  />
                  <!-- validation -->
                  <div
                    v-if="hasError('Username')"
                    class="mt-2 text-danger"
                  >
                    {{ getErrorMessage("Username") }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="password" class="font-weight-bold"
                    >Password</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.password"
                    placeholder="Password"
                    @input="clearValidationError('Password')"
                  />
                  <!-- validation -->
                  <div
                    v-if="hasError('Password')"
                    class="mt-2 text-danger"
                  >
                    {{ getErrorMessage("Password") }}
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

const form = reactive({
  username: "",
  password: "",
});

//state validation
const validation = reactive([]);

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
      alertError(error.response.data?.message);
      if (error.response.status == 422) {
        validation.value = error.response.data?.data;
      }
    });
}
function clearValidationError(field) {
  validation.value = validation.value?.filter(
    (error) => error.FailedField !== field
  );
}
function hasError(field) {
  return validation.value?.some((error) => error.FailedField === field);
}
function getErrorMessage(field) {
  const error = validation.value?.find((error) => error.FailedField === field);
  return error ? error.Tag : "";
}
</script>
