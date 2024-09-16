const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const port = process.env.PORT;
const cepRoutes = require('./cepRoutes');
const errorMiddleware = require('./middlewares/middlewares');

app.use('/ping', cepRoutes);
app.use('/cep', cepRoutes);
app.use(errorMiddleware);

app.listen(port, () => console.log(`Example listen on the port ${port}`));

