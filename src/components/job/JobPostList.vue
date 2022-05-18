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
          <li class="breadcrumb-item">
            <router-link :to="'/profile/' + currentUser.username" class="inactive-link">
              Mi perfil
            </router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page"><span class="active-link">{{ (type == 'internship') ? 'Practicas a empresa' : 'Empleo temporal'}}</span></li>
        </ol>
      </nav>
      <h1> {{ (type == 'internship') ? 'Practicas a empresa' : 'Empleo temporal'}}</h1>
    </div>
  </div>





  <div class="row">
    <div class="col-md-4">

      <div class="card float-effect jpt-filter-container">
        <h3>Filtro</h3>
        <div class="form-group">
          <input name="query" type="text" class="form-control"  v-if="isStudent()"
                 placeholder="Filtrar por palabras claves" v-model="query"  @input="search()"/>
        </div>
        <div id="label-category" class="form-group">
          <p-autocomplete v-model="category"
                          :suggestions="categories" @complete="searchCategories($event)"
                          @item-select="selectCategory($event)" :dropdown="true" field="name"  placeholder="Filtrar por categoria"
          />
        </div>
        <div class="form-group" v-if="isStudent()">
          <p>Filtrar por salario:</p>
          <vue-slider v-model="rangeSalary" :step="100.00" :range="true" :min="5000.00" :max="50000.00" @change="search()" :title="rangeSalary"/>
          <p class="jpt-filter-icon">
            <span class="fa-pull-left">{{rangeSalary[0].toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}}</span>
            <span class="fa-pull-right">{{rangeSalary[1].toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}}</span>
          </p>
        </div>
        <div class="form-group" v-if="!isStudent()">
          <p>Filtrar por estado</p>
          <p-selectbutton v-model="status" :options="options" optionLabel="alias" @change="search()"/>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary  jpt-list-btn" @click="reset()">Reiniciar</button>
        </div>

      </div>
    </div>


    <div id="job-post-list-box" class="col-md-8">
      <div v-if="records === 0" class="no-records">
        <h3>
          No se encuenta ningun resultado
        </h3>
      </div>


      <router-link  class="btn jpt-add-btn fa-pull-right" :to="'/job/create'" v-if="!isStudent()">
        <font-awesome-icon icon="plus" class="icon" style="color: white; margin-right: 10px;"/>
        Publicar empleo
      </router-link>

      <div class="card float-effect"  v-for="job in jobs" :key="job.id" style="width: 100%; margin-bottom: 10px">
        <router-link :to="'/job/show/' + job.id" class="thumb-container" >
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <ws-phototemplate :clazz="'jpt-img'" :username="job.employer.username" class="jpt-img" ></ws-phototemplate>
              </div>
              <div class="col-md-9">
                <ws-candidate-icon :jpId="job.id"/>
                <h3 class="jpt-title">{{capitalizeWords(job.title)}}</h3>
                <router-link :to="'/employer/show/' + job.employer.username" v-if="isStudent()" class="jpt-company-link"
                             style="color: rgba(210, 35, 42, 1);
                             border: none !important;background-color: transparent !important;">
                  {{ job.employer.name }}
                </router-link>
                <p class="small jpt-small">{{capitalizeWords(job.employer.address.city)}}  |  {{job.publicationDate}}</p>
                <p class="card-text jpt-desc" v-html="$options.filters.trunc(job.description, 200) "></p>
                <small class="card-text jpt-small"> Salario: {{job.yearSalary.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}}</small>
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

import Slider from 'primevue/slider';
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import AutoComplete from 'primevue/autocomplete';
import SelectButton from 'primevue/selectbutton';

import AuthenticationDataService from "@/services/AuthenticationDataService";
import moment from "moment";
import JobPostDataService from "@/services/JobPostDataService";
import PhotoTemplate from "../photo/PhotoTemplate";
import JobPostCandidateIcon from "./JobPostCandidateIcon";


