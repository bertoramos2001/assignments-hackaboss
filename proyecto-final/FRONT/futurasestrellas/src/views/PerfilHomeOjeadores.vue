<template>
  <div>
    <menucustom/>
      <h1>PERFIL HOME OJEADORES</h1> <!--mostramos la informacion general del ojeador en pantalla --> <!--mostramos las experiencias del ojeador en pantalla -->
      <img class="imagenAvatar" :src="userWithAvatar.avatar" alt="avatar de perfil">
       <h2>INFORMACIÓN TÉCNICA</h2>
       <div id="fichaTecnica"> <!--mostramos la informacion general de la familia en pantalla -->
           <p id="nombreJugador"><span class="titulo">Nombre:</span> {{infoGeneral.nombre}} {{infoGeneral.apellidos}}</p>
           <p id="email"><span class="titulo">Email:</span> {{infoGeneral.email}}</p>
           <p id="sexo"><span class="titulo">Sexo:</span> <br>{{infoGeneral.sexo}}</p>
           <p id="provincia"><span class="titulo">Provincia de residencia:</span> <br>{{infoGeneral.provincia}}</p>
           <p id="nacimiento"><span class="titulo">Nacimiento: <br></span> {{formatDate(infoGeneral.fecha_nacimiento)}}</p>
           <p id="clubActual"><span class="titulo">Club Actual:</span> <br>{{infoGeneral.club_actual}}</p>
           <p id="categoria"><span class="titulo">Categoría:</span> <br>{{infoGeneral.categoria_busca}}</p>
           <p id="posicionPrincipal"><span class="titulo">Posición que Busca:</span> <br>{{infoGeneral.posicion_principal_busca}}</p>
           <p id="piernaBuena"><span class="titulo">Pierna que Busca:</span> <br>{{infoGeneral.pierna_buena_busca}}</p>
       </div>
       <h2>EXPERIENCIAS</h2> <!-- mostramos la información de las experiencias del jugador en pantalla-->
       <div id="experiencias" v-for="experiencia in infoExperiencias" :key="experiencia.id">
           <div id="experiencia">
             <div id="datosExperiencia">
               <p id="equipo"><span class="titulo">Equipo:</span> {{experiencia.nombre_equipo}}</p>
               <p> <span class="titulo">Años:</span> {{experiencia.ano_inicio}}/{{experiencia.ano_fin}}</p>
             </div>
             <div id="resumenExperiencia">
               <p id="resumen">{{experiencia.resumen}}</p>
             </div>
           </div>
       </div>
  </div>
</template>

<script>
import axios from 'axios';
import menucustom from '@/components/MenuCustom.vue'
import moment from 'moment'

export default {
  name: 'PerfilHomeOjeadores',
  components: {
    menucustom
  },
  data() {
    return {
      infoGeneral: {}, //guardamos la informacion general del ojeador en este objeto
      infoExperiencias: [] //guardamos la lista de experiencias del ojeador en este array
    }
  },
  created (){
    let self = this; 
    //llamada al back para obtener la informacion general del ojeador
    axios.get(`http://localhost:7000/perfil/ojeador/${this.$route.params.email}/home`)
      .then(function(response) {
        console.log(response)
        self.infoGeneral = response.data
      })
      .catch(function(error) {
        console.log(error)
      })
      //llamada al back para obtener las experiencias del ojeador
        axios.get(`http://localhost:7000/perfil/ojeador/${this.$route.params.email}/experiencia`)
        .then(function(response) {
            console.log(response)
            self.infoExperiencias = response.data
        })
        .catch(function(error) {
            console.log(error)
        })
  },
  computed: {
        userWithAvatar() {
            return {
                ...this.infoGeneral,
                avatar: this.infoGeneral.avatar && require(`./../../../../BACK/${this.infoGeneral.avatar}`)
            }
            return require('./../../../../BACK/' + file);
        }
    },
    methods: {
        formatDate(fecha) {
            return moment(fecha).format('DD/MM/YYYY')
        }
    }
}
</script>

