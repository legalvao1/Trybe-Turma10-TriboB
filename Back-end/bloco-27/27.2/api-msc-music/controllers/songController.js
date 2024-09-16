const songsModel = require('../models/songModel');
const songsService = require('../services/songService');

const getAllSongs = async (req, res) => {
  try {
    const songs = await songsModel.getAll();
    return res.status(200).json(songs);
  } catch (error) {
    return res.status(500).json({ message: 'Ops, algo de errado :( ' });
  }
}

const createSong = async (req, res) => {
  try {
      const { name, album } = req.body;
      
      const result = await songsService.createSong({ name, album });
      if (result.erro)
          return res.status(result.erro.code).json({ message: result.erro.message });

      return res.status(201).json(result);
  } catch (error) {
      return res.status(500).json({ message: 'Ops, algo de errado :( ' })
  }
}

const updateSong = async (req, res) => {
  try {
    const { name, album } = req.body;
    const { id } = req.params;

    const result = await songsService.updateSong({ id, name, album });

    if (result.erro) return res.status(result.erro.code).json({ message: result.erro.message });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Ops, algo de errado :( ' })
  }
};

const deleteSong = async (req, res) => {
  try {
      const { id } = req.params;
      const result = await songsModel.exclude(id)

      if (!result)
          return res.status(400).json({ message: "Não foi possivel..." })

      return res.status(204).send();

  } catch (error) {
      return res.status(500).json({ message: 'Ops, algo de errado :( ' })
  }
}

module.exports = { getAllSongs, createSong, updateSong, deleteSong };