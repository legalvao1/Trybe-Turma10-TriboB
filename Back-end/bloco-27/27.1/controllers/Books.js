const Joi = require('joi');

const rescue = require('express-rescue');

const Books = require('../services/Books');

const getAll = rescue (async (req, res) => {
    const books = await Books.getAll();

    res.status(200).json(books);
});

const getBookById = rescue( async (req, res, next) => {
    const { id } = req.params;
    const books = await Books.getBookById(id);

    if(books.error) return next(books.error)
    res.status(200).json(books);
});

const create = rescue( async(req, res, next) => {
    const { error } = Joi.object({
        title: Joi.string().not().empty().required(),
        author_id: Joi.number().not().empty().required()
    })
        .validate(req.body)

    if (error) {
        return next(error);
    }

    const { title, author_id } = req.body;

    const newBook = await Books.create(title, author_id);

    if (newBook.error) return next(newBook.error)
    res.status(201).json({ message: "Livro criado com sucesso" });

});

module.exports = { 
    getAll,
    getBookById,
    create
};