const axios = require('axios');

const viaCepApi = async (cep) => {
  const rawCep = cep.replace(/-/ig, '');
  const result =  await axios.get(`https://viacep.com.br/ws/${rawCep}/json/`);  
  return result.data;
}
  
module.exports = { viaCepApi };