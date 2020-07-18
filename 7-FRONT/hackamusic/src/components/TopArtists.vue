<template>
  <div>
      <input type="search" v-model="search"/><label>Busca el artista</label>
    <ol>
        <!-- FOR LOOP EN UNA LISTA PARA ORDENAR TODOS LOS ARTISTAS CON LOS DATOS OBTENIDOS DE LA API-->
      <li v-for="(artist, index) in filtered" :key="artist.id">
          <table>
              <tr>
                <td class="posicion">
                    <!-- diferenciamos la longitud de los numeros para que el fondo quede lo mas aproximado a un circulo, ya que cada uno tiene diferente anchura -->
                    <!-- como hemos puesto index, ya que no tienen id los artistas, al filtrarlos no tendrán su index original, si no la posicion que ocupan en la nueva lista. No supe como resolver esto -->
                    <span :class="{ tinyNumber:index < 9, smallNumber:index > 8, bigNumber:index > 38}" class="numero">{{ index + 1 }}</span>
                </td>
                <td class="tdImagen">
                    <!-- Para obtener la imagen recurrimos a la funcion getImage -->
                    <img :src="getImage(artist)">
                </td>
                <td>
                    <p><span class="title">ARTISTA:</span> {{ artist.name }}</p>
                    <p><span class="title">OYENTES:</span> {{ artist.listeners }}</p>
                    <p><span class="title">URL:</span> <a target="_blank " :href="`${artist.url}`">Página de {{ artist.name }}</a></p>
                </td>
              </tr>
          </table>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
    name: 'TopArtists',
    props: { //recibimos un array con el nombre de artists
        artists: Array
    },
    data() {
        return { //La barra de búsqueda vacía
            search: '',
            objetoImagenes: {
                davidbowie: 'https://townsquare.media/site/295/files/2018/04/bowie.jpg?w=980&q=75',
                radiohead: 'https://pyxis.nymag.com/v1/imgs/134/4c1/df826334bc9661a34dfcf000d38d11db3d-11-radiohead-new.rsquare.w330.jpg',
                queen: 'https://www.biografiasyvidas.com/biografia/q/fotos/queen.jpg',
                coldplay: 'https://okdiario.com/img/2020/03/10/coldplay-sorprende-con-la-version-de-esta-cancion-655x368.jpg',
                therollingstones: 'https://www.udiscovermusic.com/wp-content/uploads/2017/04/The-Rolling-Stones-Debut-Album.jpg',
                muse: 'https://www.rockandpop.cl/wp-content/uploads/2019/09/muse2019-1024x681.jpg',
                thebeatles: 'https://img.discogs.com/izOOUp-YnMh4pgn8hKFk_IcXH1s=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-82730-1319532331.jpeg.jpg',
                thecure: 'https://www.elsoldelcentro.com.mx/gossip/celebridades/z6pr0f-the-cure/ALTERNATES/LANDSCAPE_1140/the%20cure',
                daftpunk: 'https://img.discogs.com/9V_KJnY2yu9bjss6JwwrAlIpMPM=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-1289-1432228655-5272.jpeg.jpg',
                arcticmonkeys: 'https://lightning100.com/wp-content/uploads/arctic-e1527003112201.jpg',
                blur: 'https://lh3.googleusercontent.com/proxy/Z8swtdwKBfCnvbAPPn-g64ROvZV-WZIKuPQbmJGfpXOEsn1FuTwCYZFuH9UtLrjKGAPiuuf4bxx8CFQM1ggSODxe3_pqR4VFrQ',
                redhotchilipeppers: 'https://www.elquintobeatle.com/wp-content/uploads/2020/01/red-hot-chili-peppers-archivo-1-1068x801.jpg',
                edsheeran: 'https://i1.sndcdn.com/avatars-000459882441-ijndcc-t500x500.jpg',
                nirvana: 'https://www.mondosonoro.com/wp-content/uploads/2015/03/nirvana.jpg',
                sia: 'https://lh3.googleusercontent.com/proxy/-pwpDRt_2NZzs7DbjZZLTRTOpWubFpzSr6iS0an9fwVC-zCJkObG-0EmRtOffBGs7RKcDffR_nWLatNqQtaySuAs-69fzz-n5jifJRi-8z9oPoRgo7kF4oHXsl0b-GqzfYzrbvQSDLZi',
                pinkfloyd: 'https://www.elindependiente.com/wp-content/uploads/2019/08/fotonoticia_20160831191012_640.jpg',
                bobdylan: 'https://miro.medium.com/max/8384/1*_EDEWvWLREzlAvaQRfC_SQ.jpeg',
                tameimpala: 'https://loff.it/wp-content/uploads/2015/08/loffit-let-it-happen-tame-impala-04.jpg',
                thestrokes: 'https://i.promecal.es/IMG/2020/56014201-ACB9-372C-1E62173452FEF527.JPG',
                u2: 'https://www.duna.cl/media/2014/09/u2.jpg',
                theweeknd: 'https://pbs.twimg.com/media/Eczv6wwXYAA1R1R.jpg',
                adele: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Adele_2016.jpg/1200px-Adele_2016.jpg',
                arcadefire: 'https://e-cdns-images.dzcdn.net/images/artist/0703e8e50373d950c7523869352a83c9/500x500.jpg',
                calvinharris: 'https://vignette.wikia.nocookie.net/taylor-swift/images/f/f0/Calvinharris.jpg/revision/latest/top-crop/width/360/height/450?cb=20190328074319',
                michaeljackson: 'https://monterreyrock.com/wp-content/uploads/2020/05/MICHAEL-JACKSON.jpg',
                rem: 'https://www.nme.com/wp-content/uploads/2020/04/REM-Michael-Stipe-696x442.jpg',
                depechemode: 'https://cdns-images.dzcdn.net/images/artist/941ccfd9516c5c2d27399ae21e4115c8/264x264.jpg',
                ledzeppelin: 'https://www.rollingstone.com/wp-content/uploads/2012/11/LedZeppelin.jpg',
                lanadelrey: 'https://estaticos.elperiodico.com/resources/jpg/3/9/lana-del-rey-presenta-novio-policia-1576756541293.jpg',
                thekillers: 'https://www.nme.com/wp-content/uploads/2016/09/2013EM_s2_Killers_007130913-1.jpg',
                thexx: 'https://i.guim.co.uk/img/media/c8783ef2d6b4f039112efb90ac18011b5c13b752/0_0_4884_2930/master/4884.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3ec37a01685dee1121b5fd3564b6375b',
                majorlazer: 'https://www.mondosonoro.com/wp-content/uploads/2018/10/MazorLazer_Press.jpg',
                theblackkeys: 'https://cdn.wegow.com/media/artists/the-black-keys/the-black-keys-1528799471.21.2560x1440.jpg',
                foofighters: 'https://m.guiadelocio.com/var/guiadelocio.com/storage/images/conciertos/valencia-valencia/valencia/foo-fighters/38827093-4-esl-ES/foo-fighters.jpg',
                oasis: 'https://www.mondosonoro.com/wp-content/uploads/2015/03/OASIS.jpg',
                imaginedragons: 'https://yt3.ggpht.com/a/AATXAJxYKvV8ivJXbjXGr-yTsZkStrHlWQ7aVmIFD0G69Q=s900-c-k-c0xffffffff-no-rj-mo',
                thesmiths: 'https://indiehoy.com/wp-content/uploads/2020/04/The-Smiths.jpg',
                theclash: 'https://i.scdn.co/image/ab470b275daa38351810a1eb91d107ebdb821302',
                gorillaz: 'https://sonar.es/system/attached_images/19685/medium/gorillaz-sonar-bcn-2018.jpg?1517486863',
                florencethemachine: 'https://www.nme.com/wp-content/uploads/2018/02/Florence-Welch-696x442.jpg',
                franzferdinand: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Franz_Ferdinand_%28band%29_2008.11.24_004_SQUARE.jpg',
                pixies: 'https://pbs.twimg.com/profile_images/1172464013231427584/GzgdGOBU.jpg',
                beck: 'https://www.elquintobeatle.com/wp-content/uploads/2019/11/beck-2019-3.jpg',
                davidguetta: 'https://upload.wikimedia.org/wikipedia/commons/3/33/David_Guetta_2013-04-12_001.jpg',
                neworder: 'https://classicalbumsundays.com/wp-content/uploads/2013/05/NewOrder_premium_1000px-copy-700x456.jpg',
                vetustamorla: 'https://images.sk-static.com/images/media/profile_images/artists/927847/huge_avatar',
                drake: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTQ3NTI2OTA4NzY5MjE2MTI4/drake_photo_by_prince_williams_wireimage_getty_479503454.jpg',
                metallica: 'https://pbs.twimg.com/profile_images/766360293953802240/kt0hiSmv.jpg'
            }
        }
    },
    //computed se asegura de que se ejecuten los distintos elementos, similar a un watcher de DOM
    computed: {
        filtered() {
            if (!this.search) { //si la búsqueda está vacía, devolvemos el array de artistas
                return this.artists
            }
            //si la busqueda no esta vacia, devolvemos los artistas que contengan los caracteres introducidos en la busqueda (ignorando las mayusculas)
            return this.artists.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()))
        }
    },
    methods: {
        //esta funcion recibe el objeto de artistas cada vez que se itera en el v-for; une el nombre y devuelve la url de ese nombre
        getImage(artist) {
            const artistName = artist.name.toLowerCase().split(' ').join('').split('+').join('').split('.').join('');
            return this.objetoImagenes[artistName];
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&family=Quicksand:wght@500;600;700&display=swap');
input {
    width: 25rem;
    border: 0;
    border-bottom: 2px solid #afbac5;
    color:#afbac5;
    font-weight: 700;
    font-family: 'Quicksand', sans-serif;
    outline: 0;
    font-size: 1.3rem;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
}
label {
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #afbac5;
}
ol {
    list-style: none;
    min-width: 680px;
    padding:10px;
}
li {
    text-align: left;
    padding-left: 50px;
}
.posicion {
    font-size: 300%;
    font-weight: 700;
    padding-right: 6rem;
    min-width: 54px;
    max-width: 54px;
}
.numero {
    color: #42b983;
    background-color: #1D232A;
    border: 0.35rem solid #42b983;
    border-radius: 50%;
}
.tinyNumber {
    padding: 1rem 2.15rem 1rem 2.15rem;
}
.smallNumber {
    padding: 1rem 1.5rem 1rem 1.5rem;
}
.bigNumber {
    padding: 1rem 1.15rem 1rem 1.15rem;
}
.title {
    font-weight: 600;
    font-size: 125%;
    color: #42b983;
}
img {
    display: block;
    height: auto;
    width: 100%;
    border-radius: 5%;
    transition: all .2s ease-in-out;
    width: 174px;
    height: 174px;
    object-fit: cover;
}
img:hover {
    transform: scale(1.05);
}
a {
    color:#afbac5;
    transition: all .2s ease-in-out;
    display: inline-block;
}
a:hover {
    transform: scale(1.05);
}
p {
    padding-left: 20px;
}
</style>