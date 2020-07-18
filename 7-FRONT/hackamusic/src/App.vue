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
@import url('https://fonts.googleapis.com/css2?family=Lobster&family=Quicksand:wght@500;600;700&display=swap');
html {
  min-height: 100% ;
min-width: 100% ;
  background-color: rgba(29, 35, 42, 1);
  background-image: linear-gradient(to bottom right, rgba(29, 35, 42, 0), rgba(66, 185, 131, 0.5));
}
#app {
  font-family: 'Quicksand', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #afbac5;
  min-width: 680px;
  font-weight: 700;
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
  font-family: 'Lobster', cursive;
  text-shadow: 1px 1px 4px #afbac5;
}
</style>
