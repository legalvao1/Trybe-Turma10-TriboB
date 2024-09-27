const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./authMiddleware');

const app = express();
app.use(bodyParser.json());

// Esta rota não passa pelo middleware de autenticação!
app.get('/open', function (req, res) {
  res.send('open!')
});


app.use(authMiddleware);

const recipes = [
  { id: 1, name: 'Lasanha', price: 40.0, waitTime: 30 },
  { id: 2, name: 'Macarrão a Bolonhesa', price: 35.0, waitTime: 25 },
  { id: 3, name: 'Macarrão com molho branco', price: 35.0, waitTime: 25 },
];
// ...
function validateName(req, res, next) {
  const { name } = req.body;
  if (!name || name === '') return res.status(400).json({ message: 'Invalid data!'});

  next(); 
};

function validatePrice(req, res, next) {
  const { price } = req.body;
  if (!price || typeof(price) !== 'number' || price < 0)
    return res.status(400).json({ message: "Invalid data!" });
        
  next();
}

// app.post('/recipes', validateName, validatePrice, function (req, res) {
//   const { id, name, price } = req.body;
//   recipes.push({ id, name, price});
//   res.status(201).json({ message: 'Recipe created successfully!'});
// });

app.post('/recipes', validateName, function (req, res) {
  const { id, name, price } = req.body;
  const { username } = req.user; // Aqui estamos acessando o usuário encontrado no middleware de autenticação.
  recipes.push({ id, name, price, chef: username });
  res.status(201).json({ message: 'Recipe created successfully!'});
});


app.put('/recipes/:id', validateName, validatePrice, function (req, res) {
  const { id } = req.params;
  const { name, price } = req.body;
  const recipesIndex = recipes.findIndex((r) => r.id === parseInt(id));

  if (recipesIndex === -1)
    return res.status(404).json({ message: 'Recipe not found!' });

  recipes[recipesIndex] = { ...recipes[recipesIndex], name, price };

  res.status(204).end();
});
// ...

app.listen(3001, () => {
  console.log('Aplicação ouvindo na porta 3001');
}); 


// http GET :3001/recipes username:MestreCuca password:MinhaSenhaSuperSeguraSqn # listar receitas
// http POST :3001/recipes username:MestreCuca password:MinhaSenhaSuperSeguraSqn nome=Churrasco id:=5 preco:=30 # cadastrar um novo receita
// http POST :3001/recipes/2 username:MestreCuca password:MinhaSenhaSuperSeguraSqn nome=Lasanha preco:=45 # editar um receita