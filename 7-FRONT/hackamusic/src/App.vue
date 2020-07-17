<template>
  <div id="app">
    <div id="nav">
      <h1 class="titulo-principal">HACK A MUSIC</h1>
      <router-link :to="{name: 'Home'}">Home</router-link> |
      <router-link :to="{name: 'TopArtists'}">Top Artistas</router-link> |
      <router-link :to="{name: 'TopTracks'}">Top Canciones</router-link> |
      <router-link :to="{name: 'About'}">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
* {
  background-color: #1D232A;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #afbac5;
  min-width: 680px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #afbac5;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.titulo-principal {
  font-size: 300%;
  text-decoration: underline;
}
</style>
