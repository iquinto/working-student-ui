<template>

  <loading v-model:active="isLoading"
           :can-cancel="true"
           :is-full-page="fullPage"
           color="#d2232a"
           loader="bars"
  />

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
          <li class="breadcrumb-item" aria-current="page"><span class="active-link">Contratar horarios</span></li>
        </ol>
      </nav>
      <h1> Contratar horarios
      </h1>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12 profile-card">
      <div class="card">
        <div class="card-header">
          <h2>Disponibilidad</h2>
          <span><font-awesome-icon icon="square" class="icon" style="color: grey"/> No disponible </span>
          <span><font-awesome-icon icon="square" class="icon" style="color:rgba(34, 133, 103,0.9) "/> Disponible </span>
          <span><font-awesome-icon icon="square" class="icon" style="color: #d2232a"/> Selecionado</span>
          <span><font-awesome-icon icon="square" class="icon" style="color: #fd7e14"/> Reservado</span>
          <!-- <p>{{selected}}</p> -->
        </div>
        <div class="card-body">
          <form id="personal-schedule-form" >
            <div class="row no-gutters"  style="margin-left: 10px" id="personal-schedule" >

              <!-- Monday starts -->
              <div class="col" v-for="(value, key) in items" :key="key">
                <h3>{{key.toUpperCase()}}</h3>
                <ul class="list-group" >
                  <li class="list-group-item" v-for="slot in value" :key="slot.id">
                    <div :class="getClass(slot.id)" class="ck-button" @click="launchAlert(slot.id)" :id="'select_slot_' + slot.id">
                      <label>
                        <input :disabled="shouldDisable(slot.id)" type="checkbox" name="schedule" :ref="'slot-'+slot.id" :value="slot.id"
                               v-model="selected" hidden />
                        <span> {{formatDouble(slot.startTime)}} - {{formatDouble(slot.endTime)}}</span>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>



            </div>
          </form>
        </div>


        <div class="card-footer">
          <button type="button" class="btn btn-primary ws-btn-red"
                  data-toggle="modal"
                  data-target="#contractedModal" style="width: 20%; border: 1px solid #d2232a"
                :disabled="selected.length === 0" >
            Enviar
          </button>

          <router-link :to="'/profile/' + currentUser.username"  type="button" class="btn btn-primary  ws-btn-grey">
            Cancelar
          </router-link>
        </div>
      </div>
    </div>
  </div>


  <!-- Modal Starts -->
  <div id="contractedModal" class="modal fade">
    <div class="modal-dialog modal-confirm">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <div class="icon-box">
            <font-awesome-icon :icon="['fas', 'check']" class="icon" />
            <font-awesome-icon icon="faCheck" class="icon"/>
          </div>
          <button  ref="closeModal" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        </div>
        <div class="modal-body text-center">
          <h4>Reserva de horarios</h4>
          <p>Introducir datos complementarios</p>

          <form id="moreInfoForm">
            <div class="row">
              <div class="form-group col-md-8" style="text-align: left">
                <label for="startDate" style="font-size: 14px; color: #3c3c3c">Inicio</label>
                <input name="startDate" type="date" class="form-control"  v-model ="extraData.startDate" required/>
              </div>
              <div class="form-group col-md-4" style="text-align: left">
                <label for="numberOfWeeks" style="font-size: 14px; color: #3c3c3c">Num. de semanas</label>
                <input name="numberOfWeeks" type="number" class="form-control" v-model ="extraData.numberOfWeeks" required/>
              </div>
            </div>

            <button type="submit" class="btn btn-success theme-button" data-dismiss="modal" @click="save">
              Enviar
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cancelar</button>
          </form>

        </div>
      </div>
    </div>
  </div>
  <!-- Modal Ends -->

</template>


