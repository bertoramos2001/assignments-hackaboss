<template>
  <div>
      <vue-headful title="Top Canciones"/>
      <h1>🎵 Las 50 canciones más escuchadas en España 🎵</h1>
      <toptracks :tracks="tracks"/>
  </div>
</template>

<script>
//Importamos la api que vamos a usar
import api from '@/api/index.js'
//Importamos el componente de lista de canciones más escuchadas
import toptracks from '@/components/TopTracks.vue'

export default {
    name: 'TopTracks',
    components: {
        toptracks
    },
    data() {
        return {
            tracks: [],
        }
    },
    created() { //llamamos a la funcion getTracks() de la api en el hook de created, aqui llenamos la funcion vacia con la informacion de la api
        api.getTracks().then(response => (this.tracks = response.data.tracks.track));
    }
}
</script>

<style scoped>
h1 {
    padding: 0 25px 25px 25px;
}
</style>