<template>
  <div class="row theme-header-title">
    <div class="col-sm-12 theme-title float-effect" :style="{backgroundImage: banner}">
      <nav aria-label="breadcrumb" style="background-color: transparent !important;">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="'/home'" class="inactive-link">
              Inicio
            </router-link>
          </li>
          <li class="breadcrumb-item inactive-link">
            <router-link :to="'/profile/' + currentUser.username" class="inactive-link">
              Mi perfil
            </router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page"><span class="active-link">Estudiantes</span></li>
        </ol>
      </nav>
      <h1>Listado de estudiantes</h1>
    </div>
  </div>

  <div class="row">
    <div class="col-md-4">
      <div class="card float-effect sl-filter-container">

        <h3>Filtro</h3>

        <div class="form-group">
          <input name="city" type="text" class="form-control" placeholder="Filtrar por cuidad" v-model="city"  @input="search()"/>
        </div>

        <div class="form-group">
          <p-autocomplete v-model="jobPosition"
                          :suggestions="jobPositions" @complete="searchJobPositions($event)"
                          @item-select="selectJobPosition($event)" field="name" placeholder="Filtrar por categoria"
          />
        </div>


        <div class="form-group">
          <select class="form-control" id="filterDay" v-model="day" @change="search()">
            <option value="">Filtra por dia</option>
            <option v-for="day in optionDays" :key="day.id" :value="day">{{day}}</option>
          </select>
        </div>

        <div class="form-group">
          <p>Filtrar por horario:</p>
          <vue-slider v-model="rangeTime" :step="0.01" :range="true" :min="9" :max="24" @change="search()" :title="rangeTime"/>
          <p class="sl-filter-icon">
            <span class="fa-pull-left">{{formatDouble(rangeTime[0])}}h</span>
            <span class="fa-pull-right">{{formatDouble(rangeTime[1])}}h</span>
          </p>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-primary  sl-list-btn" @click="reset()">Reiniciar</button>
        </div>


      </div>
    </div>


    <div class="col-md-8" id="student-list-box">
      <div v-if="records === 0" class="no-records">
        <h3>
          No se encuenta ningun resultado
        </h3>
      </div>

      <div class="card  float-effect"  v-for="student in students" :key="student.id" style="width: 100%; margin-bottom: 10px">
        <router-link :id="'tag_' + student.username" :to="'/student/show/' + student.username" class="thumb-container">
          <div class="card-header">
            <span class="item-name">{{student.name}} {{student.surname}}</span> <Rating  :username="student.username" class="fa-pull-right"></Rating>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <ws-phototemplate :clazz="'sl-img'" :username="student.username" class="sl-img" ></ws-phototemplate>
              </div>
              <div class="col-md-9">
                <p class="card-text sl-desc" v-html="$options.filters.trunc(student.description , 180)" ></p>
                <p class="item-address">{{capitalizeWords(student.address.city)}}, {{ student.address.province}}</p>
              </div>
            </div>

          </div>
        </router-link>
      </div>
      <pagination v-model="page" :records="records" :per-page="size" @paginate="onCallback"/>

    </div>
  </div>



</template>




<script>

import StudentDataService from "../../services/StudentDataService";
import Rating from "../rating/Rating";
import Slider from 'primevue/slider';
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import AutoComplete from 'primevue/autocomplete';
import AuthenticationDataService from "@/services/AuthenticationDataService";
import PhotoTemplate from "../photo/PhotoTemplate";

export default {
  name: "StudentList",
  components: {
    Rating,
    'vue-slider': Slider,
    'p-autocomplete': AutoComplete,
    'ws-phototemplate': PhotoTemplate
  },
  filters: {
    trunc: function (text, length) {
      if (text.length > length) {
        return text.substring(0, length) + ' ...';
      } else {
        return text;
      }
    },
  },
  data() {
    return {
      students: [],
      page:1,
      records: 5,
      size: 5,
      rangeTime: [9, 24],
      day: "",
      city: "",
      jobPositions: [],
      jobPosition: null,
      optionDays:["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
    };
  },
  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    },

    banner() {
      return 'url(' + require('@/assets/banner_students.jpg') + ')'
    },
  },
  mounted() {
    this.search();
  },

  methods: {

    search(){
      this.page = 1
      this.onCallback()
    },

    onCallback(){
      let params = {}
      params.city  = this.city
      params.day = this.day

      if(this.jobPosition != null)
        params.jobPosition =  this.jobPosition.id

      params.startTime = this.rangeTime[0]
      params.endTime =  this.rangeTime[1]

      StudentDataService.list(this.page, this.size, params).then(
          (response) => {
            this.students = response.data.content;
            this.records = response.data.totalElements
          },
          (error) => {
            this.students =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },

    searchJobPositions(event){
      AuthenticationDataService.getJobPositions(event.query).then(
          (response) => {
            this.jobPositions = response.data
          },
      );
    },

    selectJobPosition(){
      this.search()
    },

    reset(){
      this.rangeTime = [9, 24]
      this.day =  ""
      this.city =  ""
      this.jobPosition = null
      this.search()
    },

    formatDouble(input){
      return (input.toFixed(2)).toString().replace('.', ':')
    },

    truncate (sentence){
      if(sentence === "" || sentence === null)
        return ""
      else
        return sentence.split(/\s+/).slice(0, 30).join(" ");
    },

    capitalizeWords (str){
      if(str === "" || str === null)
        return ""
      else
        return str.replaceAll("_", " ").toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())
    },
  }
};
</script>

<style scoped>
.pagination_list{
  margin-top: 40px;
}

.thumb-container{
  color: #403f3f;

}

.thumb-container:hover{
  text-decoration: none;
  background: rgba(229, 227, 227, 0.5) !important;
  transition: all 0.5s ease-in-out ;
}

.pagination_list ul {
  width: 70%;
  margin: auto;
}

.card-header span.item-name{
  font-size: 18px  !important;
  font-weight: 800  !important;
  color: #423f3f !important;
  margin-bottom: 0px  !important;
  text-align: left  !important;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";

}

.card-body p.item-address{
  margin-top: 10px;
  font-size: 12px;
  color: gray;
}
.card-body a {
  background: #d2232a !important;
  border: solid 1px #d2232a !important;
  color: #f7f9fe;
}
.card-body a:hover {
  background: #ffffff !important;
  border: solid 1px #d2232a !important;
  color: #d2232a;
  transition: all ease-in-out 0.5s;
}

.sl-filter-container{
  padding: 20px;
}

.sl-filter-container h3{
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 15px;
  color: #423f3f;
}

.sl-filter-icon {
  margin-top: 10px;
  color: #7a7a7a;
  font-size: 13px;
}

.sl-img{
  max-width: 110px;
}

.sl-desc{
  font-size: 14px;
  text-align: justify;
}

.sl-list-container{
  padding: 20px;
}

.sl-list-btn {
  margin-top: 20px;
  background: #d2232a;
  border: #d2232a;
  width:100%;
}

.sl-list-btn:hover {
  background: #d2232a;
  border: #d2232a;
  transition: 0.5s all;
  opacity: 0.8;
}

.no-records h3{
  color: gray;
  text-align:center;
  margin: 20px 0px;
}

</style>