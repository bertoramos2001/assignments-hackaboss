<template>
<!-- En el div de vue, añadimos los componentes que queremos que se vean en la vista -->
  <div class="home">
    <vue-headful title="Top Etiquetas | Home"/>
    <h1>Las etiquetas más utilizadas</h1>
    <toptags :tags="tags"/>
  </div>
</template>

<script>
//Importamos la api que vamos a usar
import api from '@/api/index.js'
//Importamos el componente de lista de tags más escuchados
import toptags from '@/components/TopTags.vue'

export default {
  name: 'Home',
  components: {
    toptags
  },
  data() {
    return {
      tags: []
    }
  },
  created() { //llamamos a la funcion getTags() de la api en el hook de created, aqui llenamos la funcion vacia con la informacion de la api
    api.getTags().then(response => (this.tags = response.data.tags.tag))
  }
}
</script>
