<template>
  <div class="row theme-header-title">
    <div class="col-sm-12 theme-title float-effect">
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
          <li class="breadcrumb-item" aria-current="page"><span class="active-link">Perfil del estudiante</span></li>
        </ol>
      </nav>
      <h1> Perfil
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
          <img class="card-img-top"
               :src="image" :alt="user.username" :title="user.name"
               style= "max-width: 250px; margin-bottom: 30px;">
          <h5> {{user.name}} {{user.surname}}</h5>
          <ul class="list-group list-group-flush info">
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
            <li class="list-group-item">
              <span class="row">
                <span class="col-md-4 labels">F. Nacimiento</span>
                <span class="col-md-8 values">{{user.birthday}}</span>
              </span>
            </li>
            <li class="list-group-item">
              <span class="row">
                <span class="col-md-4 labels">Universidad</span>
                <span class="col-md-8 values">{{user.university.name}}</span>
              </span>
            </li>
            <li class="list-group-item">
              <span class="row">
                <span class="col-md-4 labels">Categorias</span>
                <span class="col-md-8 values">
                  <div  v-for="category in user.jobPositions" :key="category.id">
                    {{category.name}} <br>
                  </div>
                </span>
              </span>
            </li>
            <li class="list-group-item">
              <span class="row">
                <span class="col-md-4 labels">Dirección </span>
                <span class="col-md-8 values">{{user.address.street}}, {{user.address.city}}, {{user.address.zipcode}}, {{user.address.province}}</span>
              </span>
            </li>
            <li class="list-group-item">
              <span class="row">
                <span class="col-md-4 labels">Valoración</span>
                <span class="col-md-8 values" style="margin-top: -5px; margin-left: -20px">
                  <Rating style="margin-left: 15px;" :username="this.paramsUser"></Rating></span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="card profile-card float-effect" style="margin-top: 20px">
        <div class="card-header">
          <h2>{{isStudent(currentUser.role) ? 'Sobre mi' : 'Sobre la empresa'}}</h2>
        </div>
        <div class="card-body">
          <blockquote v-html="user.description"> </blockquote>
        </div>
      </div>

    </div>
    <div class="col-sm-8 right-profile">
      <ReservationList :username="user.username" /> <!-- incrusta l'usuari TransactionList-->
    </div>
  </div>




</template>

<script>
import PhotoDataService from "../../services/PhotoDataService";
import StudentDataService from "../../services/StudentDataService";
import ReservationList from "../reservation/ScheduleList"
import Rating from "../rating/Rating";


export default {
  name: 'StudentShow',
  components: {
    ReservationList,
    Rating
  },
  data() {
    return {
      image: require('@/assets/add-user.png'),
      message: "",
      user: {
        address:{},
        categories: {},
        university:{}
      }
    }
  },

  computed: {
    paramsUser(){
      return this.$route.params.username
    }
  },

  mounted() {
    this.getStudent(this.paramsUser);
    this.getUserAvatar(this.paramsUser);
  },

  methods: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    },

    getStudent(username){
      StudentDataService.show(username).then(
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
            this.$notify({ type: "warn",  text: error});
          }
      )
    },

    getUserAvatar(username){
      PhotoDataService.getAvatarByUsername(username).then(
          (response) => {
            if(response.data.url)  this.image = response.data.url
          },
          (error) => {
            this.loading = false;
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
    },



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

</style>