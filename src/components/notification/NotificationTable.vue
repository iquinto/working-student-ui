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
          <li class="breadcrumb-item" aria-current="page"><span class="active-link">Notificaciones</span></li>
        </ol>
      </nav>
      <h1> Notificaciones
      </h1>
    </div>
  </div>


  <div class="container">
    <div class="row">
      <div class="col-md-1"></div>

      <div class="col-md-10">
        <div class="card notification-card" style="width: 100%; padding: 0px 30px">
          <div class="card-body">

            <table class="table">
              <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Asunto</th>
                <th scope="col">Origen</th>
                <th scope="col">Fecha</th>
                <th scope="col">Acción</th>
              </tr>
              </thead>
              <tbody>
              <tr  v-for="notification in notifications"
                   :key="notification.id"
                   :class="!notification.read ? 'unread' : null">
                <td><font-awesome-icon
                    v-bind:icon="notification.icon"
                    class="icon icon-table"
                    :style="{ color: notification.color}"/>
                </td>
                <td>
                   {{(notification.subject).charAt(0).toUpperCase() + (notification.subject).slice(1)}}
                </td>
                <td>
                  {{notification.origin.name}}  {{notification.origin.surname}}
                </td>
                <td>
                  {{notification.created}}
                </td>

                <td>
                  <router-link data-not-link="item" :to="{name: 'notificationShow', params: {id:notification.id, source:'table' },
                  props: { source: 'table' }}"
                      @click="!notification.read ? markAsRead(notification.id) : null" >
                    <font-awesome-icon icon="eye" class="icon icon-table" :style="{color: !notification.read ? '#d2232a' : 'black' }" />
                  </router-link>
                </td>

              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-1"></div>

    </div>
  </div>

</template>

<script>
import NotificationDataService from "../../services/NotificationDataService";
import moment from "moment";


export default {
  name: 'NotificationTable',
  data() {
    return {
      total: 0,
      notifications: [],
      timer: ''
    };
  },
  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    }
  },

  created () {
    this.fetchNotificationListAll();
    if(this.currentUser) this.timer = setInterval(this.fetchNotificationListAll, 300000);
  },

  mounted() {
    console.log("HOLA>>> "  + this.$refs['myid'])
  },

  methods:{

    format_date(value){
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
    },

    fetchNotificationListAll(){
      console.log("[NotificationList: list] loading ")
      NotificationDataService.listNotifications(1).then(
          (response) => {
            console.log("[NotificationList: list] response " + response.data)
            this.notifications = response.data
            this.total  = response.data.length
            console.log("[NotificationList: list] response " + this.notifications.length)
          },
          (error) => {
            this.loading = false;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.showTransaction = false;
          }
      )
    },

    markAsRead(id){
      NotificationDataService.markAsRead(id).then(
          (response) => {
            console.log(response)
            this.emitter.emit('my-event');
          },
          (error) => {
            this.loading = false;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.showTransaction = false;
          }
      )
    }

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

.unread{
  color: black !important;
  font-weight: 700;

}

.read{
  color : #5a5a5a !important;
}

</style>