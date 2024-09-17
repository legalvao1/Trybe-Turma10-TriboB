const connection = require('./connection');

const Author = require('./author');

// const getAll = async () => {
//   const [books] = await connection.execute('SELECT id, title, author_id FROM books')
//   return books;
// }

const getAll = () => {
  return connection()
    .then((db) => db.collection('books').find().toArray())
      .then((books) => books)
}

// const getBookById = async (id) => {
//   const [books] = await connection.execute(
//     'SELECT id, title, author_id FROM books WHERE id=?;',
//     [id]
//   );

//   if (books.length === 0) return null;
//   return books.map(({ id, title, author_id }) => ({
//     id,
//     title,
//     authorId: author_id,
//   }))[0];//pq retorna um array com um elem então já pego o primeiro
// }

const getBookById = async (id) => {
  return connection()
    .then((db) => db.collection('books').find({ author_id: Number(id)}).toArray())
      .then((books) => books)
}


// const isValid = async (title, author_id) => {
  
//   if (!title || title.length < 3) return false;
//   if(!author_id || typeof author_id !== 'number' || !(await Author.findById(author_id))) return false;
//   return true;
// }

// const create = async(title, author_id) => connection.execute(
//   'INSERT INTO model_example.books (title, author_id) VALUES(?, ?)', 
//   [title, author_id],
// )

const create = (title, author_id) => 
  connection().then((db) => db.collection('books').insertOne({ title, author_id }));


module.exports = {
  getAll,
  getBookById,
  // isValid,
  create,
}