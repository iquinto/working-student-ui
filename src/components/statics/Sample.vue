<template>
  <div class="row theme-title">
    <div class="col-sm-12">
      <h1>Estudiantes</h1>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-4 p-2" >
      <h1> THIS ISA A SAMPLE</h1>
    </div>
  </div>
</template>


<script>

/*
import AuthenticationDataService from "../../services/AuthenticationDataService";
*/

export default {
  name: "Sample",

  data() {

    return {
      selectedProvince: "Seleciona una opción",
      given: Math.floor(Math.random() * 100),
      role: "",
      universities: "",
      provinces: "",
      categories: "",
      successful: false,
      loading: false,
      ok: true,
      ko: true,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
/*    AuthenticationDataService.getData().then(
        (response) => {
          console.log("RESPONSE >>"  + response.data.universities)
          console.log("RESPONSE >>"  + response.data.provinces)
          console.log("RESPONSE >>"  + response.data.categories)

          this.universities = response.data.universities;
          this.provinces = response.data.provinces
          this.categories = response.data.categories
        },
        (error) => {
          this.courses =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );*/

  },

};
</script>