<template>
      <div class="rating-box">
         <span v-if="rating === 0 ">
           <font-awesome-icon icon="star" class="icon"  style="color: grey !important;"/>
            <font-awesome-icon icon="star" class="icon" style="color: grey !important"/>
            <font-awesome-icon icon="star" class="icon" style="color: grey !important"/>
            <font-awesome-icon icon="star" class="icon" style="color: grey !important"/>
            <font-awesome-icon icon="star" class="icon" style="color: grey !important"/>
        </span>
        <span v-if="rating > 0 && rating <= 1">
            <font-awesome-icon icon="star" class="icon"/>
        </span>
        <span v-if="rating > 1 && rating <= 1.5">
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star-half" class="icon"/>
        </span>
        <span v-if="rating > 1.5 && rating <= 2">
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star" class="icon"/>
        </span>
        <span v-if="rating > 2 && rating <= 2.5">
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star-half" class="icon"/>
        </span>
        <span v-if="rating > 2.5 && rating <= 3">
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star" class="icon"/>
        </span>
        <span v-if="rating > 3 && rating <= 3.5">
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star-half" class="icon"/>
        </span>
        <span v-if="rating > 3.5 && rating <= 4">
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star" class="icon"/>
        </span>
        <span v-if="rating > 4 && rating <= 4.5">
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star-half" class="icon"/>
        </span>

        <span v-if="rating > 4.5 && rating <= 5">
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star" class="icon"/>
            <font-awesome-icon icon="star" class="icon"/>
        </span>

      </div>
</template>


<script>

import RatingDataService from "../../services/RatingDataService";

export default {
  name: "Rating",
  props:{
    username: String,
  },

  data() {
    return {
      rating: 0
    };
  },

  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    },
  },


  mounted() {
    this.getRatingAverage(this.username)
  },

  methods:{
    getRatingAverage(username){
      console.log("[Rating: getRatingAverage] starts " + username)

      RatingDataService.getRatingAverage(username).then(
          (response) => {
            this.rating = response.data
            console.log("[Rating: getRatingAverage] response " + this.rating)
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

  }
};
</script>




<style scoped>

.rating-box{
  padding: 5px;
}
.rating-box .icon{
  color: #f8bc04;
  font-size: 16px;
}


</style>