export default {
  name: "JobPostList",
  props:{
    type: String
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
  components: {
    'vue-slider': Slider,
    'p-autocomplete': AutoComplete,
    'p-selectbutton': SelectButton,
    'ws-phototemplate': PhotoTemplate,
    'ws-candidate-icon': JobPostCandidateIcon
  },

  data() {
    return {
      students: [],
      page:1,
      records: 5,
      size: 5,
      day: "",
      query: "",
      categories: [],
      category: null,
      rangeSalary: [5000.00, 50000.00],
      jobs:[],
      status: {val: "all", alias:"Todos"},
      options:[
        {val: "all", alias:"Todos"},
        {val: "active", alias:"Activo"},
        {val: "inactive", alias:"Inactivos"}
      ]
    };
  },

  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    },
    currentJobType() {
      return this.$route.params.type;
    },

    banner() {
      return 'url(' + require('@/assets/banner_job_post.jpg') + ')'
    },
  },

  mounted() {
    this.onCallback()
   // this.getData()
  },

  created() {

  },

  methods: {

    truncate (sentence){
      if(sentence === "" || sentence === null)
        return ""
      else
        return sentence.split(/\s+/).slice(0, 25).join(" ");
    },

    capitalizeWords (str){
      if(str === "" || str === null)
        return ""
      else
        return str.replaceAll("_", " ").toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())
    },

    formatDate(value){
      if(value === null)
        return null
      else
        return moment(value).format('DD-MM-YYY')
    },

    search(){
      this.page = 1
      this.onCallback()
    },

    onCallback() {
      let params = {}
      params.size = this.size
      params.page = this.page
      params.type =  this.type
      params.query  = this.query

      if (!this.isStudent()){
        params.employer  = this.currentUser.username
      }

      if(this.category != null)
        params.category =  this.category.id

      params.minSalary = this.rangeSalary[0]
      params.maxSalary = this.rangeSalary[1]
      params.state = this.status.val

      JobPostDataService.list(params).then(
          (response) => {
            this.jobs = response.data.content;
            this.records = response.data.totalElements
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },

    isStudent(){
      return this.currentUser.role === 'ROLE_STUDENT'
    },

    searchCategories(event){
      AuthenticationDataService.getAreas(event.query).then(
          (response) => {
            this.categories = response.data
          },
      );
    },

    checkCandidate(id){
      let ok = false;

      JobPostDataService.checkCandidate(id).then(
          (response) => {
            ok =  response.data
          },
      );

      console.log("ISAGANI >>>>>>> " + ok)


      return ok;
    },



    selectCategory(){
      this.search()
    },

    reset(){
      this.rangeSalary = [5000.00, 50000.00],
      this.city =  ""
      this.category = null
      this.search()
    },

    formatDouble(input){
      return (input.toFixed(2)).toString().replace('.', ',')
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
  font-size: 20px;
  font-weight: 800;
}

.card-body p.item-address{
  margin-top: 10px;
  font-size: 14px;
  color: gray;
  font-style: italic;
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

.jpt-filter-container{
  padding: 20px;
}

.jpt-filter-container h3{
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 15px;
  color: #423f3f;
}

.jpt-title{
  font-size: 18px;
  font-weight: 800;
  color: #423f3f;
  margin-bottom: 0px;
}

.jpt-filter-icon {
  margin-top: 10px;
  color: #7a7a7a;
  font-size: 13px;
}

.jpt-img{
  max-width: 110px;
}

.jpt-desc{
  font-size: 14px;
  text-align: justify;
}

.jpt-list-container{
  padding: 20px;
}

.jpt-list-btn {
  margin-top: 20px;
  background: #d2232a;
  border: #d2232a;
  width:100%;
}



.jpt-list-btn:hover {
  background: #d2232a;
  border: #d2232a;
  transition: 0.5s all;
  opacity: 0.8;
}

.jpt-add-btn {
  background: #d2232a;
  border: #d2232a;
  width:30%;
  color: #f7f9fe;
  margin-bottom: 20px;
}

.jpt-add-btn:hover {
  color: #f7f9fe;
  opacity: 0.8;
  transition: 0.5s all;
}


.jpt-company-link{
  margin-top: 0px;
  font-size: 13px;
  font-weight: 400;
}

.jpt-small{
  margin-top: 15px;
  color: gray;
  font-size: 12px;
}
.no-records h3{
  color: gray;
  text-align:center;
  margin: 20px 0px;
}



</style>