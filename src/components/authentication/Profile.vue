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
          <li class="breadcrumb-item" aria-current="page"><span class="active-link">Mi perfil</span></li>
        </ol>
      </nav>
      <h1>Mi perfil
        <span class="small-info" v-if="isStudent(currentUser.role)">| Estudiante </span>
        <span class="small-info" v-if="!isStudent(currentUser.role)">| Empresa </span>
      </h1>
    </div>
  </div>


  <div class="row">
    <div class="col-sm-4">
      <div class="card profile-card float-effect">
        <div class="card-header">
          <h2>Datos Personales</h2>
        </div>
        <div class="card-body">
          <img class="card-img-top" :src="image" :alt="currentUser.username"
               :title="hasImage ? currentUser.name : 'Haz click para subir foto' " data-toggle="modal" data-target="#myModal"
               style="cursor: grab; max-width: 250px ">
          <h5> {{user.name}} {{user.surname}}</h5>

          <ul class="list-group list-group-flush info">
            <li class="list-group-item">
              <span class="row">
                <span class="col-md-4 labels">username</span>
                <span class="col-md-8 values" id="current-username">{{user.username}}</span>
              </span>
            </li>
            <li class="list-group-item">
              <span class="row">
                <span class="col-md-4 labels">email</span>
                <span class="col-md-8 values">{{user.email}}</span>
              </span>
            </li>

            <li class="list-group-item">
              <span class="row">
                <span class="col-md-4 labels">telefono</span>
                <span class="col-md-8 values">{{user.phone}}</span>
              </span>
            </li>


            <li class="list-group-item" v-if="isStudent(currentUser.role)">
              <span class="row">
                <span class="col-md-4 labels">F. Nacimiento</span>
                <span class="col-md-8 values">{{user.birthday}}</span>
              </span>
            </li>
            <li class="list-group-item" v-if="isStudent(currentUser.role)">
              <span class="row">
                <span class="col-md-4 labels">Universidad</span>
                <span class="col-md-8 values">{{user.university.name}}</span>
              </span>
            </li>

            <li class="list-group-item" v-if="!isStudent(currentUser.role)">
              <span class="row">
                <span class="col-md-4 labels">website</span>
                <span class="col-md-8 values">
                  <a  :href="'//' + user.website"  target="_blank">{{user.website}}</a>
                </span>
              </span>
            </li>

            <li class="list-group-item" v-if="isStudent(currentUser.role)">
              <span class="row">
                <span class="col-md-4 labels">Puestos</span>
                <span class="col-md-8 values">
                  <div  v-for="jobPosition in user.jobPositions" :key="jobPosition.id">
                    {{jobPosition.name}} <br>
                  </div>
                </span>
              </span>
            </li>

            <li class="list-group-item" v-if="!isStudent(currentUser.role)">
              <span class="row">
                <span class="col-md-4 labels">Categoria</span>
                <span class="col-md-8 values">{{user.area.name}}</span>
              </span>
            </li>

            <li class="list-group-item">
              <span class="row">
                <span class="col-md-4 labels">Dirección </span>
                <span class="col-md-8 values">{{user.address.street}}, {{user.address.city}}, {{user.address.zipcode}}, {{user.address.province}}</span>
              </span>
            </li>
            <li class="list-group-item" v-if="isStudent(currentUser.role)" >
              <span class="row">
                <span class="col-md-4 labels">Valoración</span>
                <span class="col-md-8 values" style="margin-top: -5px; margin-left: -20px"><Rating v-if="isStudent(currentUser.role)" style="margin-left: 15px;" :username="this.paramuser"></Rating></span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="card profile-card float-effect" v-if="user.description !== null" style="margin-top: 20px">
        <div class="card-header">
          <h2>{{isStudent(currentUser.role) ? 'Sobre mi' : 'Sobre la empresa'}}</h2>
        </div>
        <div class="card-body">
          <blockquote v-html="user.description"> </blockquote>
        </div>
      </div>
      <router-link to="/profile/edit" class="btn btn-primary card-link">Editar perfil</router-link>

      <div class="card profile-card float-effect" v-if="isStudent(currentUser.role)" style="margin-top: 20px">
        <div class="card-header">
          <h2>Mis Curriculums</h2>
        </div>
        <div id="user-cvs" class="card-body">
          <div class="row">
            <div class="col-md-4">
              <img class="card-img-top" :src="cvAdd" :alt="currentUser.username" title="Add new"
                   data-toggle="modal" data-target="#myResume" style="cursor: grab ; width: 80px" id="add-cv-toogle">
            </div>
            <div class="col-md-4" v-for="resume in resumes" :key="resume.id">
              <img data-file-icon="item" class="card-img-top" :src="cvImg" :alt="resume.alias" :title="resume.description"
                   data-toggle="modal" data-target="#myResumeAction"
                   @click="setCurrentResumeId(resume.id, resume.url)"
                   style="cursor: grab ; width: 80px">
              <span>
                <p class="text-center" style="font-size: 12px">{{ resume.alias }}</p>
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="col-sm-8">
      <div class="row">
        <div class="col-sm-12 right-profile"  v-if="isStudent(currentUser.role)">
          <ScheduleList :username="user.username"/>
        </div>
        <div class="col-sm-12 right-profile" style="margin-top: 30px" v-if="isStudent(currentUser.role)">
          <ReservationTable></ReservationTable>
        </div>
        <div class="col-sm-12 right-profile"  v-if="isStudent(currentUser.role)">
          <EvolutionGraph/>
        </div>

        <div class="col-sm-12 right-profile"  v-if="!isStudent(currentUser.role)">
          <ReservationTable @refreshevent="toResfeshContractedList"></ReservationTable>
        </div>

        <div class="col-sm-12 right-profile"  v-if="!isStudent(currentUser.role)" style="margin-top: 30px;">
          <StudentContractedList ref="refresh">></StudentContractedList>
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
          <h4>Actulizar Foto</h4>
          <div class="form-group">
            <label>
              <input type="file" ref="file" name="file" @change="selectFile"  style="margin-top:20px;"/>
            </label>
          </div>
          <div class="form-group">
            <button class="btn btn-success theme-button" :disabled="!selectedFiles" @click="setAvatar">
              Enviar
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Ends -->

  <!-- Modal Starts -->
  <div id="myResume" class="modal fade">
    <div class="modal-dialog modal-confirm">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <div class="icon-box">
            <font-awesome-icon :icon="['fas', 'file-import']" class="icon" />
          </div>
          <button id="resume-model-btn" ref="closeResume" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        </div>
        <div class="modal-body">
          <h4 class="text-center">Subir Currículum Vítae</h4>

          <div class="form-group">
            <label for="alias">Nombre</label>
            <input type="text"  class="form-control" name="alias" id="alias" v-model="resumeAlias">
          </div>

          <div class="form-group">
            <label>
              <input type="file" id="attach-resume" ref="resume" name="resume" @change="selectResume"/>
              <small id="fileHelp" class="form-text text-muted">Formatos (PDF y Word)</small>

            </label>

          </div>

          <div class="form-group">
            <label for="description">Descripción</label>
            <input type="text" class="form-control" name="description" id="description" v-model="resumeDescription">
          </div>

          <button class="btn btn-success theme-button" id="upload-resume-btn"  :disabled="!selectedResumes" title="Haz click para subir curriculum" @click="uploadResume">
            Enviar
          </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Ends -->


  <!-- Modal Starts -->
  <div id="myResumeAction" class="modal fade">
    <div class="modal-dialog modal-confirm">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <div class="icon-box">
            <font-awesome-icon :icon="['fas', 'file-import']" class="icon" />
          </div>
        </div>
        <div class="modal-body">
          <h3 class="text-center">Seleciona una opcion</h3>
          <button  id="download-cv-btn" class="btn btn-success " data-dismiss="modal" title="Descargar curriculum" @click="downloadResume()">
            Descargar
          </button>
          <button id="remove-cv-btn" class="btn btn-success theme-button" data-dismiss="modal"   title="Eliminar curriculum" @click="deleteResume()">
            Eliminar
          </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Ends -->



