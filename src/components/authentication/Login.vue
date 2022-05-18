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
          <li class="breadcrumb-item" aria-current="page"><span class="active-link">Entrar</span></li>
        </ol>
      </nav>
      <h1>Iniciar sesión</h1>
    </div>
  </div>

  <div class="row">
    <div class="col-md-8">
      <div class="card  float-effect">

        <div class="theme-form " style="background-color: #FFFFFF">
          <Form @submit="handleLogin" :validation-schema="schema">
            <div class="form-group">
               <label for="username"  class="form-check-label">Usuario</label>
               <Field id="username" name="username" type="text" class="form-control"/>
                <ErrorMessage name="username" class="error-feedback" />
            </div>
<!--
            <div class="form-group">
              <label for="username" class="form-check-label">Usuario</label>
              <Field name="username" as="select" className="select is-fullwidth" >
                <option value="" selected> Select user [Test Login]</option>

                <option value="test_employer1">test_employer1</option>
                <option value="test_student1">test_student1</option>
                <option value="test_student2">test_student2</option>
                <option value="test_student3">test_student3</option>
              </Field>
              <ErrorMessage name="username" class="error-feedback" />
            </div>
-->
            <div class="form-group">
              <label for="password" class="form-check-label">Contraseña</label>
              <Field id="password" name="password" type="password" class="form-control"/>
              <ErrorMessage name="password" class="error-feedback" />
            </div>

            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
              </div>
            </div>

            <div class="form-group">
              <div class="row">
                <div class="col-md-6">
                  <button id="login-btn" class="btn btn-primary btn-block" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm" ></span>
                    <span>Login</span>
                  </button>
                </div>
                <div class="col-md-6">
                  <router-link :to="'/home/'" class="btn btn-primary btn-block"  style="border:none; margin-top: 20px; background-color: #7a7a7a !important;">
                  Cancelar
                </router-link >
                </div>
              </div>
            </div>
          </Form>
        </div>

      </div>

    </div>
    <div class="col-md-4">
      <div class="card float-effect extra-info">
        <h6>¿Aún no tienes una cuenta?</h6>
        <router-link to="/register/student">Registrarse como estudiante.</router-link>
        <router-link to="/register/employer">Registrarse como empresa.</router-link>
      </div>
    </div>
  </div>


</template>


<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      role : "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    banner() {
      return 'url(' + require('@/assets/banner_login.jpg') + ')'
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile/" + this.$store.state.auth.user.username);
    }

  },
  methods: {
    handleLogin(user) {
      console.log("[Login: handleLogin] starts " + user.username)
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
          (user) => {
            console.log("[Login: handleLogin] starts " + user.role)
            this.role = user.role
            this.$notify({ type: "success",  text: "Se ha iniciado la sessión correctamente."});

            this.$router.push("/profile/" + user.username)
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
      );
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
</style>