<script>
import ScheduleDataService from "../../services/ScheduleDataService";
import ReservationDataService from "../../services/ReservationDataService";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "ReservationCreate",
  props: {
    username: String
  },
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      defaultClass: 'personal-checkbox-student',
      user: "",
      schedules: [],
      selected: [],
      items: [],
      extraData:{
        numberOfWeeks: 1,
        startDate: new Date().toISOString().substr(0, 10)
      }
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
    this.listSlotsByDay();
    this.listSchedules(this.$route.params.username);
  },

  methods:{
    listSlotsByDay(){
      console.log("[ReservationList: listByUserName] starts " )
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

    save(){
      let data = {
        schedules:  this.selected,
        student:  this.$route.params.username,
        startDate: this.extraData.startDate,
        numberOfWeeks: this.extraData.numberOfWeeks
      }
      this.isLoading = true;

      ReservationDataService.save(this.currentUser.username, data).then(
          (response) => {
            this.isLoading = false;
            this.$router.push("/profile/" + this.currentUser.username );
            this.$notify({ type: "success",  text: response.data.message.toString()});          },
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

    shouldDisable(slotId){
      let data = {};
      this.schedules.filter((value) => {
          if(value.slot.id === slotId && value.reserve === true){
            data.clazz = true;
          } else if(value.slot.id === slotId){
            data.clazz = false;
          }
      });
      return (data.clazz != null) ? data.clazz : true;
    },

    getClass(slotId){
      let data = {};
      this.schedules.filter((value) => {
        if(value.slot.id === slotId && value.reserve === true){
          return data.clazz = "contracted";
        } else if(value.slot.id === slotId){
          return data.clazz = "scheduled";
        }
      });
      return (data.clazz != null) ? data.clazz : "not-available";
    },

    launchAlert(slotId){
      this.schedules.filter((value) => {
        if(value.slot.id === slotId){
          if (value.reserve === true) {
            this.$notify({ type: "warn",  text: "El horario ya esta reservado. No es posible selecionar."});
          }
        }
      });
    },

    formatDouble(input){
      return (input.toFixed(2)).toString().replace('.', ':')
    }

  }

};
</script>



<style scoped>
#personal-schedule .col{
  margin: 0px !important;
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
h3{
  font-size: 16px;
  text-align: center;
}
.ck-button {
  margin:4px;
  background-color:#EFEFEF;
  overflow:auto;
  float:left;
}

.ck-button {
  margin: 2px;
  background-color:#EFEFEF;
  border:1px solid #D0D0D0;
  overflow:auto;
  color: #7a7a7a;
  float:left;
  font-size: 12px;
}

.ck-button:hover {
  color:#fff;
}

.ck-button label {
  float:left;
  width:100px;
  margin: 0px !important;
}

.ck-button label span {
  text-align:center;
  display:block;
  padding: 5px 0px;
}

.ck-button label input {
  position:absolute;
  top:-20px;
}

.ck-button input:checked + span {
  background-color: rgb(210, 35, 42)!important;
  color:#fff;
}



.list-group-item{
  border: none;
  padding: 2px 1.25rem !important;
}

.profile-card .card-header, .card-footer{
  background-color: white !important;

}
.profile-card .card-header img{
  padding: 10px 0px!important;
  width: 300px;
}

.profile-card .card-header a{
  color: white !important;
  font-size: 12px;
  float:right;
  padding: 3px 5px;
  background-color: #007bff;
}

.profile-card .card-header a:hover{
  opacity: 0.9;
  text-decoration: none;
}

.profile-card .card-header span{
  margin-right: 10px;
  color: grey
}

.profile-card .card-footer{
  text-align: center;

}
.profile-card .card-footer a{
  margin: 0px 5px;
  width: 20%;
}

.profile-card a:hover{
  opacity: 0.8;
}

.ws-btn-grey{
  background-color: #7a7a7a !important;
  color: white;

}

.ws-btn-red{
  background-color: #d2232a;
  color: white;
}

.not-available{
  background-color: #e1e1e1 !important;
  color: #656464 !important;
}

.not-available input:checked + span {
  background-color: #e1e1e1;
  color: #656464 !important;
}

.not-available label span {
  cursor: no-drop !important;
}

.scheduled{
  background-color: rgba(34, 133, 103,0.9) !important;
  color: #FFFFFF !important;
}

.scheduled input:checked + span {
  background-color: rgba(34, 133, 103,0.9);
  color: #FFFFFF !important;
}

.scheduled:hover{
  opacity: 0.7;
}

.contracted{
  background-color: #fd7e14 !important;
  color: #FFFFFF !important;
}

.contracted input:checked + span {
  background-color: #fd7e14 !important;
  color: #FFFFFF !important;
}

.contracted label span {
  cursor: no-drop !important;
}


.btn-primary:disabled {
  color: #fff;
  background-color: rgb(210, 35, 42);
  border-color: #007bff;

}
</style>