</template>

<script>
import PhotoDataService from "../../services/PhotoDataService";
import ResumeDataService from "../../services/ResumeDataService";
import AuthenticationDataService from "../../services/AuthenticationDataService";
import ScheduleList from "../reservation/ScheduleList"
import EvolutionGraph from "../historic/EvolutionGraph"
import Rating from "../rating/Rating";
import ReservationTable from "../reservation/ReservationTable";
import StudentContractedList from "../student/StudentContractedList";

export default {
  name: 'Profile',
  components: {
    ScheduleList,
    EvolutionGraph,
    Rating,
    ReservationTable,
    StudentContractedList,
  },
  data() {
    return {
      resumes: [],
      hasImage: false,
      currentResumeId: 0,
      uri:null,
      image: require('@/assets/add-user.png'),
      cvImg: require('@/assets/cv-logo.png'),
      cvAdd: require('@/assets/add-file.png'),
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      selectedResumes: undefined,
      currentResume: undefined,
      resumeAlias: "",
      resumeDescription: "",
      progressResume: 0,
      message: "",
      fileInfos: [],
      showTransaction: true,
      isShow: true,
      user: {
        address:{},
        university:{},
        category:{},
        area:{}
      }
    }
  },

  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    },

    paramuser(){
      return this.$route.params.username
    },

    banner() {
      return (this.currentUser.role === 'ROLE_STUDENT') ? 'url(' + require('@/assets/banner_profile_student.jpg') + ')' : 'url(' + require('@/assets/banner_profile_employer.jpg') + ')';
    },
  },

  mounted() {
    if (!this.currentUser) {this.$router.push('/login');}
    this.loadProfile();
    this.getAvatar();
    if (this.currentUser.role === 'ROLE_STUDENT') this.getResumes();
  },

  methods: {

    capitalizeWords (str){
      if(str === "" || str === null)
        return ""
      else
        return str.replaceAll("_", " ").toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())
    },

    loadProfile(){
      AuthenticationDataService.loadProfile().then(
          (response) => {
            this.user = response.data
          },
          (error) => {
            this.loading = false;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.showTransaction = false;
          }
      )
    },

    getAvatar(){
      PhotoDataService.getAvatarByUsername(this.currentUser.username).then(
          (response) => {
            if (!response.data.url){
              //this.$notify({ type: "warn",  text: "El usuario no dispone de foto de perfil. Haz click a la imagen para subri foto."});
              this.hasImage = false;
            }else {
              this.image = response.data.url
              this.hasImage = true;
            }
          },
      );
    },

    setAvatar() {
      this.progress = 0;
      this.currentFile = this.selectedFiles.item(0);
      const formData = new FormData();
      formData.append("file",this.currentFile);
      PhotoDataService.setAvatar(formData, event => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      }).then(
          (response) => {
            this.getAvatar()
            //this.image = response.url
            this.$refs.closeModal.click()
            this.$notify({ type: "success",  text: response.message.toString()});
          },
          (error) => {
            this.loading = false;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.$notify({ type: "error",  text: this.message});
          }
      )
      this.selectedFiles = undefined;
    },

    selectFile() {
      this.selectedFiles = this.$refs.file.files;
    },

    getResumes(){
      ResumeDataService.listResumes().then(
          (response) => {
            this.resumes = response.data
          },
      );
    },

    uploadResume() {
      this.progressResume = 0;
      this.currentResume = this.selectedResumes.item(0);
      const formData = new FormData();
      formData.append("alias",this.resumeAlias);
      formData.append("description",this.resumeDescription);
      formData.append("resume",this.currentResume);
      ResumeDataService.saveResume(formData, event => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      }).then(
          (response) => {
            this.getResumes();
            this.$notify({ type: "success",  text: response.message});
            this.$refs.closeResume.click()
            this.selectedResumes =  undefined,
                this.currentResume =   undefined,
                this.resumeAlias =  "",
                this.resumeDescription =  "",
                this.progressResume = 0,
                console.log(response.data)
          },
          (error) => {
            this.loading = false;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.$notify({ type: "error",  text: this.message});
          }
      )
      this.selectedResumes = undefined;
    },

    selectResume() {
      this.selectedResumes= this.$refs.resume.files;
    },

    downloadResume(){
      window.location.href = this.uri
    },

    deleteResume(){

      ResumeDataService.deleteResume(this.currentResumeId).then(
          (response) => {
            this.getResumes();
            this.$notify({ type: "success",  text: response.data.message.toString()});
          },
          (error) => {
            this.loading = false;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.$notify({ type: "error",  text: this.message});
          }
      )
    },

    setCurrentResumeId(id, uri){
      this.currentResumeId = id
      this.uri = uri
    },

    isStudent(role){
      return role === 'ROLE_STUDENT'
    },

    toResfeshContractedList(){
      this.$refs.refresh.listContractred(1,3);
    }

  }
};
</script>

