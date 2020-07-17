<template>
  <div>
    <ol>
        <!-- FOR LOOP EN UNA LISTA PARA ORDENAR TODAS LAS CANCIONES CON LOS DATOS OBTENIDOS DE LA API-->
      <li v-for="(track, index) in tracks" :key="track.id">
          <table>
              <tr>
                  <td class="posicion">
                      <span class="numero">{{index + 1 }}</span>
                  </td>
                  <td class="imagen">
                      <img :src="track.image[2]['#text']">
                  </td>
                  <td>
                      <p><span class="title">CANCIÓN:</span> {{ track.name }}</p>
                      <p><span class="title">ARTISTA:</span> {{ track.artist.name }}</p>
                  </td>
              </tr>
          </table>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
    name: 'TopTracks',
    props: { //recibimos un array con el nombre de tracks
        tracks: Array
    }
}
</script>

<style scoped>
ol {
    list-style: none;
    padding:10px;
}
li {
    text-align: left;
    padding-left: 50px;
}
.posicion {
    font-size: 300%;
    font-weight: 700;
    padding-right: 6rem;
    min-width: 54px;
    max-width: 54px;
}
.numero {
    padding: 1rem 1.75rem 1rem 1.75rem;
    color: #42b983;
    background-color: #1D232A;
    border: 0.35rem solid #42b983;
    border-radius: 50%;
}
.title {
    font-weight: 600;
    font-size: 125%;
    color: #42b983;
}
.imagen {
    max-width: 174px;
    min-width:174px;
}
img {
    display: block;
    transition: all .2s ease-in-out;
    max-width: 174px;
    min-width:174px;
}
img:hover {
    transform: scale(1.05);
}
</style>