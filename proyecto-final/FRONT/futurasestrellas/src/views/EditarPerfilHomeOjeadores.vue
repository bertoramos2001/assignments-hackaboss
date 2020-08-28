<template>
  <div>
    <vue-headful title="Editar Perfil Ojeadores | FuturasEstrellas"/>
      <menucustom/>
      <h1>EDITAR PERFIL HOME OJEADORES</h1>
      <p>{{infoGeneral}}</p>
      <p v-show="missingParamsMsg" id="camposVacios" class="mensajeError">Hay algún campo vacío</p>

    <div id="formularioEdicion">

      <label for="nombre">Nombre:</label>
      <input type="text" value="hola" name="nombre" v-model="nombre">

      <label for="apellidos">Apellidos:</label>
      <input type="text" name="apellidos" v-model="apellidos" placeholder="Apellidos">


      <label for="email">Email:</label>
      <input type="text" name="email" v-model="email" placeholder="Email">

      <label for="sexo">Sexo:</label>
      <select v-model="sexo" name="sexo" id="sexo">
        <option value="Hombre">Hombre</option>
        <option value="Mujer">Mujer</option>
      </select>

      <label for="provincia">Seleccione la provincia de residencia:</label>
      <select v-model="provincia" name="provincia" id="provincia">
        <option value='Álava'>Álava</option>
        <option value='Albacete'>Albacete</option>
        <option value='Alicante/Alacant'>Alicante/Alacant</option>
        <option value='Almería'>Almería</option>
        <option value='Asturias'>Asturias</option>
        <option value='Ávila'>Ávila</option>
        <option value='Badajoz'>Badajoz</option>
        <option value='Barcelona'>Barcelona</option>
        <option value='Burgos'>Burgos</option>
        <option value='Cáceres'>Cáceres</option>
        <option value='Cádiz'>Cádiz</option>
        <option value='Cantabria'>Cantabria</option>
        <option value='Castellón/Castelló'>Castellón/Castelló</option>
        <option value='Ceuta'>Ceuta</option>
        <option value='Ciudad Real'>Ciudad Real</option>
        <option value='Córdoba'>Córdoba</option>
        <option value='Cuenca'>Cuenca</option>
        <option value='Girona'>Girona</option>
        <option value='Las Palmas'>Las Palmas</option>
        <option value='Granada'>Granada</option>
        <option value='Guadalajara'>Guadalajara</option>
        <option value='Guipúzcoa'>Guipúzcoa</option>
        <option value='Huelva'>Huelva</option>
        <option value='Huesca'>Huesca</option>
        <option value='Illes Balears'>Illes Balears</option>
        <option value='Jaén'>Jaén</option>
        <option value='A Coruña'>A Coruña</option>
        <option value='La Rioja'>La Rioja</option>
        <option value='León'>León</option>
        <option value='Lleida'>Lleida</option>
        <option value='Lugo'>Lugo</option>
        <option value='Madrid'>Madrid</option>
        <option value='Málaga'>Málaga</option>
        <option value='Melilla'>Melilla</option>
        <option value='Murcia'>Murcia</option>
        <option value='Navarra'>Navarra</option>
        <option value='Ourense'>Ourense</option>
        <option value='Palencia'>Palencia</option>
        <option value='Pontevedra'>Pontevedra</option>
        <option value='Salamanca'>Salamanca</option>
        <option value='Segovia'>Segovia</option>
        <option value='Sevilla'>Sevilla</option>
        <option value='Soria'>Soria</option>
        <option value='Tarragona'>Tarragona</option>
        <option value='Santa Cruz de Tenerife'>Santa Cruz de Tenerife</option>
        <option value='Teruel'>Teruel</option>
        <option value='Toledo'>Toledo</option>
        <option value='Valencia/Valéncia'>Valencia/Valéncia</option>
        <option value='Valladolid'>Valladolid</option>
        <option value='Vizcaya'>Vizcaya</option>
        <option value='Zamora'>Zamora</option>
        <option value='Zaragoza'>Zaragoza</option>
      </select>

      <p v-show="ageErrorMsg" id="edadInvalida" class="mensajeError">Los ojeadores deben ser mayores de edad</p>
      <label for="fechaNacimiento">Fecha de nacimiento del/la ojeador/a: (debe ser mayor de edad)</label>
      <input type="date" v-model="fechaNacimiento" placeholder="yyyy-mm-dd" value="04/05/2020">

      <label for="clubActual">Club actual del/la ojeador/a:</label>
      <input type="text" v-model="clubActual" placeholder="Club actual">

      <label for="categoria">Categoría que busca el/la ojeador/a:</label>
      <select v-model="categoria" name="categoria" id="categoria">
        <option value="Prebenjamín">Prebenjamín</option>
        <option value="Benjamín">Benjamín</option>
        <option value="Alevín">Alevín</option>
        <option value="Infantil">Infantil</option>
        <option value="Cadete">Cadete</option>
        <option value="Juvenil">Juvenil</option>
      </select>

      <label for="posicionPrincipal">Posición principal que busca el/la ojeador/a:</label>
      <select v-model="posicion" name="posicionPrincipal" id="posicionPrincipal">
        <option value="Portero">Portero</option>
        <option value="Lateral Derecho">Lateral Derecho</option>
        <option value="Lateral Izquierdo">Lateral Izquierdo</option>
        <option value="Central Derecho">Central Derecho</option>
        <option value="Central Izquierdo">Central Izquierdo</option>
        <option value="Mediocentro Defensivo">Mediocentro Defensivo</option>
        <option value="Mediocentro Creador">Mediocentro Creador</option>
        <option value="Mediocentro Ofensivo">Mediocentro Ofensivo</option>
        <option value="Extremo Derecho">Extremo Derecho</option>
        <option value="Extremo Izquierdo">Extremo Izquierdo</option>
        <option value="Delantero">Delantero</option>
      </select>

      <label for="piernaBuena">Pierna buena que busca el/la ojeador/a:</label>
      <select v-model="piernaBuena" name="piernaBuena" id="piernaBuena">
        <option value="Derecha">Derecha</option>
        <option value="Izquierda">Izquierda</option>
        <option value="Ambas">Ambas</option>
      </select>

      <label for="avatar">Avatar de perfil:</label>
      <input type="file" name="avatar" id="avatar" accept="image/x-png,image/jpeg" @change="avatarPerfil">
    </div>
    <button @click="validatingData()">Actualizar perfil</button>
  </div>