<style>
.profile-card h2 {
  font-weight: 790;
  font-size: 1.8rem;
  letter-spacing: 1px;
  color: #d2232a !important;
  text-align: center;
}

.profile-card  .icon-pen{
  font-weight: 790;
  font-size: 1.8rem;
  letter-spacing: 1px;
  color: #302f2f !important;
  text-align: center;
}

.profile-card .card-header, .card-footer{
 /* background-color: rgba(210,35,42, 0.9) !important;*/
  background-color: white !important;
  font-size: 12px !important;
}
.profile-card .card-body img{
  padding: 10px 0px!important;
  /*width: 250px;*/
  display: block;
  margin: auto;
}

.profile-card .card-body img:hover{
  opacity: 0.7;
  transition: all 0.1s ease-in-out;
}
.profile-card .card-body h5{
  margin: 10px 0;
  text-align: center;
  font-weight: 800;

}

.profile-card .card-body span.labels{
  font-weight: 790;
  font-size: 12px;
  text-transform: uppercase;
  padding: 0px !important;
}

.profile-card .card-body span.values{
  font-size: 12px;
  padding: 0px !important;
  color: #4c4c4c;
}

.card-link{
  background: #d2232a;
  border: #d2232a ;
  width: 100%;
  margin-top: 10px;
}

