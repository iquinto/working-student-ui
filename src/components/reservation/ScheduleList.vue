<template>
  <div class="row">
    <div class="col-sm-12 profile-card">
      <div class="card float-effect">
        <div class="card-header">
          <h2>Disponibilidad</h2>
        </div>
        <div class="card-body">
          <div class="row no-gutters"  style="margin-left: 10px" id="personal-schedule" >
            
              <div class="col" v-for="(value, key) in items" :key="key">
                <h3>{{key.toUpperCase()}}</h3>
                <ul class="list-group" >
                  <li class="list-group-item" style="border: none" v-for="slot in value" :key="slot.id">
                    <router-link to="#" type="button" :class="getClass(slot.id)"
                       @click="notify"
                       :style="(currentUser.role === 'ROLE_STUDENT' && currentUser.username !== paramuser) ? 'pointer-events: none' : ''">
                      {{formatDouble(slot.startTime)}} - {{formatDouble(slot.endTime)}}
                    </router-link>
                  </li>
                </ul>
              </div>

          </div>
        </div>
        <div class="card-footer">
        <span v-if="currentUser.role === 'ROLE_STUDENT' && currentUser.username === paramuser">
          <router-link :to="'/schedule/' + paramuser +'/edit'"
                       style="color: white; margin: 2px; background-color: #d2232a !important;"
                       id="edit-schedule-button"
                       class="btn agenda-button" >
             {{hasSchedules ? 'Editar' : 'Definir' }} horarios
          </router-link>
        </span>
        <span v-if="currentUser.role === 'ROLE_EMPLOYER'">
          <router-link :to="'/reservation/' + paramuser +'/contract'"
                       style="color: white; margin: 2px; background-color: #d2232a !important;"
                       id="reserve-schedules-btn"
                       class="btn  agenda-button" >
             Reservar horarios
          </router-link>
          <router-link :to="'/profile/' + currentUser.username" style="color: white; background: gray !important;" class="btn  agenda-button" >
             Cancelar
          </router-link>
        </span>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import ScheduleDataService from "../../services/ScheduleDataService";

export default {
  name: "ScheduleList",
  props: {
    username: String
  },
  data() {
    return {
      defaultClass: 'personal-checkbox-student',
      schedules: [],
      items:[],
      user: "",
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
      hasSchedules: false
    };
  },
  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    },

    paramuser(){
      return this.$route.params.username
    }
  },
  mounted() {
   /* this.listAllReservations(this.$route.params.username);*/
    this.listSlotsByDay();
    this.listSchedules(this.$route.params.username)
  },

  methods:{
    listSlotsByDay(username){
      console.log("[ReservationList: listByUserName] starts " + username)
      ScheduleDataService.listSlotsByDay().then(
          (response) => {
            this.items = response.data
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

    listSchedules(username){
      console.log("[ReservationList: listSchedules] starts " )
      ScheduleDataService.listSchedules(username).then(
          (response) => {
            console.log("[ReservationList: listSchedules] response " + response.data)
            this.schedules = response.data
            this.hasSchedules = response.data.length > 0
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

    getClass(slotId){
      let res = "available";
      this.schedules.filter((value) => {
        if(value.slot.id === slotId){
          if (value.reserve === true) {
            res = "contracted"
          }else {
            res = "scheduled"
          }
        }
      });
      return res;
    },
    
    notify(){
      let message = ""
      if (this.currentUser.role === 'ROLE_STUDENT'){
        message = "Pulsa el butón 'Editar' para para definir la disponibilidad"
      } else {
        message = "Pulsa el butón 'Contratar' para para contratar/ reservar  horarios"
      }
      this.$notify({ type: "warn",  text: message.toString()});
    },

    formatDouble(input){
      if(input < 10){
        return "0" + (input.toFixed(2)).toString().replace('.', ':').toString()
      }else {
        return (input.toFixed(2)).toString().replace('.', ':').toString()
      }
    }

  }

};
</script>




<style scoped>
.available, .scheduled, .contracted{
  width: 95px;
  margin-top: 5px;
  padding: 7px 2px;
  text-align: center;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  font-size: 14px;
  cursor: no-drop !important;
}

.available:hover, .scheduled:hover, .contracted:hover{
opacity: 1;
}

.available{
  background-color: #e1e1e1 !important;
  color: #656464;
}

.scheduled{
  background-color: rgba(34, 133, 103,0.9) !important;
  color: white;
}

.contracted{
  background-color: #d2232a !important;
  color: white;
}

#personal-schedule .col{
  margin: 0px !important;
}

.card-body{
  padding: 10px 2px !important;
}

h2{
  font-weight: 790;
  font-size: 1.8rem;
  letter-spacing: 1px;
  color: #d2232a !important;
  text-align: center;
}

h3{
 font-size: 14px;
  text-align: center;
}

.personal-checkbox-student {
  margin:4px;
  background-color:#EFEFEF;
  font-size: 13px;
  overflow:auto;
  float:left;
}

.personal-checkbox-student {
  margin: 2px;
  background-color:#EFEFEF;
  overflow:auto;
  color: #7a7a7a;
  float:left;
}

.personal-checkbox-student label {
  float:left;
  width:80px;
  margin-bottom: 0px !important;
}

.personal-checkbox-student label span {
  text-align:center;
  display:block;
  padding: 5px 0px;
}

.personal-checkbox-student label input {
  position:absolute;
  top:-20px;
}

.personal-checkbox-student input:checked + span {
  background-color: rgba(34, 133, 103,0.9) !important;
  border:1px solid #D0D0D0;
  color:#fff;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 0px;
  background-color: #fff;
  border: none;
}

@supports (-moz-appearance:none) {
  .list-group-item {
    padding: 5px;
  }
}

.card-footer{
  text-align: center;
}
.agenda-button{
  width: 30% !important;
  margin: 5px!important;
}

</style>


