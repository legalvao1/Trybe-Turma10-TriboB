const express = require('express');
const songController = require('./controllers/songController');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/song', songController.getAllSongs);
app.post('/song', songController.createSong);
app.put('/song/:id', songController.updateSong);
app.delete('/song/:id', songController.deleteSong);

app.listen(process.env.PORT, () => console.log(`Api rodando na porta ${process.env.PORT}`));
