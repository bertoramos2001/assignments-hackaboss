<template>
  <div>
      <vue-headful title="Videos Familia | FuturasEstrellas"/>
      <menucustom/>
      <menuperfilfamilias/>
      <h1>PERFIL VIDEOS FAMILIAS</h1>
      <button id="botonAnadirVideo" @click="mostrarAddVideo()">Añadir vídeo</button>
      <div v-for="videoInfo in videos" :key="videoInfo.id">
          <p id="tituloVideo">{{videoInfo.titulo}} <button @click="borrarVideo(videoInfo.id)" class="deleteVideoButton">Borrar</button></p>
          <div class="videoInfo">
          <p id="descripcionVideo">{{videoInfo.descripcion}}</p>
          <div class="divVideo">
              <video :src="getVideoURL(videoInfo.url_video)" controls>VIDEO</video>
          </div>
          </div>
      </div>
      <!-- MODAL PARA AÑADIR VIDEOS -->
    <div v-show="seeModal" class="modal">
      <div class="modalBox">
        <h3>Añade tu vídeo:</h3>
        <label for="titulo">Título del vídeo</label>
        <br />
        <input type="text" name="titulo" placeholder="Título" v-model="tituloVideo" />
        <br />
        <label for="descripcion">Descripción del vídeo</label>
        <br />
        <input type="text" name="descripcion" placeholder="Descripción" v-model="descripcionVideo" />
        <br />
        <label for="video">Vídeo</label>
        <br />
        <input type="file" name="anoFin" @change="videoFamilia" accept="video/*" />
        <br />
        <button @click="seeModal = !seeModal">Cancelar</button>
        <button @click="validatingData()">Añadir vídeo</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import menucustom from '@/components/MenuCustom.vue'
import menuperfilfamilias from '@/components/MenuPerfilFamilias.vue'
import Swal from 'sweetalert2'

export default {
    name:'PerfilVideosFamilias',
    components: {
        menucustom,
        menuperfilfamilias
    },
    data() {
        return {
            videos: [],
            seeModal: false,
            tituloVideo: '',
            descripcionVideo: '',
            selectedVideo: null
        }
    },
    created() {
        let self = this;
        //llamada al back para obtener los vídeos de la familia
        axios.get(`http://localhost:7000/perfil/familia/${this.$route.params.email}/videos`)
        .then(function(response) {
            self.videos = response.data
        })
        .catch(function(error) {
            console.log(error)
        })
    },
    methods: {
        getVideoURL(video) {
            return require(`./../../../../BACK/${video}`)
        },
        mostrarAddVideo() {
            this.seeModal = true;
        },
        videoFamilia(event) {
            console.log(event)
            this.selectedVideo = event.target.files[0]
            console.log(this.selectedVideo)
        },
        validatingData() {
            if(this.tituloVideo === '' || this.descripcionVideo === '' || this.selectedVideo === null) {
                Swal.fire({
                    title: 'No puede haber campos vacíos!',
                    text: 'Debes rellenar todos los campos para poder añadir un nuevo vídeo',
                    icon: 'error',
                    confirmButtonText: 'OK',
                })
            } else {
                this.anadirVideo()
            }
        },
        anadirVideo() {
            let self = this;
            let fd = new FormData(); 

            fd.set('titulo', self.tituloVideo)
            fd.set('descripcion', self.descripcionVideo)
            fd.append('videoFamilia', self.selectedVideo)

            axios
              .post(
                  `http://localhost:7000/perfil/editar/familia/${this.$route.params.email}/videos`,
                  fd,
                  {
                      headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: localStorage.getItem("AUTH_TOKEN_KEY")
                      }
                  }
              )
              .then(function(response) {
              [self.videos].concat(response);
              })
              .catch(function(error) {
              console.log(error);
              });
              Swal.fire({
                title: "Vídeo añadido!",
                text: "Tu vídeo se ha añadido correctamente",
                icon: "success",
                confirmButtonText: "OK",
                onClose: () => {
                location.reload();
                }
              });
        },
        borrarVideo(videoId) {
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
                title: '¡Borrado!',
                text: 'Tu vídeo será borrado',
                icon: 'success',
                onClose: () => {
                    axios
                    .delete(
                    `http://localhost:7000/perfil/editar/familia/${this.$route.params.email}/videos/${videoId}`,
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
        }
    }
}
</script>

<style scoped>
video {
    width: 320px;
    height: 240px;
    object-fit: cover;
    margin: 1rem;
}
.divVideo {
    background-color: rgba(76, 235, 250, 0.596);
    border-radius: 0 0 1rem 1rem;
    margin: 0 auto 2rem auto;
}
#tituloVideo {
    font-weight: 800;
    padding: 1rem;
    margin: 0 auto;
    background-color: rgb(98, 98, 255);
    border-radius: 1rem 1rem 0 0;
}
#descripcionVideo {
    padding: 1rem;
    margin: 0 auto;
    background-color: rgba(76, 235, 250, 0.596);
}
#botonAnadirVideo {
    margin: 1rem;
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

