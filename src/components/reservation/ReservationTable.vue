<template>
  <div class="row">
    <div class="col-sm-12 profile-card">
      <div class="card float-effect" style="padding: 10px 30px;">
        <div class="card-header">
          <h2>Listado de reservas</h2>
          <h3>
            <router-link to="/student/list" class="btn btn-primary ws-btn-table-red" v-if="currentUser.role === 'ROLE_EMPLOYER'">
              <font-awesome-icon icon="plus"
                                 id="reserve-section-btn"
                                 style="color: #FFFFFF; margin-right: 10px"
                                 title="Reservar"
              /> Reservar
            </router-link>
          </h3>
        </div>
        <div class="card-body">
          <div v-if="records === 0" class="no-records">
            <h3>
              No se encuenta ningun resultado
            </h3>
          </div>

          <div class="row">
            <div class="col-12">
              <div v-if="records > 0" class="table-responsive">
                <table class="table table-striped reservation-table">
                  <thead>
                  <tr>
                    <th scope="col">Estado</th>
                    <th scope="col">Fecha inicio</th>
                    <th scope="col">Fecha fin</th>
                    <th scope="col">Estudiante</th>
                    <th scope="col">Acciones</th>
                  </tr>
                  </thead>
                  <tbody id="reservation-table-body">
                  <tr v-for="r in reservations" :key="r.id">
                    <td class="state-row">
                      <span v-if="r.accepted">
                      <font-awesome-icon icon="check" class="icon" style="margin-right: 3px; color: green"/> Aceptado
                    </span>
                      <span v-else>
                      <font-awesome-icon icon="exclamation" class="icon" style="margin-right: 3px; color: rgb(247 174 36)"/> Pendiente
                    </span>
                    </td>

                    <td>{{r.startDate}}</td>
                    <td>{{r.endDate}}</td>
                    <td v-if="currentUser.role === 'ROLE_EMPLOYER'">
                      {{r.student.name}} {{r.student.surname}}
                    </td>
                    <td v-else>
                      {{r.employer.name}} {{r.employer.surname}}
                    </td>
                    <td v-if="currentUser.role === 'ROLE_EMPLOYER'">
                      <router-link data-action="reservation-edit-btn" :to="'/reservation/edit/'+ r.id +'/' + r.student.username" >
                        <font-awesome-icon icon="pen"
                                           class="icon icon-table"
                                           title="Ver/Editar"
                                           style="color: #007bff"
                                           v-if="r.accepted === false"
                        />
                      </router-link>

                      <font-awesome-icon icon="eye"
                                         data-action="reservation-show-btn"
                                         class="icon icon-table"
                                         title="Ver Detalle"
                                         style="color: #007bff"
                                         data-toggle="modal"
                                         data-target="#show-reservation-details"
                                         @click="selectReservation(r)"
                                         v-if="r.accepted === true"
                      />

                      <font-awesome-icon icon="trash"
                                         class="icon icon-table"
                                         data-action="reservation-delete-btn"
                                         title="Eliminar"
                                         data-toggle="modal"
                                         @click="setIdToDelete(r.id)"
                                         data-target="#delete-reservation-modal"
                      />


                    </td>
                    <td v-else>
                        <font-awesome-icon icon="eye"
                                           class="icon icon-table"
                                           data-action="reservation-show-btn"
                                           title="Ver Detalle"
                                           style="color: #007bff"
                                           data-toggle="modal"
                                           data-target="#show-reservation-details"
                                           @click="selectReservation(r)"
                        />

                      <font-awesome-icon icon="check"
                                         data-action="reservation-accept-btn"
                                         class="icon icon-table"
                                         title="Aceptar"
                                         style="color: green"
                                         data-toggle="modal"
                                         data-target="#accept-reservation-modal"
                                         @click="setIdToAcceptOrReject(r.id, true)"
                                         v-if="r.accepted === false"
                      />

                      <font-awesome-icon icon="trash"
                                         data-action="reservation-reject-btn"
                                         class="icon icon-table"
                                         title="Rechazar"
                                         @click="setIdToAcceptOrReject(r.id, false)"
                                         data-toggle="modal"
                                         data-target="#accept-reservation-modal"
                                         v-if="r.accepted === false"
                      />

                    </td>
                  </tr>
                  </tbody>
                </table>
                <pagination v-model="page" :records="records"
                            :per-page="size" @paginate="myCallback"/>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- Modal Starts -->
  <div id="accept-reservation-modal" class="modal fade">
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

          <h5 style="margin-bottom: 20px;">¿Estás seguro que quieres {{ isAccept ? 'acceptar' : 'rechazar'}} la propuesta?</h5>

            <button id="accept-delete-btn" type="submit" class="btn btn-success theme-button" data-dismiss="modal"  @click="isAccept ? acceptReservation() : rejectReservation()">
              Enviar
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cancelar</button>

        </div>
      </div>
    </div>
  </div>
  <!-- Modal Ends -->


  <!-- Modal Starts -->
  <div id="delete-reservation-modal" class="modal fade">
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
          <h4>Eliminar reserva</h4>
          <p style="text-align: left">Seleccionar motivo :
            <select class="form-control" v-model="finished" id="reason-cancelation">
            <option :value="true">Finalización de reserva</option>
            <option :value="false">Anular reserva</option>
          </select>
          </p>
          <div v-if="finished">
            <form id="rateForm">
              <div class="row rate-con">
                <div class="form-group col-md-12" style="text-align: center; margin-top: 20px">
                  <p>Valoracion:  </p>
                  <p>
                    <p-rating v-model="rate" :cancel="false" />
                  </p>
                  <p>Comentarios:  </p>
                  <p>
                    <input type="text" v-model="comment" class="form-control" style="width: 100%" id="comment-input">

                  </p>
                </div>
              </div>
              <button type="submit" class="btn btn-success theme-button" data-dismiss="modal" id="finalize-modal-btn"  @click="deleteReservation()">
                Enviar
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cancelar</button>
            </form>
          </div>
          <div v-else>
            <form id="rateForm">
              <button type="submit" class="btn btn-success theme-button" data-dismiss="modal"  id="cancel-modal-btn"  @click="deleteReservation()">
                Eliminar
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cancelar</button>
            </form>
          </div>


        </div>
      </div>
    </div>
  </div>
  <!-- Modal Ends -->


  <!-- Modal Starts -->
  <div id="show-reservation-details" class="modal fade">
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

          <h5 style="margin-bottom: 20px; font-weight: 800;">Detalle de reserva</h5>
          <hr>
          <h6><span>Empleador: </span>{{selectedReservation.employer.name }} {{selectedReservation.employer.surname }}</h6>
          <p>
            <span><font-awesome-icon icon="phone" class="icon icon-table" style="color: #828181"/> :</span>
            {{selectedReservation.employer.phone }}
          </p>
          <p> <span><font-awesome-icon icon="envelope" class="icon icon-table" style="color: #828181"/> :</span>
            {{selectedReservation.employer.email }}
          </p>
          <hr>
          <h6><span>Estudiante: </span>{{selectedReservation.student.name }} {{selectedReservation.student.surname }}</h6>
          <p>
            <span><font-awesome-icon icon="phone" class="icon icon-table" style="color: #828181"/> :</span>
            {{selectedReservation.student.phone }}
          </p>
          <p> <span><font-awesome-icon icon="envelope" class="icon icon-table" style="color: #828181"/> :</span>
            {{selectedReservation.student.email }}
          </p>
          <hr>
          <p> <span>Estado:</span> {{selectedReservation.accepted ? 'Aceptado' : 'Pendiente'}}</p>

          <p style="text-align: left"> <span>Horarios: </span></p>

            <table class="table table-striped reservation-table">
                  <thead>
                    <tr>
                      <th scope="col">Dia</th>
                      <th scope="col">Inicio</th>
                      <th scope="col">Fín</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="res in selectedReservation.schedules" :key="res.id">
                      <td>{{res.slot.day}}</td>
                      <td>{{formatDouble(res.slot.startTime)}}</td>
                      <td>{{formatDouble(res.slot.endTime)}}</td>
                    </tr>
                  </tbody>
            </table>


          <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Ends -->







