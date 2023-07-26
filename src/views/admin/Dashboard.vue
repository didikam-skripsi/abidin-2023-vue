<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<template>
  <AdminLayout>
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Dashboard</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <!-- Main content -->
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-5">
              <div class="card">
                <div class="card-header">
                  <b>Grafik Prestasi</b>
                </div>
                <div class="card-body" style="min-height: 25rem">
                  <div id="apexchart-container" class=""></div>
                </div>
              </div>
            </div>
            <div class="col-7">
              <div class="card">
                <div class="card-header">
                  <b>Grafik Kelas</b>
                </div>
                <div class="card-body" style="min-height: 25rem">
                  <div id="apexchart-container2" class=""></div>
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import ApexCharts from "apexcharts";
import { authAxios } from "@/utils/axios";
import { alertError } from "@/utils/utils";

const chartOptions = {
  chart: {
    type: "donut",
    id: "vue-apexchart-example",
  },
  colors: ["#008FFB", "#FF4560", "#FEB019", "#00E396", "#775DD0"],
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: ["#00E396", "#FF4560", "#FEB019", "#008FFB", "#775DD0"],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 53, 91, 100],
    },
  },
  series: [44, 55],
  labels: ["Berprestasi", "Tidak Berprestasi"],
  legend: {
    show: true,
    position: "bottom",
  },
  dataLabels: {
    enabled: true,
  },
};

const chartRef = ref(null);

const chartOptions2 = {
  chart: {
    type: "bar",
    id: "vue-apexchart-example2",
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      distributed: true,
      columnWidth: "70%",
      colors: {
        ranges: [
          {
            from: 0,
            to: 0,
            color: "#00E396",
          },
          {
            from: 1,
            to: 1,
            color: "#008FFB",
          },
          {
            from: 2,
            to: 2,
            color: "#FEB019",
          },
          {
            from: 3,
            to: 3,
            color: "#FF4560",
          },
          {
            from: 4,
            to: 4,
            color: "#775DD0",
          },
        ],
      },
    },
  },
  dataLabels: {
    enabled: true,
  },
  xaxis: {
    categories: [],
  },
  series: [
    {
      name: "Siswa",
      data: [],
    },
  ],
};

const chartRef2 = ref(null);

onMounted(() => {
  renderDonut();
  renderColumn();
});

// Unmount hook to destroy the chart instance
onBeforeUnmount(() => {
  if (chartRef.value) {
    chartRef.value.destroy();
  }
  if (chartRef2.value) {
    chartRef2.value.destroy();
  }
});

async function renderColumn(){
  await authAxios()
    .get(`/admin/dashboard/column`)
    .then((res) => {
      console.log("res.data", res.data);
      if (res.status != 200) throw new Error(res.data?.message);
      chartOptions2.series[0].data = res.data.series;
      chartOptions2.xaxis.categories = res.data.categories;
    })
    .catch((error) => {
      alertError(error.response?.data || "Terjadi Kesalahan");
    });
  const chartElement2 = document.getElementById("apexchart-container2");
  const chart2 = new ApexCharts(chartElement2, chartOptions2);
  chart2.render();
  chartRef2.value = chart2;
}

async function renderDonut() {
  const chartElement = document.getElementById("apexchart-container");
  await authAxios()
    .get(`/admin/dashboard/donut`)
    .then((res) => {
      if (res.status != 200) throw new Error(res.data?.message);
      chartOptions.series = res.data;
    })
    .catch((error) => {
      alertError(error.response?.data || "Terjadi Kesalahan");
    });
  const chart = new ApexCharts(chartElement, chartOptions);
  chart.render();
  chartRef.value = chart;
}
</script>
