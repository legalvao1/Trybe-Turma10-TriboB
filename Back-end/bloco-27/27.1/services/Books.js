const Books = require('../model-example-mysql/Book');

const getAll = async () => Books.getAll();

const getBookById = async (id) => {
  const book = await Books.getBookById(id);

  if (!book.length) {
    return {
      error: {
        code: 'notFound',
        message: `Não foi possível encontrar um autor com o id ${id}`,
      },
    }
  }
  return book;
};

const create = (title, author_id) => {
  return Books.create(title, author_id);
}

module.exports = {
  getAll,
  getBookById,
  create
}