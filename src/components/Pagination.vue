<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<template>
  <div class="row" v-show="getShowing()<=props.datas?.total">
    <div class="col-md-4">
      Showing {{ getShowing() }} to {{ getShowingTo() }} of
      {{ datas.total }} entries
    </div>
    <div class="col-md-8 ms-auto" style="overflow-x: auto;">
        <nav aria-label="Page navigation example">
          <ul class="pagination d-flex">
            <li class="page-item">
              <router-link
                :to="{ name: 'product.index', query: { page: back_page } }"
                :class="`page-link ${current_page == 1 ? 'disabled' : ''}`"
                >Previous</router-link
              >
            </li>
            <li v-for="page in pages" :key="page" class="page-item">
              <router-link
                v-if="shouldShowPage(page)"
                :to="{ name: 'product.index', query: { page: page } }"
                :class="`page-link ${page == current_page ? 'disabled' : ''}`"
                >{{ page }}</router-link
              >
              <span
                v-else-if="shouldShowDot(page)"
                :class="`page-link disabled`"
                >...</span
              >
            </li>
            <li class="page-item">
              <router-link
                :to="{ name: 'product.index', query: { page: to_page } }"
                :class="`page-link ${current_page == pages ? 'disabled' : ''}`"
                >Next</router-link
              >
            </li>
          </ul>
        </nav>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, watchEffect, defineProps, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const props = defineProps({
  datas: Object,
});

let pages = ref(0);
let current_page = ref(1);
let to_page = ref(1);
let back_page = ref(1);
let range = 3;
onBeforeMount(() => {});
function shouldShowPage(page) {
  let startPage = page <= range;
  let endPage = page > pages.value - range;
  let currentStart = page >= Math.max(parseInt(current_page.value) - range, 1);
  let currentEnd = page <= Math.min(parseInt(current_page.value) + range, pages.value);
  if (startPage || endPage || (currentStart && currentEnd)) {
    return true;
  }
  return false;
}
function shouldShowDot(page) {
  let dotStart = page <= range + 1;
  let dotEnd = page >= pages.value - range;
  if (dotStart || dotEnd) {
    return true;
  }
  return false;
}
function getShowingTo() {
  let showingToEnd = props.datas?.per_page * current_page.value;
  if(showingToEnd>props.datas?.total){
    let showingToMin = showingToEnd-props.datas?.total;
    return showingToEnd-showingToMin;
  }
  return showingToEnd
}
function getShowing() {
  let showing =
    current_page.value * props.datas?.per_page - props.datas?.per_page + 1;
  return props.datas?.total ? showing : 0;
}
watchEffect(() => {
  if (props?.datas?.total > 0) {
    pages.value = Math.ceil(props?.datas?.total / props?.datas?.per_page);
  } else {
    pages.value = 0;
  }
  current_page.value = route.query.page || 1;
  to_page.value = current_page.value + 1;
  back_page.value = current_page.value - 1;
});
</script>
