import {botonesBook, addReserva, list, borrarElemento, removeAll, borrarTodo, aside} from './utils.js'

//Listeners

botonesBook.forEach(boton => boton.addEventListener('click',addReserva))
list.addEventListener('click', borrarElemento)
removeAll.addEventListener('click', borrarTodo)