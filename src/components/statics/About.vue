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
          <li class="breadcrumb-item" aria-current="page"><span class="active-link">Sobre nosotros</span></li>
        </ol>
      </nav>
      <h1>Sobre nosotros</h1>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card notification-card" style="width: 100%; padding: 0px 30px">
          <div class="card-body about-con">
            <h2>¿Quienes somos?</h2>
            <p style="padding: 10px; ">Bienvenidos a Working Student — donde el tiempo se encuentra con la oportunidad!</p>
            <p style="padding:  0px 10px; text-align: justify">
              WorkingStudent es una plataforma web que permitirá a los estudiantes universitarios encontrar empleos a tiempo parcial que puedan compaginar con sus estudios y, del mismo modo, permita a los empleadores (empresas o particulares) encontrar talentos que encajen a sus necesidades.
            </p>

            <h2>Misión</h2>
            <p>Nuestro missión es:</p>

            <ul>
              <li>Estudiantes terciarios campeones</li>
              <li>Conectar a empleadores curiosos</li>
              <li>Puertas abiertas para nuevos talentos</li>
              <li>Inspirar a la próxima generación de líderes</li>
            </ul>

            <div class="be-part">

              <h2>Forma parte de nuestra comunidad</h2>
              <router-link to="/register/student" class="main-button ">Estudiante</router-link> <router-link to="/register/employer" class="main-button">Empresa</router-link>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>

import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'

export default {
  name: "Home",
  data() {
    return {

    };
  },

  computed: {
    banner() {
      return 'url(' + require('@/assets/banner_about.jpg') + ')';
    },
  },

  mounted() {
  },
  methods:{}
};
</script>




<style>
.p-tabview .p-tabview-nav li{
  width:50%;
}


.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  background: #ffffff;
  border-color: #d2232a;
  color: #d2232a;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: none !important;
}

.about-con{
  margin-top: 40px;
  margin-bottom:  40px;
}
.about-con h2{
  margin-bottom:20px!important;
  font-weight: 800;
  font-size: 1.6rem;
}

.about-con a{
  padding: 10px;
  text-transform: uppercase;
  border: 3px solid #d2232a;
  background-color: white;
  color: #d2232a;
}

.about-con a:hover{
  background-color: #d2232a;
  text-transform: uppercase;
  color: #fff;}

.be-part{
  padding-top: 20px;
}
</style>

