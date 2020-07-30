<template>
  <div class="about">
    <menucustom/>
    <h1>SOBRE MÍ</h1>
    <h2>Tecnologías usadas en el proyecto:</h2>
    <ul>
          <li>
              <h3>💠1. Vue.js💠</h3>
          </li>
          <p>Este es el framework con el que trabajamos el apartado de front en el bootcamp de Hack a Boss, por lo que fue el que empleé.</p>
          <li>
              <h3>🔶2. Librería Express🔶</h3>
              <p>Con esta librería he podido realizar llamadas al back y a la base de datos e intercambiar datos entre el front y estos componentes.</p>
          </li>
          <li>
              <h3>🔰3. Base de Datos MySQL🔰</h3>
              <p>Base de datos en la que guardo tanto los clientes como los productos, accediendo a esta a través de la anteriormente mencionada librería de express</p>
          </li>
          <li>
              <h3>🔆4. Librería Vue-headful🔆</h3>
              <p>Librería empleada para añadir información a cada página de la web. En este caso fue empleada para añadir títulos a cada vista.</p>
          </li>
          <li>
              <h3>🔱4. Librería axios🔱</h3>
              <p>Librería empleada para realizar las llamadas a la api y a la base de datos desde el front</p>
          </li>
      </ul>
      <h2>Mis Redes Sociales</h2>
      <div>
        <p>Mi <a href="https://www.instagram.com/alber_rs6/?hl=es">Instagram</a></p>
        <p>Mi <a href="https://twitter.com/alber_rs6">Twitter</a></p>
        <p>Mi email -> <span id="email">bertoramos2001@gmail.com</span></p>

      </div>
  </div>
</template>

<script>
import menucustom from '@/components/MenuCustom'

export default {
  components: {
    menucustom
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  text-align: left;
  padding: 1% 10% 0 15%;
}
li {
  padding: 10px 0 0 0;
}
a {
  font-weight: 600;
}
#email {
  text-decoration: underline;
  font-weight: 600;
}
</style>
