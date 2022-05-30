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
          <li class="breadcrumb-item" aria-current="page"><span class="active-link">Editar horario</span></li>
        </ol>
      </nav>
      <h1> Editar horarios
      </h1>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12 profile-card">
      <div class="card">
        <div class="card-header">
          <h2>Disponibilidad</h2>
          <span><font-awesome-icon icon="square" class="icon" style="color: grey"/> Disponible </span>
          <span><font-awesome-icon icon="square" class="icon" style="color:rgba(34, 133, 103,0.9) "/> Selecionado </span>
          <span><font-awesome-icon icon="square" class="icon" style="color: #d2232a"/> No disponible | Reservado</span>
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
                        <input :disabled="!hasSched ? false  : isReserve(slot.id)" type="checkbox" name="schedule"  :ref="'slot-'+slot.id" :value="slot.id"
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
          <button type="button" :disabled="selected.length === 0" class="btn btn-primary ws-btn-red" data-toggle="modal" data-target="#scheduledModal" style="width: 20%; border: 1px solid #d2232a; background: #d2232a">
            Enviar
          </button>
          <router-link :to="'/profile/' + paramuser"  type="button" class="btn btn-primary  ws-btn-grey">
            Cancelar
          </router-link>
        </div>
      </div>
    </div>
  </div>


  <!-- Modal Starts -->
  <div id="scheduledModal" class="modal fade">
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
          <h4>Editar de horarios</h4>
          <p>¿Estás seguro de que quieres continuar con la operación?</p>
          <button type="button" class="btn btn-success theme-button" data-dismiss="modal"  form="personal-schedule-form" @click="setToSchedules">
            Enviar
          </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Ends -->

</template>


<script>
import ScheduleDataService from "../../services/ScheduleDataService";

export default {
  name: "ScheduleCrete",
  props: {
    username: String
  },
  data() {
    return {
      defaultClass: 'personal-checkbox-student',
      user: "",
      schedules: [],
      selected: [],
      items: [],
      hasSched: true
    };
  },
  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    },

    banner() {
      return 'url(' + require('@/assets/banner_resource.jpg') + ')'
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
            this.hasSched = response.data.length > 0


            console.log("HOLALAL >>>>>>>>>> " + response.data.length)

            let item = response.data
            for (let i = 0; i < item.length; i++) {
              this.selected.push(item[i].slot.id)
            }
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

    isReserve(slotId){
      let data = {};
      this.schedules.filter((value) => {
        if(value.slot.id != slotId){
          data.clazz = false;
        } else {
          if(value.reserve){
            data.clazz = true;
          } else {
            data.clazz = false;
          }
        }
      });
      return (data.clazz != null) ? data.clazz : true;
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


    setToSchedules(){
      let data = { selected: this.selected, username : this.paramuser}
      ScheduleDataService.setToSchedules(data).then(
          (response) => {
            this.$router.push("/profile/" + this.paramuser );
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
            this.$notify({ type: "error",  text: this.message});

          }
      )
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
  margin: 2px;
  background-color:#EFEFEF;
  border:1px solid #D0D0D0;
  overflow:auto;
  color: #7a7a7a;
  float:left;
  font-size: 12px;
}

.ck-button:hover {
  background-color: rgba(34, 133, 103,0.9) !important;
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
  background-color: rgba(34, 133, 103,0.9) ;
  color:#fff;
}


.contracted span{
  background-color: #d2232a !important;
  color:#fff;
  pointer-events: none !important;
}

.contracted input{
  pointer-events: none;
}


.list-group-item{
  border: none;
  padding: 2px 1.25rem !important;
}

.profile-card .card-header, .card-footer{
  /* background-color: rgba(210,35,42, 0.9) !important;*/
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
</style>


