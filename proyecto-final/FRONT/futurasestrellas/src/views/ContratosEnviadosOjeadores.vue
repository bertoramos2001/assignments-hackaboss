<template>
  <div>
      <menucustom/>
      <h1>CONTRATOS ENVIADOS OJEADORES</h1>
      <ul v-for="mensaje in mensajes" :key="mensaje.id">
          <li>
              <div class="personasMensajes">
                  <span>De: <button @click="redirectPerfilOjeador(mensaje.email_ojeador)">{{mensaje.email_ojeador}}</button></span> <br>
                  <span class="emailJugador">Para: <button @click="redirectPerfilFamilia(mensaje.email_jugador)">{{mensaje.email_jugador}}</button></span>
              </div>
              <p class="textoMensaje">{{mensaje.mensaje}}</p>
          </li>
      </ul>
  </div>
</template>

<script>
import menucustom from '@/components/MenuCustom.vue'
import axios from 'axios'

export default {
    name: 'ContratosEnviadosOjeadores',
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
    axios.get(`http://localhost:7000/mensajes/ojeador/${this.$route.params.email}`, {
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
    },
    methods: {
        redirectPerfilOjeador(email) {
            this.$router.push(`/perfil/ojeador/${email}`).catch(()=>{});
        },
        redirectPerfilFamilia(email) {
            this.$router.push(`/perfil/familia/${email}`).catch(()=>{});
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
}
.personasMensajes {
    position: relative;
    left: 0;
    background-color: orange;
    width: 400px;
    border-radius: .5rem .5rem 0 0;
}
.textoMensaje {
    background-color: whitesmoke;
    border-radius: 0 .5rem .5rem .5rem;
    padding: 1rem;
    margin: 0 2rem 3rem 0;
}
.emailJugador {
    margin-bottom: 0;
}
</style>