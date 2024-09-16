const model = require('../model/cepModel');
const { viaCepApi } = require('../model/viaCepModel');

const cepRegex = /\d{5}-?\d{3}/;

// const formatAddress = (json) => {
//   return {
//     cep: json.cep,
//     logradouro: json.logradouro,
//     bairro: json.bairro,
//     localidade: json.localidade,
//     uf: json.uf,
//   }
// }
 
const getAddressBycep = async (cep) => { 
    if(!cepRegex.test(cep)) 
    return {
      error: {
        code: "invalidData",
        message: "CEP inválido"
      }
    }

    const address = await model.getAddressBycep(cep);

    if(!address.length) {
      const getCep = await viaCepApi(cep);
      if(getCep.erro) 
        return {
          error:
          {
            code: "notFound", 
            message: "CEP não encontrado"
          }
        }

      return await model.addCep(getCep);
    }
    return address
}

const addCep = async ({ cep, logradouro, bairro, localidade, uf }) => {
  const cepAlreadyExists = await getAddressBycep(cep);

  if (cepAlreadyExists.length)
    return {
      error: {
        code: "alreadyExists",
        message: "CEP já existente"
      }
    }
  
    return await model.addCep({ cep, logradouro, bairro, localidade, uf })
}


module.exports = {
  getAddressBycep,
  addCep,
}