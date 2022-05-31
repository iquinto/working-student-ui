<template>
  <loading v-model:active="isLoading"
           :can-cancel="true"
           :is-full-page="fullPage"
           color="#d2232a"
           loader="bars"
  />
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
          <li class="breadcrumb-item" aria-current="page"><span class="active-link">Empleo</span></li>
        </ol>
      </nav>
      <h1> Datos de la oferta
      </h1>
    </div>
  </div>

  <div class="row job-show">
    <div class="col-md-12">
      <div class="card  float-effect" style="width: 100%;">
        <div class="card-body">
          <h2>{{job.title}} </h2>
          <p>{{employer.name}}</p>
        </div>
      </div>
    </div>
    <div class="col-md-8" style="margin-top: 20px">
      <div class="card  float-effect" style="width: 100%">
        <div class="card-body">
          <h3>Requisitos</h3>
          <p><span v-html="job.requirements"></span></p>
          <hr>
          <h3>Decripción</h3>
          <p><span v-html="job.description"></span></p>
          <hr>
          <span class="small-info">
            <p>Salario</p>
            <p>{{job.yearSalary}}</p>
          </span>
          <span class="small-info">
            <p>Categoria</p>
            <p>{{job.category.name}}</p>
          </span>
          <span class="small-info">
            <p>Fecha prevista de incorporación</p>
            <p>{{job.startDate}}</p>
          </span>
        </div>
      </div>
    </div>
    <div class="col-md-4" style="margin-top: 20px">
      <div class="card  float-effect" style="width: 100%">
        <div class="card-body text-center">
          <div class="row">
            <div class="col-md-12">
              <button id="send-cv-toogle" class="btn btn-primary" data-toggle="modal" data-target="#myModalCV" v-if="isStudent(currentUser.role)" @click="getResumes" style="width: 80%; margin: 10px">
                Enviar curriculum
              </button>
            </div>
            <div class="col-md-12">
              <router-link id="edit-jp-btn" :to="'/job/edit/' + job.id" class="btn btn-primary" v-if="!isStudent(currentUser.role)" style="width: 80%; margin: 10px">
                Editar Oferta de trabajo
              </router-link>
            </div>
            <div class="col-md-12">
              <button id="delete-jp-btn" class="btn btn-primary" data-toggle="modal" data-target="#myModal" v-if="!isStudent(currentUser.role)" style="width: 80%; margin: 10px">
                Eliminar Oferta de trabajo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- Modal Starts -->
  <div id="myModal" class="modal fade">
    <div class="modal-dialog modal-confirm">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <div class="icon-box">
            <font-awesome-icon :icon="['fas', 'file-import']" class="icon" />
          </div>
          <button  ref="closeModal" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        </div>
        <div class="modal-body text-center">
          <h4>Eliminar oferta</h4>
          <p>¿Estás seguro?</p>

          <label class="btn btn-default">
            <input type="hidden" name="id" :value="job.title"/>
          </label>
          <button id="on-delete-btn" class="btn btn-success theme-button" data-dismiss="modal" @click="remove">
            Enviar
          </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Ends -->


  <!-- Modal Starts -->
  <div id="myModalCV" class="modal fade">
    <div class="modal-dialog modal-confirm">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <div class="icon-box">
            <font-awesome-icon :icon="['fas', 'file-import']" class="icon" />
          </div>
          <button  ref="closeModal" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        </div>
        <div class="modal-body text-center">
          <h4>Enviar Curriculum</h4>
            <div class="form-group">
              <label for="resume">Selecionar CV</label>
              <select class="form-control" id="resume" v-model="selected">
                <option v-for="(resume, index) in resumeList" :key="index" :value="resume.id">
                   {{resume.alias}}  |  {{resume.description}}
                </option>
              </select>
          </div>
          <label class="btn btn-default">
            <input type="hidden" name="id" :value="job.title"/>
          </label>
          <button id="on-send-cv" class="btn btn-success theme-button" data-dismiss="modal" @click="sendCV">
            Enviar
          </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Ends -->


</template>

<style scoped>
.pagination_list{
  margin-top: 40px;
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
  background: rgba(34, 133, 103,0.9) !important;
  border: rgba(34, 133, 103,0.9) !important;
  color: #f7f9fe;
}
.card-body a:hover {
  opacity: 0.7;
  transition: all ease-in-out 0.5s;
}
.card-body button {
  background: #d2232a !important;
  border: #d2232a !important;
  color: #f7f9fe;
}
.card-body button:hover {
  opacity: 0.7;
  transition: all ease-in-out 0.5s;
}
.jobFooterBtn {
  text-align: center;
}

.job-show span{
  color: #3c3c3c !important;
}
.job-show h1, h2,h3,h4{
  font-weight: 600;
}

.small-info p:first-child{
  font-weight: bold;
  font-size: 18px;
  color: black;
  margin-bottom: 5px;
}

.small-info p:last-child{
  margin-top: 0px;
  font-size: 14px;
}

.jobFooterBtn a{
  width: 30%;
  margin: 5px;
}


.jobFooterBtn button{
  width: 30%;
  margin: 5px;
}

</style>


<script>

import JobPostDataService from "../../services/JobPostDataService";
import ResumeDataService from "../../services/ResumeDataService";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "JobShow",
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      selected: 0,
      cvImg: require('@/assets/cv-logo.png'),
      employer: {
        address: {}
      },
      job: {
        category: {},
      },
      resumeList:{},
    };
  },
  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    },

    currentJobId() {
      return this.$route.params.id;
    },

    banner() {
      return  'url(' + require('@/assets/banner_job_post.jpg') + ')' ;
    },
  },

  mounted() {
    JobPostDataService.show(this.currentJobId).then(
        (response) => {
          this.job = response.data;
          this.employer = this.findEmployerByJobPost(this.job.id)
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

  methods: {


    remove(){
      JobPostDataService.delete(this.currentJobId).then(
          (response) => {
            let redirect = "/job/list/" + this.job.type
            this.$router.push(redirect);
            this.$notify({ type: "success",  text: response.data});
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.$notify({ type: "error",  text: this.message});
          }
      );
    },


    sendCV(){
      this.isLoading = true;
      let data = {
        idPost : this.currentJobId,
        idResume : this.selected
      }
      console.log(data.idPost)
      console.log(data.idResume)

      JobPostDataService.sendCV(data).then(
          (response) => {
            this.isLoading = false;
            let redirect = "/job/list/" + this.job.type
            this.$router.push(redirect);
            this.$notify({ type: "success",  text: response.data.message});
          },
          (error) => {
            this.isLoading = false;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.$notify({ type: "error",  text: this.message});
          }
      );
    },

    getResumes(){
      ResumeDataService.listResumes().then(
          (response) => {
            this.resumeList  = response.data
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.$notify({ type: "error",  text: this.message});
          }
      );
    },

    findEmployerByJobPost(){
      return JobPostDataService.findEmployerByJobPost(this.job.id).then((response) => {
            this.employer = response.data
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

    isStudent(role){
      return role === 'ROLE_STUDENT'
    }
  }
};
</script>
