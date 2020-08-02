<template>
  <div class="home">
    <h1>BIENVENIDOS A FUTURAS ESTRELLAS</h1>
    <h2>Selecciona el tipo de cuenta</h2>
    <div id="landingRegistros">
      <div class="plantillaRegistro" id="registroFamilia">
        <h3>Registro como familia</h3>
        <p>Encuentra ojeadores cerca de ti</p>
        <p>Sube vídeos de tus mejores jugadas</p>
        <p>Recibe ofertas de ojeadores</p>
        <p>Añade experiencias y equipos pasados</p>
        <button @click="pantallaRegistroFamilia()">Registrarse como familia</button>
      </div>
      <div class="plantillaRegistro" id="registroOjeador">
        <h3>Registro como ojeador</h3>
        <p>Encuentra jugadores cerca de ti</p>
        <p>Visualiza los vídeos de las familias</p>
        <p>Envía ofertas a las familias</p>
        <p>Añade experiencias y equipos pasados</p>
        <button @click="pantallaRegistroOjeador()">Registrarse como ojeador</button>
      </div>
    </div>
    <button id="botonLogin" @click="pantallaLogin()">Ya tengo cuenta</button>
    <br>
    <button id="botonInvitado" @click="pantallaHome()">Continuar como invitado</button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {

  }
}
</script>
<style scoped>
#landingRegistros {
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
  justify-content: center;
}
.plantillaRegistro {
  padding: 1rem;
  margin: 1rem;
  background-color: rgba(240, 136, 72, .8);
  border-radius: 1rem;
  transition: all ease-in-out .2s;
}
.plantillaRegistro:hover {
  box-shadow: 15px 15px 1px rgba(118, 71, 238, .7);
}
p {
  padding: 1rem 0 1rem 0;
  font-weight: 500;
}
button{
    cursor: pointer;
    padding: 1rem;
    margin: 0 0.1em 0.1em 0;
    background-color: rgba(240, 136, 72, .5);
    border-radius: 1em;
    font-weight: 300;
    color: #35495E;
    font-weight:700;
    font-size: 100%;
    transition: all ease-in-out 0.2s;
    border: none;
    box-shadow: 1px 1px 5px #7647ee;
}
button:hover{
    background-color: #f08848;
    transform: scale(1.10)
}
h1, h2 {
  color: #f08848
}
#botonLogin {
  margin: 1rem;
  background-color: transparent;
}
#botonInvitado {
  margin: 1rem;
  background-color: transparent;
  
}
</style>
