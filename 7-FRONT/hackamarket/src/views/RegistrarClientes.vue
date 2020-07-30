<template>
  <div>
      <menucustom/>
      <h1>REGISTRA NUEVOS CLIENTES</h1>
      <p v-show="errorMsg" id="camposVacios">*Tienes campos vacíos.</p>

      <input type="text" v-model="nombre" placeholder="Nombre del cliente">
      <br>
      <input type="text" v-model="usuario" placeholder="Nombre de usuario del cliente">
      <br>
      <input type="text" v-model="email" placeholder="Email del cliente">
      <br>
      <input type="password" v-model="contrasena" placeholder="Contraseña del cliente">
      <br>
      <input type="text" v-model="fotografia" placeholder="Fotografia (URL) del cliente">
      <br>
      <button @click="validatingData()">Añadir nuevo cliente</button>
  </div>
</template>

<script>
import axios from 'axios';
import menucustom from '@/components/MenuCustom'
import Swal from 'sweetalert2'

export default {
    name: 'RegistrarClientes',
    components: {
        menucustom
    },
    data() {
        return {
            nombre: '',
            usuario: '',
            email: '',
            contrasena:'',
            fotografia: '',
            createClient: false,
            errorMsg: false
        }
    },
    methods: {
        validatingData() {
            if (this.nombre === '' || this.usuario === '' || this.email === '' || this.contrasena === '' || this.fotografia === '') {
                this.errorMsg = true;
                this.createClient = false;
                Swal.fire({
                    title: 'No puede haber campos vacíos!',
                    text: 'Debes rellenar todos los campos para poder añadir un nuevo cliente',
                    icon: 'error',
                    confirmButtonNext: 'OK',
                })
            }
            else {
                this.createClient = true;
                this.addNewClient()
                this.errorMsg = false;
            }
        },
        addNewClient() {
            if (this.createClient === true) {
                let self = this;
                axios.post('http://localhost:3051/add', {
                    nombre: self.nombre,
                    usuario: self.usuario,
                    email: self.email,
                    contrasena: self.contrasena,
                    fotografia: self.fotografia
                })
                .then(function(response) {
                    console.log(response)
                })
                .catch(function(error) {
                    console.log(error)
                })
                Swal.fire({
                    title: 'Cliente añadido!',
                    text: 'Se ha añadido tu cliente correctamente',
                    icon: 'success',
                    confirmButtonNext: 'OK',
                })
                this.createClient = false;
                this.nombre = '';
                this.usuario = '';
                this.email = '';
                this.contrasena = '';
                this.fotografia = '';
            } else {
                console.log('Yo no debería estar aquí')
            }
        }
    }
}
</script>

<style scoped>
input {
    width: 25rem;
    border: 0;
    border-bottom: 2px solid rebeccapurple;
    color:rebeccapurple;
    font-weight: 700;
    outline: 0;
    font-size: 1.3rem;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
}
::placeholder {
    color: rebeccapurple;
    opacity: 0.3;
}
#camposVacios {
    color: red;
    border-radius: 1rem;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(245, 139, 139, .5)
}
button {
    border-radius: 1rem;
    padding: .5rem 1rem .5rem 1rem;
    background-color: #663399;
    color: whitesmoke;
    font-weight: 700;
    cursor: pointer;
    border: none;
    transition: all ease-in-out 0.2s;
    margin-bottom: 2%;
    margin-top: 2rem;
}
button:hover {
    transform: scale(1.10);
    box-shadow: #daa520 7px 7px 1px;
}
</style>