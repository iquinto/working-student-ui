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
          <li class="breadcrumb-item" aria-current="page"><span class="active-link">Registro</span></li>
        </ol>
      </nav>
      <div class="col-sm-12">
        <h1 v-if="!successful">Registrar como empresa</h1>
      </div>
    </div>
  </div>

  <div class="row" v-if="!successful">
    <div class="col-md-8">
      <div class="card  float-effect">
        <div class="theme-form" style="background-color: #FFFFFF">
          <Form @submit="handleRegister" :validation-schema="schema">
            <div class="row">
              <Field name="role" type="hidden" class="form-control" value="ROLE_EMPLOYER"/>

              <div class="form-group col-xs-12 col-md-6">
                <label for="name" class="form-check-label">Nombre</label>
                <Field id="name" name="name" type="text" class="form-control"/>
                <ErrorMessage name="name" class="error-feedback" />
              </div>
              <div class="form-group col-xs-12 col-md-6">
                <label for="surname">Apellido/os</label>
                <Field id="surname" name="surname" type="text" class="form-control"/>
                <ErrorMessage name="surname" class="error-feedback" />
              </div>
              <div class="form-group col-xs-12 col-md-6">
                <label for="username" class="form-check-label">Usuario</label>
                <Field id="username" name="username" type="text" class="form-control"/>
                <ErrorMessage name="username" class="error-feedback" />
              </div>

              <div class="form-group col-xs-12 col-md-6">
                <label for="password" class="form-check-label">Contraseña</label>
                <Field id="password" name="password" type="password" class="form-control"/>
                <ErrorMessage name="password" class="error-feedback" />
              </div>

              <div class="form-group col-xs-12 col-md-6">
                <label for="phone" class="form-check-label">Teléfono</label>
                <Field id="phone" name="phone" type="text" class="form-control"/>
                <ErrorMessage name="phone" class="error-feedback" />
              </div>

              <div class="form-group col-xs-12 col-md-6">
                <label for="email" class="form-check-label">Email</label>
                <Field id="email" name="email" type="email" class="form-control"/>
                <ErrorMessage name="email" class="error-feedback" />
              </div>

              <div class="form-group col-xs-12 col-md-12" >
                <label for="description">Descripción</label>
                <editor id="description" placeholder="Breve descripción" v-model="tinyDesc" api-key="7fccrcdm3njk5afswfhbsg79b4mbtmilxpayi4tjaut3dpz5" :init="tinyConfig"/>
                <!--
                <Field
                    name="description"
                    as="textarea"
                    className="textarea"
                    class="form-control"
                    v-model="tinyDesc"
                    style="display: none"
                />
                <ErrorMessage name="description" class="error-feedback" />
                -->
              </div>

              <div class="form-group col-xs-12 col-md-6">
                <label for="street">Direción</label>
                <Field id="street" name="street" type="text" class="form-control"/>
                <ErrorMessage name="address" class="error-feedback" />
              </div>

              <div class="form-group col-xs-12 col-md-6">
                <label for="city" class="form-check-label">Cuidad</label>
                <Field id="city" name="city" type="text" class="form-control"/>
                <ErrorMessage name="city" class="error-feedback" />
              </div>

              <div class="form-group col-xs-12 col-md-6">
                <label for="zipcode" class="form-check-label">Codigo Postal</label>
                <Field id="zipcode" name="zipcode" type="text" class="form-control"/>
                <ErrorMessage name="zipcode" class="error-feedback" />
              </div>

              <div  id="label-province" class="form-group col-xs-12 col-md-6">
                <label for="province" class="form-check-label">Provincia</label>
                <p-autocomplete id="province" v-model="selectedProvince"
                                :suggestions="provinces" @complete="searchProvinces($event)"
                                @item-select="selectProvince($event)" :dropdown="true" placeholder="Buscar una..."
                />
              </div>


              <div id="label-area" class="form-group col-xs-12 col-md-6">
                <label  for="area" class="form-check-label">Categoria</label>
                <p-autocomplete id="area" v-model="selectedArea"
                                :suggestions="areas" @complete="searchAreas($event)"
                                @item-select="selectArea($event)" field="name" :dropdown="true" placeholder="Buscar una..."
                />
              </div>

              <div class="form-group col-xs-12 col-md-6">
                <label for="website" class="form-check-label">Website</label>
                <Field id="website" name="website" type="text" class="form-control"/>
              </div>

              <div class="form-group col-xs-12 col-md-6" >
                <label for="hasCompany" class="form-check-label">¿Es una empresa?</label>
                <br>
                <div class="form-check form-check-inline">
                  <Field id="hasCompanyYes" class="form-check-input" type="radio" name="hasCompany" value=true />
                  <label for="hasCompanyYes">Sí</label>
                </div>
                <div class="form-check form-check-inline">
                  <Field id="hasCompanyNo" class="form-check-input" type="radio" name="hasCompany" value=false />
                  <label for="hasCompanyNo">No</label>
                </div>
                <br>
                <ErrorMessage name="hasCompany" class="error-feedback" />
              </div>


              <div v-if="message" class="form-group  col-md-12">
                <div class="alert alert-danger">
                  {{ message }}
                </div>
              </div>

              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-6">
                    <button id="registr-btn" class="btn btn-primary btn-block" :disabled="loading">
                    <span v-show="loading"  class="spinner-border spinner-border-sm"
                    ></span>
                      Enviar
                    </button>
                  </div>
                  <div class="col-md-6">
                    <router-link :to="'/home/'" class="btn btn-primary btn-block"  style="border:none; margin-top: 20px; background-color: #7a7a7a !important;">
                      Cancelar
                    </router-link >
                  </div>
                </div>
              </div>

            </div>
          </Form>
        </div>


      </div>
    </div>

    <div class="col-md-4">
      <div class="card float-effect extra-info">
        <h6>¿Ya tienes una cuenta?</h6>
        <router-link to="/login">Ingresa a tu cuenta aqui.</router-link>
        <h6>¿Eres un estudiante?</h6>
        <router-link to="/register/student">Registrarse como estudiante.</router-link>
      </div>
    </div>
  </div>

