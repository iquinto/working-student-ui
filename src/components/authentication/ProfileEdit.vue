
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
            <router-link :to="'/profile/' + user.username"  class="inactive-link">
              Mi perfil
            </router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page"><span class="active-link">Editar Perfil</span></li>
        </ol>
      </nav>
      <div class="col-sm-12">
        <h1 v-if="!successful">Editar Datos</h1>
      </div>
    </div>
  </div>
  
  <!------------ FORM 1 -------------------------->
    <div class="row">
      <div class="col-xs-12 col-md-8">
        <div v-if="!successful" class="float-effect">
          <div class="theme-form">
            <h4>Editar Datos</h4>
            <Form id="editProfile" :validation-schema="schema" :initial-values="user">
              <Field name="role" type="hidden" class="form-control" v-model="user.role"/>


              <div class="row">
                <div class="form-group col-xs-12 col-md-6">
                  <label for="name" class="form-check-label">Nombre</label>
                  <Field name="name" type="text" class="form-control" v-model="user.name"/>
                  <ErrorMessage name="name" class="error-feedback" />
                </div>

                <div class="form-group col-xs-12 col-md-6">
                  <label for="surname">Apellido/os</label>
                  <Field name="surname" type="text" class="form-control" v-model="user.surname"/>
                  <ErrorMessage name="surname" class="error-feedback" />
                </div>

                <div class="form-group col-xs-12 col-md-6">
                  <label for="phone" class="form-check-label">Teléfono</label>
                  <Field name="phone" type="text" class="form-control"  v-model="user.phone"/>
                  <ErrorMessage name="phone" class="error-feedback" />
                </div>


                <div class="form-group col-xs-12 col-md-6">
                  <label for="email" class="form-check-label">Email</label>
                  <Field name="email" type="email" class="form-control"  :v-model="user.email"/>
                  <ErrorMessage name="email" class="error-feedback" />
                </div>
                <Field name="address.id" type="hidden" class="form-control" v-model="user.address.id"/>

                <div class="form-group col-xs-12 col-md-6">
                  <label for="address.street">Direción</label>
                  <Field name="address.street" type="text" class="form-control" v-model="user.address.street"/>
                  <ErrorMessage name="street" class="error-feedback" />
                </div>

                <div class="form-group col-xs-12 col-md-6">
                  <label for="address.city" class="form-check-label">Cuidad</label>
                  <Field name="address.city" type="text" class="form-control" v-model="user.address.city"/>
                  <ErrorMessage name="city" class="error-feedback" />
                </div>


                <div class="form-group col-xs-12 col-md-6">
                  <label for="address.zipcode" class="form-check-label">Codigo Postal</label>
                  <Field name="address.zipcode" type="text" class="form-control" v-model="user.address.zipcode"/>
                  <ErrorMessage name="zipcode" class="error-feedback" />
                </div>

                <div class="form-group col-xs-12 col-md-6">
                  <label for="province" class="form-check-label">Provincia</label>
                  <p-autocomplete v-model="user.address.province" style="width: 100%;"
                                  :suggestions="provinces" @complete="searchProvinces($event)"
                                  :dropdown="true" placeholder="Buscar una..."
                  />
                </div>


                <!------------ ROLE_EMPLOYER STARTS-------------------------->
                <div class="form-group col-xs-12 col-md-6" v-if="user.role === 'ROLE_EMPLOYER'">
                  <label for="area" class="form-check-label">Categoria</label>
                  <p-autocomplete v-model="user.area" style="width: 100%"
                                  :suggestions="areas" @complete="searchAreas($event)"
                                  field="name" :dropdown="true" placeholder="Buscar una..."
                  />
                </div>

                <div class="form-group col-xs-12 col-md-6"  v-if="user.role === 'ROLE_EMPLOYER'">
                  <label for="website" class="form-check-label">Website</label>
                  <Field name="website" v-model="user.website" type="text" class="form-control"/>
                </div>

                <div class="form-group col-xs-12 col-md-6" v-if="user.role === 'ROLE_EMPLOYER'">
                  <label for="hasCompany" class="form-check-label">¿Es una emperesa?</label>
                  <br>
                  <div class="form-check form-check-inline">
                    <Field class="form-check-input" type="radio" name="hasCompany" id="true" v-bind:value=true v-model="user.hasCompany"/>
                    <label for="Sí">Sí</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <Field class="form-check-input" type="radio" name="hasCompany" id="false" v-bind:value=false v-model="user.hasCompany" />
                    <label for="No">No</label>
                  </div>
                  <ErrorMessage name="isCompany" class="error-feedback" />
                </div>

                <!------------ ROLE_EMPLOYER ENDS-------------------------->



                <!------------ ROLE_STUDENTS STARTS-------------------------->
                <div class="form-group col-xs-12 col-md-6" v-if="user.role === 'ROLE_STUDENT'">
                  <label for="birthday" class="form-check-label">Fecha de Nacimiento
                  </label>
                  <Field name="birthday" type="date" class="form-control" v-model="user.birthday"/>
                  <ErrorMessage name="birthday" class="error-feedback" />
                </div>

                <div class="form-group col-xs-12 col-md-6" v-if="user.role === 'ROLE_STUDENT'">
                  <label for="sex" class="form-check-label">Sexo</label>
                  <div class="form-check form-check-inline">
                    <Field  class="form-check-input" type="radio" name="sex" id="hombre"  value="Hombre" v-model="user.sex"/>
                    <label for="Hombre">Hombre</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <Field class="form-check-input" type="radio" name="sex" id="mujer" value="Mujer" v-model="user.sex"/>
                    <label for="Mujer">Mujer</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <Field class="form-check-input" type="radio" name="sex" id="otros" value="Otros" v-model="user.sex"/>
                    <label for="Otros">Otros</label>
                  </div>
                  <ErrorMessage name="sex" class="error-feedback" />
                </div>

                <div class="form-group col-xs-12 col-md-6" v-if="user.role === 'ROLE_STUDENT'">
                  <label for="university" class="form-check-label">Universidad</label>
                  <p-autocomplete v-model="user.university" style="width: 100%"
                                  :suggestions="universities" @complete="searchUniversities($event)"
                                  field="name" :dropdown="true" placeholder="Buscar una..."
                  />
                </div>

                <div class="form-group col-xs-12 col-md-6" v-if="user.role === 'ROLE_STUDENT'">
                  <label for="studentId">StudentId</label>
                  <Field name="studentId" type="text" class="form-control" v-model="user.studentId"/>
                  <ErrorMessage name="studentId" class="error-feedback" />
                </div>

                <div id="tinyMiceContainer" class="form-group col-xs-12 col-md-12">
                  <label for="description">Descripción</label>
                  <editor id="tinyMice" v-model="user.description" api-key="7fccrcdm3njk5afswfhbsg79b4mbtmilxpayi4tjaut3dpz5" :init="tinyConfig"/>

                  <ErrorMessage name="description" class="error-feedback" />
                </div>

                <div class="form-group col-xs-12 col-md-6" v-if="user.role === 'ROLE_STUDENT'">
                  <label for="jobPositions" class="form-check-label">Seleciona puestos de trabajos</label>
                  <p-autocomplete :multiple="true" v-model="user.jobPositions" :suggestions="jobPositions" @complete="searchJobPositions($event)" field="name"
                                  placeholder="Buscar categorias..."></p-autocomplete>
                </div>


                <div class="form-group col-xs-12 col-md-6" v-if="user.role === 'ROLE_STUDENT'">
                  <label for="hasCar" class="form-check-label">¿Tienes coche?</label>
                  <div class="form-check form-check-inline">
                    <Field class="form-check-input" type="radio" name="hasCar" id="true" v-bind:value=true v-model="user.hasCar"/>
                    <label for="Sí">Sí</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <Field class="form-check-input" type="radio" name="hasCar" id="false" v-bind:value=false v-model="user.hasCar" />
                    <label for="No">No</label>
                  </div>
                  <ErrorMessage name="hasCar" class="error-feedback" />
                </div>
                <!------------ ROLE_STUDENTS ENDS-------------------------->
                <div class="form-group  col-xs-12 col-md-6">
                  <button class="btn btn-primary btn-block" :disabled="loading" @click="updateProfile">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    Enviar
                  </button>
                </div>
                <div class="form-group  col-xs-12 col-md-6">
                  <router-link :to="'/profile/' + user.username" class="btn btn-primary btn-block"

                  style="border:none; margin-top: 20px; background-color: #7a7a7a !important;">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    Cancelar
                  </router-link >
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <div class="form-group col-xs-12 col-md-4">
        <div class="theme-form float-effect">
          <h4>Cambiar contraseña</h4>
            <div class="row">
              <div class="form-group col-xs-12 col-md-12">
                <label for="password" class="form-check-label">Nueva Contrseña</label>
                <Field name="password" v-model="pswd" type="text" class="form-control"/>
                <ErrorMessage name="password" class="error-feedback" />
              </div>

              <div class="form-group col-xs-12 col-md-12">
                <label for="passwordConfirm">Confirmar Contraseña</label>
                <Field name="passwordConfirm" v-model="pswdCon" type="text" class="form-control"/>
                <ErrorMessage name="passwordConfirm" class="error-feedback" />
              </div>

              <div class="form-group  col-xs-12 col-md-12">
                <button class="btn btn-primary btn-block" :disabled="loading" @click.prevent="resetPassword">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  Enviar
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>


