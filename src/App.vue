
<template>
  <div id="app">
    <notifications id="notifier" position="top center"></notifications> // flash message
    <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light theme-nav">
      <router-link class="navbar-brand theme-logo" to="#">Working<span class="red">Student</span>
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse navbar-right" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto ">
          <li class="nav-item active">
            <router-link to="/home" class="nav-link">
              Inicio
            </router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/about" class="nav-link">
              Sobre Nosotros
            </router-link>
          </li>
          <li class="nav-item dropdown" v-if="onlyStudent()">
            <router-link class="nav-link dropdown-toggle" to="#" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Estudiantes
            </router-link>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown1" >
              <router-link class="dropdown-item"  to="/register/student" v-if="!currentUser">Registrar como estudiante</router-link>
              <router-link class="dropdown-item"  id="nav-list-temporary-student" :to="currentUser ? '/job/list/temporary' : '/login'">Buscar trabajo temporal</router-link>
              <router-link class="dropdown-item" id="nav-list-internship-student"  :to="currentUser ? '/job/list/internship' : '/login'">Buscar empresas de practicas</router-link>
            </div>
          </li>
          <li class="nav-item dropdown" v-if="onlyEmployer()">
            <router-link class="nav-link dropdown-toggle" to="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Empresas
            </router-link>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown2">
              <router-link class="dropdown-item" to="/register/employer" v-if="!currentUser">Registrar como empresa</router-link>
              <router-link class="dropdown-item"  id="nav-list-student"  :to="currentUser ? '/student/list' : '/login'">Buscar estudiantes</router-link>
              <router-link class="dropdown-item" id="nav-list-temporary-employer"  :to="currentUser ? '/job/list/temporary' : '/login'">Publicar empleo temporal</router-link>
              <router-link class="dropdown-item" id="nav-list-internship-employer" :to="currentUser ? '/job/list/internship' : '/login'">Publicar practicas</router-link>

            </div>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/resources">Recursos</router-link>
          </li>
          <li v-if="!currentUser" class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle bordered"
               to="#" id="navbarDropdown3" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              <span>Registrar</span>
            </router-link>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown3">
              <router-link to="/register/student" class="dropdown-item">
                Estudiantes
              </router-link>
              <router-link to="/register/employer" class="dropdown-item">
                Empresas
              </router-link>
            </div>
          </li>
          <li class="nav-item" v-if="!currentUser">
            <router-link to="/login" class="nav-link">
              <span>Inciar sesión</span>
            </router-link>
          </li>
          <li v-if="currentUser" class="nav-item profile-icon">
            <router-link class="nav-link"  :to="'/profile/' + currentUser.username" title="Perfil"> <font-awesome-icon icon="user" class="icon" style="font-size: 20px;"/> </router-link>
          </li>
          <li class="nav-item" v-if="currentUser">
            <NotificationList></NotificationList>
          </li>
          <li v-if="currentUser"  class="nav-item profile-icon">
            <router-link id="log-out-icon" class="nav-link" to="#" @click.prevent="logOut" title="Salir" style="cursor: pointer !important;"><font-awesome-icon icon="sign-out-alt" class="icon" style="font-size: 20px;"/>  </router-link>
          </li>
        </ul>
      </div>
    </nav>


    <div class="container">
      <router-view />
    </div>
  </div>


  <footer id="footer">
    <div class="container app-footer">
      <div class="footer-content">
        <div class="row">

          <!-- ***** Contact Form Start ***** -->
          <div class="left-content  col-lg-6 col-md-12 col-sm-12">
            <h4>Contáctanos</h4>
            <router-link to="/login" type="button" class="btn btn-primary"><font-awesome-icon icon="phone" class="icon" style="font-size: 16px; margin-right: 15px"/> 977 14 68 01</router-link> <br>
            <router-link to="/login" type="button" class="btn btn-primary"><font-awesome-icon icon="envelope" class="icon" style="font-size: 16px; margin-right: 15px"/> infoworkingstudent@gmail.com</router-link>
          </div>
          <!-- ***** Contact Form End ***** -->
          <div class="col-lg-6 col-md-12 col-sm-12">
            <h4>Síguenos en</h4>
             <ul class="social">
               <li><router-link to="#"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }"/></router-link></li>
               <li><router-link to="#"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter' }"/></router-link></li>
               <li> <router-link to="#"> <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }"/></router-link></li>
             </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 footer-form">
          <h4>Suscríbete a nuestro boletín
          </h4>
          <form>
          <div class="row">
              <div class="col-xs-12 col-sm-5">
                <div class="form-group">
                  <input type="completeName" class="form-control" id="completeName" aria-describedby="emailHelp" placeholder="Nombre completo">
                </div>
              </div>

            <div class="col-xs-12 col-sm-5">
              <div class="form-group">
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Email">
              </div>
            </div>
            <div class="col-xs-12 col-sm-2">
              <div class="form-group">
                <button class="btn btn-primary btn-block">
                  Suscribe
                </button>
              </div>
            </div>
          </div>
          </Form>
        </div>

        <div class="col-lg-12">
          <div class="sub-footer">
            <p>Copyright &copy; 2022 WorkingStudent
              | Designed by Isagani Quinto</p>
          </div>
        </div>
      </div>
    </div>
  </footer>

