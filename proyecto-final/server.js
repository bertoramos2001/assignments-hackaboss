require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');


const imageFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true) //almacena la imagen y no da error
    } else {
        const formatError = new Error('Solo se aceptan archivos jpg o png')//se lanza un error y no se almacena el archivo enviado
        formatError.status = 400;
        cb(formatError, false);
    }
}

const videoFilter = (req, file, cb) => {
    if (file.mimetype === 'video/mp4') {
        cb(null, true) //almacena el video y no da error
    } else {
        const formatError = new Error('Solo se aceptan archivos mp4')//se lanza un error y no se almacena el archivo enviado
        formatError.status = 400;
        cb(formatError, false);
    }
}

const storageAvatar = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/avatars')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString()  + file.originalname)
    }
});

const storageVideo = multer.diskStorage({
    destination: function(req, file, cb) {
     },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString()  + file.originalname)
    }
})

const uploadAvatar = multer({
    storage: storageAvatar,
    limits: {
    filesize: 1024 * 1024
    },
    fileFilter: imageFilter
})

const uploadVideo = multer({
    storage: storageVideo,
    limits: {
        filesize: 1024 * 1024 * 10
    },
    fileFilter: videoFilter
})

const { listUsers, login, registerFamily, registerScout, searchUsers } = require('./controllers/users');
const { isAuthenticated, canUpdateProfile, isScout } = require('./middlewares/auth');
const { modifyProfileFamily, modifyProfileScout, showProfile } = require('./controllers/profiles');
const { postVideo, showVideos, deleteVideo } = require('./controllers/videos');
const { sendContract, showReceivedContracts, showSentContracts } = require('./controllers/contracts');

const port = process.env.PORT;
const app = express();

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//registro y login
app.post('/registroFamilia', uploadAvatar.single('avatarPerfil'), registerFamily);
app.post('/registroOjeador', uploadAvatar.single('avatarPerfil'), registerScout);
app.post('/login', login);
app.get('/registroOjeador', isAuthenticated, listUsers);
//ver perfil público
app.get('/perfil/:role/:email', showProfile);
app.put('/perfil/editar/familia/:email', isAuthenticated, canUpdateProfile, uploadAvatar.single('avatarPerfil'), modifyProfileFamily);
app.put('/perfil/editar/ojeador/:email', isAuthenticated, canUpdateProfile, uploadAvatar.single('avatarPerfil'), modifyProfileScout);
app.post('/perfil/editar/familia/:email/videos', uploadVideo.single('videoFamilia'), postVideo);
app.get('/perfil/familia/:email/videos', showVideos);
app.delete('/perfil/editar/familia/:email/videos/:idVideo', isAuthenticated, canUpdateProfile, deleteVideo);
//Búsqueda de perfiles
app.get('/search', searchUsers);
//envío y recibo de contrataciones de jugadores
app.post('/perfil/familia/:email/enviarContrato', isAuthenticated, isScout, sendContract);
app.get('/mensajes/familia/:email', isAuthenticated, canUpdateProfile, showReceivedContracts);
app.get('/mensajes/ojeador/:email', isAuthenticated, canUpdateProfile, showSentContracts);


app.use((error, req, res, next) => {  //middleware generico para la gestion de errores (si algun middleware da error, se ejecuta este)
    res
        .status(error.status || 500)
        .send({status: 'error', message: error.message})
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
