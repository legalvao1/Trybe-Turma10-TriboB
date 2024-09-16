const { StatusCodes } = require('http-status-codes');
const ProductModel = require('../models/productModel');

const getAllProducts = async (_req, res, _next) => {

  try {
    const products = await ProductModel.getAll();

    return res.status(StatusCodes.OK).json(products);
    
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Message: "Ops algo de errado aconteceu :(" });
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await ProductModel.getById(id);

    if(!product) return res.status(StatusCodes.NOT_FOUND).json({ message: "Id não encontrado!"});
    return res.status(StatusCodes.OK).json(product);
    
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Message: "Ops algo de errado aconteceu :(" });
  } 
};

const addProduct = async (req, res) => {
  const { name, brand } = req.body;
  if(!name || !brand) return res.status(StatusCodes.CONFLICT).json({ message: "Campos name e brand não podem ser vazios" });

  try {
    const newProduct = await ProductModel.add(name, brand);
     res.status(StatusCodes.OK).json(newProduct);
    
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Message: "Ops algo de errado aconteceu :(" });
  }
};

const updateProduct = async (req, res) => {

  try {
    const { name, brand } = req.body;
  
    const products = await ProductModel.update(req.params.id, name, brand);
    
    return res.status(StatusCodes.OK).json(products);
    
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Message: "Ops algo de errado aconteceu :(" });
  }
};

const deleteProduct = async (req, res) => {

  try {
    const { id } = req.params
    const products = await ProductModel.exclude(id);
    return res.status(StatusCodes.OK).json(products);
    
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Message: "Ops algo de errado aconteceu :(" });
  }

};


module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
};