<style scoped>
.imagenAvatar {
    border-radius: 50%;
    width: 200px;
    height: 200px;
    object-fit: cover;
}
#nombreJugador {
    grid-area: nombreJugador;
    margin-block-end: 5px;
}
#nombreTutor {
    grid-area: nombreTutor;
    margin-block-start: 5px;
    margin-block-end: 5px;
}
#email {
    grid-area: email;
    margin-block-start: 5px;
    margin-block-end: 2rem;
}
#nacimiento {
    grid-area: nacimiento;
}
#categoria {
    grid-area: categoria;
}
#posicionPrincipal {
    grid-area: posicionPrincipal;
}
#piernaBuena {
    grid-area: piernaBuena;
}
#provincia {
    grid-area: provincia;
}
#clubActual {
    grid-area: clubActual;
}
#sexo {
    grid-area: sexo;
}
#fichaTecnica {
    display: grid;
    justify-content: center;
    grid-template-columns: 10% 200px 200px 200px 10%;
    grid-template-rows: auto;
    grid-template-areas:
    ". nombreJugador nombreJugador nombreJugador ."
    ". nombreTutor nombreTutor nombreTutor ."
    ". email email email ."
    ". nacimiento categoria posicionPrincipal ."
    ". piernaBuena provincia clubActual ."
    ". . sexo . ."
    ;
}
#experiencia {
    display: flex;
    align-items: center;
    background-color: rgba(255, 209, 101, 0.493);
    border-radius: 1rem;
}
#resumen {
    margin-left: auto;
    margin-right: auto;
}
#datosExperiencia {
    padding: 1rem;
    border-radius: 1rem;
}
#resumenExperiencia {
    padding: 1rem;
}
.titulo {
    font-weight: 800;
}
@media screen and (max-width: 480px) {
    #experiencia {
    background-color: rgba(255, 209, 101, 0.493);
    margin: 1rem;
    border-radius: 1rem;
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 209, 101, 0.493);
    }
    #resumen {
    padding-bottom: 2rem;
    width: auto;
    margin-left: auto;
    margin-right: auto;
    }
    #fichaTecnica {
    display: flex;
    flex-direction: column;
    }
    .imagenAvatar {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
}
@media screen and (min-width: 481px) and (max-width: 767px) {
    #experiencia {
    background-color: rgba(255, 209, 101, 0.493);
    margin: 1rem;
    border-radius: 1rem;
    width: auto;
    }
    #resumen {
    padding-bottom: 2rem;
    width: auto;
    margin-left: auto;
    margin-right: auto;
    }
    #fichaTecnica {
    display: flex;
    flex-direction: column;
    }
    .imagenAvatar {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  #experiencia {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 209, 101, 0.493);
    border-radius: 1rem;
    margin: 1rem;
    }
    #datosExperiencia {
    padding: 1rem;
    display: inline-block;
    border-radius: 1rem;
    }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
    #experiencia {
    background-color: rgba(255, 209, 101, 0.493);
    margin: 1rem 2% 1rem 2%;
    border-radius: 1rem;
    }
    #resumen {
    padding-bottom: 1rem;
    margin-left: auto;
    margin-right: auto;
    }
    #datosExperiencia {
    padding: 1rem;
    min-width: 250px;
    height: 100%;
    border-radius: 1rem;
    }
}
@media screen and (min-width: 1025px) and (max-width: 1280px) {
    #experiencia {
    background-color: rgba(255, 209, 101, 0.493);
    margin: 1rem 11% 1rem 11%;
    border-radius: 1rem;
    }
    #datosExperiencia {
    padding: 1rem;
    min-width: 250px;
    height: 100%;
    border-radius: 1rem;
    }
}
@media screen and (min-width: 1281px) {
    #experiencia {
    background-color: rgba(255, 209, 101, 0.493);
    margin: 1rem 17% 1rem 17%;
    border-radius: 1rem;
    }
    #datosExperiencia {
    padding: 1rem;
    min-width: 250px;
    height: 100%;
    border-radius: 1rem;
    }
    #resumenExperiencia {
        padding: 1rem;
    }
}
</style>