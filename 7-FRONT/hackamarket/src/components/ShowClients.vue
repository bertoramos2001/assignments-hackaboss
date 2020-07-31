<template>
  <div>
      <ul v-for="(cliente, index) in clientes" :key="cliente.id">
          <li>
              <table>
                  <tr>
                      <td>
                          <p class="datosCliente id"><span class="titleID">ID: </span> {{ cliente.id }}</p>
                          <img class="imagenCliente" :src="cliente.foto" alt="Imagen de perfil del usuario">
                          <p class="datosCliente"><span class="title">Nombre: </span> {{ cliente.nombre }}</p>
                          <p class="datosCliente"><span class="title">Usuario: </span> {{ cliente.usuario }}</p>
                          <p class="datosCliente"><span class="title">Email: </span> {{ cliente.email }}</p>
                          <p class="datosCliente"><span class="title">Contraseña: </span> {{ cliente.password }}</p>
                          <button @click="enviarDatosCliente(index)" id="botonEditar">Editar <img src="https://img.icons8.com/metro/26/000000/edit.png"/></button>
                          <button @click="enviarIdCliente(index)" id="botonBorrar">Borrar <img src="https://img.icons8.com/metro/26/000000/delete.png"/></button>
                      </td>
                  </tr>
              </table>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name:'ShowClients',
    props: {
        clientes: Array
    },
    methods: {
        enviarDatosCliente(index) {
            let datosCliente = this.clientes[index]
            this.$emit('datos', datosCliente) //el titulo es datos y lo que envio es datosCliente
        },
        enviarIdCliente(index) {
            let clienteID = this.clientes[index].id
            this.$emit('borrar', clienteID)
        }
    }
}
</script>

<style scoped>
div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
ul {
    list-style: none;
    padding:10px;
}
table {
    margin: auto;
    background-color: rgba(102, 51, 153, .3);
    border-radius: 10%;
    transition: ease-in-out 0.2s;
    padding: 0 25px 15px 25px;
}
table:hover {
    transform: translate(-5px, -5px);
}
.title {
    font-weight: 700;
    font-size: 125%;
    color: rebeccapurple;
}
.datosCliente {
    text-align: left;
}
.id {
    text-align: center;
}
p {
    padding-left: 20px;
}
button{
    cursor: pointer;
    padding: 0.3em 1.2em;
    margin: 0 0.1em 0.1em 0;
    background-color: rebeccapurple;
    border-radius: 2em;
    font-weight: 600;
    color:goldenrod;
    transition: all ease-in-out 0.2s;
    border: none;
}
button:hover{
    transform: scale(1.10)
}
#botonEditar {
    margin-right: 15px;
}
#botonBorrar {
    margin-left: 15px;
}
.imagenCliente {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 1rem;
}
</style>