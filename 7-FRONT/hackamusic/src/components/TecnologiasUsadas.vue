<template>
  <div>
      <h2>¡Hola! Mi nombre es Alberto Ramos y he hecho esta plataforma utilizando las siguientes tecnologías:</h2>
      <ul>
          <li>
              <h3>💠1. Vue.js💠</h3>
          </li>
          <p>Este es el framework con el que trabajamos el apartado de front en el bootcamp de Hack a Boss, por lo que fue el que empleé.</p>
          <li>
              <h3>🔶2. API de Lastfm🔶</h3>
              <p>Esta es la API utilizada en este proyecto, con la que obtenemos tanto los artistas como las canciones o etiquetas más escuchadas en España.</p>
          </li>
          <li>
              <h3>🔰3. librería AXIOS🔰</h3>
              <p>Librería empleada para realizar peticiones a la API y así poder obtener los datos previamente mencionados de esta.</p>
          </li>
          <li>
              <h3>🔆4. Librería Vue-headful🔆</h3>
              <p>Librería empleada para añadir información a cada página de la web. En este caso fue empleada para añadir títulos a cada vista.</p>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'TecnologiasUsadas'
}
</script>

<style scoped>
div {
    padding: 0 15px 0 15px;
}
ul {
    list-style: none;
}
li {
        font-size: 130%
}
</style>