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

              <form @submit.prevent="update">
                <div class="form-group">
                  <label for="name" class="font-weight-bold">NAME</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="product.name"
                    placeholder="Name"
                  />
                  <!-- validation -->
                  <div v-if="validation.name" class="mt-2 alert alert-danger">
                    {{ validation.name[0] }}
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
                  ></textarea>
                  <!-- validation -->
                  <div
                    v-if="validation.description"
                    class="mt-2 alert alert-danger"
                  >
                    {{ validation.description[0] }}
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">SIMPAN</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FrontLayout>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { authAxios } from "@/utils/axios";
import FrontLayout from "@/layouts/FrontLayout";

//state posts
const product = reactive({
  name: "",
  description: "",
});
//state validation
const validation = ref([]);
//vue router
const router = useRouter();
//vue router
const route = useRoute();
//mounted
onMounted(() => {
  authAxios()
    .get(`/admin/product/${route.params.uuid}`)
    .then((response) => {
      product.name = response.data.data.name;
      product.description = response.data.data.description;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
});

//method update
function update() {
  let name = product.name;
  let description = product.description;
  authAxios()
    .put(
      `/admin/product/${route.params.uuid}`,
      {
        name: name,
        description: description,
      },
    )
    .then(() => {
      //redirect ke post index
      router.push({
        name: "product.index",
      });
    })
    .catch((error) => {
      validation.value = error.response.data;
    });
}
</script>
