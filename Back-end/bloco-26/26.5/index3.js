const express = require('express');

const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const  { routerNotFound }  = require('./middlewares') ;

app.use(cors());
app.use(bodyParser.json());


const postsRoutes = require('./ex3Rotas');

app.use('/posts', postsRoutes);

app.use('*', (_req, _res, next) => next({ statusCode: 404, message: 'Router not found!' }));
app.use(routerNotFound);


app.listen(3003, () => console.log('Rodando na porta 3003'));
