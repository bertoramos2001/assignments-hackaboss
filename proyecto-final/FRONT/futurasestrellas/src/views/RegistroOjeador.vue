<template>
  <div>
    <h1>REGISTRO DE OJEADORES</h1>
    <p v-show="missingParamsMsg" id="camposVacios">Hay algún campo vacío</p>
    <div id="formularioRegistro" class="mensajeError">
      <label for="nombre">Nombre del/la ojeador/a:</label>
      <input type="text" name="nombre" v-model="nombre" placeholder="Nombre">

      <label for="apellidos">Apellidos del/la ojeador/a:</label>
      <input type="text" name="apellidos" v-model="apellidos" placeholder="Apellidos">

      <label for="email">Email:</label>
      <input type="text" name="email" v-model="email" placeholder="Email">

      <label for="sexo">Sexo del/la ojeador/a:</label>
      <select v-model="sexo" name="sexo" id="sexo">
        <option value="male">Hombre</option>
        <option value="female">Mujer</option>
      </select>

      <label for="provincia">Seleccione la provincia de residencia:</label>
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

      <p v-show="ageErrorMsg" id="edadInvalida" class="mensajeError">Los ojeadores deben ser mayores de edad</p>
      <label for="fechaNacimiento">Fecha de nacimiento del/la ojeador/a: (debe ser mayor de edad)</label>
      <input type="date" v-model="fechaNacimiento" placeholder="yyyy-mm-dd">

      <label for="clubActual">Club actual del/la ojeador/a:</label>
      <input type="text" v-model="clubActual" placeholder="Club actual">

      <label for="categoria">Categoría que busca el/la ojeador/a:</label>
      <select v-model="categoria" name="categoria" id="categoria">
        <option value="prebenjamin">Prebenjamín</option>
        <option value="benjamin">Benjamín</option>
        <option value="alevin">Alevín</option>
        <option value="infantil">Infantil</option>
        <option value="cadete">Cadete</option>
        <option value="juvenil">Juvenil</option>
      </select>

      <label for="posicionPrincipal">Posición principal que busca el/la ojeador/a:</label>
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

      <label for="piernaBuena">Pierna buena que busca el/la ojeador/a:</label>
      <select v-model="piernaBuena" name="piernaBuena" id="piernaBuena">
        <option value="derecha">Derecha</option>
        <option value="izquierda">Izquierda</option>
        <option value="ambas">Ambas</option>
      </select>

      <label for="avatar">Avatar de perfil:</label>
      <input type="file" name="avatar" id="avatar" accept="image/x-png,image/jpeg" @change="avatarPerfil">

      <p v-show="invalidPasswordMsg" id="contrasenaInvalida" class="mensajeError">La contraseña que has introducido no es válida</p>
      <p v-show="passwordsDontMatchMsg" id="contrasenasDiferentes" class="mensajeError">Las contraseñas introducidas no coinciden</p>
      <label for="contrasena">Introduzca una contraseña:</label>
      <input type="password" name="password" v-model="contrasena" placeholder="contraseña">

      <label for="confirmarContrasena">Confirmar contraseña:</label>
      <input type="password" name="confirmPassword" v-model="confirmarContrasena" placeholder="contraseña">
    </div>
    <button @click="validatingData()">Registrarse</button>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import moment from 'moment'

export default {
  name: "RegistroFamilia",
  data() {
    return {
      nombre: '',
      apellidos: '',
      email: '',
      sexo: '',
      provincia: '',
      fechaNacimiento: '',
      clubActual: '',
      categoria: '',
      posicion: '',
      piernaBuena: '',
      contrasena: '',
      confirmarContrasena: '',
      selectedFile: null,
      missingParamsMsg: false,
      invalidPasswordMsg: false,
      passwordsDontMatchMsg: false,
      ageErrorMsg: false

    }
  },
  methods: {
    validatingData() {
      if(this.nombre === '' || this.apellidos === '' || this.email === '' || this.sexo === '' || this.provincia === '' || this.fechaNacimiento === '' || this.clubActual === '' || this.categoria === '' || this.posicion === '' || this.piernaBuena === '' || this.contrasena === '' || this.confirmarContrasena === '') {
        this.missingParamsMsg = true;
        Swal.fire({
            title: 'No puede haber campos vacíos!',
            text: 'Debes rellenar todos los campos para poder añadir un nuevo cliente',
            icon: 'error',
            confirmButtonText: 'OK',
        })
      } else if(moment().diff(this.fechaNacimiento, 'years') < 18) {
          this.ageErrorMsg = true;
          Swal.fire({
            title: 'El ojeador debe ser mayor de edad!',
            text: 'Debes ser mayor de edad para registrarte como ojeador',
            icon: 'error',
            confirmButtonText: 'OK',
        })
      } else if(this.contrasena.length < 8 || this.contrasena.toLowerCase() === this.contrasena || /\d/.test(this.contrasena) === false) {
          this.invalidPasswordMsg = true;
          Swal.fire({
            title: 'Tu contraseña no es válida!',
            text: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número',
            icon: 'error',
            confirmButtonText: 'OK',
        })
      } else if (this.contrasena !== this.confirmarContrasena){
        this.passwordsDontMatchMsg = true
        Swal.fire({
            title: 'Tus contraseñas no coinciden!',
            text: 'Las contraseñas deben ser iguales',
            icon: 'error',
            confirmButtonText: 'OK',
        })
      } else {
        this.registrarOjeador();
        this.missingParamsMsg = false;
        this.invalidPasswordMsg = false;
        this.passwordsDontMatchMsg = false;
        this.ageErrorMsg = false;
      }
    },
    avatarPerfil(event) {
      this.selectedFile = event.target.files[0]
    },
    registrarOjeador () {
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
      fd.set('password', self.contrasena)
      fd.set('confirmPassword', self.confirmarContrasena)
      fd.append('avatarPerfil', self.selectedFile)
      axios.post('http://localhost:7000/registroOjeador',
      fd,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
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
      self.contrasena = '',
      self.confirmarContrasena = '',
      self.selectedFile = null
    }
  }
};
</script>

<style scoped>
#formularioRegistro {
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