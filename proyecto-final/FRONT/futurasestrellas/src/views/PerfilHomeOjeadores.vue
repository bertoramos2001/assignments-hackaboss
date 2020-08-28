<template>
  <div>
    <vue-headful title="Perfil Ojeadores | FuturasEstrellas"/>
    <menucustom />
    <h1>PERFIL HOME OJEADORES</h1>
    <!--mostramos la informacion general del ojeador en pantalla -->
    <!--mostramos las experiencias del ojeador en pantalla -->
    <img class="imagenAvatar" :src="userWithAvatar.avatar" alt="avatar de perfil" />
    <button @click="mostrarEditAvatar()" id="botonEditarFoto" v-show="owner">Editar Avatar <i class="ion-ios-construct"/></button>
    <h2>INFORMACIÓN TÉCNICA</h2>
    <button v-show="owner" @click="redirectEditProfileScout(infoGeneral)">
      Editar Perfil
      <i class="ion-ios-construct"/>
    </button>
    <br>
    <div id="fichaTecnica">
      <!--mostramos la informacion general del ojeador en pantalla -->
      <p id="nombre">
        <span class="titulo">Nombre:</span>
        {{infoGeneral.nombre}} {{infoGeneral.apellidos}}
      </p>
      <p id="email">
        <span class="titulo">Email:</span>
        {{infoGeneral.email}}
      </p>
      <p id="sexo">
        <span class="titulo">Sexo:</span>
        <br />
        {{infoGeneral.sexo}}
      </p>
      <p id="provincia">
        <span class="titulo">Provincia de residencia:</span>
        <br />
        {{infoGeneral.provincia}}
      </p>
      <p id="nacimiento">
        <span class="titulo">
          Nacimiento:
          <br />
        </span>
        {{formatDate(infoGeneral.fecha_nacimiento)}}
      </p>
      <p id="clubActual">
        <span class="titulo">Club Actual:</span>
        <br />
        {{infoGeneral.club_actual}}
      </p>
      <p id="categoria">
        <span class="titulo">Categoría:</span>
        <br />
        {{infoGeneral.categoria_busca}}
      </p>
      <p id="posicionPrincipal">
        <span class="titulo">Posición que Busca:</span>
        <br />
        {{infoGeneral.posicion_principal_busca}}
      </p>
      <p id="piernaBuena">
        <span class="titulo">Pierna que Busca:</span>
        <br />
        {{infoGeneral.pierna_buena_busca}}
      </p>
    </div>
    <h2>EXPERIENCIAS</h2>
    <!-- mostramos la información de las experiencias del ojeador en pantalla-->
    <button v-show="owner" @click="mostrarAddExperience()">Añadir experiencia <i class="ion-ios-add-circle" /></button>
    <!--boton que permite ver el modal para añadir nuevas experiencias-->
    <div id="experiencias" v-for="experiencia in infoExperiencias" :key="experiencia.id">
      <div id="experiencia">
        <div id="datosExperiencia">
          <p id="equipo">
            <span class="titulo">Equipo:</span>
            {{experiencia.nombre_equipo}}
          </p>
          <p>
            <span class="titulo">Años:</span>
            {{experiencia.ano_inicio}}/{{experiencia.ano_fin}}
          </p>
        </div>
        <div id="resumenExperiencia">
          <p id="resumen">{{experiencia.resumen}}</p>
        </div>
        <button @click="borrarExperiencia(experiencia.id)" class="borrarExperiencia" v-show="owner"><i class="ion-ios-trash" /></button>
      </div>
    </div>
    <!-- MODAL PARA AÑADIR EXPERIENCIAS -->
    <div v-show="seeModal" class="modal">
      <div class="modalBox">
        <h3>Añade tu experiencia:</h3>
        <label for="anoInicio">Nombre del equipo de la experiencia</label>
        <br />
        <input type="text" name="nombreEquipo" placeholder="Nombre equipo" v-model="nombreEquipo" />
        <br />
        <label for="anoInicio">Año del inicio de la experiencia</label>
        <br />
        <input type="number" name="anoInicio" placeholder="Año inicio" v-model="anoInicio" />
        <br />
        <label for="anoFin">Año del fin de la experiencia</label>
        <br />
        <input type="number" name="anoFin" placeholder="Año fin" v-model="anoFin" />
        <br />
        <label for="resumenExperiencia">Resumen de la experiencia</label>
        <br />
        <textarea
          type="text"
          name="resumenExperiencia"
          placeholder="Resumen..."
          v-model="resumenExperiencia"
          id="inputResumen"
        ></textarea>
        <br />
        <button @click="seeModal = !seeModal">Cancelar</button>
        <button @click="validatingData()">Añadir Experiencia</button>
      </div>
    </div>
    <!-- MODAL PARA EDITAR LA FOTO DE PERFIL -->
    <div v-show="seeModalAvatar" class="modal">
      <div class="modalBox">
        <h3>Edita tu foto de perfil:</h3>
        <label for="avatar">Selecciona tu nueva foto de perfil</label>
        <br />
        <input type="file" name="avatar" id="avatar" accept="image/x-png,image/jpeg" @change="avatarPerfil">
        <br />
        <button @click="seeModalAvatar = !seeModalAvatar">Cancelar</button>
        <button @click="editarAvatar()">Cambiar avatar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import menucustom from "@/components/MenuCustom.vue";