</template>


<style>
/* ----------------------GENERAL-------------------------------------*/

/*
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Titillium+Web:wght@300&display=swap');
*/
/*
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Display&display=swap');
*/
/*
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&display=swap');
*/

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
/*
html, body, #app{
  background: #f5f5f5;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}

h1,h2,h3,h4,h5,h6{
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}

p{
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";}

.p-component{
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";}

*/

html, body, #app{
  background: #f5f5f5;
  font-family: 'Roboto', sans-serif;
}

h1,h2,h3,h4,h5,h6{
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}

p{
  font-family: 'Roboto', sans-serif;

}

.p-component{
  font-family: 'Roboto', sans-serif;
}




.breadcrumb-container{
  margin-bottom: -13px !important;
  padding-bottom: 0px !important;
}
.breadcrumb{
  background-color: white !important;
  margin-left: -15px;
}

.profile-img{
  width: 30px;
}

.theme-header-title{
  padding: 15px;
  margin-bottom: 20px;
}

.theme-title{
  margin-top:70px !important;
  background-color: rgba(210,35,42,0.7);
  width: 100%;
  padding: 0px 20px !important;
}

.theme-title h1{
  font-weight: 790;
  font-size: 2.2rem;
  letter-spacing: 1px;
  margin: 50px 0px;
  color: #FFFFFF;

}

.breadcrumb{
  background-color: transparent !important;
}
.inactive-link{
  color:rgba(255,255,255, 0.8) !important;
}
.active-link{
  color: white !important;
}

blockquote{
  font-family: 'Noto Sans Display', sans-serif !important;

}
/* ----------------------MENU-------------------------------------*/
.dropdown-toggle::after{
  content: none !important;
}
.navbar-nav{
  margin-bottom: 15px !important;
}

.theme-nav{
  /*padding: 0px 5% !important;*/
  padding: 0px 8% !important;
  min-height: 80px;
}

.theme-nav li {
  padding-left: 10px;
  padding-right: 10px;
}

.theme-nav li a {
  display: block;
  font-weight: 600;
  font-size: 16px;
  color: #2d2c2c !important;
/*
  text-transform: uppercase;
*/
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  height: 40px;
  line-height: 40px;
  border: transparent;
  letter-spacing: 1px;
}
.theme-nav li a:hover {
  color: #d2232a !important;
  transition: all 0.5s ease-in-out;
}

.theme-nav  .profile-icon a{
  display: inline;
}
.theme-nav  .profile-icon a .icon{
margin-bottom: -6px;
}


.theme-nav li a span{
  border-bottom: #d2232a 2px solid !important;
}
.theme-logo{
  line-height: 80px;
  color: #191a20;
  font-size: 28px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";

}
.theme-logo .red{
  color: #d2232a !important;
}
.theme-logo .blue{
  color: #2363d2 !important;
}
.bordered{
  padding-bottom: 10px;
}
/* ----------------------FORM-------------------------------------*/

.theme-form{
  padding: 32px 31px 16px;
  background-color: #e1e1e1;
  margin-top: 15px;
}

.theme-form textarea{
  min-height: 200px;
}

.form-control{
  color: black !important;
}

