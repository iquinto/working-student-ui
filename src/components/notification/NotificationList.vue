<template>
  <div class="dropdown" style="float: left; padding: 13px 13px 0px 0px">
    <router-link to="#" onclick="return false;" role="button" data-toggle="dropdown" id="dropdownMenu3" data-target="#" style="float: left" aria-expanded="true">
      <font-awesome-icon icon="bell" class="icon" style="font-size: 20px; float: left; color: black" title="Notificaciones"/>
    </router-link>
    <span class="badge badge-danger" ref="myid" v-if="total > 0">{{total}}</span>
    <ul class="dropdown-menu dropdown-menu-left pull-right" role="menu" aria-labelledby="dropdownMenu3" v-if="total > 0">
      <li role="presentation" class="presentation">
        <h4>Notificaciones</h4>
      </li>
      <li>
        <router-link :to="'/notification/list/'" style=" font-size: 13px; margin-top: 10px; padding:0px!important;  line-height: 0!important;" id="list-all-btn" >
          <font-awesome-icon icon="eye" style="color: #b82e24"/> Ver todas
        </router-link>

      </li>
      <ul class="timeline timeline-icons timeline-sm" style="margin:10px;width:150px" id="not-list">
        <li v-for="notification in notifications" :key="notification.id" data-notification="item">
          <p>
            <span><router-link :to="'/notification/show/' + notification.id"  class="not-link" @click="markAsRead(notification.id)">Aviso de {{notification.subject}}</router-link></span>
            <span class="timeline-icon"><font-awesome-icon v-bind:icon="notification.icon" class="icon" :style="{ color: notification.color}"/></span>
            <span class="timeline-date not-date">fecha: {{notification.created}}</span>
          </p>
        </li>
      </ul>
    </ul>
  </div>
</template>


<script>

import NotificationDataService from "../../services/NotificationDataService";
import moment from 'moment'

export default {
  name: "NotificationList",
  components: {
  },
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
    this.emitter.on('my-event', () => {
      this.fetchNotificationList()
    })
    this.fetchNotificationList();
    if(this.currentUser) this.timer = setInterval(this.fetchNotificationList, 300000);
  },

  mounted() {

  },

  methods:{

    format_date(value){
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
    },

    fetchNotificationList(){
      console.log("[NotificationList: list] loading ")
      NotificationDataService.listNotifications(0).then(
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
            this.fetchNotificationList()
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




<style scoped>
/* -----------------------------------------
   Timeline
----------------------------------------- */
.timeline {
  list-style: none;
  padding-left: 0;
  position: relative;
}
.timeline:after {
  content: "";
  height: auto;
  width: 1px;
  background: #e3e3e3;
  position: absolute;
  top: 5px;
  left: 30px;
  bottom: 25px;
}
.timeline.timeline-sm:after {
  left: 12px;
}
.timeline li {
  position: relative;
  padding-left: 70px;
  margin-bottom: 20px;
}
.timeline li:after {
  content: "";
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e3e3e3;
  position: absolute;
  left: 24px;
  top: 5px;
}



.timeline li .timeline-date {
  display: inline-block;
  width: 100%;
  color: #a6a6a6;
  font-style: italic;
  font-size: 13px;
}
.timeline.timeline-icons li {
  padding-top: 7px;
}
.timeline.timeline-icons li:after {
  width: 32px;
  height: 32px;
  background: #fff;
  border: 1px solid #e3e3e3;
  left: 14px;
  top: 0;
  z-index: 11;
}
.timeline.timeline-icons li .timeline-icon {
  position: absolute;
  left: 23.5px;
  top: 7px;
  z-index: 12;
}
.timeline.timeline-icons li .timeline-icon [class*=glyphicon] {
  top: -1px !important;
}
.timeline.timeline-icons.timeline-sm li {
  padding-left: 40px;
  margin-bottom: 10px;
}
.timeline.timeline-icons.timeline-sm li:after {
  left: -5px;
}
.timeline.timeline-icons.timeline-sm li .timeline-icon {
  left: 4.5px;
}
.timeline.timeline-advanced li {
  padding-top: 0;
}
.timeline.timeline-advanced li:after {
  background: #fff;
  border: 1px solid #29b6d8;
}
.timeline.timeline-advanced li:before {
  content: "";
  width: 52px;
  height: 52px;
  border: 10px solid #fff;
  position: absolute;
  left: 4px;
  top: -10px;
  border-radius: 50%;
  z-index: 12;
}
.timeline.timeline-advanced li .timeline-icon {
  color: #29b6d8;
}
.timeline.timeline-advanced li .timeline-date {
  width: 75px;
  position: absolute;
  right: 5px;
  top: 3px;
  text-align: right;
}
.timeline.timeline-advanced li .timeline-title {
  font-size: 17px;
  margin-bottom: 0;
  padding-top: 5px;
  font-weight: bold;
}
.timeline.timeline-advanced li .timeline-subtitle {
  display: inline-block;
  width: 100%;
  color: #a6a6a6;
}
.timeline.timeline-advanced li .timeline-content {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-right: 70px;
}
.timeline.timeline-advanced li .timeline-content p {
  margin-bottom: 3px;
}
.timeline.timeline-advanced li .timeline-content .divider-dashed {
  padding-top: 0px;
  margin-bottom: 7px;
  width: 200px;
}
.timeline.timeline-advanced li .timeline-user {
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
}
.timeline.timeline-advanced li .timeline-user:before,
.timeline.timeline-advanced li .timeline-user:after {
  content: " ";
  display: table;
}
.timeline.timeline-advanced li .timeline-user:after {
  clear: both;
}
.timeline.timeline-advanced li .timeline-user .timeline-avatar {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  float: left;
  margin-right: 10px;
}
.timeline.timeline-advanced li .timeline-user .timeline-user-name {
  font-weight: bold;
  margin-bottom: 0;
}
.timeline.timeline-advanced li .timeline-user .timeline-user-subtitle {
  color: #a6a6a6;
  margin-top: -4px;
  margin-bottom: 0;
}
.timeline.timeline-advanced li .timeline-link {
  margin-left: 5px;
  display: inline-block;
}
.timeline-load-more-btn {
  margin-left: 70px;
}
.timeline-load-more-btn i {
  margin-right: 5px;
}


/* -----------------------------------------
   Dropdown
----------------------------------------- */
.dropdown-menu{
  padding:0 0 0 0;
}
a.dropdown-menu-header {
  background: #f7f9fe;
  font-weight: bold;
  border-bottom: 1px solid #e3e3e3;
}
.dropdown-menu > li a {
  padding: 10px 20px;
}

/* -----------------------------------------
   Badge
----------------------------------------- */

.badge{
  padding: 3px 5px 2px;
  position: absolute;
  top: 8px;
  right: 5px;
  display: inline-block;
  min-width: 10px;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  line-height: 1;
  vertical-align: baseline;
  white-space: nowrap;
  text-align: center;
  border-radius: 10px;
}
.badge-danger {
  background-color: #db5565;
}

.presentation h4{
  padding: 10px 0px 7px 0pc;
  margin-bottom: 0px;
  font-size: 15px;
}

.not-link{
  padding: 0px !important;
  font-size: 12px;
  line-height: 15px;
  height: auto;
}
.not-date{
  font-size: 10px !important;
}


</style>

