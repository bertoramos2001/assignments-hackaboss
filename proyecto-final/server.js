require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express');
const morgan = require('morgan');
const multer = require('multer')

const upload = multer({dest: 'uploads/'})

const { listUsers, login, registerFamily, registerScout } = require('./controllers/users')
const { isAuthenticated, canUpdateProfile } = require('./middlewares/auth')
const { modifyProfileFamily, modifyProfileScout, showProfile } = require('./controllers/profiles')
const { postVideo } = require('./controllers/videos')

const port = process.env.PORT;
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//registro y login
app.post('/registroFamilia', upload.single('avatarPerfil'), registerFamily);
app.post('/registroOjeador', upload.single('avatarPerfil'), registerScout);
app.post('/login', login);
app.get('/registroOjeador', isAuthenticated, listUsers);
//ver perfil público
app.get('/perfil/:role/:email', showProfile);
app.put('/perfil/editar/familia/:email', isAuthenticated, canUpdateProfile, upload.single('avatarPerfil'), modifyProfileFamily);
app.put('/perfil/editar/ojeador/:email', isAuthenticated, canUpdateProfile, upload.single('avatarPerfil'), modifyProfileScout);
app.post('/perfil/editar/familia/:email/videos', upload.single('videoFamilia'))
//app.get('/perfil/familia/:email/videos', showVideos)


app.use((error, req, res, next) => {  //middleware generico para la gestion de errores (si algun middleware da error, se ejecuta este)
    res
        .status(error.status || 500)
        .send({status: 'error', message: error.message})
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
