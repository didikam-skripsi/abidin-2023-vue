<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <FrontLayout>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h4>EDIT form</h4>
              <hr />
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
                  <div v-show="validation.username" class="mt-2 text-danger">
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
                  <div v-show="validation.password" class="mt-2 text-danger">
                    {{ validation.password }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="role" class="font-weight-bold">Role</label>
                  <select
                    v-model="form.role"
                    id="role"
                    :class="`form-control ${
                      validation.role ? 'is-invalid' : ''
                    }`"
                    placeholder="Role"
                    @change="clearValidation('role')"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div v-show="validation.role" class="mt-2 text-danger">
                    {{ validation.role }}
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">SAVE</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FrontLayout>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { authAxios } from "@/utils/axios";
import FrontLayout from "@/layouts/FrontLayout";
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
  username: "",
  role: "",
});
//mounted
onMounted(() => {
  authAxios()
    .get(`/admin/user/${route.params.uuid}`)
    .then((response) => {
      form.name = response.data?.data?.name;
      form.username = response.data?.data?.username;
      form.role = response.data?.data?.role;
    })
    .catch((error) => {
      alertError(error.response?.data || "Terjadi Kesalahan");
    });
});

//method submit
function submit() {
  authAxios()
    .put(`/admin/user/${route.params.uuid}`, form)
    .then((res) => {
      if (res.status != 200) throw new Error(res.data?.message);
      alertSuccess(res.data?.message);
      router.push({
        name: "user.index",
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
