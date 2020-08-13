<template>
  <div>
      <button @click="redirectHomeProfile($route.params.email)" class="botonesPerfilFamilia" id="botonHomeFamilia">Home</button>
      <button @click="redirectVideos($route.params.email)" class="botonesPerfilFamilia" id="botonVideosFamilia">Vídeos</button>
  </div>
</template>

<script>
export default {
    name:'MenuPerfilFamilias',
    methods: {
        redirectHomeProfile(email) {
            this.$router.push(`/perfil/familia/${email}`).catch(()=>{});
        },
        redirectVideos(email) {
            this.$router.push(`/perfil/familia/${email}/videos`).catch(()=>{});
        }
    }
}
</script>

<style scoped>
div {
    padding: 1rem;
}
.botonesPerfilFamilia {
    margin: 0 2rem 0 2rem;
}
</style>