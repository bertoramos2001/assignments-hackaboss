<template>
  <div>
    <ol>
        <!-- FOR LOOP EN UNA LISTA PARA ORDENAR TODAS LAS CANCIONES CON LOS DATOS OBTENIDOS DE LA API-->
      <li v-for="(track, index) in tracks" :key="track.id">
          <table>
              <tr>
                  <td class="posicion">
                      <!-- diferenciamos la longitud de los numeros para que el fondo quede lo mas aproximado a un circulo, ya que cada uno tiene diferente anchura -->
                      <span :class="{ tinyNumber:index < 9, smallNumber:index > 8, bigNumber:index > 38}" class="numero">{{index + 1 }}</span>
                  </td>
                  <td class="imagen">
                      <img :src="getImage(track)">
                  </td>
                  <td>
                      <p><span class="title">CANCIÓN:</span> {{ track.name }}</p>
                      <p><span class="title">ARTISTA:</span> {{ track.artist.name }}</p>
                  </td>
              </tr>
          </table>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
    name: 'TopTracks',
    props: { //recibimos un array con el nombre de tracks
        tracks: Array
    },
    data() {
        return {
            objetoImagenes: {
                creep: 'https://images-na.ssl-images-amazon.com/images/I/71uKIfy4T2L._SL1200_.jpg',
                thelessiknowthebetter: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png',
                takemeout: 'https://upload.wikimedia.org/wikipedia/en/5/52/Franz_Ferdinand_-_Take_Me_Out.jpg',
                sevennationarmy: 'https://img.discogs.com/PaF56cLCgbgVkd_Urdpjdyq8nvc=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-5135185-1385454487-3354.jpeg.jpg',
                lastnite: 'https://img.discogs.com/dcV9oxpLACAYM97f6CdixOR8z5o=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-2759212-1543609589-5408.jpeg.jpg',
                doiwannaknow: 'https://upload.wikimedia.org/wikipedia/en/0/04/Arctic_Monkeys_-_AM.png',
                smellsliketeenspirit: 'https://upload.wikimedia.org/wikipedia/en/3/3c/Smells_Like_Teen_Spirit.jpg',
                lovewilltearusapart: 'https://img.discogs.com/OwkTtWpzctIDMP3h7wlzC3A_Uhg=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-29008-1487105516-1962.jpeg.jpg',
                lonelyboy: 'https://img.discogs.com/6wyxlARF9wgbDn4sWPvEK9T2EOg=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-3783561-1344254963-8382.jpeg.jpg',
                losingmyreligion: 'https://img.discogs.com/CFPAK_w5fl-tyQGPyochAf7Ps-g=/fit-in/600x590/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-399193-1217114395.jpeg.jpg',
                karmapolice: 'https://img.discogs.com/I3f4lbWH7iCs1eKF7L2dAags-ig=/fit-in/600x602/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-619355-1276277897.jpeg.jpg',
                midnightcity: 'https://img.discogs.com/eJlvBhUVDvyGaAQDW-dz3AUjQJk=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-3054278-1313545207.jpeg.jpg',
                whereismymind: 'https://images-na.ssl-images-amazon.com/images/I/81XKO7RSXbL._SL1500_.jpg',
                wonderwall: 'https://upload.wikimedia.org/wikipedia/en/1/17/Wonderwall_cover.jpg',
                leanon: 'https://upload.wikimedia.org/wikipedia/en/e/ed/Major_Lazer_and_DJ_Snake_-_Lean_On_%28feat._M%C3%98%29.png',
                sultansofswing: 'https://img.discogs.com/QTRA4jFbHwPqibODda4JZmBqVMQ=/fit-in/600x591/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-4182158-1541354467-4686.jpeg.jpg',
                hello: 'https://40.media.tumblr.com/f742d21fe428352cc4426884df9da346/tumblr_nwzxlyb78u1uchm5bo1_1280.png',
                mrbrightside: 'https://upload.wikimedia.org/wikipedia/en/d/d1/Mr.-Brightside.jpg',
                nosurprises: 'https://img.discogs.com/ey5mb-7e-d2jqkz7zyL-9b8SSRo=/fit-in/408x358/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-405649-1221942112.jpeg.jpg',
                sweetchildomine: 'https://upload.wikimedia.org/wikipedia/en/1/15/Guns_N%27_Roses_-_Sweet_Child_o%27_Mine.png',
                comeasyouare: 'https://upload.wikimedia.org/wikipedia/en/0/06/ComeAsYouAre.jpg',
                reptilia: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/81/The_Strokes_-_Reptilia_-_CD_single_cover.jpg/220px-The_Strokes_-_Reptilia_-_CD_single_cover.jpg',
                sexonfire: 'https://cdn11.bigcommerce.com/s-8e25iavqdi/images/stencil/1280x1280/products/46268/45382/sex-on-fire-album-cover-sticker__93403.1539967099.jpg?c=2&imbypass=on',
                cantfeelmyface: 'https://upload.wikimedia.org/wikipedia/en/2/22/The_Weeknd_-_Can%27t_Feel_My_Face.png',
                boysdontcry: 'https://www.post-punk.com/wp-content/uploads/2016/02/boysdontcry-800x792.jpg',
                letithappen: 'https://img.discogs.com/ITf_ZEERGQgG5XJWT_IZoJSatzY=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-6770068-1426264714-5100.jpeg.jpg',
                uprising: 'https://upload.wikimedia.org/wikipedia/en/0/0a/BobMarley%26theWailersUprising.jpg',
                fridayiminlove: 'https://img.discogs.com/pTnbxKTBe81v2HqPvfos3E8Mi24=/fit-in/564x481/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6136273-1452482561-1916.jpeg.jpg',
                underthebridge: 'https://img.discogs.com/w0V4_bxwWZWgl5L4UyfkC_dtDCA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-8058931-1454346468-7253.jpeg.jpg',
                feelgoodinc: 'https://upload.wikimedia.org/wikipedia/en/d/dc/Feel_Good_Inc._Artwork.jpg',
                cheapthrills: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Cheapthrills.jpeg',
                mynumber: 'https://img.discogs.com/_VJvy-W7i9QZgmFlCAbR2g2sOWk=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-4493696-1366478499-2451.jpeg.jpg',
                teardrop: 'https://upload.wikimedia.org/wikipedia/en/e/e9/Massive_Attack_-_Mezzanine.png',
                whatyouknow: 'https://upload.wikimedia.org/wikipedia/en/1/10/WhatYouKnowTDCC.jpg',
                adventureofalifetime: 'https://i.pinimg.com/originals/ca/31/72/ca3172d26daa798396041d0fca3e6284.jpg',
                walkonthewildside: 'https://img.discogs.com/-m10UcrPxTmgmgpB0UBn7q-XH7I=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1317920-1524254213-2580.jpeg.jpg',
                fortunateson: 'https://img.discogs.com/HZskJmG2Cd0Cq6TJkGT0-s5kDMQ=/fit-in/600x616/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-2005997-1570087781-1222.jpeg.jpg',
                shapeofyou: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png',
                thehouseoftherisingsun: 'https://images-na.ssl-images-amazon.com/images/I/51bpZsz9vaL._SX300_QL70_ML2_.jpg',
                thepassenger: 'https://upload.wikimedia.org/wikipedia/en/3/3f/All-the-little-lights.jpg',
                uptownfunk: 'https://i.pinimg.com/originals/c3/7e/7f/c37e7fe1ffc35cbe72eac61576ffef43.jpg',
                intro: 'https://img.discogs.com/XszYF7x95diLoJq0-lNDwQewv1I=/fit-in/600x591/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1362737-1563644262-8004.jpeg.jpg',
                bittersweetsymphony: 'https://i.pinimg.com/originals/d0/53/c7/d053c7ed4bbd6c588a50bc358c78d899.jpg',
                kids: 'https://i.ebayimg.com/images/g/clcAAOSw3G9bk~3W/s-l1600.jpg',
                takeonme: 'https://img.discogs.com/7MUSdguueR7MzJCT4q5nEYt9S_g=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-184153-1532702434-8442.jpeg.jpg',
                backtoblack: 'https://upload.wikimedia.org/wikipedia/en/6/67/Amy_Winehouse_-_Back_to_Black_%28album%29.png',
                copenhague: 'https://img.discogs.com/2JI4grJwM0VLNwb9gfoXF7VAqtY=/fit-in/383x383/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-3650836-1338904132-6371.jpeg.jpg',
                burnthewitch: 'https://i.imgur.com/EAQGVJO.jpg',
                bohemianrhapsody: 'https://i.pinimg.com/originals/c6/07/89/c60789442581987ecc127acb826c587d.jpg',
                everlong: 'https://upload.wikimedia.org/wikipedia/en/0/0d/FooFighters-TheColourAndTheShape.jpg'

            }
        }
    },
        methods: {
        //esta funcion recibe el objeto de canciones cada vez que se itera en el v-for; une el nombre y devuelve la url de ese nombre
        getImage(track) {
            const trackName = track.name.toLowerCase().split(' ').join('').split("'").join('').split('.').join('').replace('?', '').replace('(featmø&djsnake)','').replace('-remastered2011','');
            return this.objetoImagenes[trackName];
        }
    }
}
</script>

<style scoped>
ol {
    list-style: none;
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
    padding: 1rem 1.75rem 1rem 1.75rem;
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
.imagen {
    max-width: 174px;
    min-width:174px;
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
p {
    padding-left: 20px;
}
</style>