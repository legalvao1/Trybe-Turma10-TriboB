const connection = require('../connection');

const getAddressBycep = async (cep) => {
  const rawCep = cep.replace(/-/ig, '');
  const [address] = await connection.execute('SELECT cep, logradouro, bairro, localidade, uf FROM ceps WHERE cep=?',
  [rawCep]
  )
  return address;
}

const addCep = async({ cep, logradouro, bairro, localidade, uf }) => {
  const rawCep = cep.replace(/-/ig, '');
  await connection.execute(
    'INSERT INTO cep_lookup.ceps(cep, logradouro, bairro, localidade, uf) VALUES(?, ?, ?, ?,?)',
    [rawCep, logradouro, bairro, localidade, uf]
    )
  return { cep, logradouro, bairro, localidade, uf }
}


 
module.exports = {
  getAddressBycep,
  addCep,
}