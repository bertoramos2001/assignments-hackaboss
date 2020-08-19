<template>
  <div>
      <menucustom/>
      <h1>EDITAR PERFIL HOME FAMILIAS</h1>
      <p>{{infoGeneral}}</p>
      <input type="text" value="hola">
      <select name="provincia" id="provincia1" value="Pontevedra">
        <option value='Vizcaya'>Vizcaya</option>
        <option value='Zamora'>Zamora</option>
        <option value='Zaragoza' selected>Zaragoza</option>
      </select>
  </div>
</template>

<script>
import menucustom from '@/components/MenuCustom.vue'

export default {
    name: 'editarPerfilHomeFamilias',
    components: {
        menucustom
    },
    data() {
        return {
            infoGeneral: this.$route.query
        }
    }
}
</script>

<style scoped>

</style>