<template>

  <div class="row theme-title">
    <div class="col-sm-12">
      <h1>Añadir CV</h1>
    </div>
  </div>
  <div class="container">
    <div class="row">

      <div id="myModal" class="modal fade">
        <div class="modal-dialog modal-confirm">
          <div class="modal-content">
            <div class="modal-header justify-content-center">
              <div class="icon-box">
                <font-awesome-icon :icon="['fas', 'file-import']" class="icon" />
              </div>
              <button  ref="closeModal" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body text-center">
              <h4>Actulizar Foto</h4>
              <label class="btn btn-default">
                <input type="file" ref="file" name="file" @change="selectFile" />
              </label>
              <button class="btn btn-success theme-button" :disabled="!selectedFiles" @click="upload">
                Enviar
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cancelar</button>
            </div>
          </div>
        </div>
      </div>



    </div>
  </div>



</template>

<script>
import PhotoDataService from "../../services/PhotoDataService";
import EmployerDataService from "../../services/EmployerDataService";


export default {
  name: 'ResumeSave',
  components: {

  },
  data() {
    return {
      image: "//ssl.gstatic.com/accounts/ui/avatar_2x.png",
      message: "",
      user: {
        address:{},
        categories: {}
      }
    }
  },

  computed: {
  },

  mounted() {
    this.getEmployer(this.$route.params.username);
    this.getUserAvatar(this.$route.params.username);
  },

  methods: {
    getEmployer(username){
      EmployerDataService.show(username).then(
          (response) => {
            this.user = response.data
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

    getUserAvatar(username){
      PhotoDataService.getAvatarByUsername(username).then(
          (response) => {
            if(response.data.url)  this.image = response.data.url
          },
          (error) => {
            this.loading = false;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    }


  }
};
</script>

<style>


.profile-card .card-header, .card-footer{
  /* background-color: rgba(210,35,42, 0.9) !important;*/
  background-color: white !important;
  font-size: 12px !important;
}
.profile-card .card-header img{
  padding: 10px 0px!important;
  width: 250px;
  display: block;
  margin: auto;
}

.profile-card .card-header a{
  color: white !important;
  font-size: 12px;
  float:right;
  padding: 3px 5px;
  background-color: rgba(210,35,42, 0.9);
}

.profile-card .card-footer{
  text-align: center;
}

.profile-card .card-body h4{
  font-weight: 790;
  font-size: 1.5em;
  letter-spacing: 1px;
  color: #666 !important;
  text-align: left;
  margin-bottom: 0px;
}

.profile-card .card-footer a{
  background: #d2232a;
  border: #d2232a;
  width: 50%;
}

.profile-card a:hover{
  opacity: 0.9;
  text-decoration: none;
}


.profile-card .info .list-group-item{
  border: none;
  padding: 5px 1.25rem;
}

.profile-card .info em{
  color: #827e7e !important;
  font-style: normal;
}

.small-info{
  font-weight: 400;
  color: #666666 !important;
}


blockquote {
  font-family: Georgia, serif;
  position: relative;
  margin: 0.5em;
  padding: 10px 30px;
  font-style: italic;
}

blockquote:before {
  font-family: Georgia, serif;
  position: absolute;
  font-size:3em;
  line-height: 1;
  color: #827e7e;
  top: 0;
  left: 0;
  content: "\201C";
}
blockquote:after {
  font-family: Georgia, serif;
  position: absolute;
  float:right;
  font-size:3em;
  color: #827e7e;
  line-height: 1;
  right:0;
  bottom:-0.5em;
  content: "\201D";
}
blockquote footer {
  padding: 0 2em 0 0;
  text-align:right;
}
blockquote cite:before {
  content: "\2013";
}

.back-button{
  text-align: center !important;
  margin-top: 20px;
}

.back-button a{
  width: 50%;
}

</style>