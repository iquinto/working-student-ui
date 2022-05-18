<template>
  <div class="row">
      <div class="col-sm-12 profile-card">
        <div class="card float-effect" style="padding: 10px 30px;">
          <div class="card-header">
            <h2>Contratados actualmente</h2>
          </div>

          <div class="card-body">
            <div v-if="records === 0" class="no-records">
              <h3>
                No se encuenta ningun resultado
              </h3>
            </div>
            <div v-if="records > 0" class="no-records">
              <div class="row" v-for="student in students" :key="student.id">
                <router-link :to="'/student/show/' + student.username" class="contracted-container">
                  <div class="row contracted-body">
                    <div class="col-sm-3 center-text  contracted-left-section">
                       <ws-phototemplate :clazz="'sl-img'" :username="student.username" class="img-fluid" ></ws-phototemplate>

                      <Rating  :username="student.username"></Rating>
                    </div>
                    <div class="col-sm-9 contracted-content">
                      <h3>{{ student.name }}  {{ student.surname}}</h3>
                      <p class="media">{{ capitalizeWords(student.address.city) }}, {{student.address.province}} </p>
                      <p v-html="$options.filters.trunc(student.description , 180)"></p>
                    </div>
                  </div>
                </router-link>
              </div>
              <pagination v-model="page" :records="records" :per-page="size" @paginate="myCallback"/>
            </div>
          </div>

        </div>
      </div>
  </div>





</template>

<style scoped>
h2{
  font-weight: 790;
  font-size: 1.8rem;
  letter-spacing: 1px;
  color: #d2232a !important;
}

.contracted-container{
  width: 100%;
  height: auto;
  margin: 5px;
  background: white !important;
  border: #bfbfbf 1px solid !important;
  color: black;
  padding: 8px;
}
.contracted-container:hover{
  text-decoration: none;
  background: rgba(229, 227, 227, 0.5) !important;
  transition: all 0.5s ease-in-out ;
}

.center-text{
  text-align: center !important;
}

.contracted-content{
  color: gray !important;
  padding: 10px 15px;
}

.contracted-content p {
  color: gray !important;
  font-size: 13px;
}

.contracted-content h3{
  font-size: 18px  !important;
  font-weight: 800  !important;
  color: #423f3f  !important;
  margin-bottom: 0px  !important;
  text-align: left  !important;
}

.link-employer{
  font-size: 16px
}

.contracted-content h5{
  color: gray;
  font-size: 16px
}

.no-records h3{
  color: gray;
  text-align:center;
  margin: 20px 0px;
}
</style>



<script>

import StudentDataService from "../../services/StudentDataService";
import Rating from "../rating/Rating";
import PhotoTemplate from "../photo/PhotoTemplate";


export default {
  name: "StudentListContracted",
  components: {
    Rating,
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
      page: 1,
      size:3,
      records: 0,
      students: [],
      pic: require('@/assets/user.png'),

    };
  },
  mounted() {
    this.listContractred(this.page, this.size)
  },

  methods: {
    listContractred(page, size){
      StudentDataService.listContractred(page, size).then(
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

    myCallback(){
      StudentDataService.listContractred(this.page, this.size).then(
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
    }
  }
};
</script>
