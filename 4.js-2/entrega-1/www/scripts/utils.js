//Variables
const botonesBook = document.querySelectorAll('.pie-hotel')
const list = document.getElementById('lista-reservas')
const removeAll = document.getElementById('boton-borrar-todo')
const aside = document.getElementById('aside-reservas')


//Funciones

const crearElemento = hoteles => {
    localStorage.setItem('hoteles', JSON.stringify(hoteles))
    list.innerHTML = ''
    hoteles.forEach((card, i) => {
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
        button.addEventListener('click', () => borrarLocalStorage(i))

        li.appendChild(img)
        li.appendChild(button)
        li.classList = 'hotel-reservado'
        list.appendChild(li)
        if (list.getElementsByTagName('li').length >= 1) {
            aside.style.display = 'block'
        }
    })
}
const borrarTodo = () => {
    localStorage.clear()
    aside.style.display = 'none'
}

const borrarLocalStorage = indice => {
    const hoteles = cargarLocalStorage()
    hoteles.splice(indice, 1)
    if(hoteles.length == 0) {
        aside.style.display = 'none'
    }
    crearElemento(hoteles)
}

const cargarLocalStorage = () => {
    return JSON.parse(localStorage.getItem('hoteles'))
}

const addLocalStorage = hotel => {
    const hoteles = cargarLocalStorage() || []
    const newHoteles = [...hoteles, hotel]
    crearElemento(newHoteles)
}


const datosHotel = articleHotel => {
    const info = {
        imagen: articleHotel.querySelector('.imagen-hotel').src,
        nombre: articleHotel.querySelector('.nombre-hotel').textContent,
        precio: articleHotel.querySelector('.precio-hotel').textContent
    }
    addLocalStorage(info)
}

const addReserva = e => {
    datosHotel(e.target.parentElement)
}

aside.style.display = 'none'

export {botonesBook, addReserva, crearElemento, removeAll, borrarTodo}