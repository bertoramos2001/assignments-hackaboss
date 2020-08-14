<template>
  <div>
      <menucustom/>
      <h1>BUSCAR USUARIOS</h1>
      <!-- div del formulario de busqueda de usuarios -->
      <div id="formularioBusqueda">
          <p v-show="missingParamsMsg" id="camposVacios" class="mensajeError">El campo de rol no puede estar vacío</p>
        <label for="rol">Busco un/a... <br>(obligatorio seleccionar una opción)</label>
        <select v-model="rol" name="rol" id="rol">
            <option value="familia">Jugador/a</option>
            <option value="ojeador">Ojeador/a</option>
        </select>

      <label for="nombre">Que se llame...</label>
      <input type="text" name="nombre" v-model="nombre" placeholder="Nombre">

      <label for="apellidos">Que se apellide...</label>
      <input type="text" name="apellidos" v-model="apellidos" placeholder="Apellidos">

      <label for="rol">Que sea...</label>
        <select v-model="rol" name="rol" id="rol">
            <option value="male">Hombre</option>
            <option value="female">Mujer</option>
        </select>

        <label for="provincia">De...</label>
      <select v-model="provincia" name="provincia" id="provincia">
        <option value='alava'>Álava</option>
        <option value='albacete'>Albacete</option>
        <option value='alicante'>Alicante/Alacant</option>
        <option value='almeria'>Almería</option>
        <option value='asturias'>Asturias</option>
        <option value='avila'>Ávila</option>
        <option value='badajoz'>Badajoz</option>
        <option value='barcelona'>Barcelona</option>
        <option value='burgos'>Burgos</option>
        <option value='caceres'>Cáceres</option>
        <option value='cadiz'>Cádiz</option>
        <option value='cantabria'>Cantabria</option>
        <option value='castellon'>Castellón/Castelló</option>
        <option value='ceuta'>Ceuta</option>
        <option value='ciudadreal'>Ciudad Real</option>
        <option value='cordoba'>Córdoba</option>
        <option value='cuenca'>Cuenca</option>
        <option value='girona'>Girona</option>
        <option value='laspalmas'>Las Palmas</option>
        <option value='granada'>Granada</option>
        <option value='guadalajara'>Guadalajara</option>
        <option value='guipuzcoa'>Guipúzcoa</option>
        <option value='huelva'>Huelva</option>
        <option value='huesca'>Huesca</option>
        <option value='illesbalears'>Illes Balears</option>
        <option value='jaen'>Jaén</option>
        <option value='acoruña'>A Coruña</option>
        <option value='larioja'>La Rioja</option>
        <option value='leon'>León</option>
        <option value='lleida'>Lleida</option>
        <option value='lugo'>Lugo</option>
        <option value='madrid'>Madrid</option>
        <option value='malaga'>Málaga</option>
        <option value='melilla'>Melilla</option>
        <option value='murcia'>Murcia</option>
        <option value='navarra'>Navarra</option>
        <option value='ourense'>Ourense</option>
        <option value='palencia'>Palencia</option>
        <option value='pontevedra'>Pontevedra</option>
        <option value='salamanca'>Salamanca</option>
        <option value='segovia'>Segovia</option>
        <option value='sevilla'>Sevilla</option>
        <option value='soria'>Soria</option>
        <option value='tarragona'>Tarragona</option>
        <option value='santacruztenerife'>Santa Cruz de Tenerife</option>
        <option value='teruel'>Teruel</option>
        <option value='toledo'>Toledo</option>
        <option value='valencia'>Valencia/Valéncia</option>
        <option value='valladolid'>Valladolid</option>
        <option value='vizcaya'>Vizcaya</option>
        <option value='zamora'>Zamora</option>
        <option value='zaragoza'>Zaragoza</option>
      </select>

      <label for="edadMinima">Edad mínima:</label>
      <input type="number" name="edadMinima" v-model="edadMinima" min="1" max="100">

      <label for="edadMaxima">Edad máxima:</label>
      <input type="number" name="edadMaxima" v-model="edadMaxima" min="1" max="100">

      <label for="posicionPrincipal">Que juegue principalmente de...</label>
      <select v-model="posicion" name="posicionPrincipal" id="posicionPrincipal">
        <option value="portero">Portero</option>
        <option value="lateralDerecho">Lateral Derecho</option>
        <option value="lateralIzquierdo">Lateral Izquierdo</option>
        <option value="centralDerecho">Central Derecho</option>
        <option value="centralIzquierdo">Central Izquierdo</option>
        <option value="mediocentroDefensivo">MediocentroDefensivo</option>
        <option value="medioccentroCreador">Mediocentro Creador</option>
        <option value="mediocentroOfensivo">Mediocentro Ofensivo</option>
        <option value="extremoDerecho">Extremo Derecho</option>
        <option value="extremoIzquierdo">Extremo Izquierdo</option>
        <option value="delantero">Delantero</option>
      </select>

      <label for="categoria">Que sea un...</label>
      <select v-model="categoria" name="categoria" id="categoria">
        <option value="prebenjamin">Prebenjamín</option>
        <option value="benjamin">Benjamín</option>
        <option value="alevin">Alevín</option>
        <option value="infantil">Infantil</option>
        <option value="cadete">Cadete</option>
        <option value="juvenil">Juvenil</option>
      </select>

      <label for="piernaBuena">Que su pierna buena sea...</label>
      <select v-model="piernaBuena" name="piernaBuena" id="piernaBuena">
        <option value="derecha">Derecha</option>
        <option value="izquierda">Izquierda</option>
        <option value="ambas">Ambas</option>
      </select>
      </div>
      <!-- este boton llama a la funcion de validar datos, que nos dira si nuestros datos son correctos -->
      <button @click="validatingData()">Buscar usuarios</button>
      <button @click="limpiarFiltros()">Limpiar filtros</button>
      <h2>RESULTADOS</h2>
      <div id="listaUsuarios">
          <ul v-for="user in users" :key="user.index">
          <li>
              <table @click="redirectProfile(user.email, user.email_tutor)">
                  <tr>
                      <td class="tdImagen">
                      <img class="imagenAvatar" :src="getImgUrl(user.avatar)" alt="avatar de perfil">
                    </td>
                    <td class="titulos1">
                        <p class="titulo">Nombre:</p>
                        <p class="titulo">Categoría:</p>
                        <p class="titulo">Posición:</p>
                    </td>
                    <td class="tdDatos1">
                      <p> {{user.nombre}} {{user.apellidos}} {{user.nombre_jugador}} {{user.apellidos_jugador}}</p>
                      <p> {{user.categoria}} {{user.categoria_busca}}</p>
                      <p> {{user.posicion_principal}} {{user.posicion_principal_busca}}</p>
                    </td>
                    <td class="titulos2">
                        <p class="titulo">Sexo:</p>
                        <p class="titulo">Provincia:</p>
                        <p class="titulo">Pierna:</p>
                    </td>
                    <td class="tdDatos2">
                      <p>{{user.sexo}}</p>
                      <p>{{user.provincia}}</p>
                      <p>{{user.pierna_buena}} {{user.pierna_buena_busca}}</p>
                    </td>
                  </tr>
              </table>
          </li>
      </ul>
      </div>
  </div>
