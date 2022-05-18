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
          <li class="breadcrumb-item" aria-current="page"><span class="active-link">Sobre nosotros</span></li>
        </ol>
      </nav>
      <h1>Recursos</h1>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card notification-card" style="width: 100%; padding: 0px 30px">
          <div class="card-body recusos">
            <TabView>
              <TabPanel header="Soy estudiante" >
                <p>
                  A continuación encontrará una amplia gama de guías útiles para estudiantes que buscan trabajo desde la preparacion de CV para un trabajo hasta
                   los derechos de los empleados.
                </p>
                <p>
                  <a href="https://zety.es/blog/curriculum-diseno" target="_blank">
                  Como crear un CV atractivo
                  </a>
                </p>
                <p>
                  <a href="https://zety.es/blog/como-hacer-una-carta-de-presentacion" target="_blank">
                  Como redactar una carta de presentación
                  </a>
                </p>
                <p>
                  <a href="https://zety.es/blog/como-preparar-una-entrevista-de-trabajo" target="_blank">
                  Como preparar una entrevista de trabajo
                  </a>
                </p>

                <p>
                  <a href="https://www.grupospec.com/es/blog/136-contratos-tiempo-parcial" target="_blank">
                  Derechos legales contratación parcial
                  </a>
                </p>
                <p>
                  <a href="https://marbenabogados.com/derechos-los-estudiantes-practicas/" target="_blank">
                  Derechos de los estudiantes en prácticas
                  </a>
                </p>

              </TabPanel>
              <TabPanel header="Soy empleador">
                <p>
                  A continuación encontrará una amplia gama de guías útiles para empleadores que buscan talentos:
                </p>
                <p>
                  <a href="https://www.mites.gob.es/es/guia/texto/guia_5/contenidos/guia_5_12_2.htm" target="_blank">
                    Información legal sobre trabajo en tiempo parcial
                  </a>
                </p>
                <p>
                  <a href="https://www.elconfidencial.com/tecnologia/2013-03-19/esta-pensando-en-contratar-diez-claves-para-encontrar-al-empleado-perfecto_767670/" target="_blank">
                    Como encontrar un empleado perfecto
                  </a>
                </p>
              </TabPanel>
            </TabView>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'

export default {
  name: "Resources",
  components: {
    TabView,
    TabPanel,
  },
  data() {
    return {

    };
  },

  computed: {
    banner() {
      return 'url(' + require('@/assets/banner_about.jpg') + ')';
    },
  },

  mounted() {
  },
  methods:{}
};
</script>




<style>
.p-tabview .p-tabview-nav li{
  width:50%;
}
.recusos a {
  font-size: 18px;
  font-weight: 900;
  color: #d22329;
}

.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  background: #ffffff;
  border-color: #070707;
  color: #020202;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: none !important;
}
</style>

