<template>
  <div>
    <ol>
        <!-- FOR LOOP EN UNA LISTA PARA ORDENAR TODAS LAS CANCIONES CON LOS DATOS OBTENIDOS DE LA API-->
      <li v-for="(tag, index) in tags" :key="tag.id">
          <table>
              <tr>
                <td class="posicion">
                    <span class="numero">{{index + 1 }}</span>
                </td>
                <td>
                    <p><span class="title">TAG:</span> {{ tag.name }}</p>
                    <p><span class="title">ALCANCE:</span> {{ tag.reach }}</p>
                    <p><span class="title">VECES USADO:</span> {{ tag.taggings }}</p>
                </td>
              </tr>
          </table>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
    name: 'TopTags',
    props: { //recibimos un array con el nombre de tags
        tags: Array
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
* {
    min-width: 680px;
    margin-right: auto;
    margin-left: auto;
}
</style>