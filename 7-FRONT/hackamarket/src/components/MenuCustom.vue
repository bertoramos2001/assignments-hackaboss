<template>
  <div id="nav">
      <router-link :to="{name:'Home'}">Home</router-link> |
      <router-link :to="{name:'About'}">About</router-link> |
      <router-link :to="{name:'Productos'}">Productos</router-link> |
      <router-link :to="{name:'Clientes'}">Clientes</router-link> |
      <router-link :to="{name:'Registrar'}">Registrar</router-link>
      </div>
</template>

<script>
export default {
    name: 'MenuCustom'
}
</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: rebeccapurple;
}

#nav a.router-link-exact-active {
  color: goldenrod;
}
</style>