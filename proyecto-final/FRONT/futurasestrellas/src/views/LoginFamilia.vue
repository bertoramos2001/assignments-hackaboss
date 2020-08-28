<template>
  <div>
    <vue-headful title="Login Familias | FuturasEstrellas"/>
      <h1>LOGIN FAMILIAS</h1>
      <div id="formularioLogin">
        <p v-show="missingParamsMsg" class="errorMessages">Debes rellenar email y contraseña para acceder</p>
        <label for="email">Email del tutor:</label>
        <input v-model="email" type="text" name="email" placeholder="Email">

        <label for="contrasena">Contraseña:</label>
        <input v-model="contrasena" type="password" name="contrasena" placeholder="Contraseña">
        <button @click="validateData()">Iniciar sesión</button>
      </div>
      <p>Todavía no tienes cuenta?</p>
      <button @click="volverALanding()">Regístrate ahora</button>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios'
import { iniciarSesionFamilia } from './../utils/utils.js'

export default {
    name: 'LoginFamilia',
    data() {
      return {
        email: '',
        contrasena: '',
        missingParamsMsg: false
      }
    },
    methods: {
      async validateData() {
        if (this.email === '' || this.contrasena === '') {
          this.missingParamsMsg = true
          Swal.fire({
            title: 'No puede haber campos vacíos!',
            text: 'Debes rellenar todos los campos para poder iniciar seción',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        } else {
          await iniciarSesionFamilia(this.email, this.contrasena);
          if (localStorage.getItem('AUTH_TOKEN_KEY') !== null) {
            this.$router.push('/')
          }
          this.missingParamsMsg = false;
        }
      },
      volverALanding() {
        this.$router.push('/landing')
      }
    }
}
</script>

<style scoped>
#formularioLogin {
  display: flex;
  flex-direction: column;
  align-items: center;
}
input {
  margin-bottom: 1rem;
}
</style>