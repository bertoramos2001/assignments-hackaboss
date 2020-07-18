<template>
  <div class="about">
    <vue-headful title="About"/>
    <h1>👉 Tecnologías utilizadas en esta entrega 👈</h1>
    <tecnologiasusadas/>
  </div>
</template>

<script>
//Importamos el componente de lista de tags más escuchados
import tecnologiasusadas from '@/components/TecnologiasUsadas.vue'

export default {
  name: 'About',
  components: {
    tecnologiasusadas
  }
}
</script>

<style scoped>
h1 {
    padding: 0 25px 25px 25px;
}
</style>
