<template>
      <div class="row theme-title">
        <div class="col-sm-12">
        </div>
      </div>

      <div class="row" :style="'background-image:' + pic">
        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 home-area">
          <h1>Donde el <span>tiempo</span>
            se encuentra con la <span>oportunidad</span>.
          </h1>
          <p>
            WorkingStudent  es una plataforma web que permitirá a los estudiantes universitarios encontrar empleos
            a tiempo parcial que puedan compaginar con sus estudios y, del mismo modo, permita a los
            empleadores (empresas o particulares) encontrar talentos que encajen a sus necesidades.
          </p>
          <div class="be-part">

            <h2>Forma parte de nuestra comunidad</h2>
            <router-link to="/register/student" class="main-button ">Estudiante</router-link> <router-link to="/register/employer" class="main-button">Empresa</router-link>
          </div>

          <div class="slider-home">
           <!--  SLIDE 1 -->
            <div class="agile-container">
              <h2>Testimonios</h2>

              <agile :autoplay="true" :autoplaySpeed="3000" :navButtons="false" :dots="false">
                <div class="slide" v-for="slide in slides" :key="slide.id">
                  <span class="row">
                    <span class="col-md-8"><h3>{{slide.title}}</h3></span>
                    <span class="col-md-4 agile-rate">
                      <font-awesome-icon icon="star" class="icon"/>
                      <font-awesome-icon icon="star" class="icon"/>
                      <font-awesome-icon icon="star" class="icon"/>
                      <font-awesome-icon icon="star" class="icon"/>
                      <font-awesome-icon icon="star" class="icon"/>
                    </span>
                  </span>
                  <blockquote class="agile-body">
                    {{slide.comment}}
                  </blockquote>
                  <p class="agile-footer">
                    - {{slide.author}}
                  </p>
                </div>
              </agile>
            </div>
          </div>

        </div>


        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 left-area">
          <img :src="pic" class="img-fluid">
        </div>
      </div>

</template>


<script>

export default {
  name: "Home",
  components: {
  },
  data() {
    return {
      slides:[
        {
          title: "Una web estupenda...",
          author:"Chiringuito de Pepe",
          comment:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..",
        },
        {
          title: "Estudiantes muy competentes...",
          author:"Bar Chaparon",
          comment:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..",
        },
        {
          title: "Un sitio perfecto para encontrar gente...",
          author:"Maria Lourdes",
          comment:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..",
        },
      ]
    };
  },

  computed: {
    pic(){
      return require('@/assets/home.jpg')
    }
  },
  mounted() {
    console.log("URI: " + process.env.VUE_APP_ROOT_API)
  },

  methods:{

  }
};
</script>




<style scoped>

.home-area{
  margin-bottom: 40px;
}

.home-area h1{
  font-weight: 900;
  font-size: 52px;
  letter-spacing: 1px;
  margin-bottom: 30px;
  color: #191a20;
}

.home-area h1 span{
  color: #d2232a !important;
}

.home-area p {
  font-weight: 300;
  font-size: 17px;
  color: #7a7a7a;
  line-height: 30px;
  letter-spacing: 0.25px;
  margin-bottom: 30px;
  position: relative;
}

.main-button{
  font-size: 14px;
  padding: 15px 25px;
  background-color: #d2232a;
  text-transform: uppercase;
  color: #fff;
  font-weight: 600;
  letter-spacing: 1px;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
}

.slider-home{
  margin-top: 50px;
}

.be-part h2{
  margin-bottom:20px!important;
  font-weight: 600;
  font-size: 1.6rem;
}

.be-part a{
  margin-right: 10px !important;
  border: 3px solid #d2232a;
  background-color: white;
  color: #d2232a;
}

.be-part a:hover{
  background-color: #d2232a;
  text-transform: uppercase;
  color: #fff;}

.agile-container{
  margin-top: 30px;
  overflow: auto;
  padding: 15px;
  radius: 5px;
  -webkit-box-shadow: 0 0 5px #ddd;
  box-shadow: 0 0 5px #ddd;
  margin-bottom: 40px;
}

.agile-container p{
  margin: 0 0 10px 0;
  font-size: 14px;
  line-height: 18px;
}

.slider-home h2 {
  color: #d2232a !important;

  font-size: 25px;
  font-weight: 600;
  line-height: 2.25rem;
  margin: 0 0 .75rem;
}


.agile-container h3{
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 .75rem;
}

.agile-rate{
  text-align: right;
}

.agile-rate .icon{
  color: #f8bc04;
  font-size: 14px;
}


agile-body {
  position: relative;
  margin: 0.5em;
  padding: 10px 30px;
  font-style: italic;
}

blockquote {
  position: relative;
  margin: 0.5em;
  padding: 10px 30px;
  font-style: italic;
}

blockquote:before {
  position: absolute;
  font-size:3em;
  line-height: 1;
  color: #827e7e;
  top: 0;
  left: 0;
  content: "\201C";
}
blockquote:after {
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

.agile-body{
  font-size: 14px !important;
}

.agile-footer{
  text-align: center;
  margin-top: 30px !important;
}

@media (max-width: 991px) {
  .home-area h1{
    font-weight: 900;
    font-size: 35px;
    letter-spacing: 1px;
    margin-bottom: 30px;
    color: #191a20;
  }
}


</style>

