const express = require('express');
const { userIsValid, createUser } = require('./UserModel');

const router = express.Router();
const User = require('./UserModel');

router.post('/', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if(!userIsValid(firstName, lastName, email, password)) return res.status(400).json({ 
    error: true, 
    message: "O campo 'password' deve ter pelo menos 6 caracteres"
  });

  const newUser = await createUser(firstName, lastName, email, password)
  res.status(201).json(newUser)
});

router.get('/', async (req, res) => {
  const getUsers = await User.getAllUsers();
  console.log(getUsers);

  res.status(200).json(getUsers)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.getUserById(id);
  if (!user) return res.status(404).json({ 
      "error": true,
      "message": "Usuário não encontrado"
   });
  
    res.status(200).json(user);
});

module.exports = router;