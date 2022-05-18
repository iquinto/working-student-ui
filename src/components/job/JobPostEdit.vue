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
          <li class="breadcrumb-item">
            <router-link :to="'/job/show/' + currentJobId" class="inactive-link">
              Empleo
            </router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page"><span class="active-link">Editar</span></li>
        </ol>
      </nav>
      <h1> Editar  oferta
      </h1>
    </div>
  </div>

  <div v-if="!successful">
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <div class="theme-form float-effect">
          <Form @submit="updateJob" :validation-schema="schema" :initial-values="job">
            <div class="row">
              <div class="form-group col-xs-12 col-md-6">
                <label for="type" class="form-check-label">Categoria</label>
                <Field name="type" as="select" className="select is-fullwidth" v-model="job.type">
                  <option value="">Seleciona una</option>
                  <option value="temporary">Trabajo temporal</option>
                  <option value="internship">Becario</option>
                </Field>
                <ErrorMessage name="type" class="error-feedback" />
              </div>


              <div class="form-group col-xs-12 col-md-6">
                <label for="title">Titulo</label>
                <Field name="title" type="text" class="form-control" v-model="job.title"/>
                <ErrorMessage name="title" class="error-feedback" />
              </div>

              <div class="form-group col-xs-12 col-md-12" >
                <label for="requirements" class="form-check-label">Requisitos</label>
                <editor v-model="job.requirements" api-key="7fccrcdm3njk5afswfhbsg79b4mbtmilxpayi4tjaut3dpz5" :init="requirementsConfig"/>
                <ErrorMessage name="requirements" class="error-feedback" />
              </div>

              <div id="tinyMiceContainer" class="form-group col-xs-12 col-md-12">
                <label for="description">Descripción</label>
                <editor id="tinyMice" v-model="job.description" api-key="7fccrcdm3njk5afswfhbsg79b4mbtmilxpayi4tjaut3dpz5" :init="descriptionConfig"/>

                <ErrorMessage name="description" class="error-feedback" />
              </div>

              <div class="form-group col-xs-12 col-md-6">
                <label for="startDate" class="form-check-label">Fecha de incio</label>
                <Field name="startDate" type="date" class="form-control"  v-model="job.startDate"/>
                <ErrorMessage name="startDate" class="error-feedback" />
              </div>

              <div class="form-group col-xs-12 col-md-6">
                <label for="yearSalary" class="form-check-label">Salario anual (aprox)</label>
                <Field name="yearSalary" type="number" class="form-control" step="0.05"  v-model="job.yearSalary"/>
                <ErrorMessage name="yearSalary" class="error-feedback" />
              </div>

              <div class="form-group col-xs-12 col-md-6">
                <!--å
                <label for="category" class="form-check-label">Area</label>
                <Field name="category" as="select" className="select is-fullwidth" v-model="job.category.id">
                  <option value="">Seleciona una</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.name}}</option>
                </Field>
                <ErrorMessage name="category" class="error-feedback" />
-->
                <label for="category" class="form-check-label">Categoria</label>
                <p-autocomplete v-model="selectedCategory"
                                :suggestions="categories" @complete="searchCategories($event)"
                                @item-select="selectCategory($event)" field="name"  placeholder="Buscar una..."
                />

              </div>

              <div class="form-group col-xs-12 col-md-6">
                <label for="expiration" >Validez de la oferta</label>
                <Field name="expiration" type="date" class="form-control" v-model="job.expiration"/>
                <ErrorMessage name="expiration" class="error-feedback" />
              </div>



              <div class="form-group  col-xs-12 col-md-12 jp-btns">
                <button id="on-edit-send" class="btn btn-primary " :disabled="loading">
                <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                ></span>
                  Enviar
                </button>
                <router-link :to="'/job/show/' + currentJobId" class="btn btn-secondary">
                  Cancelar
                </router-link>
              </div>
              <div v-if="message" class="alert alert-danger">
                {{ message }}
              </div>

            </div>
          </Form>
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
import JobPostDataService from "../../services/JobPostDataService";
import Editor from '@tinymce/tinymce-vue'
import moment from "moment";
import AutoComplete from 'primevue/autocomplete';
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'


export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
    'p-autocomplete': AutoComplete,
    Editor
  },
  data() {
    const schema = yup.object().shape({
      type: yup
          .string()
          .required("Campo obligatorio!"),
      title: yup
          .string()
          .required("Campo obligatorio!"),
      startDate: yup
          .date()
          .required("Campo obligatorio!"),
      yearSalary: yup
          .number()
          .required("Campo obligatorio!"),
      expiration: yup
          .date()
          .required("Campo obligatorio!"),

    });
    return {
      selectedProvince: "Seleciona una opción",
      selectedCategory: null,
      categories: [],
      successful: false,
      loading: false,
      job: {
        category: {}
      },
      requirementsConfig: {
        menubar: false,
        name: "requirements"
      },
      descriptionConfig: {
        menubar: false,
        name: "description"
      },
      ok: true,
      ko: true,
      message: "",
      schema,
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


  },
  mounted() {
    this.show()

  },
  methods: {

    show(){
      JobPostDataService.show(this.currentJobId).then(
          (response) => {
            this.job = response.data
            this.job.startDate = this.formatDate(response.data.startDate)
            this.job.expiration = this.formatDate(response.data.expiration)
            this.selectedCategory = response.data.category
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


    formatDate(value){
      if(value === null)
        return null
      else
        return moment(value).format('YYYY-MM-DD')
    },

    updateJob(jobPost) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      jobPost.id = this.currentJobId
      jobPost.requirements = this.job.requirements
      jobPost.description = this.job.description
      jobPost.category =  this.selectedCategory.id
      JobPostDataService.update(jobPost).then(
          (response) => {
            this.successful = true;
            this.loading = false;
            this.$notify({ type: "success",  text: "Se ha actualizado correctamente!" });
            this.$router.push("/job/show/"+ response.data.id);
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

    searchCategories(event){
      AuthenticationDataService.getAreas(event.query).then(
          (response) => {
            this.categories = response.data
          },
      );
    },

    selectCategory(){
      console.log("requesting: "+JSON.stringify(this.selectedCategory));
    },


  },
};
</script>

<style scoped>
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

.jp-btns{
  margin: 0 auto;
  text-align: center;
}
.jp-btns button{
  width: 40% !important;
  margin-top: 10px !important;
  margin-right: 10px;
}

.jp-btns a{
  width: 40% !important;
  margin-top: 10px !important;
}
</style>
