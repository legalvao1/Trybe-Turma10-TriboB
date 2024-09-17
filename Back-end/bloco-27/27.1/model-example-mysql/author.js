//CAMADA MODEL

// retornar a lista de todos os autores

const connection = require('./connection');

const { ObjectId } = require('mongodb'); // para o mongo

// adicionar o fullname no objeto
const getNewAuthor = ({ id, firstName, middleName, lastName }) => {
  // pega somente os nomes != null
  const fullname = [firstName, middleName, lastName].map((name) => name).join(' ');
  return {
    id,
    firstName,
    middleName,
    lastName,
    fullName: fullname,
  }
}

//formatar para camelCase
// const serialize = (authorData) => {
//   return {
//     id: authorData.id,
//     firstName: authorData.first_name,
//     middleName: authorData.middle_name,
//     lastName:authorData.last_name,
//   }
// }

//async pq demora então já consideramos promise
// const getAll = async () => {
//   // pega o primeiro elemto do array e joga na variavel
//   const [authors]  = await connection.execute('SELECT id, first_name, middle_name, last_name FROM authors');
//   return authors.map(serialize).map(getNewAuthor);//formatar para camelCase
// }


// Busca todos os autores do banco. mongo
const getAll = async () => {
  return connection()
      .then((db) => db.collection('authors').find().toArray())
          .then((authors) =>
              authors.map(({ _id, firstName, middleName, lastName }) =>
              getNewAuthor({
                  id: _id,
                  firstName,
                  middleName,
                  lastName,
              })
          )
      );
}

// const findById = async (id) => {
//   // Repare que substituímos o id por `?` na query.
//   // Depois, ao executá-la, informamos um array com o id para o método `execute`.
//   // O `mysql2` vai realizar, de forma segura, a substituição do `?` pelo id informado.
//   const query = 'SELECT id, first_name, middle_name, last_name FROM model_example.authors WHERE id = ?'
//   const [ authorData ] = await connection.execute(query, [id]);
  
//   if (authorData.length === 0) return null;
  
//   // Utilizamos [0] para buscar a primeira linha, que deve ser a única no array de resultados, pois estamos buscando por ID.
//   const { firstName, middleName, lastName } = serialize(authorData[0]);
  
//   return getNewAuthor({
//       id,
//       firstName,
//       middleName,
//       lastName});
// };


const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
      return null;
  }

  const authorData = await connection()
      .then((db) => db.collection('authors').findOne(new ObjectId(id)));

  if (!authorData) return null;

  const { firstName, middleName, lastName } = authorData;

  return getNewAuthor({ id, firstName, middleName, lastName });
};




// const isValid = (firstName, middleName, lastName) => {
//   if(!firstName || typeof firstName !== 'string') return false;
//   if(!lastName || typeof lastName !== 'string') return false;
//   if (!middleName && typeof middleName !== 'string') return false;

//   return true;
// }

// const create = async (firstName, middleName, lastName) => connection.execute(
//   'INSERT INTO model_example.authors(first_name, middle_name, last_name) VALUES(?, ?, ?)',
//   [firstName, middleName, lastName]
// );


const create = async (firstName, middleName, lastName) =>
    connection()
        .then((db) => db.collection('authors').insertOne({ firstName, middleName, lastName }))
        .then(result => getNewAuthor({ id: result.insertedId, firstName, middleName, lastName }));


const findByName = async (firstName, middleName, lastName) => {
  // Determinamos se devemos buscar com ou sem o nome do meio
  const query = middleName
    ? { firstName, middleName, lastName }
    : { firstName, lastName };

  // Executamos a consulta e retornamos o resultado
  const author = await connection()
    .then((db) => db.collection('authors').findOne(query));

  // Caso nenhum author seja encontrado, devolvemos null
  if (!author) return null;

  // Caso contrário, retornamos o author encontrado
  console.log(author)
  return getNewAuthor(author);
};


module.exports = {
  getAll,
  findById,
  // isValid,
  create,
  findByName
}