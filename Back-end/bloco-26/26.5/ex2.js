
// Crie uma rota GET /btc/price que receba uma requisição com um token na chave Authorization do headers da requisição e verifique se ele está correto, onde:
// O token deve ser uma string de 12 caracteres contendo letras e/ou números.
// Para todos os casos não atendidos acima deve ser retornado o código de status e um JSON com uma mensagem de erro, ex: status 401 e { "message": "invalid token" } ;
// Caso tenha sucesso deve ser feito um fetch em uma API externa de sua preferência e retorne os dados da API como resposta;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { validToken } = require('./middlewares');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// const ex2Router = require('./ex2Rotas');

app.get('/btc/price', validToken, async(req, res) => {
  
  try {
    console.log("entrou no try");
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
    const data = await response.json();
  
    res.status(200).json({ data });
  } catch (error) {
      res.status(500).send()
  }
});

// const axios = require('axios');
// const ENDPOINTEXTERNALAPI = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';
// app.get(
//   '/btc',
//   validToken,
//   async (_req, res) => {
//     const result = await axios.get(ENDPOINTEXTERNALAPI);

//     res.status(200).json(result.data);
//   }
// );

app.listen(3002, () => console.log("App na porta 3002"));