</template>

<script>
import menucustom from '@/components/MenuCustom.vue'
import Swal from 'sweetalert2';
import axios from 'axios';
import moment from 'moment'

export default {
    name: 'editarPerfilHomeOjeadores',
    components: {
        menucustom
    },
    data() {
        return {
            infoGeneral: this.$route.query,
            nombre: this.$route.query.nombre,
            apellidos: this.$route.query.apellidos,
            email: this.$route.query.email,
            sexo: this.$route.query.sexo,
            provincia: this.$route.query.provincia,
            fechaNacimiento: this.$route.query.fecha_nacimiento.slice(0,10),
            clubActual: this.$route.query.club_actual,
            categoria: this.$route.query.categoria_busca,
            posicion: this.$route.query.posicion_principal_busca,
            piernaBuena: this.$route.query.pierna_buena_busca,
            selectedFile: this.$route.query.avatar,
            missingParamsMsg: false,
            invalidPasswordMsg: false,
            passwordsDontMatchMsg: false,
            ageErrorMsg: false
        }
    },
    methods: {
    validatingData() {
      if(this.nombre === '' || this.apellidos === '' || this.sexo === '' || this.provincia === '' || this.fechaNacimiento === '' || this.clubActual === '' || this.categoria === '' || this.posicion === '' || this.piernaBuena === '') {
        this.missingParamsMsg = true;
        Swal.fire({
            title: 'No puede haber campos vacíos!',
            text: 'Debes rellenar todos los campos para poder editar tu perfil',
            icon: 'error',
            confirmButtonText: 'OK',
        })
      } else if(moment().diff(this.fechaNacimiento, 'years') < 18) {
          this.ageErrorMsg = true;
          Swal.fire({
            title: 'El ojeador debe ser mayor de edad!',
            text: 'Debes ser mayor de edad para poder tener una cuenta de ojeador',
            icon: 'error',
            confirmButtonText: 'OK',
        })
      } else {
        this.editarOjeador(this.infoGeneral);
        this.missingParamsMsg = false;
        this.invalidPasswordMsg = false;
        this.passwordsDontMatchMsg = false;
        this.ageErrorMsg = false;
      }
    },
    avatarPerfil(event) {
      this.selectedFile = event.target.files[0]
    },
    editarOjeador(infoGeneral) {
      let self = this;

      let fd = new FormData();
      fd.set('name', self.nombre)
      fd.set('surname', self.apellidos)
      fd.set('email', self.email)
      fd.set('gender', self.sexo)
      fd.set('province', self.provincia)
      fd.set('birthDate', self.fechaNacimiento)
      fd.set('actualClub', self.clubActual)
      fd.set('category', self.categoria)
      fd.set('position', self.posicion)
      fd.set('strongLeg', self.piernaBuena)
      fd.append('avatarPerfil', self.selectedFile)
      axios.put(`http://localhost:7000/perfil/editar/ojeador/${this.infoGeneral.email}/home`,
      fd,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('AUTH_TOKEN_KEY')
        }
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      self.nombre = '';
      self.apellidos = '',
      self.email = '',
      self.sexo = '',
      self.provincia = '',
      self.fechaNacimiento = '',
      self.clubActual = '',
      self.categoria = '',
      self.posicion = '',
      self.piernaBuena = '',
      self.selectedFile = null
      this.$router.push({name: 'PerfilHomeOjeadores', params: infoGeneral.email}).catch(()=>{});
      location.reload()
    }
  }
}
</script>

<style scoped>
#formularioEdicion {
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
</style>