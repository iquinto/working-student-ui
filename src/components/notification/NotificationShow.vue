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
            <router-link :to="'/profile/' + currentUser.username" class="inactive-link">
              Mi perfil
            </router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page"><span class="active-link">Notificación</span></li>
        </ol>
      </nav>
      <h1> Notificación
      </h1>
    </div>
  </div>


  <div class="container">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class="card notification-card" style="width: 100%; padding: 0px 30px">
          <div class="card-body">
            <p style="margin-bottom: 25px; font-size: 18px">
              Aviso de  <span style="font-weight: bolder; color: #b82e24; ">{{notification.subject}} </span> por parte de
              <span style="font-weight: bolder; color: #b82e24; ">{{notification.origin.name}} {{ notification.origin.surname}}</span>
            sobre los siguentes horarios:
            </p>

            <table class="table table-striped reservation-table">
              <thead>
              <tr>
                <th scope="col">Dia</th>
                <th scope="col">Inicio</th>
                <th scope="col">Fín</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="slot in notification.slots" :key="slot.id">
               <td>{{slot.day}}</td>
                <td>{{formatDouble(slot.startTime)}}</td>
                <td>{{formatDouble(slot.endTime)}}</td>
              </tr>
              </tbody>
            </table>

          <p>Puede ponerse en contacto a los sigunetes datos:</p>
          <p><font-awesome-icon icon="phone" style="color: #b82e24; margin-right: 10px"/> {{notification.origin.phone}}</p>
          <p><font-awesome-icon icon="envelope" style="color: #b82e24; margin-right: 10px"/> {{notification.origin.email}}</p>

          <div class="notification-links">
              <router-link id="delete-notification-btn" to="#" type="button" class="btn btn-primary bg-red" @click="deleteNotification">Eliminar</router-link>
              <router-link v-if="currentSource === 'table'" :to="'/notification/list'" type="button" class="btn btn-secondary">Cancelar</router-link>
              <router-link v-else :to="'/profile/' + currentUser.username" type="button" class="btn btn-secondary">Cancelar</router-link>
          </div>

          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>

</template>

<script>
import NotificationDataService from "../../services/NotificationDataService";
import moment from "moment";


export default {
  name: 'NotificationShow',
  data() {
    return {
      notification: {
        origin: {},
        destination: {},
        slots: {},
      },

      sced:{},

    }
  },

  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    },

    currentId() {
      return this.$route.params.id;
    },

    banner() {
      return 'url(' + require('@/assets/banner_notification.jpg') + ')'
    },

    currentSource() {
      return this.$route.params.source;
    },
  },

  mounted() {
    //this.getNotification(this.currentId);
  },

  watch: {
    // call the method if the route changes
    '$route': {
      handler: 'getNotification',
      immediate: true // runs immediately with mount() instead of calling method on mount hook
    }
  },


  methods: {
    format_date(value){
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
    },

    formatDouble(input){
      return (input.toFixed(2)).toString().replace('.', ':')
    },

    getNotification(){
      if(this.$route.params.id !== undefined){
        NotificationDataService.show(this.$route.params.id).then(
            (response) => {
              this.notification = response.data
            },
            (error) => {
              this.loading = false;
              this.message =
                  (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                  error.message ||
                  error.toString();
             // this.$notify({ type: "warn",  text: error});
            }
        )
      }

    },

    deleteNotification(){
      NotificationDataService.delete(this.$route.params.id).then(
          (response) => {
            this.$router.push("/notification/list" );
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
            this.$notify({ type: "warn",  text: error});
          }
      )
    },

    capitalize(day){
      let str = day.toString().toLowerCase()
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    getTranslation(str){
      if(str === "delete" ){
        return "baja";
      } else if(str === "save" ){
        return "alta";
      } else if(str === "edit" ){
        return "modificación";
      }  else {
        return str
      }
    },
  }
};
</script>

<style>
.notification-card span{
  text-align: center;
}
.notification-links{
  text-align: center !important;
}

.notification-links a{
  margin: 5px;
}
.bg-red{
  background-color: #d2232a !important;
  border: none !important;
}

.bg-red:hover{
  opacity: 0.8;
}


.justify-text{
  text-align: justify !important;
}
.list-group-item{
  border:  none !important;
}

</style>