import moment from "moment";
import { isOwner } from "@/utils/utils.js";
import Swal from "sweetalert2";

export default {
  name: "PerfilHomeOjeadores",
  components: {
    menucustom
  },
  data() {
    return {
      infoGeneral: {}, //guardamos la informacion general del ojeador en este objeto
      infoExperiencias: [], //guardamos la lista de experiencias del ojeador en este array
      owner: false, //si el usuario no es el propietario del perfil, este no podrá editar el perfil
      seeModal: false,
      seeModalAvatar: false,
      nombreEquipo: "",
      anoInicio: "",
      anoFin: "",
      resumenExperiencia: "",
      selectedFile: null
    };
  },
  created() {
    let self = this;
    //llamada al back para obtener la informacion general del ojeador
    axios
      .get(
        `http://localhost:7000/perfil/ojeador/${this.$route.params.email}/home`
      )
      .then(function(response) {
        self.infoGeneral = response.data;
        self.getIsOwner(self.infoGeneral.email, localStorage.getItem('ROL'));
      })
      .catch(function(error) {
        console.log(error);
      });
    //llamada al back para obtener las experiencias del ojeador
    axios
      .get(
        `http://localhost:7000/perfil/ojeador/${this.$route.params.email}/experiencia`
      )
      .then(function(response) {
        self.infoExperiencias = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  computed: {
    userWithAvatar() {
      return {
        ...this.infoGeneral,
        avatar:
          this.infoGeneral.avatar &&
          require(`./../../../../BACK/${this.infoGeneral.avatar}`)
      };
      return require("./../../../../BACK/" + file);
    }
  },
  methods: {
    formatDate(fecha) {
      return moment(fecha).format("DD/MM/YYYY");
    },
    formatDateAvatar(fecha) {
        return moment(fecha).format("YYYY/MM/DD")
    },
    getIsOwner(email, rol) {
      this.owner = isOwner(email, rol);
    },
    redirectEditProfileScout(infoGeneral) {
      this.$router
        .push({
          name: "EditarPerfilHomeOjeadores",
          params: infoGeneral.email,
          query: infoGeneral
        })
        .catch(() => {});
    },
    mostrarAddExperience() {
      this.seeModal = true;
    },
    mostrarEditAvatar() {
        this.seeModalAvatar = true;
    },
    validatingData() {
        if(this.nombreEquipo === '' || this.anoInicio === '' || this.anoFin === '' || this.resumenExperiencia === '') {
                Swal.fire({
                    title: 'No puede haber campos vacíos!',
                    text: 'Debes rellenar todos los campos para poder añadir una nueva experiencia',
                    icon: 'error',
                    confirmButtonText: 'OK',
                })
            } else {
                this.anadirExperiencia()
            }
    },
    anadirExperiencia() {
      let self = this;

      axios
        .post(
          `http://localhost:7000/perfil/editar/ojeador/${this.$route.params.email}/experiencia`,
          {
            nombreEquipo: self.nombreEquipo,
            anoInicio: self.anoInicio,
            anoFin: self.anoFin,
            resumen: self.resumenExperiencia
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("AUTH_TOKEN_KEY")
            }
          }
        )
        .then(function(response) {
          [self.infoExperiencias].concat(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      Swal.fire({
        title: "¡Experiencia añadida!",
        text: "Tu experiencia se ha añadido correctamente",
        icon: "success",
        confirmButtonText: "OK",
        onClose: () => {
          location.reload();
        }
      });
    },
    borrarExperiencia(idExperiencia) {
        let self = this;
        Swal.fire({
            title:'¡Atención!',
            text:'Estás a punto de borrar una experiencia, esta acción no se podrá rehacer, ¿seguro que la quieres eliminar?',
            icon: 'warning',
            confirmButtonText: 'Sí',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        })
        .then((result) => {
            if(result.value) {
                Swal.fire({
                title: '¡Borrada!',
                text: 'Tu experiencia será borrada',
                icon: 'success',
                onClose: () => {
                    axios
                    .delete(
                    `http://localhost:7000/perfil/editar/ojeador/${this.$route.params.email}/experiencia/${idExperiencia}`,
                    {
                        headers: {
                            Authorization: localStorage.getItem("AUTH_TOKEN_KEY")
                        }
                    }
                    )
                    .then(function(response) {
                        console.log(response)
                    })
                    .catch(function(error) {
                    console.log(error);
                    });
                    location.reload()
                }
                })
            }
        })
    },
    avatarPerfil(event) {
      this.selectedFile = event.target.files[0]
    },
    editarAvatar() {
        let self = this;
        let fd = new FormData()

        let formattedDate = this.formatDateAvatar(self.infoGeneral.fecha_nacimiento)

        fd.set('name', self.infoGeneral.nombre)
        fd.set('surname', self.infoGeneral.apellidos)
        fd.set('email', self.infoGeneral.email)
        fd.set('gender', self.infoGeneral.sexo)
        fd.set('province', self.infoGeneral.provincia)
        fd.set('birthDate', formattedDate)
        fd.set('actualClub', self.infoGeneral.club_actual)
        fd.set('category', self.infoGeneral.categoria_busca)
        fd.set('position', self.infoGeneral.posicion_principal_busca)
        fd.set('strongLeg', self.infoGeneral.pierna_buena_busca)
        fd.append('avatarPerfil', self.selectedFile)

        axios.put(`http://localhost:7000/perfil/editar/ojeador/${this.infoGeneral.email}/home`,
        fd,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: localStorage.getItem('AUTH_TOKEN_KEY')
            }
        })
        .then(res => {
        console.log(res)
        })
        .catch(err => {
        console.log(err)
        })
        self.selectedFile = null

        Swal.fire({
        title: "¡Foto de perfil actualizada!",
        text: "Tu foto de perfil se ha actualizado correctamente",
        icon: "success",
        confirmButtonText: "OK",
        onClose: () => {
          location.reload();
        }
      });
    }
  }
};
</script>

<style scoped>
.imagenAvatar {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  object-fit: cover;
}
#nombre {
  grid-area: nombre;
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
    ". nombre nombre nombre ."
    ". email email email ."
    ". nacimiento categoria posicionPrincipal ."
    ". piernaBuena provincia clubActual ."
    ". . sexo . .";
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
.borrarExperiencia {
    margin: 1rem;
    margin-left: auto;
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
.modal {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.8);
}
.modalBox {
  position: absolute;
  top: 250px;
  z-index: 11;
  background-color: whitesmoke;
  width: auto;
  padding: 2rem;
  border-radius: 1rem;
  position: fixed;
}
#inputResumen {
  margin-bottom: 1rem;
  width: 100%;
  height: 100px;
}
i {
    font-size: 20px;
}
#botonEditarFoto {
    position: absolute;
}
@media screen and (max-width: 480px) {
  #experiencia {
    margin: 1rem;
    border-radius: 1rem;
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
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