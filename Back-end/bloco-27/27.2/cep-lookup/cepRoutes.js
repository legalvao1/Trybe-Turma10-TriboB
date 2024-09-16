const route = require('express').Router();
const controller = require('./controller/cepController');

route.get('/', (req, res) => {
    res.status(200).json({ message: "pong" });
});

route.get('/:cep', controller.getAddressBycep);
route.post('/', controller.addCep);

module.exports = route;