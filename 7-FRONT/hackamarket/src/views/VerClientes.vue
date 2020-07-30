<template>
  <div>
      <menucustom/>
      <h1>LISTA DE CLIENTES</h1>
      <showclients v-on:borrar="borrandoCliente" v-on:datos="mostrarInfoCliente" :clientes="clientes"/>

    <!-- MODAL PARA ACTUALIZAR CLIENTE -->
    <div v-show="seeModal" class="modal">
      <div class="modalBox">
        <h3>Actualiza los datos de tu cliente: </h3>
        <p>
          ID del cliente: {{ idCliente }}
        </p>
        <input type="text" placeholder="Nombre del cliente" v-model="nombreActualizado">
        <br>
        <input type="text" placeholder="Nombre de usuario del cliente" v-model="usuarioActualizado">
        <br>
        <input type="text" placeholder="Email del cliente" v-model="emailActualizado">
        <br>
        <input type="password" placeholder="Contraseña del cliente" v-model="contrasenaActualizada">
        <br>
        <input type="text" placeholder="Fotografía (URL) del cliente" v-model="fotoActualizada">
        <br>
        <button @click="seeModal = !seeModal">Cancelar</button>
        <button @click="actualizarCliente()">Actualizar cliente</button>
      </div>
    </div>
  </div>
</template>

<script>
import menucustom from '@/components/MenuCustom'
import showclients from '@/components/ShowClients'
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    
    name: 'VerClientes',
    components: {
        menucustom,
        showclients
    },
    data() {
    return {
      clientes: [],
      idCliente: '',
      nombreActualizado: '',
      usuarioActualizado: '',
      emailActualizado: '',
      contrasenaActualizada: '',
      fotoActualizada: '',
      seeModal: false
    }
  },
  methods: {
    borrandoCliente(clienteID) {
      let self = this;
      Swal.fire({
        title: '¡Atención!',
        text: 'Vas a borrar el cliente',
        icon: 'warning',
        confirmButtonNext: 'OK',
        onClose: () => {
          axios.delete('http://localhost:3051/delete/' + clienteID)
          .then(function(response) {
        console.log(response)
        })
      . catch(function(error) {
        console.log(error)
        })
        location.reload()
        }
      })
    },
    actualizarCliente() {
      let self = this;
      axios.put('http://localhost:3051/update/' + self.idCliente, {
        nombre: self.nombreActualizado,
        usuario: self.usuarioActualizado,
        email: self.emailActualizado,
        password: self.contrasenaActualizada,
        foto: self.fotoActualizada
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
      Swal.fire({
        title: '¡Nota editada!',
        text: 'Tu cliente se ha editado correctamente',
        icon: 'success',
        confirmButtonNext: 'OK',
        onClose: () => { 
          location.reload()
        }
      })
    },
    mostrarInfoCliente(datosCliente) {
      this.nombreActualizado = datosCliente.nombre
      this.usuarioActualizado = datosCliente.usuario
      this.emailActualizado = datosCliente.email
      this.contrasenaActualizada = datosCliente.password
      this.fotoActualizada = datosCliente.foto
      this.idCliente = datosCliente.id

      this.seeModal = true
    },
    //funcion para conseguir mis clientes
    getClients() {
      let self = this;
      //llamada de axios a la api
      axios.get('http://localhost:3051/clientes')
      .then(function (response) {
        self.clientes = response.data
      })
      .catch(function(error) {
        console.log(error)
      })
    }
  },
  created() {
    this.getClients()
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0,0,0,0.8);
}
input {
    width: 25rem;
    border: 0;
    border-bottom: 2px solid #2e4e6e;
    color:#fd5000;
    font-weight: 700;
    font-family: 'Quicksand', sans-serif;
    outline: 0;
    font-size: 1.3rem;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
}
button{
    cursor: pointer;
    padding: 1.3em 2.4em;
    margin: 1em;
    background-color: #ff8738;
    border-radius: 2em;
    font-weight: 600;
    font-size: 100%;
    color:#2e4e6e;
    transition: all ease-in-out 0.2s;
    border: 2px solid #2e4e6e;
}
button:hover{
    border-color: #fd5000;
    background-color: #2e4e6e;
    color: #fd5000;
    transform: scale(1.10)
}
h3, p {
  color: #fd5000;
  text-shadow: 1px 1px #2e4e6e;
}
</style>