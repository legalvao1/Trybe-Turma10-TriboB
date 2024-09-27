// Crie uma rota GET /posts/:id que receba uma requisição com um id como param route , verifique existência do post com aquele id, onde:
// O id deve existir;
// Para todos os casos não atendidos acima deve ser retornado o código de status e um JSON com uma mensagem de erro, ex: status 404 e { "message": "post not found" } ;
// Caso tenha sucesso deve ser retornado uma resposta com o código de status e um JSON com as informações do respectivo post;

const express = require('express');
const router = express.Router();

const posts = [
  { id: 1, author: 'José Neto', comment: 'Mais um dia de Sol !' },
  { id: 2, author: 'Antonio Neto', comment: 'Hoje o dia está maneiro!' },
  { id: 3, author: 'Rodrigo Garga', comment: 'To aqui também' },
]

router.get('/', (_req, res) => res.status(200).json(posts)); // traz  todos os posts

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) return res.status(404).json({ "message": "post not found" });

  res.status(200).json({ post });

})

module.exports = router;