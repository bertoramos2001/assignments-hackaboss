<template>
  <div class="home">
    <menucustom/>
    <h1>HOME</h1>
    <div id="main">
      <h1 id="tituloSeccion">BIENVENIDOS A HACKAMARKET</h1>
    </div>
  </div>
</template>

<script>
import menucustom from '@/components/MenuCustom'

export default {
  name: 'Home',
  components: {
    menucustom
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
#main {
  background-image: url(https://image.freepik.com/free-photo/blank-brown-wooden-table-front-blurred-market-background_32771-267.jpg);
  height: 80vh;
  background-size: cover;
  background-position: center;
}
#tituloSeccion {
  position: relative;
  top: 50%;
  font-family: 'Lobster', cursive;
  color: goldenrod;
  text-shadow: 5px 5px 1px rebeccapurple;
  font-size: 500%;
}
</style>