<template>
  <div class="row theme-title">
    <div class="col-sm-12">
      <h1 v-if="!successful">Publicar una oferta de trabajo</h1>
    </div>
  </div>



  <div v-if="!successful">
    <div class="row">
      <div class="col-xs-12 col-md-12">
        <div class="theme-form float-effect">
          <Form @submit="createJobPost" :validation-schema="schema">
            <div class="row">
              <div class="form-group col-xs-12 col-md-6">
                <label for="type" class="form-check-label">Tipo</label>
                <Field name="type" as="select" className="select is-fullwidth" >
                  <option value="">Seleciona una</option>
                  <option value="temporary">Trabajo temporal</option>
                  <option value="internship">Becario</option>

                </Field>
                <ErrorMessage name="type" class="error-feedback" />
              </div>


              <div class="form-group col-xs-12 col-md-6">
                <label for="title">Titulo</label>
                <Field name="title" type="text" class="form-control"/>
                <ErrorMessage name="title" class="error-feedback" />
              </div>

              <div class="form-group col-xs-12 col-md-12" >
                <label for="requirements" class="form-check-label">Requisitos</label>
                <editor id="requirements" placeholder="Requisitos"  v-model="tinyRequirements" api-key="7fccrcdm3njk5afswfhbsg79b4mbtmilxpayi4tjaut3dpz5" :init="requirementsConfig"/>
                <ErrorMessage name="requirements" class="error-feedback" />
              </div>

              <div class="form-group col-xs-12 col-md-12" >
                <label for="description" class="form-check-label">Descripción</label>
                <editor id="description" placeholder="Breve descripción"  v-model="tinyDescription" api-key="7fccrcdm3njk5afswfhbsg79b4mbtmilxpayi4tjaut3dpz5" :init="descriptionConfig"/>
                <ErrorMessage name="description" class="error-feedback" />
              </div>


              <div class="form-group col-xs-12 col-md-6">
                <label for="startDate" class="form-check-label">Fecha de incorporación</label>
                <Field name="startDate" type="date" class="form-control"/>
                <ErrorMessage name="startDate" class="error-feedback" />
              </div>

              <div class="form-group col-xs-12 col-md-6">
                <label for="yearSalary" class="form-check-label">Salario anual (aprox)</label>
                <Field name="yearSalary" type="number" class="form-control" step="0.05"/>
                <ErrorMessage name="yearSalary" class="error-feedback" />
              </div>

              <div for="category" id="label-area" class="form-group col-xs-12 col-md-6">
                <label for="category" class="form-check-label">Categoria</label>
                <p-autocomplete id="category" v-model="selectedCategory" :dropdown="true"
                                :suggestions="categories" @complete="searchCategories($event)"
                                @item-select="selectCategory($event)" field="name"  placeholder="Buscar una..."
                />
              </div>

              <div class="form-group col-xs-12 col-md-6">
                <label for="expiration" >Validez de la oferta</label>
                <Field name="expiration" type="date" class="form-control"/>
                <ErrorMessage name="expiration" class="error-feedback" />
              </div>



              <div class="form-group  col-xs-12 col-md-12">
                <button id="create-jpt-btn" class="btn btn-primary btn-block" :disabled="loading">
                <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                ></span>
                  Enviar
                </button>
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
      categories: null,
      selectedCategory: null,
      selectedCategories: null,
      successful: false,
      loading: false,
      tinyRequirements:"",
      tinyDescription: "",
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
  },
  mounted() {
  },
  methods: {

    createJobPost(jobPost) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      jobPost.requirements = this.tinyRequirements
      jobPost.description = this.tinyDescription
      jobPost.category =  this.selectedCategory.id
      JobPostDataService.save(jobPost).then(
          (response) => {
            this.successful = true;
            this.loading = false;
            this.$notify({ type: "success",  text: "Se ha guardado correctamente!" });
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

</style>