<script>

import "smart-tagz/dist/smart-tagz.css";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import AuthenticationDataService from "../../services/AuthenticationDataService";
import Editor from '@tinymce/tinymce-vue'
import AutoComplete from 'primevue/autocomplete';
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'



export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
    Editor,
    'p-autocomplete': AutoComplete

  },
  data() {
    const schema = yup.object().shape({
      username: yup
          .string()
          .required("Username is required!")
          .min(3, "Must be at least 3 characters!")
          .max(20, "Must be maximum 20 characters!"),
      email: yup
          .string()
          .required("Email is required!")
          .email("Email is invalid!")
          .max(50, "Must be maximum 50 characters!"),
      password: yup
          .string()
          .required("Password is required!")
          .min(6, "Must be at least 6 characters!")
          .max(40, "Must be maximum 40 characters!"),
    });
    return {
      pswd: null,
      pswdCon: null,
      provinces: null,
      selectedProvinceEmployer: null,
      jobPositions: null,
      universities: null,
      areas: null,
      universitiesData :"",
      provincesData :"",
      successful: false,
      loading: false,
      ok: true,
      ko: true,
      message: "",
      user: {
        address: {
        },
        area:{},
        jobPositions:[]
      },
      schema,
      tinyConfig: {
        menubar: false,
      }
    };
  },
  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    },

    banner() {
      return (this.currentUser.role === 'ROLE_STUDENT') ? 'url(' + require('@/assets/banner_profile_student.jpg') + ')' : 'url(' + require('@/assets/banner_profile_employer.jpg') + ')';
    },
  },
  mounted() {
    this.loadProfile();


  },
  methods: {
    loadProfile(){
      AuthenticationDataService.loadProfile().then(
          (response) => {
            this.user = response.data
          },
          (error) => {
            this.courses =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },


    updateProfile() {
      this.message = "";
      this.successful = false;
      this.loading = true;
      AuthenticationDataService.updateProfile(this.user).then(
          (response) => {
            this.successful = true;
            this.loading = false;
            this.$notify({ type: "success",  text: response.data.message.toString()});
            this.$router.push("/profile/" + this.user.username);
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.successful = false;
            this.loading = false;
            this.$notify({ type: "error",  text: this.message});
          }
      );
    },

    resetPassword() {
      this.message = "";
      this.successful = false;
      this.loading = true;


      if(this.pswd !== this.pswdCon){
        this.$notify({ type: "error",  text: "Error: Los valores no coinciden. Introducir de nuevo."});
        this.loading = false;
        return
      }

      AuthenticationDataService.resetPassword(this.pswd, this.pswdCon).then(
          (response) => {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
            this.$notify({ type: "success",  text: response.data.message.toString()});
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.successful = false;
            this.loading = false;
            this.$notify({ type: "error",  text: this.message});
          }
      );
    },


    searchProvinces(event){
      AuthenticationDataService.getProvinces(event.query).then(
          (response) => {
            this.provinces = response.data
          },
      );
    },

    searchJobPositions(event){
      AuthenticationDataService.getJobPositions(event.query).then(
          (response) => {
            this.jobPositions = response.data
          },
      );
    },

    searchAreas(event){
      AuthenticationDataService.getAreas(event.query).then(
          (response) => {
            this.areas = response.data
          },
      );
    },

    searchUniversities(event){
      AuthenticationDataService.getUniversities(event.query).then(
          (response) => {
            this.universities = response.data
          },
      );
    },


  },
};
</script>

<style>

ul.p-autocomplete-items{
  color: black !important;
  background: rgba(255,255,255, 0.9) !important;
  padding: 5px;
}
li.p-autocomplete-item:hover{
  background: #4b4b4b;
  color: white !important;
  transition: 0.5s all;
}

li.p-autocomplete-token{
  margin-right: 5px;
}

.p-autocomplete-input-token input{
  border-bottom: 1px solid #ced4da;
}

input.p-autocomplete-input{
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
button.p-button-icon-only{
  margin-top: 1px!important;
  height: 35px!important;
  background-color: gray;
}

button.p-button-icon-only:hover {
  background-color: gray !important;
  opacity: 0.7 !important;
}

label {
  display: block;
  margin-top: 10px;
}


.error-feedback {
  color: red;
}
.tag-container {
  padding: 0.1rem !important;
}
input.p-inputtext{
  width: 100%;
}

</style>