@media screen and (max-width: 480px) {
    video {
    width: 272px;
    height: 153px;
    object-fit: cover;
    margin: 1rem;
    }
    .divVideo {
    background-color: rgba(76, 235, 250, 0.596);
    border-radius: 0 0 1rem 1rem;
    width:95%;
    }
    #tituloVideo {
        font-weight: 800;
        padding: 1rem 0 1rem 0;
        background-color: rgb(98, 98, 255);
        border-radius: 1rem 1rem 0 0;
        width:95%;
    }
    #descripcionVideo {
        padding: 1rem 0 1rem 0;
        background-color: rgba(76, 235, 250, 0.596);
        width:95%;
    }
}

@media screen and (min-width: 481px) and (max-width: 767px) {
    video {
    width: 352px;
    height: 198px;
    object-fit: cover;
    margin: 1rem;
    }
    .divVideo {
    background-color: rgba(76, 235, 250, 0.596);
    border-radius: 0 0 1rem 1rem;
    width:95%;
    }
    #tituloVideo {
        font-weight: 800;
        padding: 1rem 0 1rem 0;
        background-color: rgb(98, 98, 255);
        border-radius: 1rem 1rem 0 0;
        width:95%;
    }
    #descripcionVideo {
        padding: 1rem 0 1rem 0;
        background-color: rgba(76, 235, 250, 0.596);
        width:95%;
    }
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
    video {
    width: 416px;
    height: 234px;
    object-fit: cover;
    margin: 1rem;
    }
    .divVideo {
    background-color: rgba(76, 235, 250, 0.596);
    border-radius: 0 0 1rem 1rem;
    width:700px;
    }
    #tituloVideo {
        font-weight: 800;
        padding: 1rem 0 1rem 0;
        background-color: rgb(98, 98, 255);
        border-radius: 1rem 1rem 0 0;
        width:700px;
    }
    #descripcionVideo {
        padding: 1rem 0 1rem 0;
        background-color: rgba(76, 235, 250, 0.596);
        width:700px;
    }
}

@media screen and (min-width: 1025px) and (max-width: 1280px) {
    video {
    width: 480px;
    height: 270px;
    object-fit: cover;
    margin: 1rem;
    }
    .divVideo {
    background-color: rgba(76, 235, 250, 0.596);
    border-radius: 0 0 1rem 1rem;
    width:800px;
    }
    #tituloVideo {
        font-weight: 800;
        padding: 1rem 0 1rem 0;
        background-color: rgb(98, 98, 255);
        border-radius: 1rem 1rem 0 0;
        width:800px;
    }
    #descripcionVideo {
        padding: 1rem 0 1rem 0;
        background-color: rgba(76, 235, 250, 0.596);
        width:800px;
    }
}

@media screen and (min-width: 1281px) {
    video {
    width: 520px;
    height: 292.5px;
    object-fit: cover;
    margin: 1rem;
    }
    .divVideo {
    background-color: rgba(76, 235, 250, 0.596);
    border-radius: 0 0 1rem 1rem;
    width:900px;
    }
    #tituloVideo {
        font-weight: 800;
        padding: 1rem 0 1rem 0;
        background-color: rgb(98, 98, 255);
        border-radius: 1rem 1rem 0 0;
        width:900px;
    }
    #descripcionVideo {
        padding: 1rem 0 1rem 0;
        background-color: rgba(76, 235, 250, 0.596);
        width:900px;
    }
}
</style>