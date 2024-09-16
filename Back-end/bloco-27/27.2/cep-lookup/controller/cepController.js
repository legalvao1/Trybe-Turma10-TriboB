const service = require('../service/cepService');
const Joi = require('joi');

const getAddressBycep = async (req, res, next) => {
  const { cep } = req.params;

    const address = await service.getAddressBycep(cep);
 
    if (address.error) {
      return next(address.error)
    }
  
    return res.status(200).json(address);
  
}

const addCep = async (req, res, next) => {
  const requireNotEmptyString = Joi.string().not().empty().required();

  const { error } = Joi.object({
    cep: Joi.string().regex(/\d{5}-\d{3}/).required(),
    logradouro: requireNotEmptyString,
    bairro: requireNotEmptyString,
    localidade: requireNotEmptyString,
    uf: requireNotEmptyString.length(2),
  })

    .validate(req.body);

  if(error) {
    return next(error)
  }
   
  const addCEPToDB = await service.addCep(req.body);
  
  if(addCEPToDB.error) return next(addCEPToDB.error)

  return res.status(201).send();
}

module.exports = {
  getAddressBycep,
  addCep,
}