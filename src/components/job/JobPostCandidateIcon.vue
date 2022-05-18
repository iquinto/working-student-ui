<template>

  <font-awesome-icon icon="envelope" v-if="isCanditate"
                     class="fa-pull-right icon-cand" title="CV enviado a esta oferta"
  />
</template>




<script>


import JobPostDataService from "@/services/JobPostDataService";


export default {
  name: "JobPostCandidate",
  props:{
    jpId: Number
  },
  filters: {
  },


  data() {
    return {
      isCanditate: false
    }
  },

  computed: {

  },

  mounted() {
    this.checkCandidate()
  },

  created() {

  },

  methods: {
    checkCandidate(){
      JobPostDataService.checkCandidate(this.jpId).then(
          (response) => {
            this.isCanditate = response.data
          },
      );
    },
  }
};
</script>

<style scoped>
.icon-cand{
  color: #d22329;
  font-size: 30px;
}

</style>