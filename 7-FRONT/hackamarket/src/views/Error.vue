<template>
  <div>
      <h1>404 - FUERA DE JUEGO</h1>
      <br>
      <img src="https://media.giphy.com/media/gKf6ClMACsJUnSLdf3/giphy.gif" alt="fuera de juego"/>
      <div id="bajoError">
          <div id="textoError">
            <p>¡Parece ser que te has perdido!</p>
            <p>Por suerte, ¡puedes pedir el VAR y volver a Home!</p>
          </div>
        <img id="varGif" src="https://media.giphy.com/media/7AdiUcr6MvsK5xfAwh/giphy.gif" alt="pidiendo el var"/>
        <button id="botonVar" @click="pushHome()">PEDIR EL VAR</button>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Error',
    methods: {
        pushHome() {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
img {
    width: 60%;
    border-radius: 1rem;
}
#varGif {
    width: 80%
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
}
button:hover {
    transform: scale(1.10);
    box-shadow: #daa520 7px 7px 1px;
}
#textoError {
    grid-area: texto;
}
#varGif {
    grid-area: gif;
}
#botonVar {
    grid-area: boton;
}
#bajoError {
    padding: 5% 20% 0 20%;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
    grid-template-areas: 
        "gif texto"
        "gif boton"
}
</style>