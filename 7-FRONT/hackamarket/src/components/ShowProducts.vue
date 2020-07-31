<template>
  <div>
      <ul v-for="producto in productos" :key="producto.id">
          <li>
              <table>
                  <tr>
                      <td>
                          <img class="imagenProducto" :src="producto.imagen" alt="Imagen del producto">
                          <p class="datosProducto"><span class="title">Nombre: </span> {{ producto.nombre }}</p>
                          <p class="datosProducto"><span class="title">Stock: </span><span id="numeroStock">{{ producto.stock }}</span></p>
                          <p class="datosProducto"><span class="title">Disponibilidad: </span><span :class="{ green: producto.disponibilidad === 'Disponible', red: producto.disponibilidad === 'No disponible' }">{{ producto.disponibilidad }}</span></p>
                          <div v-show="seeButtons">
                              <button @click="comprarProducto()">Comprar</button>
                              <button @click="reservarProducto()">Reservar</button>
                          </div>
                      </td>
                  </tr>
              </table>
          </li>
      </ul>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    name: 'ShowProducts',
    data() {
        return {
            seeButtons: true
        }
    },
    props: {
        productos: Array
    },
    methods: {
        comprarProducto() {
                let self = this;
                Swal.fire({
                title: '¡Producto comprado!',
                text: 'Gracias por tu compra',
                icon: 'success',
                confirmButtonText: 'OK',
                onClose: () => {
                    location.reload()
                }
            })
        },
        reservarProducto() {
                let self = this;
                Swal.fire({
                title: '¡Producto reservado!',
                text: 'Gracias por tu reserva',
                icon: 'success',
                confirmButtonText: 'OK',
                onClose: () => {
                    location.reload()
                }
            })
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
.datosProducto {
    text-align: left;
}
.id {
    text-align: center;
}
.green {
    color: yellowgreen;
    font-weight: 500;
}
.red {
    color: brown;
    font-weight: 500;
}
#numeroStock {
    font-size: 130%;
}
p {
    padding-left: 20px;
}
button{
    cursor: pointer;
    padding: 0.7em 1.2em;
    margin: .5rem;
    background-color: rebeccapurple;
    border-radius: 2em;
    font-weight: 600;
    color: goldenrod;
    transition: all ease-in-out 0.2s;
    border: none;
}
button:hover{
    transform: scale(1.10)
}
.imagenProducto {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 1rem;
    margin-top: 3rem;
}
</style>