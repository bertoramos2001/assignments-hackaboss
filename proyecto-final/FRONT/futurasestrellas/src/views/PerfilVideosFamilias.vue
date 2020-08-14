<template>
  <div>
      <menucustom/>
      <menuperfilfamilias/>
      <h1>PERFIL VIDEOS FAMILIAS</h1>
      <div v-for="videoInfo in videos" :key="videoInfo.id">
          <p id="tituloVideo">{{videoInfo.titulo}}</p>
          <p id="descripcionVideo">{{videoInfo.descripcion}}</p>
          <div class="divVideo">
              <video :src="getVideoURL(videoInfo.url_video)" controls>VIDEO</video>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import menucustom from '@/components/MenuCustom.vue'
import menuperfilfamilias from '@/components/MenuPerfilFamilias.vue'

export default {
    name:'PerfilVideosFamilias',
    components: {
        menucustom,
        menuperfilfamilias
    },
    data() {
        return {
            videos: []
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