</template>

<script>
import menucustom from '@/components/MenuCustom.vue'
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
    name: 'BuscarUsuarios',
    components: {
        menucustom //importamos el menu de navegacion desde su componente
    },
    data() {
        return { //añadimos los datos a rellenar para la busqueda de usuarios
            rol: '',
            nombre: '',
            apellidos: '',
            sexo: '',
            provincia: '',
            edadMaxima: '',
            edadMinima: '',
            clubActual: '',
            categoria: '',
            posicion: '',
            piernaBuena: '',
            missingParamsMsg: false,
            users: []
        }
    },
    methods: {
        redirectProfile(emailOjeador, emailFamilia) {
            if (emailOjeador !== undefined) {
                this.$router.push(`/perfil/ojeador/${emailOjeador}`)
            } else if (emailFamilia !== undefined) {
                this.$router.push(`/perfil/familia/${emailFamilia}`)
            }
        },
        getImgUrl(file) {
            return require('./../../../../BACK/' + file);
        },
        validatingData() { //comprobamos si el campo de rol ha sido especificado
            if (this.rol === '') {
                this.missingParamsMsg = true;
                Swal.fire({
                    title: 'El campo de rol no puede estar vacío!',
                    text: 'Debes rellenar el campo de rol para poder buscar usuarios',
                    icon: 'error',
                    confirmButtonText: 'OK',
                })
            } else {
                this.buscarUsuarios();
                this.missingParamsMsg = true;
            }
        },
        buscarUsuarios () { //llamamos a la api para buscar usuarios
            let self = this;
            axios.get(`http://localhost:7000/search?rol=${self.rol}&nombre=${self.nombre}&apellidos=${self.apellidos}&genero=${self.sexo}&provincia=${self.provincia}&edadMinima=${self.edadMinima}&edadMaxima=${self.edadMaxima}&posicion=${self.posicion}&categoria=${self.categoria}&piernaBuena=${self.piernaBuena}&`)
            .then(function(response) {
                self.users = response.data
            })
            .catch(function(error) {
                console.log(error)
            })
            this.missingParamsMsg = false;
        },
        limpiarFiltros() {
            this.nombre = '';
            this.rol = '';
            this.nombre = '';
            this.apellidos = '';
            this.sexo = '';
            this.provincia = '';
            this.edadMaxima = '';
            this.edadMinima = '';
            this.clubActual = '';
            this.categoria = '';
            this.posicion = '';
            this.piernaBuena = '';
            this.missingParamsMsg = false;
        }
    }
}
</script>

<style scoped>
#formularioBusqueda {
  display: flex;
  flex-direction: column;
  align-items: center;
}
input {
  margin-bottom: 1rem;
}
select {
  margin-bottom: 1rem;
}
ul {
    list-style: none;
}
.tdImagen {
    margin: 0;
}
.imagenAvatar {
    width: 125px;
    height: 125px;
    object-fit: cover;
    border-radius: 50%;
    padding: 1rem;
}
#listaUsuarios {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
}
table {
    background-color: rgba(255, 166, 0, 0.513);
    width: 80vw;
    max-width: 900px;
    border-radius: 1rem;
    transition: all .2s ease-in-out;
}
table:hover {
    cursor: pointer;
    transform: scale(1.05)
}
td {
    width: 30%;
}
.titulos1 {
    width: auto;
    height: auto;
}
.titulos2 {
    width: auto;
}
.titulo {
    font-weight: 700;
    font-size: 110%;
}
</style>