</template>
<style scoped>

.reservation-table{
  font-size: 13px !important;
}
div.card {
  font-size: 12px !important;
}

.ws-btn-table-red{
  background-color: #d2232a;
  border: 1px solid #d2232a;
  padding: 5px 20px !important;
  font-size: 16px !important;
  color: white;
}

.icon-table{
  font-size: 14px;
  color: #b82e24;
  margin-left: 10px;
}

.icon-table:hover{
  opacity: 0.5;
}
.no-records h3{
  color: gray;
  text-align:center;
  margin: 20px 0px;
}

#show-reservation-details h6{
  text-align: left !important;
  font-weight: 700;
  text-align: left
}

#show-reservation-details h6>span{
  text-align: left !important;
  color: #828181;
}

#show-reservation-details p{
  text-align: left !important;
  font-size: 14px;
  margin-bottom: 5px;
}

#show-reservation-details p>span{
  text-align: left !important;
  color: #828181;
  font-size: 14px;
}

.rate-con p{
  text-align: left!important;
}
</style>

<script>

import ReservationDataService from "../../services/ReservationDataService";
import Rating from 'primevue/rating';
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'

export default {
  name: "StudentListContracted",
  components: {
    'p-rating': Rating
  },
  props: {
    username: String
  },
  data() {
    return {
      page: 1,
      size:5,
      records: 0,
      rate: 0,
      idToDelete: null,
      idToAcceptOrReject:null,
      isAccept:null,
      selectedReservation: { employer:{},student:{}, schedules:[]},
      reservations: [],
      finished: true,
      comment: null
    };
  },
  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    },
  },

  mounted() {
    this.myCallback()
  },

  methods: {
    myCallback(){
      ReservationDataService.list(this.page, this.$route.params.username).then(
          (response) => {
            this.reservations = response.data.content;
            this.records = response.data.totalElements
          },
          (error) => {
            this.students =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },

    setIdToDelete(id){
      this.idToDelete = id;
    },

    setIdToAcceptOrReject(id, isAccept){
      this.idToAcceptOrReject= id;
      this.isAccept = isAccept
    },


    selectReservation(r){
      this.selectedReservation = r;
    },

    deleteReservation(){
      ReservationDataService.delete(this.idToDelete, this.rate, this.comment).then(
          (response) => {
            this.myCallback();
            this.$notify({ type: "success",  text: response.data.message.toString()});
            this.$emit("refreshevent")
            this.idToDelete = null; // reset
            this.rate = 0; // reset
            this.comment = null; // reset

          },
          (error) => {
            this.students =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
               this.$notify({ type: "error",  text: error.toString()});
          }
      );
    },

    acceptReservation(){
      ReservationDataService.accept(this.idToAcceptOrReject).then(
          (response) => {
            this.myCallback();
            this.$notify({ type: "success",  text: response.data.message.toString()});
          },
          (error) => {
            this.students =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },

    rejectReservation(){
      ReservationDataService.reject(this.idToAcceptOrReject).then(
          (response) => {
            this.myCallback();
            this.$notify({ type: "success",  text: response.data.message.toString()});
          },
          (error) => {
            this.students =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },

    formatDouble(input){
      return (input.toFixed(2)).toString().replace('.', ':')
    },

    calculateDate(date, days){
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
  }
};
</script>
