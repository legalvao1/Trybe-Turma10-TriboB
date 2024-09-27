const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const teams = [];

app.get('/teams', (req, res) => {
  res.status(200).json(teams)
});

app.post('/teams', (req, res) => {
  const { name, initials, country, league } = req.body;

  if (
    name.length < 5 || 
    initials.length > 3 || 
    initials !== initials.toUpperCase() ||
    country.length < 3
    ) 
    return res.status(400).json({ "message": "invalid data" });
  teams.push({ name, initials, country, league });
  res.status(200).json(teams);
});

app.listen(3004, () => console.log('Rodando na porta 3004'));