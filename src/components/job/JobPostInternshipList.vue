<template>
    <ws-jobpostlist type="internship"></ws-jobpostlist>
</template>


<script>

import JobPostList from "./JobPostList";

export default {
  name: "JobInternship",
  components:{
    'ws-jobpostlist': JobPostList
  },
  data() {
    return {
    };
  },

  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    },
  },

  mounted() {},

  methods: {}
};
</script>