.theme-form select{
  display: block;
  width: 100%;
  height: calc(1.5em + .75rem + 2px);
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #000000;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
}
.theme-form button{
  margin-top: 20px;
  background: #d2232a;
  border: #d2232a ;
}

.theme-form button:hover{
  opacity: 0.8 !important;
  background: #d2232a;
}

.theme-button{
  margin-top: 20px;
  background: #d2232a !important;
  border: #d2232a !important;
}

.theme-button:hover{
  opacity: 0.8;
}

.theme-form .form-check-label {
  margin-bottom: .5rem;
}

.theme-form .form-check-label:after {
  content:"*";
  color:#d2232a;
}

/* ----------------------EXTRA INFO-------------------------------------*/

.extra-info{
  color: #1b1e21;
  font-weight: 600;
  padding: 20px 15px ;
  min-height: 180px;
}

.extra-info h6{
  font-weight: 800;
  font-size: 1.30rem;
  margin-bottom: 5px;
}

.extra-info a {
  color: #d2232a;
  margin: 10px 0px;
  font-weight: 800 !important;

}


.extra-info a:hover {
  text-decoration: underline !important;
  color: #d2232a;
  opacity: 0.8;
}

.extra-info p{
  font-size: 1.125rem;
  line-height: 1.5rem;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}



/* ----------------------FOOTER-------------------------------------*/
.theme-select-multiple{
  min-height: 90px !important;
  font-size: 14px !important;
  color: #3c3c3c !important;
}

#footer{
  background-color: white !important;
  padding-top: 10px;
  margin-top: 50px;
}
.app-footer{
  margin-top:80px !important;
}

.app-footer h4{
  font-size: 25px;
  font-weight: 600;
  line-height: 2.25rem;
  margin: 0 0 .75rem;
}

.app-footer .footer-form{
  padding: 32px 31px 16px;
  background-color: #e1e1e1;
  margin-top: 10px;
}


.footer-form button{
  background: #d2232a !important;
  border: #d2232a !important;
}

footer .sub-footer {
  padding: 60px 0px;
  border-top: 1px solid rgba(250,250,250,0.3);
  text-align: center;
  color: #0e0e0e !important;
}

footer .sub-footer a {
  color: #FFF;
}

footer .sub-footer p {
  color: #333232 !important;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.5px;
}

footer .social a{
  color: #0e0e0e;
}

footer .social a:hover{
  color: #0e0e0e;
  background: #d2232a !important;
  border: #d2232a !important;
  color: #FFFFFF;
}

footer .social li{
  display: inline;
  font-size: 40px;
  padding: 20px;
}

footer .left-content a{
  margin: 0px 0px 20px 0px;
  background: #f9fafc;
  color: #0e0e0e;
  width: 60%;
  border: #d2232a solid 2px !important;
  text-align: justify;
}


footer .left-content a:hover{
  color: #FFFFFF !important;
  background: #d2232a !important;
  margin: 0px 0px 20px 0px;
  background: #f9fafc;
  width: 60%;
  border: #d2232a solid 2px !important;
  text-align: justify;
}

/* ----------------------TELEPORT MODAL-------------------------------------*/

.modalDialog{
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  background: rgba(14, 14, 14, 0.7);
}
.modalDialog .modal-header{
  margin-top: -2px;
  padding: 0.7rem !important;
}

.ws-hide{
  /*display: none !important;*/
}

.modalDialog .close {
  padding: 0px !important;
  background: #606061 ;
  color: #FFFFFF !important;
  line-height: 25px;
  /*position: absolute;*/
  right: -12px;
  text-align: center;
  top: -10px;
  width: 24px;
  text-decoration: none;
  font-weight: bold;
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  border-radius: 12px;
}
.modalDialog .close:hover {
  background: #d2232a;
  color: white;
}

.modalOverlay{
  z-index: 100;
  position:  fixed;
/*  width 100vw;
  height 100vh;*/
  top:  0;
  left:  0;
  background-color:  rgba(255, 255, 255, 0.9);
  display:  flex;
  justify-content:  center;
  overflow-y:  auto;

}
ul.p-autocomplete-multiple-container{
  width: 100% !important;
}
.modalDialog .modal-body{
  margin: 10px 0px;
}
.modalDialog .modal-body p{
  text-align: justify;
  font-size: 13px;
}
.modalDialog .modal-body p span{
  color: #d2232a;
}

