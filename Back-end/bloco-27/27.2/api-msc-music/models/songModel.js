const { ObjectId } = require("mongodb");
const connection = require("../models/connection");

const songExists = async (name, id) => {
  const db = await connection();
  const song = await db.collection('songs').findOne({ name: name } || {_id: ObjectId(id)});

  return song !== null; // para retornar true or false;
}

const getSongById = async (id) => {
  const db = await connection();
  const song = await db.collection('songs').findOne({_id: ObjectId(id)});

  return song !== null; // para retornar true or false;
}

const getAll = async () => {
  const db = await connection();
  return await db.collection('songs').find().toArray();
}

const create = async ({ name, album }) => {
  const db = await connection();
  const createSong = await db.collection('songs').insertOne({ name, album });

  return { id: createSong.insertedId, name, album }
}

const update = async ({ id, name, album }) => {
  if(!ObjectId.isValid(id)) return false;

  const  db = await connection();
  const updateSong = await db.collection('songs').updateOne({ _id: ObjectId(id)}, {$set: { name, album } });
  return updateSong;
}

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();

  return await db.collection('songs').deleteOne({ _id: ObjectId(id) });
}

module.exports = { 
  getAll,
  songExists,
  create,
  update,
  exclude,
  getSongById,
}