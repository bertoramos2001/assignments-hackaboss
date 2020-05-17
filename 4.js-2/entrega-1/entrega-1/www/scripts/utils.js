//Variables
const botonesBook = document.querySelectorAll('.pie-hotel')
const list = document.getElementById('lista-reservas')
const removeAll = document.getElementById('boton-borrar-todo')
const aside = document.getElementById('aside-reservas')


//Funciones
const borrarTodo = e => {
    let listaHoteles = e.target.parentElement.querySelectorAll('li')
    listaHoteles.forEach(hotel => hotel.remove())
    aside.style.display = 'none'
}

const borrarElemento = e => {
    if (e.target.parentElement.parentElement.getElementsByTagName('li').length == 1) {
        aside.style.display = 'none'
    }
    if(e.target.classList.contains('delete')) {
        e.target.parentElement.remove()
    }
}

const addElemento = elemento => {
    list.appendChild(elemento)
    aside.style.display = 'block'
}

const crearElemento = card => {
    const img = document.createElement('img')
    img.setAttribute('src', card.imagen)
    img.setAttribute('width', 50)
    img.setAttribute('height', 50)
    img.setAttribute('alt', 'imagen del hotel')
    img.classList = 'foto-hotel'

    const li = document.createElement('li')
    li.textContent = `${card.nombre} ${card.precio}`

    const button = document.createElement('button')
    button.classList = 'delete'
    button.textContent = 'x'

    li.appendChild(img)
    li.appendChild(button)
    li.classList = 'hotel-reservado'
    addElemento(li)
}


const datosHotel = articleHotel => {
    const info = {
        imagen: articleHotel.querySelector('.imagen-hotel').src,
        nombre: articleHotel.querySelector('.nombre-hotel').textContent,
        precio: articleHotel.querySelector('.precio-hotel').textContent
    }
    crearElemento(info)
}

const addReserva = e => {
    datosHotel(e.target.parentElement)
}

aside.style.display = 'none'

export {botonesBook, addReserva, list, borrarElemento, removeAll, borrarTodo, aside}