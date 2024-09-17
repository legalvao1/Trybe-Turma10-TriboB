const express = require('express');

const router = express.Router();

const Books = require('../controllers/Books');

router.get('/', Books.getAll);
router.get('/:id', Books.getBookById);
router.post('/', Books.create);

module.exports = router;