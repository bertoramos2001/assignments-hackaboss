require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express');
const morgan = require('morgan');

const {  registerScout, listUsers } = require('./controllers/users')
// const { login, registerFamily, registerScout } = require('./controllers/users')

const port = process.env.PORT;
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


// app.post('/registroFamilia', registerFamily);
app.post('/registroOjeador', registerScout);
// app.post('/login', login);
app.get('/registroOjeador', listUsers);



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
