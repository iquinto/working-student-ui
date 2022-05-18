<template>
  <div id="evolution-section" class="row" style="margin-top: 30px">
    <div class="col-sm-12 profile-card">
      <div class="card float-effect">
        <div class="card-header">
          <h2>Evolución mensual de reservas</h2>
          <div class="form-group row" style="margin-top: 20px!important;">
            <label for="data" class="col-md-3 col-form-label" style="font-size: 16px!important;">Selecionar año</label>
            <div class="col-md-4">
              <select class="form-control" id="data"   v-model="selected" @change="listHistory">
                <option v-for="option  in options" :key="option.id" :value="option">{{ option }}</option>
              </select>
            </div>
            <div class="col-md-5"></div>
          </div>

        </div>
        <div id="personal-evolution" class="card-body">
            <div>
              <apexchart
                  width="100%"
                  type="bar"
                  :options="chartOptions"
                  :series="series"
              ></apexchart>
            </div>
        </div>
        <div class="card-footer">

        </div>
      </div>
    </div>
  </div>
</template>


<script>
import VueApexCharts from "vue3-apexcharts";
import HistoryDataService from "../../services/HistoryDataService";

export default {
  name: "History",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      selected: 2021,
      options: [new Date().getFullYear(),  new Date().getFullYear() - 1, new Date().getFullYear() - 2,new Date().getFullYear() - 3, new Date().getFullYear() - 4 ],
      chartOptions: {
        fill: {
          colors: ['rgba(34, 133, 103,0.7)']
        },
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SET", "OCT", "NOV", "DIC"],
        },
      },
      series: [
        {
          name: "",
          data: [],
        },
      ]
    };
  },
  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    },

    paramuser(){
      return this.$route.params.username
    }

  },
  mounted() {
    this.listHistory()
  },

  methods:{
    listHistory(){
      HistoryDataService.listHistory(this.selected).then(
          (response) => {
            this.series = [{
                  name: "totals",
                  data: response.data
                }]
            console.log("[listHistory] response "  + response.data)
          },
          (error) => {
            this.loading = false;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.$notify({ type: "warn",  text: error});
          }
      )
    }
  }

};
</script>




<style scoped>

.card-body{
  padding: 10px 2px !important;
}

h2{
  font-weight: 790;
  font-size: 1.8rem;
  letter-spacing: 1px;
  color: #d2232a !important;
  text-align: center;
}

.card-footer{
  text-align: center;
}


</style>