.card-link:hover {
  background: #d2232a;
  border: #d2232a ;
  width: 100%;
  margin-top: 10px;
  opacity: 0.7 !important;
  transition: all 0.5s ease-in-out;
}

.profile-card a:hover{
  opacity: 0.9;
  text-decoration: none;
}


.profile-card .info .list-group-item{
  border: none;
  padding: 5px 1.25rem;
}

.profile-card .info em{
  color: #827e7e !important;
  font-style: normal;
}

.small-info{
  font-weight: 400;
  color:rgba(255,255,255, 0.8) !important;
}

blockquote {
  position: relative;
  margin: 0.5em;
  padding: 10px 30px;
  font-style: italic;
  font-size: 13px;
}

blockquote:before {
  position: absolute;
  font-size:3em;
  line-height: 1;
  color: #827e7e;
  top: 0;
  left: 0;
  content: "\201C";
}
blockquote:after {
  position: absolute;
  float:right;
  font-size:3em;
  color: #827e7e;
  line-height: 1;
  right:0;
  bottom:-0.5em;
  content: "\201D";
}
blockquote footer {
  padding: 0 2em 0 0;
  text-align:right;
}
blockquote cite:before {
  content: "\2013";
}


.vue3-star-ratings__wrapper{
  margin: 2px !important;
  padding: 2px !important;
}


.icon-resume:hover{
  opacity: 0.8;
  transition: all 0.5s;
}

.modal-button{
  color: white !important;
  font-size: 12px;
  float: right;
  padding: 3px 5px;
  background-color: rgba(210,35,42, 0.9);
}
</style>