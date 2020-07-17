//Importamos la configuracion que tenemos en el archivo config y declaramos la api key
import config from './config.js';
const apiKey = config.apiKey;
//Definimos la url base para todas las peticiones de axios
const BASE_URL = "https://ws.audioscrobbler.com/"
//Definimos la url para encontrar el top de artistas, canciones y tags por país (en este caso España) usando nuestra apiKey
const URL_ARTISTS_GEO = "2.0/?method=geo.gettopartists&country=spain&api_key="+apiKey+"&format=json"
const URL_TRACKS_GEO = "2.0/?method=geo.gettoptracks&country=spain&api_key="+apiKey+"&format=json"
const URL_TAGS = "2.0/?method=chart.gettoptags&api_key="+apiKey+"&format=json"
//Importamos axios
const axios = require('axios').default;

//Función para obtener los top artists de españa de lastfm
async function getArtists() {
    try {
        const response = await axios.get(`${BASE_URL}${URL_ARTISTS_GEO}`);
        return response;
        } catch (error) {
        console.log(error)
    }
}
//Función para obtener los top tracks de españa de lastfm
async function getTracks() {
    try {
        const response = await axios.get(`${BASE_URL}${URL_TRACKS_GEO}`);
        return response;
    } catch(error) {
        console.log(error)
    }
}
//Función para obtener los top tags de lastfm
async function getTags() {
    try {
        const response = await axios.get(`${BASE_URL}${URL_TAGS}`);
        return response;
    } catch(error) {
        console.log(error)
    }
}

export default {
    getArtists,
    getTags,
    getTracks
}