.modalDialog a.enter{
  color: #ffffff;
  background: #d2232a;
  border: #d2232a;
}

.modalDialog a:hover{
  opacity: 0.6;
  -webkit-transition: opacity 400ms ease-in;
  -moz-transition: opacity 400ms ease-in;
  transition: opacity 400ms ease-in;
}

.modalDialog .check-icon{
  color: #c1dec8;
  font-size: 50px;
  display: block;
  margin: auto;
}
.modalDialog .modal-footer a{
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  border: none;
  border-radius: unset;
  padding: 3px 10px;
}

.float-effect{
  box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05) !important;
  transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)!important;
}


.vue-notification {
  font-size: 15px !important;
  padding: 15px 10px!important;
}
.vue-notification.success{
  background: #47c9a2!important;
  border-left-color: #47c9a2!important;
}

.vue-notification.warn {
  background: #ffb648 !important;
  border-left-color: #f48a06 !important;
}

.vue-notification.error  {
  background: #e54d42!important;
  border-left-color: #b82e24!important;
}


/* ---------------------- MODAL-------------------------------------*/

.modal-confirm {
  color: #434e65;
  width: 525px;
}
.modal-confirm .modal-content {
  padding: 20px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
}
.modal-confirm .modal-header {
  background: rgba(210,35,42, 0.9);
  border-bottom: none;
  position: relative;
  text-align: center;
  margin: -20px -20px 0;
  border-radius: 5px 5px 0 0;
  padding: 35px;
}
.modal-confirm h4 {
  text-align: center;
  font-size: 36px;
  margin: 10px 0;
}
.modal-confirm .form-control, .modal-confirm .btn {
  min-height: 40px;
  border-radius: 3px;
}
.modal-confirm .close {
  position: absolute;
  top: 15px;
  right: 15px;
  color: #fff;
  text-shadow: none;
  opacity: 0.5;
}
.modal-confirm .close:hover {
  opacity: 0.8;
}
.modal-confirm .icon-box {
  color: #fff;
  width: 95px;
  height: 95px;
  display: inline-block;
  border-radius: 50%;
  z-index: 9;
  border: 5px solid #fff;
  padding: 15px;
  text-align: center;
}
.modal-confirm .icon-box .icon {
  font-size: 64px;
  margin: -4px 0 0 -4px;
}
.modal-confirm.modal-dialog {
  margin-top: 80px;
}
.modal-confirm .btn, .modal-confirm .btn:active {
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.4s;
  line-height: normal;
  margin: 10px;
  padding: 6px 20px;
  border: none;
}

.bt-blue{
  background: #d2232a !important;
}

.bt-grey{
  background: #d2232a !important;
}

.modal-confirm .btn:hover, .modal-confirm .btn:focus {
  /*
    background: #eda645 !important;
  */
  outline: none;
  opacity: 0.8;
}
.modal-confirm .btn span {
  margin: 1px 3px 0;
  float: left;
}
.modal-confirm .btn i {
  margin-left: 1px;
  font-size: 20px;
  float: right;
}

button:focus {
  border: none !important;
}
.error-feedback{
  color: red;
  font-size: 12px;
}

@media (min-width: 992px){
  .navbar-expand-lg .navbar-nav .nav-link {
    padding-right: 0px !important;
    padding-left: 0px !important;
  }
}



@media (max-width: 991px) {
  .theme-menu{
    padding: 20px !important;
    min-height: 10px !important;
  }


  .theme-title{
    margin-top: 90px !important;
  }

}



</style>

<script>
import NotificationList from "./components/notification/NotificationList"

export default {
  name: "App",
  components: {
    NotificationList
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentEnv(){
      return process.env.VUE_APP_ROOT_NAME
    }
  },
  methods: {
    onlyEmployer(){
      if(this.currentUser)
        return this.currentUser.role === 'ROLE_EMPLOYER'
      else
        return true
    },

    onlyStudent(){
      if(this.currentUser)
        return this.currentUser.role === 'ROLE_STUDENT'
      else
        return true
    },


    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
