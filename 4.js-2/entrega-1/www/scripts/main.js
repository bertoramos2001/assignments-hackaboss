import {botonesBook, addReserva, crearElemento, removeAll, borrarTodo} from './utils.js'

//Listeners

botonesBook.forEach(boton => boton.addEventListener('click',addReserva))
// list.addEventListener('click', borrarElemento)
removeAll.addEventListener('click', borrarTodo)
document.addEventListener('DOMContentLoaded', crearElemento(JSON.parse(localStorage.getItem('hoteles'))))