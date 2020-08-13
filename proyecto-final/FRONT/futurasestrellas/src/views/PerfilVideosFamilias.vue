<template>
  <div>
      <menucustom/>
      <menuperfilfamilias/>
      <h1>PERFIL VIDEOS FAMILIAS</h1>
      <div v-for="videoInfo in videos" :key="videoInfo.id">
          {{videoInfo}}
          <video :src="getVideoURL(videoInfo.video_url)">VIDEO</video>
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
            console.log(response)
            self.videos = response.data
        })
        .catch(function(error) {
            console.log(error)
        })
    },
    computed: {
        videoUser() {
            return {
                ...this.videos,
                video: this.videos.video && require(`./../../../../BACK/${this.videos.video}`)
            }
            return require('./../../../../BACK/' + file);
        }
    },
    methods: {
        getVideoURL(video) {
            return `./../../../../BACK/${video}`
        }
    }
}
</script>

<style scoped>

</style>