</template>


<script>

import "smart-tagz/dist/smart-tagz.css";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import AuthenticationDataService from "../../services/AuthenticationDataService";
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import AutoComplete from 'primevue/autocomplete';
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import Editor from '@tinymce/tinymce-vue'

export default {
  name: "Register",
  components: {
    Form,
    Field,
    Editor,
    ErrorMessage,
    'p-autocomplete': AutoComplete
  },
  data() {
    const schema = yup.object().shape({
      name: yup
          .string()
          .required("Campo obligatorio!"),
      username: yup
          .string()
          .required("Campo obligatorio!")
          .min(3, "Debe tener como mínimo 3 caracteres!")
          .max(20, "Debe tener un máximo de 20 caracteres!"),
      email: yup
          .string()
          .required("Campo obligatorio!")
          .email("Email is invalid!"),
      password: yup
          .string()
          .required("Campo obligatorio!")
          .min(6, "Debe tener como mínimo 6 caracteres!")
          .max(40, "Debe tener un máximo de 40 caracteres!"),
      phone: yup
          .string()
          .required("Campo obligatorio!"),
      city: yup
          .string()
          .required("Campo obligatorio!"),
      zipcode: yup
          .string()
          .required("Campo obligatorio!")
          .min(5, "Debe tener al menos 5 caracteres!")
          .max(5, "Debe tener un máximo de 5 caracteres!"),
      hasCompany: yup
          .string()
          .required("Campo obligatorio!"),


    });
    return {
      given: Math.floor(Math.random() * 100),
      role: "",
      provinces: null,
      selectedProvince: null,
      areas: null,
      selectedArea: null,
      successful: false,
      loading: false,
      ok: true,
      ko: true,
      message: "",
      schema,
      tinyDesc: "",
      tinyConfig: {
        menubar: false,
        name: "description"
      }
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    banner() {
      return 'url(' + require('@/assets/banner_register.jpg') + ')'
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile/" + this.$store.state.auth.user.username);
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      user.area = this.selectedArea.id
      user.description = this.tinyDesc // inject description
      user.province = this.selectedProvince
      this.$store.dispatch("auth/register", user).then(
          (response) => {
            this.successful = true;
            this.loading = false;
            this.$notify({ type: "success",  text: response.message.toString() + " Iniciar la sessión para continuar."});
            this.$router.push("/login");
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

    searchProvinces(event){
      AuthenticationDataService.getProvinces(event.query).then(
          (response) => {
            this.provinces = response.data
          },
      );
    },

    selectArea(){
      console.log("requesting: "+JSON.stringify(this.selectedArea));
    },

    selectProvince(){
      console.log("requesting: "+JSON.stringify(this.selectedProvince));
    }
  },
};
</script>

<style >

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
span.p-inputwrapper{
  width: 100%;
}

button.p-button-icon-only {
  margin-top: 1px !important;
  height: 35px !important;
  background-color: gray;
}

button.p-button-icon-only:hover {
  background-color: gray !important;
  opacity: 0.7 !important;
}

</style>
