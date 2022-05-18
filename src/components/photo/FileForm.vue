<template>
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
</template>

<script>
import PhotoDataService from "../../services/PhotoDataService";

export default {
  name: 'File',
  data() {
    return {
      image: "//ssl.gstatic.com/accounts/ui/avatar_2x.png",
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
    }
  },

  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    }
  },
  mounted() {
    PhotoDataService.getAvatar().then(
        (response) => {
          if (!response.data.url){
            this.$notify({ type: "warn",  text: response.data.message.toString()});
          }else {
            console.log(response.data.url)
            this.image = response.data.url
          }
        },
    );
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },

  methods: {
    upload() {
      this.progress = 0;
      this.currentFile = this.selectedFiles.item(0);
      const formData = new FormData();
      formData.append("file",this.currentFile);
      PhotoDataService.setAvatar(formData, event => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      }).then(
          (response) => {
            response.data
            this.image = response.url
            this.$refs.closeModal.click()
            this.$notify({ type: "success",  text: response.message.toString()});
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
      this.selectedFiles = undefined;
    },


    selectFile() {
      this.selectedFiles = this.$refs.file.files;
    },

  }
};
</script>