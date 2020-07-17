<template>
  <div>
      <vue-headful title="Top Artistas"/>
      <h1>Los 50 artistas más escuchados en España</h1>
      <topartists :artists="artists"/>
  </div>
</template>

<script>
//Importamos la api que vamos a usar
import api from '@/api/index.js'
//Importamos el componente de lista de artistas más escuchados
import topartists from '@/components/TopArtists.vue'

export default {
    name: 'TopArtists',
    components: {
        topartists
    },
    data() {
        return {
        artists: []
        }
    },
    created() { //llamamos a la funcion getArtists() de la api en el hook de created, aqui llenamos la funcion vacia con la informacion de la api
        api.getArtists().then(response => (this.artists = response.data.topartists.artist));
    }
}
</script>

<style scoped>

</style>