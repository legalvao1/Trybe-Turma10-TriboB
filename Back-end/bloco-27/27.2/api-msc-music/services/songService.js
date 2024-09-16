const songModel = require('../models/songModel');

const createSong = async ({ name, album }) => {
  const songExists = await songModel.songExists(name);

  if (songExists) return { erro: { code: 409, message: "Já temos uma música com esse nome" } }

  return await songModel.create({ name, album });
};

const updateSong = async ({ id, name, album }) => {
  const songExists = await songModel.getSongById(id);
  if (!songExists)
    return {
      erro: {
        code: 404,
        message: "Id não encontrado. Não foi possivel atualizar os dados"
      }
    };

  //Validação de outros campos também viriam aqui
  return await songModel.update({ id, name, album });
}

module.exports = { createSong, updateSong }