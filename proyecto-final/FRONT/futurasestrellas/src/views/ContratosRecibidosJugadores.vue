<template>
  <div>
      <menucustom/>
      <h1>CONTRATOS RECIBIDOS JUGADORES</h1>
      <ul v-for="mensaje in mensajes" :key="mensaje.id">
          <li>
              <p>De: {{mensaje.email_ojeador}}</p>
              <p>Para: {{mensaje.email_jugador}}</p>
              {{mensaje.mensaje}}
          </li>
      </ul>
  </div>
</template>
<script>
import menucustom from '@/components/MenuCustom.vue'
import axios from 'axios'
import databaseFunctions from './../../../../BACK/controllers/databaseFunctions.js'

export default {
    name: 'ContratosRecibidosJugadores',
    components: {
        menucustom
    },
    data() {
        return {
            mensajes: []
        }
    },
    created() {
        let self = this; 
    //llamada al back para obtener los contratos recibidos por la familia
    axios.get(`http://localhost:7000/mensajes/familia/${this.$route.params.email}`, {
        headers: {
            Authorization: localStorage.getItem('AUTH_TOKEN_KEY')
        }
    })
      .then(function(response) {
        console.log(response)
        self.mensajes = response.data
      })
      .catch(function(error) {
        console.log(error)
      })
    }
}
</script>

<style scoped>

</style>