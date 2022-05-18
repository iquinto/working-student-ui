<template>
  <img :src="pic" :class="clazz" >
</template>


<script>

import PhotoDataService from "../../services/PhotoDataService";

export default {
  name: "PhotoTemplate",
  props:{
    username: String,
    clazz: String,
    image: String,
  },

  data() {
    return {
      pic: require('@/assets/user.png'),
    };
  },

  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    },
  },


  mounted() {
    this.getAvatarByUsername(this.username)
  },

  methods: {
    getAvatarByUsername(uid){
      PhotoDataService.getAvatarByUsername(uid).then(
          (response) => {
            if(response.data.url) {
              this.pic =  response.data.url
            }else{
              if(this.image  != null) {
                this.pic = this.image
              }
            }


          });
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
