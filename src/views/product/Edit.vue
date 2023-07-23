<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <FrontLayout>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h4>EDIT PRODUCT</h4>
              <hr />
              <form @submit.prevent="submit">
                <div class="form-group mb-3">
                  <label for="name" class="font-weight-bold">NAME</label>
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
                  <label for="description" class="font-weight-bold"
                    >DESCRIPTION</label
                  >
                  <textarea
                    :class="`form-control ${
                      validation.description ? 'is-invalid' : ''
                    }`"
                    rows="4"
                    v-model="form.description"
                    placeholder="Description"
                    @input="clearValidation('description')"
                  ></textarea>
                  <div v-show="validation.description" class="mt-2 text-danger">
                    {{ validation.description }}
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
  description: "",
});
//mounted
onMounted(() => {
  authAxios()
    .get(`/admin/product/${route.params.uuid}`)
    .then((response) => {
      form.name = response.data.data.name;
      form.description = response.data.data.description;
    })
    .catch((error) => {
      alertError(error.response?.data?.message || "Terjadi Kesalahan");
    });
});

//method submit
function submit() {
  authAxios()
    .put(`/admin/product/${route.params.uuid}`, form)
    .then((res) => {
      if (res.status != 200) throw new Error(res.data?.message);
      alertSuccess(res.data?.message);
      router.push({
        name: "product.index",
      });
    })
    .catch((error) => {
      alertError(error?.response?.data?.message);
      if (error.response?.status == 422) {
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
