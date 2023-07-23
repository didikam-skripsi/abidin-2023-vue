<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <FrontLayout>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h4>ADD PRODUCT</h4>
              <hr />
              <form @submit.prevent="submit">
                <div class="form-group">
                  <label for="name" class="font-weight-bold">NAME</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="product.name"
                    placeholder="Name"
                    @input="clearValidationError('Name')"
                  />
                  <!-- validation -->
                  <div v-if="hasError('Name')" class="mt-2 alert alert-danger">
                    {{ getErrorMessage("Name") }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="description" class="font-weight-bold"
                    >DESCRIPTION</label
                  >
                  <textarea
                    class="form-control"
                    rows="4"
                    v-model="product.description"
                    placeholder="Description"
                    @input="clearValidationError('Description')"
                  ></textarea>
                  <div
                    v-if="hasError('Description')"
                    class="mt-2 alert alert-danger"
                  >
                    {{ getErrorMessage("Description") }}
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
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { alertSuccess, alertError } from "@/utils/utils";
import { authAxios } from "@/utils/axios";
import FrontLayout from "@/layouts/FrontLayout";
const product = reactive({
  name: "",
  description: "",
});
//state validation
const validation = reactive([]);
//vue router
const router = useRouter();

//method submit
function submit() {
  let name = product.name;
  let description = product.description;
  authAxios()
    .post(
      `/admin/product`,
      {
        name: name,
        description: description,
      },
    )
    .then((res) => {
      if (res.status != 200) throw new Error(res.data.message);
      alertSuccess(res.data.message);
      router.push({
        name: "product.index",
      });
    })
    .catch((error) => {
      alertError(error.response?.data?.message || "Terjadi kesalahan");
      if (error.response?.status == 422) {
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
