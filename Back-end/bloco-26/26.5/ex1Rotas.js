
const express = require('express');

const router = express.Router();
const { validEmail, validPassword, validUsername, generateToken } = require('./middlewares');

router.post('/register', validUsername, validEmail, validPassword, (req, res) => {
    res.status(201).json({ "message": "user created" });
});

router.post('/login', validEmail, validPassword, (req, res) => {
    res.status(200).json({ token: generateToken() })
});

module.exports =  router;