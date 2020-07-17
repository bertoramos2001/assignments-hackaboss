<template>
  <div>
    <ol>
        <!-- FOR LOOP EN UNA LISTA PARA ORDENAR TODOS LOS ARTISTAS CON LOS DATOS OBTENIDOS DE LA API-->
      <li v-for="(artist, index) in artists" :key="artist.id">
          <table>
              <tr>
                <td class="posicion">
                    <span class="numero">{{ index + 1 }}</span>
                </td>
                <td>
                    <img :src="artist.image[2]['#text']">
                </td>
                <td>
                    <p><span class="title">ARTISTA:</span> {{ artist.name }}</p>
                    <p><span class="title">OYENTES:</span> {{ artist.listeners }}</p>
                    <p><span class="title">URL:</span> <a target="_blank " :href="`${artist.url}`">Página de {{ artist.name }}</a></p>
                </td>
              </tr>
          </table>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
    name: 'TopArtists',
    props: { //recibimos un array con el nombre de artists
        artists: Array
    }
}
</script>

<style scoped>
ol {
    list-style: none;
    min-width: 680px;
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
img {
    display: block;
    transition: all .2s ease-in-out;
}
img:hover {
    transform: scale(1.05);
}
a {
    color:#afbac5;
    transition: all .2s ease-in-out;
    display: inline-block;
}
a:hover {
    transform: scale(1.05);
}
</style>