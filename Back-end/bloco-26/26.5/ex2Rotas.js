const express = require('express');

const router = express.Router();
const fetch = require('node-fetch');

const { validToken } = require('./middlewares');

router.get('/price', validToken, async(req, res) => {
    const  url  = "https://api.coindesk.com/v1/bpi/currentprice/BTC.json)";

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);

});

module.exports = router;